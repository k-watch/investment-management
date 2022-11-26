import { IAuth } from '@src/models/IAuth';

import httpInstance from '../httpInstance';

interface ReqLogin {
  email: string;
  password: string;
}

export const reqLogin = async ({ email, password }: ReqLogin) => {
  const data = await httpInstance.post<IAuth>('/api/login', {
    email,
    password,
  });

  return data;
};

export const reqLogout = async () => {
  const data = await httpInstance.post('/api/logout');

  return data;
};
