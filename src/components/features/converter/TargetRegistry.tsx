import React from 'react';
import { Search, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { SectionHeader } from '../../ui/SectionHeader';

interface TargetRegistryProps {
  formats: any[];
  categories: any[];
  activeCategory: string;
  searchQuery: string;
  currentFormat: string;
  onSearch: (q: string) => void;
  onCategory: (c: string) => void;
  onSelectFormat: (f: string) => void;
}

export const TargetRegistry: React.FC<TargetRegistryProps> = ({
  formats, categories, activeCategory, searchQuery, currentFormat,
  onSearch, onCategory, onSelectFormat
}) => {
  return (
    <section className="col-span-12 lg:col-span-5 flex flex-col gap-4 min-h-0 overflow-hidden">
      <div className="bg-white border border-[#D9DDE3] flex-1 flex flex-col min-h-0 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-[#D9DDE3] flex flex-col gap-4">
          <SectionHeader title="Target Registry" subTitle={`${formats.length} Formats loaded`} />
          
          <div className="flex flex-col gap-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#6E767E]" />
              <input 
                type="text" placeholder="SEARCH PROTOCOLS (E.G. AVIF, PSD, RAW)..." value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full bg-[#F1F3F6] border-none text-[10px] font-bold uppercase pl-10 pr-4 py-3 focus:ring-2 focus:ring-[#1A1C1E] outline-none"
              />
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 pb-1">
              <CategoryBtn active={activeCategory === 'all'} onClick={() => onCategory('all')} label="All" />
              {categories.map(cat => (
                <CategoryBtn key={cat.id} active={activeCategory === cat.id} onClick={() => onCategory(cat.id)} label={cat.name} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {formats.map((opt) => (
              <FormatButton 
                key={opt.value} 
                opt={opt} 
                isActive={currentFormat === opt.value} 
                onSelect={() => onSelectFormat(opt.value)} 
              />
            ))}
          </div>
        </div>
        
        <div className="p-3 border-t border-[#D9DDE3] bg-[#F8FAFC]">
          <p className="text-[8px] font-mono text-[#6E767E] leading-relaxed">
            <span className="text-[#1A1C1E] font-black">NOTE:</span> Accuracy is prioritized. Some formats use high-fidelity PNG containers if native browser encoding is restricted.
          </p>
        </div>
      </div>
    </section>
  );
};

const CategoryBtn = ({ active, onClick, label }: any) => (
  <button 
    onClick={onClick}
    className={`py-1.5 px-1 text-[8px] font-black uppercase border transition-all text-center truncate ${active ? 'bg-[#1A1C1E] text-white border-[#1A1C1E]' : 'bg-white text-[#6E767E] border-[#D9DDE3] hover:border-[#1A1C1E]'}`}
  >{label}</button>
);

const FormatButton = ({ opt, isActive, onSelect }: any) => (
  <button
    onClick={onSelect}
    className={`relative flex flex-col items-center justify-center pt-5 pb-3 px-2 border rounded-sm transition-all h-20 outline-none ${isActive ? 'bg-[#1A1C1E] text-white border-[#1A1C1E] shadow-md -translate-y-0.5' : 'bg-white text-neutral-600 border-[#D9DDE3] hover:border-[#1A1C1E] hover:bg-neutral-50'}`}
  >
    <div className={`absolute top-1 left-1/2 -translate-x-1/2 w-8 h-[2px] ${opt.color}`}></div>
    <span className="text-[10px] font-black uppercase tracking-tighter mb-0.5">{opt.label}</span>
    <span className="text-[7px] font-mono opacity-60 truncate w-full text-center">{opt.category.toUpperCase()}</span>
    {isActive && (
      <motion.div layoutId="active-tick" className="absolute -top-1 -right-1 bg-blue-500 text-white p-0.5 rounded-full shadow-lg">
        <CheckCircle2 size={10} strokeWidth={3} />
      </motion.div>
    )}
  </button>
);
