import { Button } from '@mui/material';
import { reqLogout } from '@src/api/login';

export default function Home() {
  return (
    <>
      Home
      <Button onClick={reqLogout}>로그아웃</Button>
    </>
  );
}
