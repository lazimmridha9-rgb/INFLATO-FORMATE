import React from 'react';
import { SectionHeader } from '../../ui/SectionHeader';
import { Button } from '../../ui/Button';
import { ProgressBar } from '../../ui/ProgressBar';
import { FileSizeUnit } from '../../../types/image';

interface ParameterMatrixProps {
  batch: any[];
  targetValue: string;
  targetUnit: FileSizeUnit;
  isProcessing: boolean;
  isDownloading: boolean;
  downloadedCount: number;
  onValueChange: (v: string) => void;
  onUnitChange: (u: FileSizeUnit) => void;
  onInflateActive: () => void;
  onProcessBatch: () => void;
  canInflate: boolean;
  completedCount: number;
  processedCount: number;
  totalWithResult: number;
}

export const ParameterMatrix: React.FC<ParameterMatrixProps> = ({
  batch, targetValue, targetUnit, isProcessing, isDownloading, downloadedCount,
  onValueChange, onUnitChange, onInflateActive, onProcessBatch,
  canInflate, completedCount, processedCount, totalWithResult
}) => {
  return (
    <div className={`bg-white border border-[#D9DDE3] p-4 lg:p-6 shadow-sm shrink-0 ${batch.length === 0 && 'opacity-30 pointer-events-none'}`}>
      <SectionHeader title="Injection Matrix" subTitle={batch.length > 1 ? 'Parallel Processing Enabled' : ''} className="mb-6" />
      
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row gap-3 items-end">
          <div className="flex-1 w-full">
            <label className="block text-[9px] font-black uppercase text-[#4B5563] mb-2 tracking-widest">Desired File Volume</label>
            <div className="flex h-12">
              <input 
                type="number" value={targetValue} onChange={(e) => onValueChange(e.target.value)} placeholder="0.00"
                className="flex-1 min-w-0 border border-[#1A1C1E] px-3 text-lg font-mono outline-none"
              />
              <select 
                value={targetUnit} onChange={(e) => onUnitChange(e.target.value as FileSizeUnit)}
                className="bg-[#1A1C1E] text-white px-4 font-black text-xs outline-none cursor-pointer border-y border-r border-[#1A1C1E] transition-colors hover:bg-neutral-800"
              >
                <option value="B">B</option><option value="KB">KB</option><option value="MB">MB</option><option value="GB">GB</option>
              </select>
            </div>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <Button variant="outline" size="lg" onClick={onInflateActive} disabled={!canInflate || isProcessing} className="flex-1 sm:flex-none">
              {isProcessing && canInflate ? '...' : 'Inflate Active'}
            </Button>
            <Button variant="primary" size="lg" onClick={onProcessBatch} disabled={batch.length === 0 || !targetValue || isProcessing} className="flex-1 sm:flex-none">
              Process Batch
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <ProgressBar label="Injection" subLabel={`${completedCount}/${batch.length}`} value={processedCount} max={batch.length} isActive={isProcessing} />
          <ProgressBar label="Dispatch" subLabel={`${downloadedCount}/${totalWithResult}`} value={downloadedCount} max={totalWithResult} color="bg-blue-600" isActive={isDownloading} />
        </div>
      </div>
    </div>
  );
};
