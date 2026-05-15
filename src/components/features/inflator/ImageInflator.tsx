import React from 'react';
import { Maximize2, Trash2, Download, FileDown } from 'lucide-react';
import { useInflator } from '../../../hooks/useInflator';
import { AppHeader } from '../../layout/AppHeader';
import { AppFooter } from '../../layout/AppFooter';
import { Modal } from '../../ui/Modal';
import { Button } from '../../ui/Button';
import { UploadQueue } from './UploadQueue';
import { ParameterMatrix } from './ParameterMatrix';
import { ComparisonBlock } from './ComparisonBlock';

export default function ImageInflator() {
  const i = useInflator();

  const completedCount = i.batch.filter(item => item.status === 'completed').length;
  const processedCount = i.batch.filter(item => item.status === 'completed' || item.status === 'processing').length;
  const totalWithResult = i.batch.filter(item => !!item.result).length;

  return (
    <div className="flex-1 flex flex-col max-w-[1600px] mx-auto w-full p-4 lg:p-6 overflow-hidden">
      <AppHeader 
        title="Inflator Pro" version="V1.0.4 // Client-Side Engine" 
        status="LOCAL_READY" statusColor="text-green-600" icon={<Maximize2 size={24} />} 
        onReset={() => i.setIsConfirmingReset(true)}
      />

      <main className="grid grid-cols-12 gap-4 lg:gap-6 flex-1 min-h-0">
        <UploadQueue 
          batch={i.batch} activeId={i.activeId} selectedIds={i.selectedIds}
          dragActive={i.dragActive} fileInputRef={i.fileInputRef}
          onFiles={i.processFilesSync} onRemove={i.removeFile}
          onSelect={i.toggleSelect} onSelectAll={i.toggleSelectAll}
          onPurgeSelected={i.purgeSelected} onClearAll={() => i.setBatch([])}
          onSetActive={i.setActiveId} activeItem={i.activeItem}
          onDownload={i.handleDownload}
        />

        <section className="col-span-12 lg:col-span-7 flex flex-col gap-4 min-h-0">
          <ParameterMatrix 
            batch={i.batch} targetValue={i.targetValue} targetUnit={i.targetUnit}
            isProcessing={i.isProcessing} isDownloading={i.isDownloading}
            downloadedCount={i.downloadedCount} 
            onValueChange={i.setTargetValue} onUnitChange={i.setTargetUnit}
            onInflateActive={i.handleIncrease} onProcessBatch={i.processBatch}
            canInflate={!!i.activeItem && !!i.targetValue}
            completedCount={completedCount} processedCount={processedCount}
            totalWithResult={totalWithResult}
          />
          
          <div className="bg-white border border-[#D9DDE3] flex-1 flex flex-col overflow-hidden shadow-sm min-h-0">
            <ComparisonBlock activeItem={i.activeItem} />

            {i.batch.some(item => item.status === 'completed') && (
              <div className="p-4 lg:p-6 flex flex-col sm:flex-row gap-4 bg-[#F1F3F6] border-t border-[#D9DDE3] shrink-0">
                {i.activeItem?.result && (
                  <Button variant="outline" size="xl" onClick={() => i.handleDownload(i.activeItem!)} className="flex-1" icon={<Download size={18} />}>
                    Save Active
                  </Button>
                )}
                <Button variant="primary" size="xl" onClick={i.downloadAll} disabled={i.isDownloading} className="flex-[1.5]" icon={!i.isDownloading && <FileDown size={18} />}>
                  {i.isDownloading ? 'Syncing...' : `Export Batch (${totalWithResult})`}
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Modal 
        isOpen={i.isConfirmingReset} onClose={() => i.setIsConfirmingReset(false)}
        title="Confirm Reset" description="Are you sure you want to proceed? This will clear all data."
        footer={
          <>
            <Button variant="outline" className="flex-1" onClick={() => i.setIsConfirmingReset(false)}>No, Cancel</Button>
            <Button variant="danger" className="flex-1" onClick={i.confirmReset}>Yes, Reset All</Button>
          </>
        }
      >
        <div className="bg-[#F8FAFC] border border-[#D9DDE3] rounded-md p-4">
          <p className="text-[11px] font-bold text-[#1A1C1E] mb-2">This action will clear all uploaded files and processed results.</p>
        </div>
      </Modal>

      <AppFooter 
        engines={[
          { label: 'ENGINE', value: 'STABLE' },
          { label: 'VOL_READY', value: i.batch.length > 0 ? 'TRUE' : 'WAITING' },
          { label: 'STORAGE_OK', value: 'TRUE', color: 'bg-green-500' }
        ]} 
        tagline="Ready for high-volume allocation"
      />
    </div>
  );
}
