interface ILocalStorageInstance {
  set: (key: string, item: string) => void;
  get: (key: string) => string | null;
  remove: (key: string) => void;
}

class LocalStorageInstance implements ILocalStorageInstance {
  set(key: string, item: string) {
    localStorage.setItem(key, item);
  }

  get(key: string) {
    return localStorage.getItem(key);
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}

export const localStorageInstance = new LocalStorageInstance();
