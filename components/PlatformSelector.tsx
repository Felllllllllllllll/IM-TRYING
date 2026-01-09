import React from 'react';
import { PLATFORMS, PLATFORM_TOOLTIPS } from '../constants';
import { Platform } from '../types';
import Tooltip from './Tooltip';

interface PlatformSelectorProps {
  selectedPlatform: Platform;
  onSelect: (platform: Platform) => void;
}

const PlatformSelector: React.FC<PlatformSelectorProps> = ({ selectedPlatform, onSelect }) => {
  return (
    <div className="flex flex-wrap justify-center gap-6 p-4">
      {PLATFORMS.map((p) => (
        <Tooltip key={p.id} text={PLATFORM_TOOLTIPS[p.id] || p.id}>
          <button
            onClick={() => onSelect(p.id)}
            className={`
              group w-16 h-16 flex items-center justify-center rounded-2xl 
              transition-all duration-400 ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
              border border-white/80 shadow-[0_8px_20px_rgba(0,0,0,0.06)]
              hover:-translate-y-2 hover:scale-110 hover:shadow-xl
              ${
                selectedPlatform === p.id
                  ? 'bg-gradient-to-br from-[#c4b5fd] to-[#a78bfa] text-white -translate-y-1 shadow-[0_12px_25px_rgba(167,139,250,0.4)]'
                  : 'bg-white text-[#636366]'
              }
            `}
          >
            <div className="transform transition-transform group-hover:scale-110">
              {p.icon}
            </div>
          </button>
        </Tooltip>
      ))}
    </div>
  );
};

export default PlatformSelector;