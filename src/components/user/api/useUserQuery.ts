import { IUser } from './../../../models/IUser';
import { useQueries } from '@tanstack/react-query';

import { QueriesParmas } from '@src/types';
import { reqGetUser } from '@src/api/users';
import { reqGetUserAccountList } from '@src/api/accounts';

const useUserQuery = (query: QueriesParmas) => {
  const [resAccounts, resUsers] = useQueries({
    queries: [
      {
        queryKey: ['accounts', query],
        queryFn: () => reqGetUserAccountList(query),
      },
      {
        queryKey: ['user', query],
        queryFn: () => reqGetUser(query),
        select: (data) => data.at(0) as IUser,
      },
    ],
  });

  return { resAccounts, resUsers };
};

export default useUserQuery;
