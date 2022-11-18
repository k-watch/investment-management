import { Button } from '@mui/material';
import useLogin from './hooks/useLogin';

const Login = () => {
  const { emailRef, passwordRef, handleSubmit } = useLogin();
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input ref={emailRef} />
        <input ref={passwordRef} />
        <Button type="submit">로그인</Button>
      </form>
    </div>
  );
};

export default Login;
