import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileType, FileDown } from 'lucide-react';
import { Button } from '../../ui/Button';
import { ConversionQueueItem } from '../../../types/batch';

interface ConverterResultsProps {
  activeItem: ConversionQueueItem | null;
  onDownload: (item: ConversionQueueItem) => void;
}

export const ConverterResults: React.FC<ConverterResultsProps> = ({ activeItem, onDownload }) => {
  return (
    <div className="bg-white border border-[#D9DDE3] flex-1 flex flex-col overflow-hidden shadow-sm min-h-0">
      <div className="border-b border-[#D9DDE3] px-3 py-2 bg-[#F8FAFC] flex justify-between items-center shrink-0">
        <span className="text-[9px] font-black uppercase tracking-widest">Output Delta</span>
        {activeItem?.result && <span className="text-[8px] font-mono text-green-600">VALIDATED</span>}
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center p-4 relative min-h-0">
        <AnimatePresence mode="wait">
          {activeItem?.result ? (
            <motion.div 
              key={activeItem.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4 text-center"
            >
              <div className="w-16 h-16 bg-blue-50 border border-blue-100 flex items-center justify-center rounded-xl text-blue-600 shadow-inner">
                <FileDown size={32} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-[#1A1C1E] truncate max-w-[150px] mb-1">{activeItem.result.filename}</p>
                <p className="text-[8px] font-mono text-[#6E767E]">
                  READY FOR EXPORT &bull; {(activeItem.result.blob.size / 1024).toFixed(1)} KB
                </p>
              </div>
              <Button onClick={() => onDownload(activeItem)} size="md" variant="secondary">
                Download Result
              </Button>
            </motion.div>
          ) : (
            <div className="text-center opacity-30 select-none">
              <FileType size={32} className="mx-auto mb-4 border-2 border-dashed p-4 w-20 h-20 rounded-full" />
              <p className="text-[9px] font-black uppercase tracking-widest max-w-[180px] mx-auto leading-relaxed">
                {activeItem ? `Awaiting conversion for ${activeItem.file.name}` : 'Pipeline empty. Inject assets to begin.'}
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-3 border-t border-[#D9DDE3] bg-[#F1F3F6] font-mono text-[8px] shrink-0">
          <div className="flex justify-between mb-1">
            <span>METADATA INTEGRITY:</span><span className="text-blue-600 font-bold">OPTIMIZED</span>
          </div>
          <div className="flex justify-between">
            <span>ENCODING MODE:</span><span className="text-blue-600 font-bold">CLIENT_SIDE</span>
          </div>
      </div>
    </div>
  );
};
