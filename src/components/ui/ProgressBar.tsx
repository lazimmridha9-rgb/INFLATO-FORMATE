import React from 'react';
import { motion } from 'motion/react';

interface ProgressBarProps {
  value: number;
  max: number;
  label: string;
  subLabel?: string;
  color?: string;
  isActive?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  label,
  subLabel,
  color = 'bg-blue-600',
  isActive = true
}) => {
  const percentage = max > 0 ? (value / max) * 100 : 0;

  return (
    <div className={`transition-opacity ${isActive ? 'opacity-100' : 'opacity-20'}`}>
      <div className="flex justify-between items-end mb-1.5">
        <span className="text-[9px] font-black uppercase tracking-widest">{label}</span>
        {subLabel && (
          <span className="text-[9px] font-mono font-bold text-blue-700">{subLabel}</span>
        )}
      </div>
      <div className="h-1.5 w-full bg-[#E2E8E0] overflow-hidden border border-[#D9DDE3]">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          className={`h-full ${color}`}
        />
      </div>
    </div>
  );
};
