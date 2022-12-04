import { useRef } from 'react';

import useLoginQuery from '../api/useLoginQuery';

const useLogin = () => {
  const { isPageLoading, loginMutation } = useLoginQuery();

  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (emailRef.current && passwordRef.current) {
      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      loginMutation.mutate({ email, password });
    }
  };

  return {
    emailRef,
    passwordRef,
    isLoading: loginMutation.isLoading,
    isPageLoading,
    handleSubmit,
  };
};

export default useLogin;
