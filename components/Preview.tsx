import React from 'react';
import { GeneratedContent, Platform } from '../types';

interface PreviewProps {
  content: GeneratedContent | null;
  loading: boolean;
  platform: Platform;
}

const Preview: React.FC<PreviewProps> = ({ content, loading, platform }) => {
  if (platform === 'google') {
    return (
      <div className="w-[310px] min-h-[200px] bg-white p-8 rounded-[40px] shadow-2xl border-t-[12px] border-blue-400 mt-20 transition-all duration-500 hover:-translate-y-1">
        <div className="text-[9px] font-black text-gray-300 mb-3 tracking-widest uppercase">Global Search 26</div>
        {loading ? (
          <div className="space-y-3">
             <div className="h-6 w-3/4 bg-gray-100 rounded animate-pulse" />
             <div className="h-4 w-full bg-gray-50 rounded animate-pulse" />
             <div className="h-4 w-5/6 bg-gray-50 rounded animate-pulse" />
          </div>
        ) : content ? (
          <>
            <div className="text-blue-600 text-lg font-bold leading-tight mb-3 font-sans">{content.title}</div>
            <div className="text-xs text-gray-500 line-clamp-6 leading-relaxed font-medium">{content.body}</div>
          </>
        ) : (
          <div className="text-gray-300 text-sm italic text-center py-8">Redo för sökresultat...</div>
        )}
      </div>
    );
  }

  return (
    <div className="relative w-[310px] h-[630px] bg-black rounded-[54px] border-[14px] border-[#1c1c1e] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden transition-all duration-500 hover:shadow-[0_60px_120px_-20px_rgba(0,0,0,0.4)]">
       {/* Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[35px] bg-[#1c1c1e] rounded-b-[20px] z-20 pointer-events-none" />
      
      {/* Screen Content */}
      <div className="w-full h-full relative bg-slate-900 flex flex-col">
        {/* Background Image / Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-purple-900/30 to-black z-0" />
        
        {loading ? (
           <div className="flex-1 flex flex-col justify-end p-8 pb-20 space-y-4 z-10">
             <div className="h-8 w-3/4 bg-white/10 rounded animate-pulse" />
             <div className="h-4 w-full bg-white/5 rounded animate-pulse" />
             <div className="h-4 w-5/6 bg-white/5 rounded animate-pulse" />
           </div>
        ) : content ? (
          <div className="flex-1 flex flex-col justify-end p-8 pb-16 z-10 text-white">
            <h4 className="text-2xl font-black mb-4 leading-tight drop-shadow-lg">{content.title}</h4>
            <p className="text-sm font-medium opacity-90 line-clamp-6 mb-6 leading-relaxed drop-shadow-md text-gray-100">{content.body}</p>
            <div className="text-[10px] font-black text-purple-300 tracking-wider uppercase">{content.hashtags}</div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center z-10">
             <p className="text-white/20 font-black text-xl italic uppercase tracking-widest">Preview Mode</p>
          </div>
        )}

        {/* UI Overlay simulation */}
        <div className="absolute right-4 bottom-20 flex flex-col gap-6 items-center z-20 opacity-50">
            <div className="w-8 h-8 rounded-full bg-white/20" />
            <div className="w-8 h-8 rounded-full bg-white/20" />
            <div className="w-8 h-8 rounded-full bg-white/20" />
        </div>
      </div>
    </div>
  );
};

export default Preview;