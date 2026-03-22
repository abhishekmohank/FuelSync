import { create } from 'zustand';

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
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.warn('localStorage unavailable, session will not persist', error);
    }
    set({ token });
  },
  logout: () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    } catch (error) {
      console.warn('localStorage unavailable during logout', error);
    }
    set({ user: null, token: null, isAuthenticated: false });
  },
  setFromStorage: () => {
    try {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      if (token && user) {
        set({ token, user: JSON.parse(user), isAuthenticated: true });
      }
    } catch (error) {
      console.warn('localStorage unavailable during initialization', error);
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
      const savedTheme = localStorage.getItem('theme') as ThemeMode | null;
      const theme = savedTheme === 'dark' ? 'dark' : 'light';
      applyTheme(theme);
      set({ theme });
    } catch (error) {
      console.warn('localStorage unavailable for theme, using default', error);
      applyTheme('light');
      set({ theme: 'light' });
    }
  },
  setTheme: (theme) => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('theme', theme);
      } catch (error) {
        console.warn('localStorage unavailable for theme persist', error);
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
