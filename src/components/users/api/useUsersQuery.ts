import { useQuery } from '@tanstack/react-query';

import { QueriesParmas } from '@src/types';
import { reqGetUsers } from '@src/api/users';

const useUsersQuery = (query: QueriesParmas) => {
  const { data, isLoading } = useQuery(['users', query], () =>
    reqGetUsers(query)
  );

  return { data, isLoading };
};

export default useUsersQuery;
