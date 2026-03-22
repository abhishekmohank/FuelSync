import { create } from 'zustand';
import { safeStorage } from './storage';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
  setFromStorage: () => void;
}

type ThemeMode = 'light' | 'dark';

interface ThemeStore {
  theme: ThemeMode;
  initializeTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  toggleTheme: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setToken: (token) => {
    try {
      if (token) {
        safeStorage.setItem('token', token);
      } else {
        safeStorage.removeItem('token');
      }
    } catch (error) {
      console.warn('Storage unavailable, session will not persist', error);
    }
    set({ token });
  },
  logout: () => {
    try {
      safeStorage.removeItem('token');
      safeStorage.removeItem('user');
    } catch (error) {
      console.warn('Storage unavailable during logout', error);
    }
    set({ user: null, token: null, isAuthenticated: false });
  },
  setFromStorage: () => {
    try {
      const token = safeStorage.getItem('token');
      const user = safeStorage.getItem('user');
      if (token && user) {
        set({ token, user: JSON.parse(user), isAuthenticated: true });
      }
    } catch (error) {
      console.warn('Storage unavailable during initialization', error);
    }
  },
}));

const applyTheme = (theme: ThemeMode) => {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', theme);
};

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: 'light',
  initializeTheme: () => {
    if (typeof window === 'undefined') return;
    try {
      const savedTheme = safeStorage.getItem('theme') as ThemeMode | null;
      const theme = savedTheme === 'dark' ? 'dark' : 'light';
      applyTheme(theme);
      set({ theme });
    } catch (error) {
      console.warn('Storage unavailable for theme, using default', error);
      applyTheme('light');
      set({ theme: 'light' });
    }
  },
  setTheme: (theme) => {
    if (typeof window !== 'undefined') {
      try {
        safeStorage.setItem('theme', theme);
      } catch (error) {
        console.warn('Storage unavailable for theme persist', error);
      }
    }
    applyTheme(theme);
    set({ theme });
  },
  toggleTheme: () => {
    const nextTheme = get().theme === 'light' ? 'dark' : 'light';
    get().setTheme(nextTheme);
  },
}));
