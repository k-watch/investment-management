import { ReactElement } from 'react';

import Login from '@src/components/login/Login';

const LoginPage = () => {
  return <Login />;
};

LoginPage.getLayout = (page: ReactElement) => page;

export default LoginPage;
