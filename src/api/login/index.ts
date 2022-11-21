import { IAuth } from '@src/models/IAuth';
import { httpInstance } from '../httpInstance';
import { API_URL } from '@src/types/enum';

interface ReqLogin {
  email: string;
  password: string;
}

export const reqLogin = async ({ email, password }: ReqLogin) => {
  const data = await httpInstance.post<IAuth>(API_URL.LOGIN, {
    email,
    password,
  });

  return data;
};

export const reqLogout = async () => {
  const data = await httpInstance.post(API_URL.LOGOUT);
  console.log(data);
  return data;
};
