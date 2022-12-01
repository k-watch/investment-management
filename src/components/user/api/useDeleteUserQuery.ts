import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';

import { reqDeleteUser } from '@src/api/user';
import { NAVIGATE_URL } from '@src/types/enum';

const useDeleteUserQuery = () => {
  const router = useRouter();

  const deleteUserMutation = useMutation(reqDeleteUser, {
    onSuccess: () => {
      router.push(NAVIGATE_URL.USERS);
    },
  });

  return { deleteUserMutation };
};

export default useDeleteUserQuery;
