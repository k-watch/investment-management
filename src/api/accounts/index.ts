import { IAccount } from '@src/models/IAccount';
import { httpInstance } from '../httpInstance';

export const reqGetAccountList = async (queries: any) => {
  const accounts = await httpInstance.get<IAccount[]>('/api/accounts', {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjFAMS4xIiwiaWF0IjoxNjY5MDQ0MjA0LCJleHAiOjE2NjkwNDc4MDQsInN1YiI6IjEwMSJ9.0b7QHrNS9Zvy5bYgA9peUvCBoEMO7PJ88PlcaepPJck
`,
    },
    params: {
      _page: queries.page,
      _limit: 15,
      brokerId: queries.broker,
      status: queries.status,
      isActive: queries.isActive,
      q: queries.q,
    },
  });

  return accounts;
};

export const reqGetUsers = async () => {
  const users = await httpInstance.get<IAccount[]>('/api/users', {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjFAMS4xIiwiaWF0IjoxNjY5MDQ0MjA0LCJleHAiOjE2NjkwNDc4MDQsInN1YiI6IjEwMSJ9.0b7QHrNS9Zvy5bYgA9peUvCBoEMO7PJ88PlcaepPJck
`,
    },
  });

  return users;
};
