import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { TextField } from '@mui/material';
import { blueGrey, grey } from '@mui/material/colors';
import { reqUpdateUser } from '@src/api/user';
import { useRouter } from 'next/router';

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
  name: string;
  email: string;
  age: number;
  gender: string;
  birth: string;
  phone: string;
  isStaff: string;
}

interface UserFormState {
  [index: string]: string | number;
  name: string;
  email: string;
  age: number;
  gender: string;
  birth: string;
  phone: string;
  isStaff: string;
}

const UserDialog = ({
  name,
  email,
  age,
  gender,
  birth,
  phone,
  isStaff,
}: UserDialogProps) => {
  const [open, setOpen] = React.useState(false);
  const [userForm, setUserForm] = React.useState<UserFormState>({
    name: '',
    email: '',
    age: 0,
    gender: '',
    birth: '',
    phone: '',
    isStaff: '',
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (open) {
      setUserForm({
        name,
        email,
        age,
        gender,
        birth,
        phone,
        isStaff,
      });
    }
  }, [open]);

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
      <Button variant="outlined" onClick={handleClickOpen}>
        수정하기
      </Button>
      <BootstrapDialog onClose={handleClose} open={open}>
        <BootstrapDialogTitle onClose={handleClose}>
          <span className="name">{name}</span>님 고객 정보
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <div>
            <p>이름</p>
            <TextField
              fullWidth
              size="small"
              margin="dense"
              name="name"
              value={userForm.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <p>이메일</p>
            <TextField
              fullWidth
              size="small"
              margin="dense"
              name="email"
              value={userForm.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <p>나이</p>
            <TextField
              fullWidth
              size="small"
              margin="dense"
              name="age"
              value={userForm.age}
              onChange={handleChange}
            />
          </div>
          <div>
            <p>성별</p>
          </div>
          <div>
            <p>생일</p>
            <TextField
              fullWidth
              size="small"
              margin="dense"
              name="birth"
              value={userForm.birth}
              onChange={handleChange}
            />
          </div>
          <div>
            <p>전화번호</p>
            <TextField
              fullWidth
              size="small"
              margin="dense"
              name="phone"
              value={userForm.phone}
              onChange={handleChange}
            />
          </div>
          <div>
            <p>임직원 여부</p>
            <p>{isStaff}</p>
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            취소
          </Button>
          <Button autoFocus onClick={handleModify}>
            수정
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
};

export default UserDialog;

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    minWidth: 600,
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
