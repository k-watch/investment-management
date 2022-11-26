import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';

import { reqLogin } from '@src/api/login';
import { cookieInstance } from '@src/utils/cookieInstance';
import { NAVIGATE_URL } from '@src/types/enum';

const useLoginQuery = () => {
  const router = useRouter();

  const loginMutation = useMutation(reqLogin, {
    onSuccess: ({ data }) => {
      if (data) {
        cookieInstance.set('token', data.accessToken);
        router.push(NAVIGATE_URL.ACCOUNT);
      }
    },
  });
  return { loginMutation };
};

export default useLoginQuery;
