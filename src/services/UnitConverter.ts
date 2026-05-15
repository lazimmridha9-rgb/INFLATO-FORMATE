import { FileSizeUnit } from '../types/image';

export class UnitConverter {
  private static readonly MULTIPLIER = 1024;

  private static readonly UNIT_POWER: Record<FileSizeUnit, number> = {
    'B': 0,
    'KB': 1,
    'MB': 2,
    'GB': 3
  };

  /**
   * Converts a value in given unit to bytes
   */
  static toBytes(value: number, unit: FileSizeUnit): number {
    return Math.floor(value * Math.pow(this.MULTIPLIER, this.UNIT_POWER[unit]));
  }

  /**
   * Converts bytes to a human-readable string with units
   */
  static formatBytes(bytes: number, decimals: number = 2): string {
    if (bytes === 0) return '0 B';

    const k = this.MULTIPLIER;
    const dm = decimals < 0 ? 0 : decimals;
    const units: FileSizeUnit[] = ['B', 'KB', 'MB', 'GB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + units[Math.min(i, units.length - 1)];
  }

  /**
   * Returns a breakdown of bytes into unit components
   */
  static getUnitValue(bytes: number, targetUnit: FileSizeUnit): number {
    return bytes / Math.pow(this.MULTIPLIER, this.UNIT_POWER[targetUnit]);
  }
}
