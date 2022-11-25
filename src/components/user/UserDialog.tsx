import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { grey, blueGrey } from '@mui/material/colors';
import { reqUpdateUser } from '@src/api/user';
import { useRouter } from 'next/router';
import { UserDetailProps } from './hooks/useUserDetail';
import UserTextField from './common/UserTextField';

export interface DialogTitleProps {
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 11,
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

interface UserDialogProps {
  user: UserDetailProps;
}
interface UserFormState extends UserDetailProps {
  [index: string]: string | number | undefined;
}

const UserDialog = ({ user }: UserDialogProps) => {
  const [open, setOpen] = React.useState(false);
  const [userForm, setUserForm] = React.useState<UserFormState>({
    name: '',
    email: '',
    age: 0,
    birthDate: '',
    phoneNumber: '',
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (open && user) {
      setUserForm({
        name: user.name,
        email: user.email,
        age: user.age,
        birthDate: user.birthDate,
        phoneNumber: user.phoneNumber,
      });
    }
  }, [open, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserForm({ ...userForm, [name]: value });
  };

  const router = useRouter();

  const handleModify = () => {
    const isDisabled = Object.entries(userForm).every(([k, v]) =>
      v !== '' ? true : false
    );

    if (!isDisabled) {
      alert('빈 칸을 입력해주세요.');
    }

    reqUpdateUser(router.query.id, { ...userForm });
  };

  return (
    <>
      <Button
        sx={{ fontWeight: 700 }}
        variant="outlined"
        onClick={handleClickOpen}
      >
        수정하기
      </Button>
      {user && (
        <BootstrapDialog onClose={handleClose} open={open}>
          <BootstrapDialogTitle onClose={handleClose}>
            <span className="name">{user.name}</span>님 고객 정보
          </BootstrapDialogTitle>

          <DialogContent dividers>
            <div>
              <p>이름</p>
              <UserTextField
                name="name"
                value={userForm.name}
                handleChange={handleChange}
              />
            </div>
            <div>
              <p>이메일</p>
              <UserTextField
                name="email"
                value={userForm.email}
                handleChange={handleChange}
              />
            </div>
            <div>
              <p>나이</p>
              <UserTextField
                name="age"
                value={userForm.age}
                handleChange={handleChange}
              />
            </div>

            <div>
              <p>생일</p>
              <UserTextField
                name="birth"
                value={userForm.birthDate}
                handleChange={handleChange}
              />
            </div>
            <div>
              <p>전화번호</p>
              <UserTextField
                name="phone"
                value={userForm.phoneNumber}
                handleChange={handleChange}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              sx={{ fontWeight: 700 }}
              variant="outlined"
              color="error"
              onClick={handleClose}
            >
              취소
            </Button>
            <Button
              sx={{ fontWeight: 700 }}
              variant="outlined"
              onClick={handleModify}
            >
              수정
            </Button>
          </DialogActions>
        </BootstrapDialog>
      )}
    </>
  );
};

export default UserDialog;

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    minWidth: 400,
  },
  '& .MuiTypography-h6': {
    '& .name': {
      fontWeight: 700,
    },
    backgroundColor: grey[100],
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
