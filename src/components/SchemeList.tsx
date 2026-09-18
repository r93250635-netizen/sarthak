/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ExternalLink, Info, Award, Building2, ChevronRight } from 'lucide-react';
import { MatchResult } from '../types';

interface Props {
  matches: MatchResult[];
}

export default function SchemeList({ matches }: Props) {
  if (!Array.isArray(matches) || matches.length === 0) {
    return (
      <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
        <p className="text-slate-500 font-medium">No direct matches found. Try broadening your profile or ask Sarthak for help.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {matches.map((match, idx) => (
        <motion.div
          key={match.scheme.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="group bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-orange-200 transition-all overflow-hidden"
        >
          <div className="p-6 md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 bg-orange-100 text-orange-700 text-xs font-bold rounded-full uppercase tracking-wider">
                    {match.scheme.category}
                  </span>
                  {match.matchScore > 0.9 && (
                    <span className="flex items-center gap-1 text-emerald-600 text-xs font-bold uppercase tracking-wider">
                      <Award size={14} /> Best Match
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                  {match.scheme.name}
                </h3>
              </div>
              <a 
                href={match.scheme.applicationUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2.5 bg-slate-50 text-slate-400 hover:bg-orange-600 hover:text-white rounded-xl transition-all"
                aria-label="Visit official website"
              >
                <ExternalLink size={20} />
              </a>
            </div>

            <p className="text-slate-600 mb-6 line-clamp-2">
              {match.scheme.description}
            </p>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 mb-6">
              <div className="flex gap-3">
                <div className="shrink-0 mt-0.5">
                  <Info className="text-blue-500" size={18} />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-800">Why you qualify:</p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {match.matchReason}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 shrink-0">
                  <Building2 size={18} />
                </div>
                <div>
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">Ministry</p>
                  <p className="text-sm font-semibold text-slate-700 leading-tight">{match.scheme.ministry}</p>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 md:justify-end items-end">
                {match.scheme.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="text-[10px] font-bold text-slate-400 border border-slate-200 px-2 py-0.5 rounded-md uppercase">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-slate-900 px-8 py-4 flex items-center justify-between text-white group-hover:bg-orange-600 transition-colors">
             <div className="flex gap-2 items-center">
                <p className="text-sm font-medium opacity-80">Primary Benefit:</p>
                <p className="text-sm font-bold">{match.scheme.benefits[0]}</p>
             </div>
             <ChevronRight size={18} className="opacity-50 group-hover:opacity-100 transition-opacity" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
