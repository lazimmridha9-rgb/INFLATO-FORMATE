import React from 'react';
import { X, FileUp, FileImage, Download, CheckCircle2 } from 'lucide-react';
import { ConversionQueueItem } from '../../../types/batch';

interface AssetPipelineProps {
  queue: ConversionQueueItem[];
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
  activeItem: ConversionQueueItem | null;
  setDragActive: (active: boolean) => void;
}

export const AssetPipeline: React.FC<AssetPipelineProps> = ({
  queue, activeId, selectedIds, dragActive, fileInputRef,
  onFiles, onRemove, onSelect, onSelectAll, onPurgeSelected, onClearAll, onSetActive,
  activeItem, setDragActive
}) => {
  return (
    <section className="col-span-12 lg:col-span-4 flex flex-col gap-4 min-h-0 overflow-hidden">
      <div className="bg-white border border-[#D9DDE3] p-1 flex-grow-[3] flex flex-col min-h-0 shadow-sm">
        <UploadZone 
          dragActive={dragActive}
          setDragActive={setDragActive}
          onFiles={onFiles}
          fileInputRef={fileInputRef}
          activeItem={activeItem}
          onRemove={onRemove}
        />

        <QueueList 
          queue={queue}
          activeId={activeId}
          selectedIds={selectedIds}
          onSelect={onSelect}
          onSelectAll={onSelectAll}
          onPurgeSelected={onPurgeSelected}
          onClearAll={onClearAll}
          onSetActive={onSetActive}
          onRemove={onRemove}
        />
      </div>

      {activeItem && <SpecCard item={activeItem} />}
    </section>
  );
};

const UploadZone = ({ dragActive, setDragActive, onFiles, fileInputRef, activeItem, onRemove }: any) => (
  <div 
    onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
    onDragLeave={() => setDragActive(false)}
    onDrop={(e) => { e.preventDefault(); setDragActive(false); onFiles(e.dataTransfer.files); }}
    role="button"
    tabIndex={0}
    className={`border border-dashed flex-1 flex flex-col items-center justify-center p-2 relative overflow-hidden cursor-pointer transition-colors min-h-[220px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-inset ${dragActive ? 'border-blue-600 bg-blue-50' : 'border-[#CBD2D9] bg-[#F8FAFC]'}`}
    onClick={() => fileInputRef.current?.click()}
  >
    <input ref={fileInputRef} type="file" multiple className="hidden" onChange={(e) => e.target.files && onFiles(e.target.files)} />
    {activeItem ? (
      <div className="w-full h-full relative group flex items-center justify-center p-2">
        <button onClick={(e) => { e.stopPropagation(); onRemove(activeItem.id); }} className="absolute top-1 left-1 bg-white/80 border border-[#1A1C1E] p-1 hover:bg-red-500 hover:text-white transition-all z-20"><X size={16} /></button>
        <img src={activeItem.previewUrl} alt="preview" className="max-w-full max-h-full object-contain" />
        <div className="absolute bottom-1 right-1 flex flex-col items-end pointer-events-none">
          <p className="bg-white/95 border border-[#1A1C1E] px-2 py-0.5 text-[8px] font-black uppercase truncate max-w-[150px] mb-0.5">{activeItem.file.name}</p>
          <p className="bg-white/95 border border-[#1A1C1E] px-2 py-0.5 text-[7px] font-mono uppercase text-[#6E767E]">{(activeItem.file.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
        {activeItem.status === 'completed' && <div className="absolute top-1 right-1 bg-green-500 text-white p-1 rounded-full"><CheckCircle2 size={16} strokeWidth={3} /></div>}
      </div>
    ) : (
      <div className="flex flex-col items-center gap-3 text-center">
        <FileUp size={32} strokeWidth={1.5} className="text-[#6E767E]" />
        <div><p className="font-black uppercase text-[11px] tracking-widest">Inject Assets</p><p className="text-[9px] font-mono text-[#6E767E] mt-1 italic">DROP FILES OR EXPLORER</p></div>
      </div>
    )}
  </div>
);

const QueueList = ({ queue, activeId, selectedIds, onSelect, onSelectAll, onPurgeSelected, onClearAll, onSetActive, onRemove }: any) => (
  <div className="flex flex-col min-h-0 flex-grow-[2]">
    <div className="px-3 py-2 border-y border-[#D9DDE3] bg-[#F1F3F6] flex justify-between items-center shrink-0">
      <div className="flex items-center gap-2">
        <input type="checkbox" checked={queue.length > 0 && selectedIds.size === queue.length} onChange={onSelectAll} className="w-3 h-3 accent-[#1A1C1E]" />
        <span className="text-[9px] font-black uppercase tracking-widest">Pipeline Stack [{queue.length}]</span>
      </div>
      {queue.length > 0 && (
        <div className="flex gap-4">
          {selectedIds.size > 0 && <button onClick={onPurgeSelected} className="text-[9px] font-black uppercase text-red-500 hover:underline">Remove Selected ({selectedIds.size})</button>}
          <button onClick={onClearAll} className="text-[9px] font-black uppercase text-[#6E767E] hover:text-red-500">Clear All</button>
        </div>
      )}
    </div>
    <div className="flex-1 overflow-y-auto bg-white custom-scrollbar">
      {queue.length === 0 ? <div className="h-full flex items-center justify-center opacity-20"><FileImage size={40} /></div> : (
        queue.map(item => (
          <div key={item.id} onClick={() => onSetActive(item.id)} className={`group flex items-center gap-3 p-2.5 cursor-pointer border-b border-[#D9DDE3]/40 ${activeId === item.id ? 'bg-[#F8FAFC] border-l-4 border-l-[#1A1C1E]' : ''} ${selectedIds.has(item.id) ? 'bg-blue-50/50' : ''}`}>
            <input type="checkbox" checked={selectedIds.has(item.id)} onChange={() => onSelect(item.id)} onClick={e => e.stopPropagation()} className="w-3 h-3 accent-[#1A1C1E]" />
            <div className="w-10 h-10 bg-white border border-[#D9DDE3] relative">
              <img src={item.previewUrl} className="w-full h-full object-cover p-0.5" alt="thumb" />
              {item.status === 'converting' && <div className="absolute inset-0 bg-black/40 flex items-center justify-center"><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div></div>}
              {item.status === 'completed' && <div className="absolute inset-0 bg-green-500/10 flex items-center justify-center"><CheckCircle2 size={14} strokeWidth={3} className="text-green-600" /></div>}
            </div>
            <div className="flex-grow min-w-0"><p className="text-[10px] font-black uppercase truncate leading-tight">{item.file.name}</p><p className="text-[8px] font-mono text-[#6E767E]">{(item.file.size / 1024).toFixed(1)} KB &bull; {item.targetFormat.toUpperCase()}</p></div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100"><X size={14} onClick={e => { e.stopPropagation(); onRemove(item.id); }} className="text-red-500" /></div>
          </div>
        ))
      )}
    </div>
  </div>
);

const SpecCard = ({ item }: { item: ConversionQueueItem }) => (
  <div className="bg-[#1A1C1E] text-white p-3 shadow-lg shrink-0 overflow-hidden">
    <div className="flex justify-between items-center mb-2">
      <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-[#6E767E]">SPECIFICATIONS</span>
      <span className="text-[8px] font-mono text-blue-400 bg-blue-400/10 px-1.5 py-0.5">{item.status.toUpperCase()}</span>
    </div>
    <div className="flex flex-wrap gap-x-6 gap-y-1 text-[9px] font-mono">
      <div className="flex gap-2"><span className="text-[#6E767E]">NAME:</span> <span className="truncate max-w-[150px]">{item.file.name}</span></div>
      <div className="flex gap-2"><span className="text-[#6E767E]">TARGET:</span> <span className="text-blue-400 font-bold">{item.targetFormat.toUpperCase()}</span></div>
    </div>
  </div>
);
