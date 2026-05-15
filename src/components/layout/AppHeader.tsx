import React from 'react';

interface AppHeaderProps {
  title: string;
  version: string;
  status: string;
  statusColor?: string;
  icon: React.ReactNode;
  onReset: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({ 
  title, 
  version, 
  status, 
  statusColor = 'text-blue-600', 
  icon,
  onReset 
}) => {
  return (
    <header className="flex items-center justify-between border-b border-[#D9DDE3] pb-4 mb-4 shrink-0">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-[#1A1C1E] flex items-center justify-center rounded-sm text-white shrink-0">
          {icon}
        </div>
        <div>
          <h1 className="text-xl font-black tracking-tighter uppercase leading-none">{title}</h1>
          <p className="text-[9px] text-[#6E767E] font-mono tracking-widest uppercase mt-0.5">{version}</p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-[9px] text-[#6E767E] uppercase font-bold tracking-wider">System Status</span>
          <span className={`text-[10px] font-bold ${statusColor} flex items-center gap-1.5`}>
            <span className={`w-1.5 h-1.5 rounded-full bg-current animate-pulse`}></span>
            {status}
          </span>
        </div>
        <div className="h-8 w-[1px] bg-[#D9DDE3] hidden sm:block"></div>
        <button 
          onClick={onReset}
          className="px-4 py-2 border border-[#1A1C1E] hover:bg-[#1A1C1E] hover:text-white transition-all text-[10px] font-black uppercase tracking-widest active:scale-95"
        >
          Reset
        </button>
      </div>
    </header>
  );
};
