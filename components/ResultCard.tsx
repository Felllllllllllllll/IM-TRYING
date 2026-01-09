import React, { useState } from 'react';
import { GeneratedContent } from '../types';

interface ResultCardProps {
  content: GeneratedContent | null;
  loading: boolean;
}

const ResultCard: React.FC<ResultCardProps> = ({ content, loading }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!content) return;
    const text = `${content.title}\n\n${content.body}\n\n${content.hashtags}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Main Result Card */}
      <section className="bg-white/85 backdrop-blur-xl border border-white/50 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] rounded-[32px] p-10 transition-transform duration-500 hover:scale-[1.01]">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <span className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full font-bold text-gray-400 font-sans">3</span>
            <h3 className="font-extrabold text-sm uppercase tracking-widest text-gray-500">Resultat</h3>
          </div>
          <button 
            onClick={handleCopy}
            disabled={!content || loading}
            className={`
              px-6 py-2 text-xs font-bold rounded-2xl shadow-lg transition-all
              ${copied 
                ? 'bg-green-500 text-white transform scale-105' 
                : 'bg-gradient-to-br from-[#c4b5fd] to-[#a78bfa] text-white hover:opacity-90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed'
              }
            `}
          >
            {copied ? 'KLART!' : 'KOPIERA'}
          </button>
        </div>
        
        <div className="min-h-[220px] p-6 bg-gray-50/50 rounded-3xl border border-gray-100 text-sm font-semibold text-gray-800 whitespace-pre-wrap">
          {loading ? (
             <div className="w-full h-32 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] animate-shimmer rounded-xl" />
          ) : content ? (
            <div className="animate-fadeIn">
               {content.title}
               <br /><br />
               {content.body}
               <br /><br />
               {content.hashtags}
            </div>
          ) : (
            <span className="text-gray-400">Din text genereras med AI-precision.</span>
          )}
        </div>
      </section>

      {/* Growth Tips Card */}
      <section className="bg-emerald-50/60 backdrop-blur-md border border-emerald-100/50 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] rounded-[32px] p-10">
        <h3 className="font-extrabold text-xs uppercase tracking-[0.2em] text-emerald-600 mb-8 flex items-center gap-3">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          TILLVÄXTFAKTA 2026
        </h3>
        <div className="space-y-4">
          {loading ? (
             <div className="w-full h-8 bg-emerald-100/50 animate-pulse rounded-lg" />
          ) : content ? (
            content.growth_tips.map((tip, idx) => (
              <div key={idx} className="flex gap-4 items-center p-4 bg-white/80 rounded-2xl shadow-sm border border-emerald-50 animate-fadeIn" style={{ animationDelay: `${idx * 150}ms` }}>
                <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                <span className="text-xs font-bold text-emerald-900 leading-tight">{tip}</span>
              </div>
            ))
          ) : (
            <p className="text-emerald-800/40 italic text-xs font-bold text-center">Analys pågår...</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default ResultCard;