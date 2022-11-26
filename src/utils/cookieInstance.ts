import { Cookies } from 'react-cookie';

interface ICookieInstance {
  get: (key: string) => unknown;
  set: (key: string, value: string) => void;
  remove: (key: string) => void;
}

class CookieInstance implements ICookieInstance {
  private instance: Cookies;

  constructor() {
    this.instance = new Cookies();
  }

  get(key: string) {
    return this.instance.get(key);
  }

  set(key: string, value: string) {
    return this.instance.set(key, value);
  }

  remove(key: string) {
    this.instance.remove(key);
  }
}

export const cookieInstance = new CookieInstance();
