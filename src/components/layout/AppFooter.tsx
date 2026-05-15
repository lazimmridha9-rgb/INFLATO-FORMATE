import React from 'react';

interface FooterProps {
  engines: Array<{ label: string; value: string; color?: string }>;
  tagline: string;
}

export const AppFooter: React.FC<FooterProps> = ({ engines, tagline }) => {
  return (
    <footer className="mt-4 flex flex-col sm:flex-row justify-between items-center px-4 py-3 bg-white border border-[#D9DDE3] text-[9px] font-mono text-[#6E767E] shrink-0 shadow-sm gap-4">
      <div className="flex gap-8">
        {engines.map((engine, idx) => (
          <span key={idx} className="flex items-center gap-1.5">
            <div className={`w-1.5 h-1.5 rounded-full ${engine.color || 'bg-blue-500'}`}></div> 
            {engine.label}: {engine.value}
          </span>
        ))}
      </div>
      <span className="font-black uppercase tracking-widest text-[#1A1C1E]">
        {tagline}
      </span>
    </footer>
  );
};
