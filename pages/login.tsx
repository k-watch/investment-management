import Head from 'next/head';
import { ReactElement } from 'react';

import Login from '@src/components/login/Login';

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>사용자 목록</title>
      </Head>
      <Login />
    </>
  );
};

LoginPage.getLayout = (page: ReactElement) => page;

export default LoginPage;
