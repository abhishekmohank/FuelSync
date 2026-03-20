'use client';

import { useEffect } from 'react';
import { useAuthStore, useThemeStore } from '@/utils/store';

export function Providers({ children }: { children: React.ReactNode }) {
  const { setFromStorage } = useAuthStore();
  const { initializeTheme } = useThemeStore();

  useEffect(() => {
    setFromStorage();
    initializeTheme();
  }, [setFromStorage, initializeTheme]);

  return <>{children}</>;
}
