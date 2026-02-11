import React from 'react';
import { ScanStateProvider } from '@/features/scan/ScanState';
import { ScanHeader } from '@/features/scan/ScanHeader';
import { ScanResult } from '@/features/scan/ScanResult';
export default function ScanScreen() {
  return (
    <ScanStateProvider>
      <ScanHeader />
      <ScanResult />
    </ScanStateProvider>
  )
}
