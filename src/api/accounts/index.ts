import { IAccount } from '@src/models/IAccount';
import { IUser } from '@src/models/IUser';
import { QueriesParmas } from '@src/types';
import { PAGE_LIMIT } from '@src/types/enum';
import { cookieInstance } from '@src/utils/cookieInstance';

import httpInstance from '../httpInstance';

export const reqGetAccountList = async (queries: QueriesParmas) => {
  const token = cookieInstance.get('token');

  const { headers, data } = await httpInstance.get<IAccount[]>('/accounts', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      _page: queries.page,
      _limit: PAGE_LIMIT,
      brokerId: queries.broker,
      status: queries.status,
      isActive: queries.isActive,
      q: queries.q,
    },
  });

  return {
    totalCount: headers['x-total-count'] || 0,
    data,
  };
};

export const reqGetUsers = async () => {
  const token = cookieInstance.get('token');

  const { headers, data } = await httpInstance.get<IUser[]>('/users', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return {
    totalCount: headers['x-total-count'] || 0,
    data,
  };
};
