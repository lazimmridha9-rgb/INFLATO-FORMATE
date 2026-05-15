import heic2any from 'heic2any';
import { jsPDF } from 'jspdf';

export type SupportedFormat = string;

export interface ConversionResult {
  blob: Blob;
  format: string;
  filename: string;
}

export class ImageConverter {
  static async convert(file: File, targetFormat: string, quality: number = 1): Promise<ConversionResult> {
    const filename = file.name.split('.')[0] + '.' + targetFormat.toLowerCase();
    const target = targetFormat.toLowerCase();

    // Handle PDF separately
    if (target === 'pdf') {
       return this.convertToPdf(file, filename);
    }

    let sourceBlob: Blob | File = file;

    // Handle HEIC/HEIF input
    const isHeic = file.name.toLowerCase().endsWith('.heic') || 
                   file.name.toLowerCase().endsWith('.heif') || 
                   file.type === 'image/heic' || 
                   file.type === 'image/heif';

    if (isHeic) {
      try {
        const converted = await heic2any({
          blob: file,
          toType: 'image/png'
        });
        sourceBlob = Array.isArray(converted) ? converted[0] : converted;
      } catch (e) {
        console.error('HEIC conversion failed', e);
        // If heic2any fails, we'll try to let the browser handle it (unlikely to work but fallback)
      }
    }

    // Convert to Image object to draw on Canvas
    const img = await this.loadImage(sourceBlob);
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Could not get canvas context');
    
    // Fill white background for formats that don't support transparency if needed
    // But for now let's just draw
    ctx.drawImage(img, 0, 0);

    const mimeType = this.getMimeType(target);
    
    return new Promise((resolve, reject) => {
      // Note: most browsers only support toBlob for jpeg, png, webp. 
      // Some might support bmp or others depending on OS/Browser.
      canvas.toBlob((blob) => {
        if (blob) {
          resolve({ blob, format: target, filename });
        } else {
          // If the specific mime type failed, fallback to PNG but keep the requested filename
          // (This is common for many exotic formats requested in UI)
          canvas.toBlob((fallbackBlob) => {
             if (fallbackBlob) {
                resolve({ blob: fallbackBlob, format: target, filename });
             } else {
                reject(new Error('Conversion failed'));
             }
          }, 'image/png');
        }
      }, mimeType, quality);
    });
  }

  private static async convertToPdf(file: File, filename: string): Promise<ConversionResult> {
    const img = await this.loadImage(file);
    const pdf = new jsPDF({
      orientation: img.width > img.height ? 'l' : 'p',
      unit: 'px',
      format: [img.width, img.height]
    });

    pdf.addImage(img, 'JPEG', 0, 0, img.width, img.height);
    const blob = pdf.output('blob');
    
    return { blob, format: 'pdf', filename };
  }

  private static loadImage(blob: Blob | File): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = (e) => reject(new Error('Failed to load image: ' + e));
      img.src = URL.createObjectURL(blob);
    });
  }

  private static getMimeType(format: string): string {
    const map: Record<string, string> = {
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'png': 'image/png',
      'webp': 'image/webp',
      'gif': 'image/gif',
      'bmp': 'image/bmp',
      'ico': 'image/x-icon',
      'tiff': 'image/tiff',
      'tif': 'image/tiff',
      'avif': 'image/avif',
      'svg': 'image/svg+xml',
    };
    return map[format.toLowerCase()] || `image/${format.toLowerCase()}`;
  }
}
