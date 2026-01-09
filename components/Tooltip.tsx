import React from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children, className = '' }) => {
  return (
    <div className={`relative flex flex-col items-center group/tooltip ${className}`}>
      {children}
      <div className="absolute bottom-full mb-3 hidden flex-col items-center group-hover/tooltip:flex z-50 pointer-events-none animate-fadeIn left-1/2 -translate-x-1/2 w-max max-w-[200px]">
        <span className="relative z-10 px-3 py-2 text-xs font-bold leading-tight text-white bg-slate-800 shadow-[0_10px_20px_-5px_rgba(0,0,0,0.3)] rounded-xl text-center">
          {text}
        </span>
        <div className="w-3 h-3 -mt-1.5 rotate-45 bg-slate-800 z-0"></div>
      </div>
    </div>
  );
};

export default Tooltip;