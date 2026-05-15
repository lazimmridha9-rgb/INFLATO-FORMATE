import { useState, useRef, useCallback, useMemo } from 'react';
import { ImageFormat, FileSizeUnit, ProcessedImage } from '../types/image';
import { BatchItem } from '../types/batch';
import { UnitConverter } from '../services/UnitConverter';
import { FormatDetector } from '../services/FormatDetector';
import { SizeIncreaser } from '../services/SizeIncreaser';
import { FileHandler } from '../services/FileHandler';

export function useInflator() {
  const [batch, setBatch] = useState<BatchItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [activeId, setActiveId] = useState<string | null>(null);
  const [targetValue, setTargetValue] = useState<string>('');
  const [targetUnit, setTargetUnit] = useState<FileSizeUnit>('MB');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadedCount, setDownloadedCount] = useState(0);
  const [globalError, setGlobalError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [isConfirmingReset, setIsConfirmingReset] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeItem = useMemo(() => 
    batch.find(item => item.id === activeId) || null
  , [batch, activeId]);

  const confirmReset = useCallback(() => {
    setBatch([]);
    setSelectedIds(new Set());
    setActiveId(null);
    setTargetValue('');
    setGlobalError(null);
    setIsConfirmingReset(false);
  }, []);

  const removeFile = useCallback((id: string) => {
    setBatch(prev => {
      const next = prev.filter(item => item.id !== id);
      if (activeId === id) {
        setActiveId(next.length > 0 ? next[0].id : null);
      }
      return next;
    });
    setSelectedIds(prev => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, [activeId]);

  const toggleSelect = useCallback((id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const toggleSelectAll = useCallback(() => {
    if (selectedIds.size === batch.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(batch.map(item => item.id)));
    }
  }, [selectedIds.size, batch]);

  const purgeSelected = useCallback(() => {
    if (selectedIds.size === 0) return;
    setBatch(prev => {
      const next = prev.filter(item => !selectedIds.has(item.id));
      if (activeId && selectedIds.has(activeId)) {
        setActiveId(next.length > 0 ? next[0].id : null);
      }
      return next;
    });
    setSelectedIds(new Set());
  }, [activeId, selectedIds]);

  const processFilesSync = useCallback(async (selectedFiles: FileList | File[]) => {
    const filesArray = Array.from(selectedFiles);
    const newItems: BatchItem[] = [];
    setGlobalError(null);

    for (const file of filesArray) {
       if (!file.type.startsWith('image/') && !file.name.toLowerCase().endsWith('.svg')) {
          setGlobalError('Some files were skipped due to unsupported type.');
          continue;
       }

       try {
         const detectedFormat = await FormatDetector.detect(file);
         const url = await FileHandler.readFileAsDataURL(file);
         
         const newItem: BatchItem = {
           id: Math.random().toString(36).substr(2, 9),
           file,
           format: detectedFormat,
           previewUrl: url,
           status: 'pending'
         };
         newItems.push(newItem);
       } catch (err) {
         console.error(err);
         setGlobalError('Failed to read some files.');
       }
    }

    if (newItems.length > 0) {
      setBatch(prev => {
        const next = [...prev, ...newItems];
        if (!activeId) setActiveId(newItems[0].id);
        return next;
      });
    }
  }, [activeId]);

  const inflateItem = useCallback(async (item: BatchItem, targetBytes: number) => {
    if (targetBytes <= item.file.size) return { error: `Target size must be larger than current size` };

    try {
      const newBlob = await SizeIncreaser.increase(item.file, item.format, targetBytes);
      const result: ProcessedImage = {
        blob: newBlob,
        format: item.format,
        name: item.file.name,
        originalSize: item.file.size,
        newSize: newBlob.size,
        previewUrl: item.previewUrl
      };
      return { result };
    } catch (err) {
      console.error(err);
      return { error: 'Error processing image.' };
    }
  }, []);

  const handleIncrease = useCallback(async () => {
    if (!activeItem || !targetValue) return;

    const targetBytes = UnitConverter.toBytes(parseFloat(targetValue), targetUnit);
    
    if (isNaN(targetBytes)) {
      setGlobalError('Please enter a valid target size.');
      return;
    }

    if (targetBytes <= activeItem.file.size) {
      setGlobalError(`Target size must be larger than current size (${UnitConverter.formatBytes(activeItem.file.size)})`);
      return;
    }

    setIsProcessing(true);
    setGlobalError(null);

    setBatch(prev => prev.map(item => item.id === activeItem.id ? { ...item, status: 'processing', error: undefined } : item));

    try {
      await new Promise(r => setTimeout(r, 600));
      const { result, error } = await inflateItem(activeItem, targetBytes);
      
      setBatch(prev => prev.map(item => item.id === activeItem.id ? { 
        ...item, 
        status: result ? 'completed' : 'error', 
        result, 
        error 
      } : item));

    } catch (err) {
      setGlobalError('Unexpected processing error.');
    } finally {
      setIsProcessing(false);
    }
  }, [activeItem, targetValue, targetUnit, inflateItem]);

  const processBatch = useCallback(async () => {
    if (batch.length === 0 || !targetValue) return;
    
    const targetBytes = UnitConverter.toBytes(parseFloat(targetValue), targetUnit);
    if (isNaN(targetBytes)) {
      setGlobalError('Please enter a valid target size.');
      return;
    }

    const itemsToProcess = selectedIds.size > 0 
      ? batch.filter(item => selectedIds.has(item.id))
      : batch;

    setIsProcessing(true);
    setGlobalError(null);

    for (const item of itemsToProcess) {
      if (item.status === 'completed') continue;
      
      setBatch(prev => prev.map(i => i.id === item.id ? { ...i, status: 'processing' } : i));
      
      const { result, error } = await inflateItem(item, targetBytes);
      
      setBatch(prev => prev.map(i => i.id === item.id ? { 
        ...i, 
        status: result ? 'completed' : 'error', 
        result, 
        error 
      } : i));
      
      await new Promise(r => setTimeout(r, 200));
    }
    
    setIsProcessing(false);
  }, [batch, targetValue, targetUnit, selectedIds, inflateItem]);

  const handleDownload = useCallback((item: BatchItem) => {
    if (item.result) {
      FileHandler.downloadBlob(item.result.blob, `inflated_${item.result.name}`);
    }
  }, []);

  const downloadAll = useCallback(async () => {
    const itemsToDownload = selectedIds.size > 0
      ? batch.filter(item => selectedIds.has(item.id) && !!item.result)
      : batch.filter(item => !!item.result);
      
    if (itemsToDownload.length === 0) return;

    setIsDownloading(true);
    setDownloadedCount(0);

    for (let i = 0; i < itemsToDownload.length; i++) {
      handleDownload(itemsToDownload[i]);
      setDownloadedCount(i + 1);
      await new Promise(r => setTimeout(r, 300));
    }

    await new Promise(r => setTimeout(r, 1000));
    setIsDownloading(false);
    setDownloadedCount(0);
  }, [batch, selectedIds, handleDownload]);

  return {
    batch, setBatch,
    selectedIds, setSelectedIds,
    activeId, setActiveId,
    activeItem,
    targetValue, setTargetValue,
    targetUnit, setTargetUnit,
    isProcessing,
    isDownloading,
    downloadedCount,
    globalError, setGlobalError,
    dragActive, setDragActive,
    isConfirmingReset, setIsConfirmingReset,
    fileInputRef,
    confirmReset,
    removeFile,
    toggleSelect,
    toggleSelectAll,
    purgeSelected,
    processFilesSync,
    handleIncrease,
    processBatch,
    handleDownload,
    downloadAll
  };
}
