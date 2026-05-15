import { ImageFormat } from '../types/image';

export class FormatDetector {
  /**
   * Detects image format from file header magic bytes
   */
  static async detect(file: File): Promise<ImageFormat> {
    const buffer = await file.slice(0, 16).arrayBuffer();
    const arr = new Uint8Array(buffer);
    
    // JPEG: FF D8 FF
    if (arr[0] === 0xFF && arr[1] === 0xD8 && arr[2] === 0xFF) {
      return ImageFormat.JPEG;
    }

    // PNG: 89 50 4E 47 0D 0A 1A 0A
    if (arr[0] === 0x89 && arr[1] === 0x50 && arr[2] === 0x4E && arr[3] === 0x47) {
      return ImageFormat.PNG;
    }

    // GIF: 47 49 46 38
    if (arr[0] === 0x47 && arr[1] === 0x49 && arr[2] === 0x46 && (arr[3] === 0x38)) {
      return ImageFormat.GIF;
    }

    // WebP: RIFF .... WEBP
    if (arr[0] === 0x52 && arr[1] === 0x49 && arr[2] === 0x46 && arr[3] === 0x46) {
      const typeArr = new Uint8Array(await file.slice(8, 12).arrayBuffer());
      if (typeArr[0] === 0x57 && typeArr[1] === 0x45 && typeArr[2] === 0x42 && typeArr[3] === 0x50) {
        return ImageFormat.WEBP;
      }
    }

    // BMP: 42 4D
    if (arr[0] === 0x42 && arr[1] === 0x4D) {
      return ImageFormat.BMP;
    }

    // TIFF: 49 49 2A 00 or 4D 4D 00 2A
    if ((arr[0] === 0x49 && arr[1] === 0x49) || (arr[0] === 0x4D && arr[1] === 0x4D)) {
      return ImageFormat.TIFF;
    }

    // ICO: 00 00 01 00
    if (arr[0] === 0x00 && arr[1] === 0x00 && arr[2] === 0x01 && arr[3] === 0x00) {
      return ImageFormat.ICO;
    }

    // Fallback to extension for SVG (since it's text based)
    if (file.name.toLowerCase().endsWith('.svg') || file.type === 'image/svg+xml') {
      return ImageFormat.SVG;
    }

    // AVIF: check ftypavif
    const ftypBuffer = await file.slice(4, 12).arrayBuffer();
    const ftypArr = new Uint8Array(ftypBuffer);
    const ftyp = String.fromCharCode(...ftypArr);
    if (ftyp.includes('ftypavif')) {
      return ImageFormat.AVIF;
    }

    return ImageFormat.UNKNOWN;
  }
}
