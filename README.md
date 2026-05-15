<div align="center">

# 🚀 INFLATO-FORMATE

### _The Ultimate Image Size Increaser & Format Converter_

**Inflate file sizes to any target** • **Convert between 100+ formats** • **100% Client-Side**

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Motion-12-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

</div>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Architecture](#-architecture)
- [Supported Formats](#-supported-formats)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Tech Stack](#-tech-stack)
- [API Reference](#-api-reference)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**INFLATO-FORMATE** is a powerful, dual-engine image processing application built entirely for the browser. No server uploads, no privacy concerns — your images never leave your device.

It combines two professional-grade tools into one seamless interface:

| Module | Engine | Purpose |
|:---|:---|:---|
| **Inflator Pro** `V1.0.4` | Client-Side Engine | Increase image file size to any target (B, KB, MB, GB) |
| **Format Lab** `V3.0.0` | Mega Engine | Convert images between 100+ formats with precision |

---

## ✨ Features

### 🔧 Inflator Pro — Image Size Increaser

- **Precise Target Sizing** — Set exact file size in Bytes, Kilobytes, Megabytes, or Gigabytes
- **Format-Aware Padding** — Uses intelligent strategies per format:
  - `JPEG` → Inserts COM (Comment) segments
  - `PNG` → Injects custom tEXt chunks
  - `GIF` → Appends after trailer marker
  - `SVG` → Embeds large XML comments
  - `Generic` → Safe null-byte appending
- **Batch Processing** — Inflate multiple images simultaneously
- **Before/After Comparison** — Visual side-by-side preview
- **Smart Validation** — Prevents downsizing; ensures target > original
- **Bulk Export** — Download all processed files in one click

### 🔄 Format Lab — Image Format Converter

- **100+ Supported Formats** — From PNG/JPG to RAW, vector, professional, and legacy formats
- **Categorized Format Browser** — Organized by Popular, Web, Professional, Camera RAW, Vector, Specialized/3D, and Legacy
- **Search & Filter** — Instantly find any format
- **Quality Control** — Adjustable output quality (0–100%)
- **HEIC/HEIF Support** — Automatic conversion via `heic2any`
- **PDF Export** — Convert images to PDF with proper orientation
- **Per-File Format Selection** — Set different target formats per image
- **Confetti Celebration** — Visual feedback on successful conversion 🎉

### 🎨 UI/UX

- **Modern Dark Sidebar** — Sleek navigation with animated indicators
- **Drag & Drop** — Intuitive file upload
- **Responsive Design** — Works on desktop and tablet
- **Smooth Animations** — Powered by Framer Motion
- **Confirmation Modals** — Prevents accidental data loss
- **Status Indicators** — Real-time engine and processing status

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                       INFLATO-FORMATE                       │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  ┌──────────────────┐         ┌──────────────────┐          │
│  │   Inflator Pro   │         │   Format Lab     │          │
│  │   V1.0.4         │◄───────►│   V3.0.0         │          │
│  │  Size Increaser  │  Mode   │  Format Converter│          │
│  └────────┬─────────┘  Switch └────────┬─────────┘          │
│           │                            │                    │
│  ┌────────▼─────────┐         ┌────────▼─────────┐          │
│  │  useInflator()   │         │  useConverter()  │          │
│  │    (Hook)        │         │     (Hook)       │          │
│  └────────┬─────────┘         └────────┬─────────┘          │
│           │                            │                    │
│  ┌────────▼────────────────────────────▼─────────┐          │
│  │              Service Layer                     │          │
│  ├────────────────────────────────────────────────┤          │
│  │  • SizeIncreaser    • ImageConverter           │          │
│  │  • FormatDetector   • FileHandler              │          │
│  │  • UnitConverter                               │          │
│  └────────────────────────────────────────────────┘          │
│                                                             │
│                    100% Client-Side                         │
│              No Server • No Uploads                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 📋 Supported Formats

### Popular
`PNG` `JPG` `JPEG` `WEBP` `PDF` `AVIF` `HEIC` `GIF`

### Browser Support
`SVG` `ICO` `BMP` `APNG`

### Professional
`TIFF` `PSD` `PSB` `TGA` `JXL` `EXR` `HDR` `JP2` `KRA` `ORA` `XCF`

### Camera RAW
`RAW` `DNG` `CR2` `CR3` `NEF` `ARW` `RAF` `ORF` `RW2`

### Vector
`AI` `EPS` `CDR` `DXF`

### Specialized / 3D
`DDS` `KTX` `DICOM` `FITS`

### Legacy (50+ formats)
`JFIF` `PPM` `PGM` `PBM` `PAM` `PCX` `DCX` `SGI` `RAS` `SUN` `XBM` `XPM` `WBMP` `TIF` `DIB` `RLE` `HEIF` `CUR` `ICNS` `TPIC` `J2K` `JPF` `JPM` `JPX` `MJ2` `JXR` `HDP` `WDP` `BPG` `FLIF` `QOI` `FARBFELD` `PNM` `IFF` `ILBM` `LBM` `IMG` `PIX` `PICT` `PIC` `MAC` `CAL` `CGM` `SCT` `PSP` `CPT` `PDN` `SAI` `CLIP` `ACBM` `AMI` `ART` `BLP` `BRK` `CE` `CIT` `CMYK` `CUT` `DCM` `DJVU` `ECW` `EMF` `EPSI` `EPT` `FAX` `GBR` `GIH` `GROB` `HRZ` `ICB` `JNG` `KAP` `MAT` `MNG` `MSP` `PAT` `PALM` `PCD` `PCT` `PDB` `PFM` `PGF` `PI1` `PI2` `PI3` `PICON` `PIXAR` `PJPEG` `PLASMA` `PTIF` `RLA` `RPF` `SFW` `SID` `SIX` `STF` `TEX` `VDA` `VST` `VICAR` `VIFF` `WBM` `WMF` `YUV` `JPE` `RGB` `RGBA` `BW`

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** / **yarn** / **pnpm**

### Installation

```bash
# Clone the repository
git clone https://github.com/lazimmridha9-rgb/INFLATO-FORMATE.git

# Navigate to project directory
cd "INFLATO-FORMATE"

# Install dependencies
npm install

# Start the development server
npm run dev
```

The app will be available at `http://localhost:3000`

### Available Scripts

| Command | Description |
|:---|:---|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run TypeScript type checking |
| `npm run clean` | Remove build artifacts |

### Quick Start (Windows)

```cmd
start_local.cmd
```

---

## 📁 Project Structure

```
INFLATO-FORMATE/
├── src/
│   ├── components/
│   │   ├── features/
│   │   │   ├── inflator/
│   │   │   │   ├── ImageInflator.tsx      # Main inflator component
│   │   │   │   ├── UploadQueue.tsx         # File upload & queue management
│   │   │   │   ├── ParameterMatrix.tsx     # Target size & unit controls
│   │   │   │   └── ComparisonBlock.tsx     # Before/after comparison
│   │   │   └── converter/
│   │   │       ├── ImageFormatConverter.tsx # Main converter component
│   │   │       ├── AssetPipeline.tsx       # File queue for conversion
│   │   │       ├── TargetRegistry.tsx      # Format selection panel
│   │   │       ├── ExecutionPanel.tsx      # Quality & convert controls
│   │   │       └── ConverterResults.tsx    # Results display
│   │   ├── layout/
│   │   │   ├── Navigation.tsx              # Main sidebar navigation
│   │   │   ├── AppHeader.tsx               # Top header bar
│   │   │   └── AppFooter.tsx               # Status footer
│   │   └── ui/
│   │       ├── Button.tsx                  # Reusable button component
│   │       ├── Modal.tsx                   # Confirmation dialogs
│   │       ├── ProgressBar.tsx             # Progress indicators
│   │       └── SectionHeader.tsx           # Section headers
│   ├── hooks/
│   │   ├── useInflator.ts                  # Inflator state & logic
│   │   └── useConverter.ts                 # Converter state & logic
│   ├── services/
│   │   ├── SizeIncreaser.ts                # Format-specific size padding
│   │   ├── ImageConverter.ts               # Canvas-based format conversion
│   │   ├── FormatDetector.ts               # Automatic format detection
│   │   ├── FileHandler.ts                  # File I/O operations
│   │   ├── UnitConverter.ts                # B/KB/MB/GB conversions
│   │   └── index.ts                        # Service exports
│   ├── types/
│   │   ├── image.ts                        # Image-related type definitions
│   │   └── batch.ts                        # Batch processing types
│   ├── constants/
│   │   └── formats.ts                      # 100+ format definitions
│   ├── App.tsx                             # Root application component
│   ├── main.tsx                            # Application entry point
│   └── index.css                           # Global styles (Tailwind)
├── public/
├── .env.example                            # Environment variables template
├── .gitignore
├── index.html                              # HTML entry point
├── package.json                            # Dependencies & scripts
├── tsconfig.json                           # TypeScript configuration
├── vite.config.ts                          # Vite build configuration
├── start_local.cmd                         # Windows quick-start script
└── README.md                               # This file
```

---

## 🛠️ Tech Stack

| Category | Technology |
|:---|:---|
| **Framework** | [React 19](https://react.dev/) |
| **Language** | [TypeScript 5.8](https://www.typescriptlang.org/) |
| **Build Tool** | [Vite 6.2](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS 4.1](https://tailwindcss.com/) |
| **Animations** | [Framer Motion 12](https://www.framer.com/motion/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **HEIC Support** | [heic2any](https://github.com/Link/HEIC) |
| **PDF Generation** | [jsPDF](https://github.com/parallax/jsPDF) |
| **Effects** | [canvas-confetti](https://github.com/catdad/canvas-confetti) |
| **Server** | [Express 4](https://expressjs.com/) |

---

## 📖 API Reference

### SizeIncreaser

```typescript
import { SizeIncreaser } from './services/SizeIncreaser';

// Increase image file size to target bytes
const blob = await SizeIncreaser.increase(
  file,          // File object
  format,        // ImageFormat enum
  targetBytes    // Target size in bytes
);
```

### ImageConverter

```typescript
import { ImageConverter } from './services/ImageConverter';

// Convert image to target format
const result = await ImageConverter.convert(
  file,           // File object
  targetFormat,   // Target format string (e.g., 'png', 'jpg')
  quality         // Quality 0-1 (default: 1)
);
// Returns: { blob, format, filename }
```

### UnitConverter

```typescript
import { UnitConverter } from './services/UnitConverter';

// Convert value + unit to bytes
const bytes = UnitConverter.toBytes(5, 'MB');  // 5242880

// Format bytes to human-readable string
const readable = UnitConverter.formatBytes(5242880);  // "5 MB"
```

---

## 📸 Screenshots

### Inflator Pro
> Upload images, set target size, and inflate — all in your browser.

### Format Lab
> Choose from 100+ formats, adjust quality, and convert with a single click.

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Guidelines

- Follow existing code style and conventions
- Write meaningful commit messages
- Add comments for complex logic
- Test your changes before submitting

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 🔗 Links

- **Repository**: [github.com/lazimmridha9-rgb/INFLATO-FORMATE](https://github.com/lazimmridha9-rgb/INFLATO-FORMATE)
- **Report Issues**: [GitHub Issues](https://github.com/lazimmridha9-rgb/INFLATO-FORMATE/issues)

---

<div align="center">

**Made with ❤️ by [lazimmridha9-rgb](https://github.com/lazimmridha9-rgb)**

⭐ _If you find this project useful, consider giving it a star!_

</div>
