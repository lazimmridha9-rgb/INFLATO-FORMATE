import React from 'react';
import { X, Layers, FileUp, FileDown, CheckCircle2 } from 'lucide-react';
import { UnitConverter } from '../../../services/UnitConverter';
import { BatchItem } from '../../../types/batch';

interface UploadQueueProps {
  batch: BatchItem[];
  activeId: string | null;
  selectedIds: Set<string>;
  dragActive: boolean;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFiles: (files: FileList | File[]) => void;
  onRemove: (id: string) => void;
  onSelect: (id: string, e?: React.MouseEvent) => void;
  onSelectAll: () => void;
  onPurgeSelected: () => void;
  onClearAll: () => void;
  onSetActive: (id: string) => void;
  activeItem: BatchItem | null;
  onDownload: (item: BatchItem) => void;
}

export const UploadQueue: React.FC<UploadQueueProps> = ({
  batch, activeId, selectedIds, dragActive, fileInputRef,
  onFiles, onRemove, onSelect, onSelectAll, onPurgeSelected, onClearAll, onSetActive,
  activeItem, onDownload
}) => {
  return (
    <section className="col-span-12 lg:col-span-5 flex flex-col gap-4 min-h-0 overflow-hidden">
      <div className="bg-white border border-[#D9DDE3] p-1 flex-grow-[3] flex flex-col min-h-0 shadow-sm">
        <div 
          role="button" tabIndex={0}
          className={`border border-dashed flex-1 flex flex-col items-center justify-center p-2 relative overflow-hidden cursor-pointer transition-colors min-h-[220px] ${dragActive ? 'border-[#2563EB] bg-blue-50' : 'border-[#CBD2D9] bg-[#F8FAFC]'}`}
          onClick={() => fileInputRef.current?.click()}
        >
          <input ref={fileInputRef} type="file" className="hidden" onChange={e => e.target.files && onFiles(e.target.files)} accept="image/*,.svg" multiple />
          {activeItem ? (
            <div className="w-full h-full relative group flex items-center justify-center p-2">
              <button onClick={(e) => { e.stopPropagation(); onRemove(activeItem.id); }} className="absolute top-1 left-1 bg-white/80 border border-[#1A1C1E] p-1 hover:bg-red-500 hover:text-white transition-all z-20"><X size={16} /></button>
              <img src={activeItem.previewUrl} alt="preview" className="max-w-full max-h-full object-contain mix-blend-multiply" />
              <div className="absolute bottom-1 right-1 flex flex-col items-end pointer-events-none text-right">
                <p className="bg-white/95 border border-[#1A1C1E] px-2 py-0.5 text-[8px] font-black uppercase truncate max-w-[150px] mb-0.5">{activeItem.file.name}</p>
                <p className="bg-white/95 border border-[#1A1C1E] px-2 py-0.5 text-[7px] font-mono uppercase text-[#6E767E] shadow-sm">{activeItem.format}</p>
              </div>
              {activeItem.status === 'completed' && <div className="absolute top-1 right-1 bg-green-500 text-white p-1 rounded-full"><CheckCircle2 size={16} strokeWidth={3} /></div>}
            </div>
          ) : (
            <div className="flex flex-col items-center text-center gap-3">
              <FileUp size={32} strokeWidth={1.5} className="text-[#6E767E]" />
              <div><p className="font-black uppercase text-[11px] tracking-widest text-[#1A1C1E]">Select Input Files</p><p className="text-[9px] font-mono text-[#6E767E] mt-1 italic uppercase tracking-tighter">Drag & drop or explorer (multi)</p></div>
            </div>
          )}
        </div>

        <div className="flex flex-col min-h-0 flex-grow-[2]">
          <div className="px-3 py-2 border-y border-[#D9DDE3] bg-[#F1F3F6] flex justify-between items-center sticky top-0 z-10 shrink-0">
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={batch.length > 0 && selectedIds.size === batch.length} onChange={onSelectAll} className="w-3 h-3 accent-[#1A1C1E]" />
              <span className="text-[9px] font-black uppercase tracking-widest">Queue Matrix [{batch.length}]</span>
            </div>
            {batch.length > 0 && (
              <div className="flex gap-4">
                {selectedIds.size > 0 && <button onClick={onPurgeSelected} className="text-[9px] font-black uppercase text-red-500 hover:underline">Remove Selected ({selectedIds.size})</button>}
                <button onClick={onClearAll} className="text-[9px] font-black uppercase text-[#6E767E] hover:text-red-500">Purge All</button>
              </div>
            )}
          </div>
          
          <div className="flex-1 overflow-y-auto bg-[#F8FAFC] custom-scrollbar">
            {batch.length === 0 ? <div className="h-full flex items-center justify-center opacity-20 p-8 grayscale"><Layers size={40} /></div> : (
              batch.map((item) => (
                <div key={item.id} onClick={() => onSetActive(item.id)} className={`group flex items-center gap-3 p-2.5 cursor-pointer border-b border-[#D9DDE3]/40 ${activeId === item.id ? 'bg-white border-l-4 border-l-[#1A1C1E] shadow-sm' : ''} ${selectedIds.has(item.id) ? 'bg-blue-50/50' : ''}`}>
                  <input type="checkbox" checked={selectedIds.has(item.id)} onChange={() => onSelect(item.id)} onClick={e => e.stopPropagation()} className="w-3 h-3 accent-[#1A1C1E]" />
                  <div className="w-10 h-10 bg-white border border-[#D9DDE3] relative shrink-0">
                    <img src={item.previewUrl} className="w-full h-full object-cover mix-blend-multiply p-0.5" alt="thumb" />
                    {item.status === 'processing' && <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div></div>}
                    {item.status === 'completed' && <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center"><CheckCircle2 size={14} strokeWidth={2.5} className="text-green-600" /></div>}
                  </div>
                  <div className="flex-grow min-w-0"><p className="text-[10px] font-black uppercase truncate leading-tight tracking-tight">{item.file.name}</p><p className="text-[8px] font-mono text-[#6E767E] mt-0.5">{UnitConverter.formatBytes(item.file.size)} &bull; {item.format.toUpperCase()}</p></div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {item.status === 'completed' && <button onClick={e => { e.stopPropagation(); onDownload(item); }} className="p-1.5 text-[#2563EB]"><FileDown size={14} /></button>}
                    <button onClick={e => { e.stopPropagation(); onRemove(item.id); }} className="p-1.5 text-red-500"><X size={14} /></button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="px-4 py-2.5 bg-[#F8FAFC] border-t border-[#D9DDE3] flex justify-between items-center font-mono shrink-0">
          <span className="text-[9px] font-bold uppercase text-[#6E767E]">Active Batch Size:</span>
          <span className="text-[11px] font-bold">{UnitConverter.formatBytes(batch.reduce((acc, curr) => acc + curr.file.size, 0))}</span>
        </div>
      </div>
      
      {activeItem && <TechnicalCard item={activeItem} />}
    </section>
  );
};

const TechnicalCard = ({ item }: { item: BatchItem }) => (
  <div className="bg-[#1A1C1E] text-white p-3 shadow-lg shrink-0">
    <div className="flex justify-between items-start mb-2">
      <h3 className="text-[8px] font-bold uppercase tracking-[0.3em] text-[#6E767E]">Technical Context</h3>
      <span className={`text-[8px] font-mono uppercase px-1.5 py-0.5 border ${item.status === 'completed' ? 'border-green-500 text-green-500' : item.status === 'processing' ? 'border-blue-400 text-blue-400' : 'border-[#6E767E] text-[#6E767E]'}`}>{item.status}</span>
    </div>
    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[9px] font-mono">
      <span className="text-[#6E767E]">MIME TYPE</span> <span className="uppercase truncate">{item.file.type || 'IMAGE/MIXED'}</span>
      <span className="text-[#6E767E]">STRATEGY</span> <span className="uppercase">{item.format === 'jpeg' ? 'MARKER INJECTION' : 'NULL PADDING'}</span>
    </div>
  </div>
);
