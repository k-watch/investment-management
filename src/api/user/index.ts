import { UserFormProps } from '@src/components/user/hooks/useUserDialog';
import { IAccount } from '@src/models/IAccount';
import { IUser } from '@src/models/IUser';
import { cookieInstance } from '@src/utils/cookieInstance';

import httpInstance from '../httpInstance';

interface ReqUpdateUser {
  id: number;
  params: UserFormProps;
}

export const reqGetUser = async (id: string) => {
  const token = cookieInstance.get('token');

  const { data } = await httpInstance.get<IUser[]>('/users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      id,
    },
  });

  return data;
};

export const reqGetUserAccountList = async (id: string) => {
  const token = cookieInstance.get('token');

  const { data } = await httpInstance.get<IAccount[]>('/accounts', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      userId: id,
    },
  });

  return data;
};

export const reqUpdateUser = async ({ id, params }: ReqUpdateUser) => {
  const token = cookieInstance.get('token');

  const { data } = await httpInstance.patch(`/api/users/${id}`, params, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const reqDeleteUser = async (id: number) => {
  const token = cookieInstance.get('token');

  const { data } = await httpInstance.delete(`/api/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
