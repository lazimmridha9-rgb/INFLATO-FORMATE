import { useState, useRef, useCallback, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { ImageConverter } from '../services/ImageConverter';
import { ConversionQueueItem } from '../types/batch';
import { EXTENDED_FORMATS } from '../constants/formats';

export function useConverter() {
  const [queue, setQueue] = useState<ConversionQueueItem[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [activeId, setActiveId] = useState<string | null>(null);
  const [globalTargetFormat, setGlobalTargetFormat] = useState<string>('png');
  const [quality, setQuality] = useState<number>(100);
  const [dragActive, setDragActive] = useState(false);
  const [isConfirmingReset, setIsConfirmingReset] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('popular');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const activeItem = useMemo(() => 
    queue.find(item => item.id === activeId) || null
  , [queue, activeId]);

  const filteredFormats = useMemo(() => {
    return EXTENDED_FORMATS.filter(f => {
      const matchesSearch = f.label.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           f.value.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'all' || f.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const handleFiles = useCallback(async (files: FileList | File[]) => {
    const newItems: ConversionQueueItem[] = [];
    
    for (const file of Array.from(files)) {
      const id = Math.random().toString(36).substring(2, 9);
      const previewUrl = URL.createObjectURL(file);
      
      newItems.push({
        id,
        file,
        targetFormat: globalTargetFormat,
        status: 'idle',
        previewUrl
      });
    }

    setQueue(prev => {
      const next = [...prev, ...newItems];
      if (!activeId && next.length > 0) setActiveId(next[0].id);
      return next;
    });
  }, [globalTargetFormat, activeId]);

  const removeFile = useCallback((id: string) => {
    setQueue(prev => {
      const item = prev.find(i => i.id === id);
      if (item?.previewUrl) URL.revokeObjectURL(item.previewUrl);
      if (item?.result?.url) URL.revokeObjectURL(item.result.url);
      const next = prev.filter(i => i.id !== id);
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
    if (selectedIds.size === queue.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(queue.map(item => item.id)));
    }
  }, [selectedIds.size, queue]);

  const purgeSelected = useCallback(() => {
    if (selectedIds.size === 0) return;
    setQueue(prev => {
      const selectedItems = prev.filter(i => selectedIds.has(i.id));
      selectedItems.forEach(item => {
        if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
        if (item.result?.url) URL.revokeObjectURL(item.result.url);
      });
      const next = prev.filter(i => !selectedIds.has(i.id));
      if (activeId && selectedIds.has(activeId)) {
        setActiveId(next.length > 0 ? next[0].id : null);
      }
      return next;
    });
    setSelectedIds(new Set());
  }, [activeId, selectedIds]);

  const confirmReset = useCallback(() => {
    queue.forEach(item => {
      if (item.previewUrl) URL.revokeObjectURL(item.previewUrl);
      if (item.result?.url) URL.revokeObjectURL(item.result.url);
    });
    setQueue([]);
    setSelectedIds(new Set());
    setActiveId(null);
    setIsConfirmingReset(false);
  }, [queue]);

  const convertFile = useCallback(async (id: string) => {
    const item = queue.find(i => i.id === id);
    if (!item || item.status === 'converting') return;

    setQueue(prev => prev.map(i => i.id === id ? { ...i, status: 'converting' } : i));

    try {
      const result = await ImageConverter.convert(item.file, item.targetFormat, quality / 100);
      const resultUrl = URL.createObjectURL(result.blob);
      
      setQueue(prev => prev.map(i => i.id === id ? { 
        ...i, 
        status: 'completed', 
        result: {
          blob: result.blob,
          url: resultUrl,
          filename: result.filename
        }
      } : i));

      confetti({
        particleCount: 40,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3B82F6', '#10B981', '#F59E0B']
      });
    } catch (error) {
      setQueue(prev => prev.map(i => i.id === id ? { 
        ...i, 
        status: 'error', 
        error: error instanceof Error ? error.message : 'Conversion failed'
      } : i));
    }
  }, [queue, quality]);

  const convertAll = useCallback(async () => {
    const itemsToProcess = selectedIds.size > 0
      ? queue.filter(i => selectedIds.has(i.id) && (i.status === 'idle' || i.status === 'error'))
      : queue.filter(i => i.status === 'idle' || i.status === 'error');
      
    if (itemsToProcess.length === 0) return;
    
    setIsProcessing(true);
    for (const item of itemsToProcess) {
      await convertFile(item.id);
    }
    setIsProcessing(false);
  }, [selectedIds, queue, convertFile]);

  const downloadFile = useCallback((item: ConversionQueueItem) => {
    if (!item.result) return;
    const a = document.createElement('a');
    a.href = item.result.url;
    a.download = item.result.filename;
    a.click();
  }, []);

  const downloadAll = useCallback(() => {
    const itemsToDownload = selectedIds.size > 0
      ? queue.filter(i => selectedIds.has(i.id) && i.status === 'completed')
      : queue.filter(i => i.status === 'completed');
      
    itemsToDownload.forEach(downloadFile);
  }, [selectedIds, queue, downloadFile]);

  const updateItemTargetFormat = useCallback((format: string) => {
    setGlobalTargetFormat(format);
    if (selectedIds.size > 0) {
      setQueue(prev => prev.map(i => selectedIds.has(i.id) ? { ...i, targetFormat: format } : i));
    } else if (activeId) {
      setQueue(prev => prev.map(i => i.id === activeId ? { ...i, targetFormat: format } : i));
    }
  }, [selectedIds, activeId]);

  return {
    queue, setQueue,
    selectedIds, setSelectedIds,
    activeId, setActiveId,
    activeItem,
    globalTargetFormat, setGlobalTargetFormat,
    quality, setQuality,
    dragActive, setDragActive,
    isConfirmingReset, setIsConfirmingReset,
    isProcessing,
    searchQuery, setSearchQuery,
    activeCategory, setActiveCategory,
    filteredFormats,
    fileInputRef,
    handleFiles,
    removeFile,
    toggleSelect,
    toggleSelectAll,
    purgeSelected,
    confirmReset,
    convertFile,
    convertAll,
    downloadFile,
    downloadAll,
    updateItemTargetFormat
  };
}
