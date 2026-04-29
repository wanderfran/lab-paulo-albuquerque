'use client';

import { useEffect } from 'react';
import { initTracking } from '@/lib/analytics';

export default function Analytics() {
  useEffect(() => {
    initTracking();
  }, []);

  return null;
}
