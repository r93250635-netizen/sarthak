/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  User, 
  MessageSquare, 
  LayoutDashboard, 
  ChevronRight, 
  Filter,
  Info,
  ExternalLink,
  Loader2,
  CheckCircle2,
  X,
  Languages
} from 'lucide-react';
import { DemographicProfile, MatchResult } from './types';
import DemographicForm from './components/DemographicForm';
import SchemeList from './components/SchemeList';
import ChatPanel from './components/ChatPanel';
import { translations, Language } from './translations';
import sarthakLogo from './assets/images/sarthak_logo_1789759830502.jpg';

export default function App() {
  const [view, setView] = useState<'landing' | 'onboarding' | 'dashboard'>('landing');
  const [profile, setProfile] = useState<DemographicProfile | null>(null);
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showChat, setShowChat] = useState(false);
  const [lang, setLang] = useState<Language>('en');

  const t = translations[lang];

  const handleProfileSubmit = async (newProfile: DemographicProfile) => {
    setProfile(newProfile);
    setIsLoading(true);
    setError(null);
    setView('dashboard');
    
    try {
      const response = await fetch('/api/match-schemes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile: newProfile }),
      });
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      if (Array.isArray(data)) {
        setMatches(data);
      } else {
        setMatches([]);
        console.error('Unexpected response format:', data);
      }
    } catch (error: any) {
      console.error('Error matching schemes:', error);
      setError(error.message || 'Failed to connect to Sarthak. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-orange-100">
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200 px-4 h-16 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => setView('landing')}
        >
          <div className="w-9 h-9 bg-orange-600 rounded-lg flex items-center justify-center overflow-hidden shadow-sm">
            <img src={sarthakLogo} alt="Sarthak Logo" className="w-full h-full object-cover" />
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-800">{t.app_name}</span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center bg-slate-100 rounded-full p-1 border border-slate-200">
            <button 
              onClick={() => setLang('en')}
              className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${lang === 'en' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              EN
            </button>
            <button 
              onClick={() => setLang('hi')}
              className={`px-3 py-1 text-xs font-bold rounded-full transition-all ${lang === 'hi' ? 'bg-white text-orange-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              हिन्दी
            </button>
          </div>
          <div className="flex items-center gap-1">
            {profile && (
              <button 
                onClick={() => setView('onboarding')}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                aria-label="Edit Profile"
              >
                <User size={20} />
              </button>
            )}
            <button 
              onClick={() => setShowChat(!showChat)}
              className={`p-2 rounded-full transition-all ${showChat ? 'bg-orange-600 text-white shadow-lg' : 'text-slate-600 hover:bg-slate-100'}`}
              aria-label="Toggle AI Chat"
            >
              <MessageSquare size={20} />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8 pb-24">
        <AnimatePresence mode="wait">
          {view === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center text-center py-12"
            >
              <div className="inline-block px-3 py-1 bg-orange-100 text-orange-700 text-sm font-medium rounded-full mb-6">
                Civic Tech Initiative
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight whitespace-pre-line" dangerouslySetInnerHTML={{ __html: lang === 'hi' ? 'अपनी योजनाओं की <br/> <span class="text-orange-600">खोज करें</span>' : 'Discover the Schemes <br/> <span class="text-orange-600">You Qualify For</span>' }} />
              
              <p className="text-lg text-slate-600 max-w-xl mb-10 leading-relaxed">
                {t.tagline}. {lang === 'en' ? 'We simplify complex rules and find support tailored to your life.' : 'हम जटिल नियमों को सरल बनाते हैं और आपके जीवन के अनुकूल सहायता पाते हैं।'}
              </p>
              
              <button
                onClick={() => setView('onboarding')}
                className="group flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-95"
              >
                {t.get_started}
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <FeatureCard 
                  icon={<CheckCircle2 className="text-emerald-500" />}
                  title={t.step_1_title}
                  desc={t.step_1_desc}
                />
                <FeatureCard 
                  icon={<Filter className="text-blue-500" />}
                  title={t.step_2_title}
                  desc={t.step_2_desc}
                />
                <FeatureCard 
                  icon={<Info className="text-amber-500" />}
                  title={t.step_3_title}
                  desc={t.step_3_desc}
                />
              </div>
            </motion.div>
          )}

          {view === 'onboarding' && (
            <motion.div
              key="onboarding"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <DemographicForm 
                onSubmit={handleProfileSubmit} 
                initialData={profile || undefined}
                lang={lang}
              />
            </motion.div>
          )}

          {view === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-8"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{t.matches_found}</h2>
                  <p className="text-slate-500">{lang === 'en' ? `Based on your profile as a ${profile?.occupation} in ${profile?.state}` : `आपकी प्रोफाइल के आधार पर: ${profile?.occupation}, ${profile?.state}`}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">
                  <LayoutDashboard size={16} />
                  <span>{lang === 'en' ? `Showing ${matches.length} schemes` : `${matches.length} योजनाएं दिखाई जा रही हैं`}</span>
                </div>
              </div>

              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                  <Loader2 className="animate-spin mb-4" size={40} />
                  <p className="font-medium">{lang === 'en' ? 'Sarthak is analyzing eligibility...' : 'सार्थक पात्रता का विश्लेषण कर रहा है...'}</p>
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-100 rounded-3xl p-8 text-center">
                  <p className="text-red-800 font-medium mb-4">{error}</p>
                  <button 
                    onClick={() => profile && handleProfileSubmit(profile)}
                    className="px-6 py-2 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 transition-colors"
                  >
                    {lang === 'en' ? 'Try Again' : 'पुनः प्रयास करें'}
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {matches.length > 0 && (matches[0] as any).isFallback && (
                    <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-center gap-3">
                      <Info className="text-amber-600 shrink-0" size={20} />
                      <p className="text-sm text-amber-800 leading-snug">
                        <strong>{t.offline_mode}</strong>: {t.offline_desc}
                      </p>
                    </div>
                  )}
                  <SchemeList matches={matches} />
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Chat Panel */}
      <ChatPanel 
        isOpen={showChat} 
        onClose={() => setShowChat(false)} 
        profile={profile}
        lang={lang}
      />
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
    </div>
  );
}
