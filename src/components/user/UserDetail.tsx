import Button from '@mui/material/Button';

import useUserDetail from './hooks/useUserDetail';

import UserDialog from './UserDialog';
import { reqDeleteUser } from '@src/api/user';
import UserTable from './UserTable';
import UserAccountTable from './UserAccountTable';

const UserDetail = () => {
  const { user, accounts } = useUserDetail();

  return (
    <div>
      {user && (
        <>
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginBottom: 30,
            }}
          >
            <Button
              sx={{ fontWeight: 700, marginRight: 2 }}
              variant="outlined"
              color="error"
              onClick={() => reqDeleteUser(user.id)}
            >
              삭제하기
            </Button>

            <UserDialog user={user} />
          </div>
          <UserTable user={user} />
        </>
      )}
      {accounts && <UserAccountTable accounts={[...accounts]} />}
    </div>
  );
};

export default UserDetail;
