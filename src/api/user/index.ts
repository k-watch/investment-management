import { cookieInstance } from '@src/utils/cookieinstance';
import httpInstance from '../httpInstance';

export const reqUpdateUser = async (id, params) => {
  const token = cookieInstance.get('token');
  console.log(id, params);
  const { data } = await httpInstance.patch(`/api/users/${id}`, params, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const reqDeleteUser = async (id) => {
  const token = cookieInstance.get('token');

  const { data } = await httpInstance.delete(`/api/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};
