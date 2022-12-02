import { useQueries } from '@tanstack/react-query';

import { reqGetAccountList, reqGetUsers } from '@src/api/accounts';
import { IUser } from '@src/models/IUser';
import { QueriesParmas } from '@src/types';

interface SelectParams<T> {
  totalCount: string | number;
  data: T;
}

const useAccountsQuery = (query: QueriesParmas) => {
  const [resAccounts, resUsers] = useQueries({
    queries: [
      {
        queryKey: ['accounts', query],
        queryFn: () => reqGetAccountList(query),
      },
      {
        queryKey: ['users'],
        queryFn: () => reqGetUsers(),
        select: ({ data }: SelectParams<IUser[]>) => {
          if (!data) return undefined;
          return {
            // 계좌주 표현을 위해 user name 만 추출
            ...data,
            data: data.reduce((map: Map<number, string>, user: IUser) => {
              map.set(user.id, user.name);
              return map;
            }, new Map<number, string>()),
          };
        },
      },
    ],
  });

  return { resAccounts, resUsers };
};

export default useAccountsQuery;
