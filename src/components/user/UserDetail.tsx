import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

import useUserDetail from './hooks/useUserDetail';
import useDeleteUserQuery from './api/useDeleteUserQuery';
import UserDialog from './UserDialog';
import UserTable from './UserTable';
import UserAccountTable from './UserAccountTable';

const UserDetail = () => {
  const { user, accounts } = useUserDetail();

  const { deleteUserMutation } = useDeleteUserQuery();

  return (
    <div>
      {user && (
        <>
          <S.ButtonWrap>
            <Button
              sx={{ fontWeight: 700, marginRight: 2 }}
              variant="outlined"
              color="error"
              onClick={() => deleteUserMutation.mutate(user.id)}
            >
              삭제하기
            </Button>

            <UserDialog user={user} />
          </S.ButtonWrap>
          <UserTable user={user} />
        </>
      )}
      <S.Divider />
      {accounts && <UserAccountTable accounts={[...accounts]} />}
    </div>
  );
};

export default UserDetail;

const S = {
  ButtonWrap: styled('div')(() => ({
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: 30,
  })),
  Divider: styled('div')(() => ({
    margin: 40,
  })),
};
