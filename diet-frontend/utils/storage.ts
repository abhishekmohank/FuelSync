/**
 * Cross-browser storage abstraction with fallbacks for mobile and restrictive browsers.
 * Attempts: localStorage → sessionStorage → in-memory storage
 */

type StorageType = 'localStorage' | 'sessionStorage' | 'memory';

let currentStorage: StorageType = 'memory';
const memoryStore = new Map<string, string>();

const testStorage = (type: StorageType): boolean => {
  try {
    const storage = type === 'localStorage' ? localStorage : sessionStorage;
    const testKey = '__test_' + Date.now();
    storage.setItem(testKey, 'test');
    storage.removeItem(testKey);
    return true;
  } catch (error) {
    return false;
  }
};

// Determine best available storage
const initializeStorage = () => {
  if (typeof window === 'undefined') return;

  if (testStorage('localStorage')) {
    currentStorage = 'localStorage';
  } else if (testStorage('sessionStorage')) {
    currentStorage = 'sessionStorage';
  } else {
    currentStorage = 'memory';
  }

  console.log('[Storage] Using:', currentStorage);
};

const getStorage = (): Storage | typeof memoryStore => {
  if (currentStorage === 'memory') {
    return memoryStore;
  }
  return currentStorage === 'localStorage' ? localStorage : sessionStorage;
};

export const safeStorage = {
  getItem: (key: string): string | null => {
    try {
      const storage = getStorage();
      if (storage instanceof Map) {
        return storage.get(key) || null;
      }
      return storage.getItem(key);
    } catch (error) {
      console.warn(`[Storage] Failed to get '${key}':`, error);
      return null;
    }
  },

  setItem: (key: string, value: string): void => {
    try {
      const storage = getStorage();
      if (storage instanceof Map) {
        storage.set(key, value);
      } else {
        storage.setItem(key, value);
      }
    } catch (error) {
      console.warn(`[Storage] Failed to set '${key}':`, error);
    }
  },

  removeItem: (key: string): void => {
    try {
      const storage = getStorage();
      if (storage instanceof Map) {
        storage.delete(key);
      } else {
        storage.removeItem(key);
      }
    } catch (error) {
      console.warn(`[Storage] Failed to remove '${key}':`, error);
    }
  },

  clear: (): void => {
    try {
      const storage = getStorage();
      if (storage instanceof Map) {
        storage.clear();
      } else {
        storage.clear();
      }
    } catch (error) {
      console.warn('[Storage] Failed to clear storage:', error);
    }
  },

  init: initializeStorage,
  currentType: () => currentStorage,
};
