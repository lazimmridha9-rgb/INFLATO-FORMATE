import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Maximize2, CheckCircle2, Play, Layers } from 'lucide-react';
import { UnitConverter } from '../../../services/UnitConverter';
import { BatchItem } from '../../../types/batch';

interface ComparisonBlockProps {
  activeItem: BatchItem | null;
}

export const ComparisonBlock: React.FC<ComparisonBlockProps> = ({ activeItem }) => {
  return (
    <div className="bg-white border border-[#D9DDE3] flex-1 flex flex-col overflow-hidden shadow-sm min-h-0">
      <div className="border-b border-[#D9DDE3] px-4 py-2.5 bg-[#F8FAFC] flex justify-between items-center shrink-0">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
          <Maximize2 size={12} className="text-[#6E767E]" />
          Delta Projection Matrix
        </span>
        {activeItem?.result && <CheckCircle2 size={14} className="text-green-600" />}
      </div>
      
      <div className="flex-1 flex items-center justify-center p-6 relative min-h-0">
        <AnimatePresence mode="wait">
          {activeItem?.result ? (
            <motion.div 
              key={`result-${activeItem.id}`} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col sm:flex-row items-center gap-8 lg:gap-16 w-full justify-center"
            >
              <div className="text-center group">
                <p className="text-[9px] font-black text-[#6E767E] uppercase mb-1 tracking-widest opacity-60">Source Volume</p>
                <p className="text-xl lg:text-2xl font-mono text-[#6E767E] line-through decoration-red-400 decoration-2">{UnitConverter.formatBytes(activeItem.result.originalSize)}</p>
              </div>
              <div className="h-12 w-[1px] bg-[#D9DDE3] rotate-[15deg] hidden sm:block"></div>
              <div className="text-center group">
                <p className="text-[10px] font-black text-[#2563EB] uppercase mb-1 tracking-[0.3em]">Inflated Density</p>
                <p className="text-4xl lg:text-6xl font-mono font-black text-[#1A1C1E] transition-transform group-hover:scale-105 duration-300">
                  {UnitConverter.formatBytes(activeItem.result.newSize).split(' ')[0]}
                  <span className="text-xl lg:text-2xl ml-1 text-[#2563EB]">{UnitConverter.formatBytes(activeItem.result.newSize).split(' ')[1]}</span>
                </p>
              </div>
            </motion.div>
          ) : activeItem ? (
             <div className="text-center opacity-40 px-6 max-w-sm">
                <Play size={24} className="mx-auto mb-3 text-[#6E767E]" />
                <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed">
                  Initialize stream processing for <span className="text-[#2563EB]">{activeItem.file.name}</span>.
                </p>
             </div>
          ) : (
            <div className="text-center opacity-20 px-6">
              <Layers size={48} className="mx-auto mb-4" />
              <p className="text-[10px] font-black uppercase tracking-widest leading-relaxed">
                Input stream offline. Awaiting asset injection.
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
