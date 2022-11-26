import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

import UserTextField from './common/UserTextField';
import useUserDialog, { UserDialogProps } from './hooks/useUserDialog';

export interface DialogTitleProps {
  children?: React.ReactNode;
  onClose: () => void;
}

function UserDialogTitle(props: DialogTitleProps) {
  const { children, onClose } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }}>
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

const UserDialog = ({ user }: { user: UserDialogProps }) => {
  const {
    open,
    userForm,
    handleOpen,
    handleClose,
    handleChange,
    handleModify,
  } = useUserDialog({ user });

  return (
    <>
      <Button sx={{ fontWeight: 700 }} variant="outlined" onClick={handleOpen}>
        수정하기
      </Button>
      {user && (
        <S.Dialog onClose={handleClose} open={open}>
          <UserDialogTitle onClose={handleClose}>
            <span className="name">{user.name}</span>님 고객 정보
          </UserDialogTitle>

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
        </S.Dialog>
      )}
    </>
  );
};

export default UserDialog;

const S = {
  Dialog: styled(Dialog)(({ theme }) => ({
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
  })),
};
