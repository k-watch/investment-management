import { useRouter } from 'next/router';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

import { reqLogin } from '@src/api/login';
import { cookieInstance } from '@src/utils/cookieInstance';
import { NAVIGATE_URL } from '@src/types/enum';

const useLoginQuery = () => {
  const router = useRouter();
  const [isPageLoading, setIsLoading] = useState(false);

  const loginMutation = useMutation(reqLogin, {
    onSuccess: ({ data }) => {
      if (data) {
        setIsLoading(true);
        cookieInstance.set('token', data.accessToken);
        router.push(NAVIGATE_URL.ACCOUNT);
      }
    },
  });
  return { isPageLoading, loginMutation };
};

export default useLoginQuery;
