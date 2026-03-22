 'use client';

import { useEffect } from 'react';
import { useAuthStore, useThemeStore } from '@/utils/store';
import { safeStorage } from '@/utils/storage';

export function Providers({ children }: { children: React.ReactNode }) {
  const { setFromStorage } = useAuthStore();
  const { initializeTheme } = useThemeStore();

  useEffect(() => {
    safeStorage.init();
    setFromStorage();
    initializeTheme();
  }, [setFromStorage, initializeTheme]);

  return <>{children}</>;
}
