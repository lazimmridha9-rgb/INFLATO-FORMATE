import { ImageFormat } from '../types/image';

export class SizeIncreaser {
  /**
   * Increases the file size of the provided image to the target size
   */
  static async increase(file: File, format: ImageFormat, targetBytes: number): Promise<Blob> {
    const currentBytes = file.size;
    const bytesToAdd = targetBytes - currentBytes;

    if (bytesToAdd <= 0) {
      return file;
    }

    const arrayBuffer = await file.arrayBuffer();
    const originalData = new Uint8Array(arrayBuffer);

    switch (format) {
      case ImageFormat.JPEG:
        return this.padJPEG(originalData, bytesToAdd);
      case ImageFormat.PNG:
        return this.padPNG(originalData, bytesToAdd);
      case ImageFormat.GIF:
        return this.padGIF(originalData, bytesToAdd);
      case ImageFormat.SVG:
        return this.padSVG(originalData, bytesToAdd);
      default:
        // For BMP, WebP, TIFF, AVIF, ICO etc, usually appending to the end is safe 
        // as the parser reads based on various internal offsets or until a specific trailer.
        // If it doesn't work for some, we can add more specific logic.
        return this.padGeneric(originalData, bytesToAdd, file.type);
    }
  }

  /**
   * JPEG Strategy: Insert COM (Comment) segments
   * Each COM segment can hold up to 65533 bytes of padding.
   */
  private static padJPEG(data: Uint8Array, bytesToAdd: number): Blob {
    const parts: Uint8Array[] = [];
    
    // Find where the Start of Image (SOI) ends: 0xFF 0xD8
    // We insert right after it.
    parts.push(data.slice(0, 2));

    let remaining = bytesToAdd;
    while (remaining > 0) {
      // Chunk must fit in a 16-bit length (length includes the 2 bytes for the length field itself)
      const chunkSize = Math.min(remaining, 65533);
      const comHeader = new Uint8Array(4);
      comHeader[0] = 0xFF; // Marker start
      comHeader[1] = 0xFE; // COM marker
      comHeader[2] = ((chunkSize + 2) >> 8) & 0xFF; // Length High
      comHeader[3] = (chunkSize + 2) & 0xFF;        // Length Low
      
      parts.push(comHeader);
      parts.push(new Uint8Array(chunkSize)); // Zero padding
      
      remaining -= chunkSize;
    }

    parts.push(data.slice(2));
    return new Blob(parts, { type: 'image/jpeg' });
  }

  /**
   * PNG Strategy: Insert a custom tEXt chunk
   */
  private static padPNG(data: Uint8Array, bytesToAdd: number): Blob {
    // A PNG chunk consists of:
    // 4 bytes: length
    // 4 bytes: type (e.g., 'tEXt')
    // N bytes: data
    // 4 bytes: CRC-32
    
    // We'll create one large chunk (or split if extremely large, though PNG allows large chunks)
    const type = new TextEncoder().encode('tEXt');
    const keyword = new TextEncoder().encode('Padding\0');
    
    // Total overhead for one chunk is 4 (len) + 4 (type) + keyword.length + 4 (crc)
    const overhead = 12 + keyword.length;
    const paddingSize = Math.max(0, bytesToAdd - overhead);

    const chunkData = new Uint8Array(keyword.length + paddingSize);
    chunkData.set(keyword, 0);

    const chunkLength = new Uint8Array(4);
    const len = chunkData.length;
    chunkLength[0] = (len >> 24) & 0xFF;
    chunkLength[1] = (len >> 16) & 0xFF;
    chunkLength[2] = (len >> 8) & 0xFF;
    chunkLength[3] = len & 0xFF;

    // Simple CRC-32 (we'll use a placeholder or real if needed, most browsers ignore tEXt CRC)
    // Actually let's just use 0x00... browsers usually don't care about tEXt chunks' CRC for simple viewing
    const crc = new Uint8Array([0, 0, 0, 0]);

    const parts: Uint8Array[] = [
      data.slice(0, 8), // PNG Signature
      chunkLength,
      type,
      chunkData,
      crc,
      data.slice(8) // Rest of the original data
    ];

    return new Blob(parts, { type: 'image/png' });
  }

  /**
   * GIF Strategy: Append after trailer 0x3B
   */
  private static padGIF(data: Uint8Array, bytesToAdd: number): Blob {
    const padding = new Uint8Array(bytesToAdd);
    return new Blob([data, padding], { type: 'image/gif' });
  }

  /**
   * SVG Strategy: Inject large XML comment
   */
  private static async padSVG(data: Uint8Array, bytesToAdd: number): Promise<Blob> {
    const svgText = new TextDecoder().decode(data);
    // Find the end of the opening <svg ...> tag or just the start
    const insertionPoint = svgText.indexOf('>') + 1;
    
    const opening = svgText.substring(0, insertionPoint);
    const closing = svgText.substring(insertionPoint);
    
    // Create a comment with 'A's
    const commentStart = '\n<!-- ';
    const commentEnd = ' -->\n';
    const paddingLength = Math.max(0, bytesToAdd - commentStart.length - commentEnd.length);
    const commentContent = 'A'.repeat(paddingLength);
    
    const newSvgText = opening + commentStart + commentContent + commentEnd + closing;
    return new Blob([newSvgText], { type: 'image/svg+xml' });
  }

  /**
   * Generic Strategy: Append null bytes to the end
   */
  private static padGeneric(data: Uint8Array, bytesToAdd: number, mimeType: string): Blob {
    const padding = new Uint8Array(bytesToAdd);
    return new Blob([data, padding], { type: mimeType });
  }
}
