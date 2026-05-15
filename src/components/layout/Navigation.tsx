import React from 'react';
import { motion } from 'motion/react';
import { 
  Maximize2,
  RefreshCw,
  LayoutGrid,
  Settings2
} from 'lucide-react';

interface NavigationProps {
  mode: 'inflator' | 'converter';
  setMode: (mode: 'inflator' | 'converter') => void;
}

export const Navigation: React.FC<NavigationProps> = ({ mode, setMode }) => {
  return (
    <nav className="w-full md:w-20 bg-[#1A1C1E] flex flex-row md:flex-col items-center justify-between p-4 md:py-8 z-30 shadow-2xl" aria-label="Main Navigation">
      <div className="flex flex-row md:flex-col items-center gap-8">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-[#1A1C1E] mb-0 md:mb-4" aria-hidden="true">
          <LayoutGrid size={24} />
        </div>
        
        <div className="flex flex-row md:flex-col items-center gap-4" role="tablist" aria-orientation="vertical">
          <NavButton 
            isActive={mode === 'inflator'} 
            onClick={() => setMode('inflator')} 
            icon={<Maximize2 size={22} />}
            label="SIZE INCREASER"
            title="Image Size Increaser"
          />
          <NavButton 
            isActive={mode === 'converter'} 
            onClick={() => setMode('converter')} 
            icon={<RefreshCw size={22} />}
            label="FORMAT CONVERTER"
            title="Image Format Converter"
          />
        </div>
      </div>

      <div className="hidden md:flex flex-col items-center gap-6">
        <button className="text-neutral-500 hover:text-white transition-colors p-2" aria-label="Settings">
          <Settings2 size={20} />
        </button>
        <div className="text-[10px] font-black text-neutral-600 rotate-180 [writing-mode:vertical-lr]" aria-label="Version 2.0.0">
          V2.0.0
        </div>
      </div>
    </nav>
  );
};

const NavButton = ({ isActive, onClick, icon, label, title }: { isActive: boolean, onClick: () => void, icon: React.ReactNode, label: string, title: string }) => (
  <button
    onClick={onClick}
    role="tab"
    aria-selected={isActive}
    className={`
      w-12 h-12 rounded-xl flex items-center justify-center transition-all relative group
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#1A1C1E]
      ${isActive ? 'bg-white text-[#1A1C1E]' : 'text-neutral-500 hover:text-white hover:bg-white/10'}
    `}
    title={title}
  >
    {icon}
    {isActive && (
      <motion.div layoutId="nav-glow" className="absolute inset-0 rounded-xl bg-white/20 blur-lg -z-10" />
    )}
    <span className="absolute left-full ml-4 px-2 py-1 bg-neutral-900 text-white text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity hidden md:block whitespace-nowrap z-50">
      {label}
    </span>
  </button>
);
