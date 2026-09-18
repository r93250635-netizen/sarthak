/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, X, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { DemographicProfile } from '../types';

import { translations, Language } from '../translations';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  interactionId?: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
  profile: DemographicProfile | null;
  lang: Language;
}

export default function ChatPanel({ isOpen, onClose, profile, lang }: Props) {
  const t = translations[lang];
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        { 
          role: 'assistant', 
          content: lang === 'hi' 
            ? "नमस्ते! मैं सार्थक हूं, आपका समर्पित सरकारी योजना खोज एजेंट। चाहे आपको पात्रता, दस्तावेज़ीकरण, या विशिष्ट लाभ खोजने में सहायता की आवश्यकता हो, मैं आपकी सहायता के लिए यहाँ हूँ। आज मैं आपकी कैसे मदद कर सकता हूँ?" 
            : "Namaste! I am Sarthak, your dedicated Government Scheme Discovery Agent. Whether you need help with eligibility, documentation, or finding specific benefits, I'm here to assist you. How can I help you today?" 
        }
      ]);
    }
  }, [lang, messages.length]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, userMsg],
          profile,
          lang
        }),
      });
      const data = await response.json();
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: data.content,
        interactionId: data.interactionId 
      }]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm sorry, I encountered an error. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="fixed bottom-4 right-4 z-50 w-[calc(100vw-32px)] sm:w-96 max-h-[600px] flex flex-col bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden"
        >
          {/* Header */}
          <div className="bg-slate-900 px-6 py-4 flex items-center justify-between text-white">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-600 rounded-full flex items-center justify-center shadow-inner">
                <Bot size={22} className="text-white" />
              </div>
              <div>
                <h3 className="font-bold">{lang === 'hi' ? 'सार्थक एजेंट' : 'Sarthak Agent'}</h3>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">{lang === 'hi' ? 'ऑनलाइन' : 'Online'}</span>
                </div>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50"
          >
            {messages.map((msg, i) => (
              <div 
                key={i} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-slate-200' : 'bg-orange-100'}`}>
                    {msg.role === 'user' ? <User size={16} className="text-slate-600" /> : <Bot size={16} className="text-orange-600" />}
                  </div>
                  <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-slate-900 text-white rounded-tr-none' : 'bg-white border border-slate-100 shadow-sm text-slate-800 rounded-tl-none'}`}>
                    {msg.content}
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="flex gap-3 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                    <Bot size={16} className="text-orange-600" />
                  </div>
                  <div className="p-4 bg-white border border-slate-100 shadow-sm rounded-2xl rounded-tl-none flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-orange-600" />
                    <span className="text-xs font-medium text-slate-400">{lang === 'hi' ? 'सार्थक सोच रहा है...' : 'Sarthak is thinking...'}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-100">
            <div className="relative">
              <input 
                type="text" 
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={lang === 'hi' ? 'योजनाओं के बारे में पूछें...' : 'Ask about schemes...'}
                className="w-full pl-4 pr-12 py-3.5 bg-slate-100 border-none rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all text-sm"
              />
              <button 
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-2 top-2 p-1.5 bg-orange-600 text-white rounded-xl disabled:opacity-50 transition-all hover:bg-orange-700 active:scale-95"
              >
                <Send size={18} />
              </button>
            </div>
            <div className="mt-2 flex items-center justify-center gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-widest">
              <Sparkles size={10} />
              Powered by Gemini AI
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
