export enum KeyStorage {
  AUTH = "user",
  SELECTED_ADMIN_MENU_KEY = "selectedAdminKey",
}

const localStorageUtils = {
  set: (key: KeyStorage, value: string): boolean => {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error(`Error setting ${key} in localStorage:`, error);
      return false;
    }
  },

  setObject: (key: KeyStorage, value: unknown): boolean => {
    try {
      const stringValue = JSON.stringify(value);
      localStorage.setItem(key, stringValue);
      return true;
    } catch (error) {
      console.error(`Error setting object ${key} in localStorage:`, error);
      return false;
    }
  },

  get: (key: KeyStorage, defaultValue: string | null = null): string | null => {
    try {
      const value = localStorage.getItem(key);
      return value !== null ? value : defaultValue;
    } catch (error) {
      console.error(`Error getting ${key} from localStorage:`, error);
      return defaultValue;
    }
  },

  getObject: <T = any>(key: KeyStorage, defaultValue: T | null): T | null => {
    try {
      const value = localStorage.getItem(key);
      if (value) return JSON.parse(value) as T;
    } catch (error) {
      console.error(`Error parsing ${key} from localStorage:`, error);
    }
    return defaultValue;
  },

  remove: (key: KeyStorage): void => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${key} from localStorage:`, error);
    }
  },

  clear: (): void => {
    try {
      localStorage.clear();
    } catch (error) {
      console.error(`Error clearing localStorage:`, error);
    }
  },
};

export default localStorageUtils;
