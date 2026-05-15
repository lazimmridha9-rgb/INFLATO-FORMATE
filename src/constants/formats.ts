export interface FormatOption {
  label: string;
  value: string;
  color: string;
  category: string;
}

export const FORMAT_CATEGORIES = [
  { id: 'popular', name: 'Popular' },
  { id: 'web', name: 'Browser Support' },
  { id: 'professional', name: 'Professional' },
  { id: 'raw', name: 'Camera RAW' },
  { id: 'vector', name: 'Vector' },
  { id: 'specialized', name: 'Specialized / 3D' },
  { id: 'legacy', name: 'Legacy' },
];

export const ALL_FORMATS: FormatOption[] = [
  // Popular
  { label: 'PNG', value: 'png', color: 'bg-blue-500', category: 'popular' },
  { label: 'JPG', value: 'jpg', color: 'bg-orange-500', category: 'popular' },
  { label: 'JPEG', value: 'jpeg', color: 'bg-orange-600', category: 'popular' },
  { label: 'WEBP', value: 'webp', color: 'bg-teal-500', category: 'popular' },
  { label: 'PDF', value: 'pdf', color: 'bg-red-500', category: 'popular' },
  { label: 'AVIF', value: 'avif', color: 'bg-purple-500', category: 'popular' },
  { label: 'HEIC', value: 'heic', color: 'bg-indigo-500', category: 'popular' },
  { label: 'GIF', value: 'gif', color: 'bg-pink-500', category: 'popular' },
  
  // Web
  { label: 'SVG', value: 'svg', color: 'bg-yellow-500', category: 'web' },
  { label: 'ICO', value: 'ico', color: 'bg-slate-500', category: 'web' },
  { label: 'BMP', value: 'bmp', color: 'bg-blue-300', category: 'web' },
  { label: 'APNG', value: 'apng', color: 'bg-pink-400', category: 'web' },
  
  // Professional
  { label: 'TIFF', value: 'tiff', color: 'bg-cyan-600', category: 'professional' },
  { label: 'PSD', value: 'psd', color: 'bg-blue-800', category: 'professional' },
  { label: 'PSB', value: 'psb', color: 'bg-blue-900', category: 'professional' },
  { label: 'TGA', value: 'tga', color: 'bg-stone-500', category: 'professional' },
  { label: 'JXL', value: 'jxl', color: 'bg-emerald-500', category: 'professional' },
  { label: 'EXR', value: 'exr', color: 'bg-violet-700', category: 'professional' },
  { label: 'HDR', value: 'hdr', color: 'bg-amber-600', category: 'professional' },
  { label: 'JP2', value: 'jp2', color: 'bg-green-700', category: 'professional' },
  { label: 'KRA', value: 'kra', color: 'bg-blue-400', category: 'professional' },
  { label: 'ORA', value: 'ora', color: 'bg-orange-400', category: 'professional' },
  { label: 'XCF', value: 'xcf', category: 'professional', color: 'bg-gray-600' },

  // RAW
  { label: 'RAW', value: 'raw', category: 'raw', color: 'bg-gray-700' },
  { label: 'DNG', value: 'dng', category: 'raw', color: 'bg-gray-800' },
  { label: 'CR2', value: 'cr2', category: 'raw', color: 'bg-gray-800' },
  { label: 'CR3', value: 'cr3', category: 'raw', color: 'bg-gray-800' },
  { label: 'NEF', value: 'nef', category: 'raw', color: 'bg-gray-800' },
  { label: 'ARW', value: 'arw', category: 'raw', color: 'bg-gray-800' },
  { label: 'RAF', value: 'raf', category: 'raw', color: 'bg-gray-800' },
  { label: 'ORF', value: 'orf', category: 'raw', color: 'bg-gray-800' },
  { label: 'RW2', value: 'rw2', category: 'raw', color: 'bg-gray-800' },
  
  // Vector
  { label: 'AI', value: 'ai', category: 'vector', color: 'bg-orange-700' },
  { label: 'EPS', value: 'eps', category: 'vector', color: 'bg-blue-700' },
  { label: 'CDR', value: 'cdr', category: 'vector', color: 'bg-green-600' },
  { label: 'DXF', value: 'dxf', category: 'vector', color: 'bg-gray-500' },

  // Specialized / 3D
  { label: 'DDS', value: 'dds', category: 'specialized', color: 'bg-purple-600' },
  { label: 'KTX', value: 'ktx', category: 'specialized', color: 'bg-purple-700' },
  { label: 'DICOM', value: 'dicom', category: 'specialized', color: 'bg-red-800' },
  { label: 'FITS', value: 'fits', category: 'specialized', color: 'bg-blue-950' },

  // Add a bunch of legacy/others to satisfy the "huge list"
  { label: 'JFIF', value: 'jfif', category: 'legacy', color: 'bg-gray-400' },
  { label: 'PPM', value: 'ppm', category: 'legacy', color: 'bg-gray-400' },
  { label: 'PGM', value: 'pgm', category: 'legacy', color: 'bg-gray-400' },
  { label: 'PBM', value: 'pbm', category: 'legacy', color: 'bg-gray-400' },
  { label: 'PAM', value: 'pam', category: 'legacy', color: 'bg-gray-400' },
  { label: 'PCX', value: 'pcx', category: 'legacy', color: 'bg-gray-400' },
  { label: 'DCX', value: 'dcx', category: 'legacy', color: 'bg-gray-400' },
  { label: 'SGI', value: 'sgi', category: 'legacy', color: 'bg-gray-400' },
  { label: 'RAS', value: 'ras', category: 'legacy', color: 'bg-gray-400' },
  { label: 'SUN', value: 'sun', category: 'legacy', color: 'bg-gray-400' },
  { label: 'XBM', value: 'xbm', category: 'legacy', color: 'bg-gray-400' },
  { label: 'XPM', value: 'xpm', category: 'legacy', color: 'bg-gray-400' },
  { label: 'WBMP', value: 'wbmp', category: 'legacy', color: 'bg-gray-400' },
];

// Combine the rest from the user's list dynamically if not already present
const userList = [
'JPG', 'JPEG', 'JPE', 'JFIF', 'PNG', 'GIF', 'BMP', 'DIB', 'RLE', 'TIFF', 'TIF', 'WEBP', 'AVIF', 'HEIF', 'HEIC', 'ICO', 'CUR', 'ICNS', 'TGA', 'TPIC', 'PCX', 'DCX', 'DDS', 'EXR', 'HDR', 'CIN', 'DPX', 'JP2', 'J2K', 'JPF', 'JPM', 'JPX', 'MJ2', 'JXR', 'HDP', 'WDP', 'BPG', 'FLIF', 'QOI', 'FARBFELD', 'PNM', 'PBM', 'PGM', 'PPM', 'PAM', 'WBMP', 'XBM', 'XPM', 'SGI', 'RGB', 'RGBA', 'BW', 'IFF', 'ILBM', 'LBM', 'IMG', 'PIX', 'SUN', 'RAS', 'FITS', 'FTS', 'PICT', 'PIC', 'MAC', 'CAL', 'CGM', 'SCT', 'PSP', 'KRA', 'ORA', 'XCF', 'PSD', 'PSB', 'CPT', 'PDN', 'SAI', 'CLIP', 'ACBM', 'AMI', 'APPLE', 'ART', 'BLP', 'BRK', 'CE', 'CIT', 'CMYK', 'CONT', 'CUT', 'DCM', 'DICOM', 'DJVU', 'ECW', 'EMF', 'EPSI', 'EPT', 'FAX', 'GBR', 'GIH', 'GROB', 'HRZ', 'ICB', 'JNG', 'KAP', 'MAT', 'MNG', 'MSP', 'PAT', 'PALM', 'PCD', 'PCT', 'PDB', 'PFM', 'PGF', 'PI1', 'PI2', 'PI3', 'PICON', 'PIXAR', 'PJPEG', 'PLASMA', 'PTIF', 'RLA', 'RPF', 'SFW', 'SID', 'SIX', 'STF', 'TEX', 'VDA', 'VST', 'VICAR', 'VIFF', 'WBM', 'WMF', 'YUV'
];

export const EXTENDED_FORMATS: FormatOption[] = [
  ...ALL_FORMATS,
  ...userList
    .filter(f => !ALL_FORMATS.some(exist => exist.value === f.toLowerCase()))
    .map(f => ({
       label: f.toUpperCase(),
       value: f.toLowerCase(),
       color: 'bg-gray-300',
       category: 'legacy'
    }))
];
