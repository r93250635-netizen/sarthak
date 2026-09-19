import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import { SCHEMES } from "./src/data";
import { DemographicProfile, MatchResult } from "./src/types";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

// Local Rule-Based Fallback Engine
function fallbackMatch(profile: DemographicProfile, lang: string = 'en') {
  return SCHEMES.map(scheme => {
    let score = 1.0;
    let reasons: string[] = [];

    const isHi = lang === 'hi';

    // Age check
    if (scheme.eligibility.ageRange) {
      if (profile.age < scheme.eligibility.ageRange[0] || profile.age > scheme.eligibility.ageRange[1]) {
        score = 0;
      } else {
        reasons.push(isHi ? `आपकी आयु (${profile.age}) पात्र सीमा के भीतर है।` : `Your age (${profile.age}) is within the eligible range.`);
      }
    }

    // State check
    if (scheme.eligibility.states && !scheme.eligibility.states.includes('All')) {
      if (!scheme.eligibility.states.includes(profile.state)) {
        score = 0;
      } else {
        reasons.push(isHi ? `${profile.state} के निवासियों के लिए विशेष रूप से उपलब्ध है।` : `Available specifically for residents of ${profile.state}.`);
      }
    }

    // Gender check
    if (scheme.eligibility.gender && !scheme.eligibility.gender.includes('All')) {
      if (!scheme.eligibility.gender.includes(profile.gender)) {
        score = 0;
      } else {
        reasons.push(isHi ? `यह योजना विशेष रूप से ${profile.gender} आवेदकों के लिए है।` : `This scheme is specifically for ${profile.gender} applicants.`);
      }
    }

    // Caste check
    if (scheme.eligibility.caste && !scheme.eligibility.caste.includes('All')) {
      if (!scheme.eligibility.caste.includes(profile.caste)) {
        score = 0;
      } else {
        reasons.push(isHi ? `${profile.caste} श्रेणी के उम्मीदवारों के लिए उपलब्ध है।` : `Available for ${profile.caste} category candidates.`);
      }
    }

    // Income check
    if (scheme.eligibility.maxIncome && profile.annualIncome > scheme.eligibility.maxIncome) {
      score = 0;
    } else if (scheme.eligibility.maxIncome) {
      reasons.push(isHi ? `आपकी आय ₹${scheme.eligibility.maxIncome.toLocaleString()} की सीमा से नीचे है।` : `Your income is below the ₹${scheme.eligibility.maxIncome.toLocaleString()} limit.`);
    }

    // BPL check
    if (scheme.eligibility.isBPL && !profile.isBPL) {
      score = 0;
    } else if (scheme.eligibility.isBPL) {
      reasons.push(isHi ? `आपके जैसे बीपीएल कार्ड धारकों के लिए उपलब्ध है।` : `Available for BPL card holders like yourself.`);
    }

    // Occupation check
    if (scheme.eligibility.occupations && !scheme.eligibility.occupations.includes(profile.occupation)) {
      score *= 0.5; // Soft penalty for occupation mismatch if other criteria met
    } else if (scheme.eligibility.occupations) {
      reasons.push(isHi ? `${profile.occupation} के रूप में आपके व्यवसाय से मेल खाता है।` : `Matches your occupation as a ${profile.occupation}.`);
    }

    if (reasons.length === 0 && score > 0) {
      reasons.push(isHi ? "आप इस योजना के लिए सामान्य पात्रता मानदंडों को पूरा करते हैं।" : "You meet the general eligibility criteria for this scheme.");
    }

    return {
      schemeId: scheme.id,
      matchScore: score,
      matchReason: reasons.join(' ')
    };
  }).filter(m => m.matchScore > 0);
}

// API Routes
app.post("/api/match-schemes", async (req, res) => {
  const { profile, lang = 'en' } = req.body;

  try {
    const prompt = `
      You are Sarthak, a helpful Government Scheme Discovery Agent for India.
      Given the following user demographic profile, analyze which of the provided government schemes they are eligible for.
      
      User Profile: ${JSON.stringify(profile)}
      
      Schemes Database: ${JSON.stringify(SCHEMES)}
      
      Instructions:
      1. Filter schemes by eligibility rules (age, gender, income, occupation, etc.).
      2. For each scheme, provide a 'matchScore' (0 to 1) and a 'matchReason' explaining why they qualify.
      3. Return a JSON array of MatchResult objects.
      4. IMPORTANT: The 'matchReason' must be in ${lang === 'hi' ? 'Hindi' : 'English'}.
      
      Format the response as a strict JSON array.
    `;

    const interaction = await ai.interactions.create({
      model: "gemini-3.5-flash", 
      input: prompt,
      response_format: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            schemeId: { type: Type.STRING },
            matchScore: { type: Type.NUMBER },
            matchReason: { type: Type.STRING }
          },
          required: ["schemeId", "matchScore", "matchReason"]
        }
      }
    });

    const matches = JSON.parse(interaction.output_text || "[]");
    
    // Enrich with actual scheme data
    const enrichedMatches: MatchResult[] = matches.map((m: any) => ({
      ...m,
      scheme: SCHEMES.find(s => s.id === m.schemeId)
    })).filter((m: any) => m.scheme);

    res.json(enrichedMatches);
  } catch (error: any) {
    console.error("Match error (Falling back to local engine):", error.message);
    
    // Determine if it's a rate limit error to provide specific feedback if needed
    const isRateLimit = error.message?.includes('429') || error.message?.includes('Rate limit');
    
    const fallbackResults = fallbackMatch(profile, lang);
    const enrichedFallback: MatchResult[] = fallbackResults.map((m: any) => ({
      ...m,
      scheme: SCHEMES.find(s => s.id === m.schemeId),
      isFallback: true,
      errorType: isRateLimit ? 'rate_limit' : 'generic'
    })).filter((m: any) => m.scheme);

    res.json(enrichedFallback);
  }
});

app.post("/api/chat", async (req, res) => {
  const { messages, profile, lang = 'en' } = req.body;

  try {
    const systemInstruction = `
      You are Sarthak, an expert agent for Indian government schemes.
      You help citizens understand complex eligibility rules in simple terms.
      
      IMPORTANT: You must respond entirely in ${lang === 'hi' ? 'Hindi' : 'English'}.
      
      The user's profile is: ${JSON.stringify(profile)}.
      Always be respectful, empathetic, and prioritize accessibility.
      If asked about a scheme not in the database, use your internal knowledge to provide general information but warn the user to verify.
    `;

    const interaction = await ai.interactions.create({
      model: "gemini-3.5-flash",
      input: messages[messages.length - 1].content,
      system_instruction: systemInstruction,
      previous_interaction_id: messages.length > 1 ? messages[messages.length - 2].interactionId : undefined
    });

    res.json({ 
      content: interaction.output_text,
      interactionId: interaction.id
    });
  } catch (error) {
    console.error("Chat error:", error);
    res.status(500).json({ error: "Failed to get chat response" });
  }
});

// Vite middleware for development
async function setupServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

setupServer();
