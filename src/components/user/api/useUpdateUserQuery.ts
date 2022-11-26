import { useMutation, useQueryClient } from '@tanstack/react-query';

import { reqUpdateUser } from '@src/api/user';

const useUpdateUserQuery = (id?: number) => {
  const queryClient = useQueryClient();

  const updateUserMutation = useMutation(reqUpdateUser, {
    onSuccess: () => {
      queryClient.invalidateQueries(['user', `${id}`]);
      queryClient.invalidateQueries(['userAccounts', `${id}`]);
    },
  });

  return { updateUserMutation };
};

export default useUpdateUserQuery;
