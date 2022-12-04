import {
  Button,
  CircularProgress,
  InputAdornment,
  Dialog,
  styled,
  TextField,
} from '@mui/material';
import { blueGrey, grey } from '@mui/material/colors';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import InputIcon from '@mui/icons-material/Input';

import useLogin from './hooks/useLogin';

const Login = () => {
  const { emailRef, passwordRef, isLoading, isPageLoading, handleSubmit } =
    useLogin();

  return (
    <>
      {isLoading || isPageLoading ? (
        <S.Dialog open={isLoading}>
          <p>로딩중입니다.</p>
          <CircularProgress />
        </S.Dialog>
      ) : (
        <S.Wrap>
          <h1 className="header">PREFACE</h1>
          <form onSubmit={handleSubmit}>
            <S.Title>
              <PersonOutlineIcon />
              <p>로그인</p>
            </S.Title>
            <S.InputWrap>
              <TextField
                inputRef={emailRef}
                focused
                fullWidth
                margin="normal"
                placeholder="아이디를 입력하세요."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonOutlineIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                inputRef={passwordRef}
                type="password"
                focused
                fullWidth
                margin="normal"
                placeholder="비밀번호를 입력하세요."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockOpenIcon />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                type="submit"
                variant="contained"
                disableElevation
                fullWidth
                startIcon={<InputIcon />}
              >
                로그인
              </Button>
            </S.InputWrap>
          </form>
          <p className="footer">© December and Company</p>
        </S.Wrap>
      )}
    </>
  );
};

export default Login;

const S = {
  Dialog: styled(Dialog)(() => ({
    '& .MuiPaper-root': {
      display: 'flex',
      alignItems: 'center',
      minWidth: 400,
      padding: 30,

      p: {
        marginBottom: 20,
        fontSize: 18,
        fontWeight: 500,
      },
    },
    '& .MuiTypography-h6': {
      '& .name': {
        fontWeight: 700,
      },
    },
  })),

  Wrap: styled('div')(() => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '100%',
    margin: '0 auto',
    backgroundColor: `${grey[50]}`,
    fontSize: 17,
    fontWeight: 700,

    '& .header': {
      marginBottom: 20,
      fontSize: 50,
      fontWeight: 900,
      color: `${blueGrey[900]}`,
    },

    '& .footer': {
      marginTop: 10,
      fontSize: 14,
      fontWeight: 500,
    },
  })),

  InputWrap: styled('div')(() => ({
    width: 420,
    padding: '20px 30px',
    backgroundColor: 'white',
    boxShadow: `0px 3px 6px ${grey[300]}`,

    '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
        border: `1px solid ${grey[400]}`,
      },
    },

    '& .MuiInputBase-input': {
      padding: '10px 0',
    },

    '& .MuiButtonBase-root': {
      marginTop: 12,
      marginBottom: 15,
      padding: 10,
      fontSize: 17,
      backgroundColor: `${blueGrey[900]}`,

      '&:hover': {
        backgroundColor: `${blueGrey[700]}`,
      },
    },
  })),

  Title: styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    padding: '15px 30px',
    backgroundColor: `${grey[100]}`,

    '& p': {
      marginLeft: 10,
    },
  })),
};
