import React from 'react';

interface SectionHeaderProps {
  title: string;
  subTitle?: string;
  className?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, subTitle, className = '' }) => (
  <div className={`flex items-center justify-between ${className}`}>
    <h2 className="text-[11px] font-black uppercase border-l-2 border-[#1A1C1E] pl-3 tracking-widest leading-none py-1">
      {title}
    </h2>
    {subTitle && (
      <span className="text-[9px] font-mono text-[#6E767E] uppercase">{subTitle}</span>
    )}
  </div>
);
