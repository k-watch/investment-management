import { IAccount } from '@src/models/IAccount';
import httpInstance from '../httpInstance';

export const reqGetAccountList = async (queries: any) => {
  console.log(queries);
  const { headers, data } = await httpInstance.get<IAccount[]>(
    '/api/accounts',
    {
      headers: {
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjFAMS4xIiwiaWF0IjoxNjY5MTM1NzM3LCJleHAiOjE2NjkxMzkzMzcsInN1YiI6IjEwMSJ9.5tMyGMLrTFHwpZypTZS2AV0ulXSO128wDUyxt18DHkY
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
    }
  );

  return {
    totalCount: headers['x-total-count'] || 0,
    data,
  };
};

export const reqGetUsers = async () => {
  const { headers, data } = await httpInstance.get<IAccount[]>('/api/users', {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjFAMS4xIiwiaWF0IjoxNjY5MTM1NzM3LCJleHAiOjE2NjkxMzkzMzcsInN1YiI6IjEwMSJ9.5tMyGMLrTFHwpZypTZS2AV0ulXSO128wDUyxt18DHkY
`,
    },
  });

  return {
    totalCount: headers['x-total-count'] || 0,
    data,
  };
};
