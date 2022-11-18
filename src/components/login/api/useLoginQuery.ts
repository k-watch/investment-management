import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { useMutation } from '@tanstack/react-query';

import { reqLogin } from '@src/api/login';
import { setAuth } from '@src/store/auth/auth';
import { localStorageInstance } from '@src/utils/localStorageInstance';
import { ACCESS_TOKEN, NAVIGATE_URL } from '@src/types/enum';

const useLoginQuery = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const loginMutation = useMutation(reqLogin, {
    onSuccess: (data) => {
      if (data) {
        localStorageInstance.set(ACCESS_TOKEN, data.accessToken);
        dispatch(setAuth(data.user));
        router.push(NAVIGATE_URL.MAIN);
      }
    },
  });
  return { loginMutation };
};

export default useLoginQuery;
