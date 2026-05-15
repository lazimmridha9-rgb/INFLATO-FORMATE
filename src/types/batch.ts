import { ImageFormat, ProcessedImage } from './image';

export interface BatchItem {
  id: string;
  file: File;
  format: ImageFormat;
  previewUrl: string;
  status: 'pending' | 'processing' | 'completed' | 'error';
  targetSize?: number;
  result?: ProcessedImage;
  error?: string;
}

export interface ConversionQueueItem {
  id: string;
  file: File;
  targetFormat: string;
  status: 'idle' | 'converting' | 'completed' | 'error';
  result?: {
    blob: Blob;
    url: string;
    filename: string;
  };
  error?: string;
  previewUrl: string;
}
