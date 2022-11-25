import useUserDetail from './hooks/useUserDetail';

import UserDialog from './UserDialog';
import { reqDeleteUser } from '@src/api/user';
import UserTable from './UserTable';
import UserAccountTable from './UserAccountTable';

const UserDetail = () => {
  const { user, accounts } = useUserDetail();

  return (
    <div>
      <UserDialog
        name={user?.name}
        email={user?.email}
        age={user?.age}
        gender={user?.genderOrigin}
        birth={user?.birthDate}
        phone={user?.phoneNumber}
        isStaff={user?.isStaff}
      />
      <button onClick={() => reqDeleteUser(user.id)}>삭제</button>
      {user && <UserTable user={user} />}
      {accounts && <UserAccountTable accounts={[...accounts]} />}
    </div>
  );
};

export default UserDetail;
