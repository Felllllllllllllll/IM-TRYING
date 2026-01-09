import React from 'react';
import { GeneratedContent } from '../types';

interface StructureCardProps {
  content: GeneratedContent | null;
  loading: boolean;
}

const StructureCard: React.FC<StructureCardProps> = ({ content, loading }) => {
  return (
    <section className="bg-white/85 backdrop-blur-xl border border-white/50 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] rounded-[32px] p-10 transition-transform duration-500 hover:scale-[1.01]">
      <div className="flex items-center gap-4 mb-8">
        <span className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full font-bold text-gray-400 font-sans">2</span>
        <h3 className="font-extrabold text-sm uppercase tracking-widest text-gray-500">Struktur</h3>
      </div>
      
      <div className="space-y-8 min-h-[120px]">
        {loading ? (
          <div className="w-full h-48 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-100 bg-[length:200%_100%] animate-shimmer rounded-[24px]" />
        ) : content ? (
          <div className="animate-fadeIn space-y-6">
            <div>
              <span className="inline-block px-3 py-1.5 rounded-xl text-[11px] font-extrabold mb-2 tracking-wide bg-[#f2f2f7] text-[#8e8e93]">HOOK</span>
              <div className="text-xl font-extrabold text-gray-900 border-l-4 border-indigo-400 pl-4">{content.title}</div>
            </div>
            <div>
              <span className="inline-block px-3 py-1.5 rounded-xl text-[11px] font-extrabold mb-2 tracking-wide bg-[#f2f2f7] text-[#8e8e93]">BODY</span>
              <div className="text-sm font-semibold text-gray-600 bg-white p-6 rounded-3xl shadow-sm border border-gray-50 leading-relaxed whitespace-pre-wrap">
                {content.body}
              </div>
            </div>
            <div>
              <span className="inline-block px-3 py-1.5 rounded-xl text-[11px] font-extrabold mb-2 tracking-wide bg-[#f2f2f7] text-[#8e8e93]">SEO TAGS</span>
              <div className="text-xs font-black text-purple-500 mt-1">{content.hashtags}</div>
            </div>
          </div>
        ) : (
          <p className="text-gray-400 font-medium text-center py-6 italic">Strukturen byggs när du klickar...</p>
        )}
      </div>
    </section>
  );
};

export default StructureCard;