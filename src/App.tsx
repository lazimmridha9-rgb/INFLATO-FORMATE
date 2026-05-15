import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navigation } from './components/layout/Navigation';
import ImageInflator from './components/features/inflator/ImageInflator';
import ImageFormatConverter from './components/features/converter/ImageFormatConverter';

type AppMode = 'inflator' | 'converter';

export default function App() {
  const [mode, setMode] = useState<AppMode>('inflator');

  return (
    <div className="h-screen bg-[#F1F3F6] text-[#1A1C1E] font-sans flex flex-col md:flex-row overflow-hidden">
      <Navigation mode={mode} setMode={setMode} />

      <main id="main-panel" className="flex-1 overflow-hidden relative" role="tabpanel">
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="h-full overflow-hidden flex flex-col"
          >
            {mode === 'inflator' ? <ImageInflator /> : <ImageFormatConverter />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
