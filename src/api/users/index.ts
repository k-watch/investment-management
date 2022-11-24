import { IUser } from '@src/models/IUser';
import { QueriesParmas } from '@src/types';
import { cookieInstance } from '@src/utils/cookieinstance';
import httpInstance from '../httpInstance';

export const reqGetUsers = async (queries?: QueriesParmas) => {
  const token = cookieInstance.get('token');
  console.log(queries?.q);
  const { headers, data } = await httpInstance.get<IUser[]>('/api/users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      _page: queries?.page,
      _limit: 15,
      isActive: queries?.isActive,
      isStaff: queries?.isStaff,
      q: queries?.q,
    },
  });

  return {
    totalCount: headers['x-total-count'] || 0,
    data,
  };
};
