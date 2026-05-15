export enum ImageFormat {
  JPEG = 'jpeg',
  PNG = 'png',
  GIF = 'gif',
  SVG = 'svg',
  WEBP = 'webp',
  BMP = 'bmp',
  TIFF = 'tiff',
  AVIF = 'avif',
  ICO = 'ico',
  UNKNOWN = 'unknown'
}

export type FileSizeUnit = 'B' | 'KB' | 'MB' | 'GB';

export interface ProcessedImage {
  blob: Blob;
  name: string;
  originalSize: number;
  newSize: number;
  format: ImageFormat;
  previewUrl: string;
}
