import React from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { Button } from '../../ui/Button';

interface ExecutionPanelProps {
  quality: number;
  onQualityChange: (q: number) => void;
  onConvertAll: () => void;
  onConvertOne: () => void;
  onDownloadAll: () => void;
  isProcessing: boolean;
  canConvert: boolean;
  canDownload: boolean;
  canConvertOne: boolean;
}

export const ExecutionPanel: React.FC<ExecutionPanelProps> = ({
  quality, onQualityChange, onConvertAll, onConvertOne, onDownloadAll,
  isProcessing, canConvert, canDownload, canConvertOne
}) => {
  return (
    <div className="bg-white border border-[#D9DDE3] p-4 shadow-sm flex flex-col gap-3 shrink-0">
      <div className="mb-2">
        <div className="flex justify-between items-center mb-2">
          <label className="text-[9px] font-black uppercase tracking-widest text-[#4B5563]">Output Quality</label>
          <span className="text-[10px] font-mono font-bold text-blue-700">{quality}%</span>
        </div>
        <input 
          type="range" min="1" max="100" value={quality}
          onChange={(e) => onQualityChange(parseInt(e.target.value))}
          className="w-full h-1 bg-[#F1F3F6] rounded-lg appearance-none cursor-pointer accent-[#1A1C1E]"
        />
        <div className="flex justify-between mt-1 text-[7px] font-mono text-[#6E767E] uppercase">
          <span>Smallest File</span><span>High Fidelity</span>
        </div>
      </div>

      <Button 
        onClick={onConvertAll}
        disabled={!canConvert || isProcessing}
        size="xl"
        isLoading={isProcessing}
        icon={!isProcessing && <Sparkles size={16} />}
        className="w-full"
      >
        {isProcessing ? 'PROCESSING' : 'RUN PIPELINE'}
      </Button>
      
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" size="md" onClick={onConvertOne} disabled={!canConvertOne || isProcessing}>
          Convert One
        </Button>
        <Button variant="ghost" size="md" onClick={onDownloadAll} disabled={!canDownload}>
          Finalize All
        </Button>
      </div>
    </div>
  );
};
