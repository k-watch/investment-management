import { IAuth } from '@src/models/IAuth';

import httpInstance from '../httpInstance';

interface ReqLogin {
  email: string;
  password: string;
}

export const reqLogin = async ({ email, password }: ReqLogin) => {
  const data = await httpInstance.post<IAuth>('/login', {
    email,
    password,
  });

  return data;
};
