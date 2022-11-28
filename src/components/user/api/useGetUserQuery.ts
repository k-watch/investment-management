import { useQueries } from '@tanstack/react-query';

import { reqGetUser, reqGetUserAccountList } from '@src/api/user';
import { IUser } from '@src/models/IUser';

const useGetUserQuery = (id: string) => {
  const [resUsers, resAccounts] = useQueries({
    queries: [
      {
        queryKey: ['user', id],
        queryFn: () => reqGetUser(id),
        select: (data: IUser[]) => data.at(0),
      },
      {
        queryKey: ['user', 'accounts', id],
        queryFn: () => reqGetUserAccountList(id),
      },
    ],
  });

  return { resUsers, resAccounts };
};

export default useGetUserQuery;
