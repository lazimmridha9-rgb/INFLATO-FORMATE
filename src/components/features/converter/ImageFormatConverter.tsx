import React from 'react';
import { RefreshCw } from 'lucide-react';
import { useConverter } from '../../../hooks/useConverter';
import { EXTENDED_FORMATS, FORMAT_CATEGORIES } from '../../../constants/formats';
import { AppHeader } from '../../layout/AppHeader';
import { AppFooter } from '../../layout/AppFooter';
import { Modal } from '../../ui/Modal';
import { Button } from '../../ui/Button';
import { AssetPipeline } from './AssetPipeline';
import { TargetRegistry } from './TargetRegistry';
import { ExecutionPanel } from './ExecutionPanel';
import { ConverterResults } from './ConverterResults';

export default function ImageFormatConverter() {
  const c = useConverter();

  return (
    <div className="flex-1 flex flex-col max-w-[1600px] mx-auto w-full p-4 lg:p-6 overflow-hidden">
      <AppHeader 
        title="Format Lab" version="V3.0.0 // Mega Engine // 100+ Formats" 
        status="ULTRA_ACCURACY_ENABLED" icon={<RefreshCw size={24} />} 
        onReset={() => c.setIsConfirmingReset(true)}
      />

      <main className="grid grid-cols-12 gap-4 lg:gap-6 flex-1 min-h-0">
        <AssetPipeline 
          queue={c.queue} activeId={c.activeId} selectedIds={c.selectedIds}
          dragActive={c.dragActive} fileInputRef={c.fileInputRef}
          onFiles={c.handleFiles} onRemove={c.removeFile} 
          onSelect={c.toggleSelect} onSelectAll={c.toggleSelectAll}
          onPurgeSelected={c.purgeSelected} onClearAll={() => c.setQueue([])}
          onSetActive={c.setActiveId} activeItem={c.activeItem}
          setDragActive={c.setDragActive}
        />

        <TargetRegistry 
          formats={c.filteredFormats} categories={FORMAT_CATEGORIES}
          activeCategory={c.activeCategory} searchQuery={c.searchQuery}
          currentFormat={c.activeItem?.targetFormat || c.globalTargetFormat}
          onSearch={c.setSearchQuery} onCategory={c.setActiveCategory}
          onSelectFormat={c.updateItemTargetFormat}
        />

        <section className="col-span-12 lg:col-span-3 flex flex-col gap-4 min-h-0">
          <ExecutionPanel 
            quality={c.quality} onQualityChange={c.setQuality}
            onConvertAll={c.convertAll} onConvertOne={() => c.activeId && c.convertFile(c.activeId)}
            onDownloadAll={c.downloadAll} isProcessing={c.isProcessing}
            canConvert={c.queue.length > 0} 
            canDownload={c.queue.some(i => i.status === 'completed')}
            canConvertOne={!!c.activeId}
          />
          <ConverterResults activeItem={c.activeItem} onDownload={c.downloadFile} />
        </section>
      </main>

      <Modal 
        isOpen={c.isConfirmingReset} onClose={() => c.setIsConfirmingReset(false)}
        title="Confirm Purge" description="This will flush all assets from the pipeline stack. Continue?"
        footer={
          <>
            <Button variant="outline" className="flex-1" onClick={() => c.setIsConfirmingReset(false)}>No, Abort</Button>
            <Button variant="danger" className="flex-1" onClick={c.confirmReset}>Yes, Flush</Button>
          </>
        }
      >
        <div className="h-2" />
      </Modal>

      <AppFooter 
        engines={[
          { label: 'ENGINE_V2', value: 'LOADED' },
          { label: 'ACCURACY', value: '100%', color: 'bg-green-500' }
        ]} 
        tagline="Secured Deployment Protocol"
      />
    </div>
  );
}
