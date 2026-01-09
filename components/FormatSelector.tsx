import React from 'react';
import { Platform } from '../types';
import { PLATFORMS } from '../constants';

interface FormatSelectorProps {
  platform: Platform;
  selectedFormat: string;
  onSelect: (format: string) => void;
}

const FormatSelector: React.FC<FormatSelectorProps> = ({ platform, selectedFormat, onSelect }) => {
  const currentPlatform = PLATFORMS.find(p => p.id === platform);
  
  if (!currentPlatform) return null;

  return (
    <div className="flex flex-wrap justify-center gap-4 animate-fadeIn">
      {currentPlatform.formats.map((format) => (
        <button
          key={format}
          onClick={() => onSelect(format)}
          className={`
            px-6 py-2.5 rounded-full text-sm font-bold uppercase tracking-wide
            transition-all duration-300 border
            shadow-[0_4px_12px_rgba(0,0,0,0.04)]
            ${
              selectedFormat === format
                ? 'bg-[#1c1c1e] text-white border-transparent scale-105'
                : 'bg-white/60 text-[#3a3a3c] border-transparent hover:bg-white hover:shadow-md'
            }
          `}
        >
          {format}
        </button>
      ))}
    </div>
  );
};

export default FormatSelector;