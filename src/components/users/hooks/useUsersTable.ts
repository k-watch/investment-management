import { useMemo, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

import { setTotalPage } from '@src/store/accounts/accounts';
import { QueriesParmas } from '@src/types';

import useUsersQuery from '../api/useUsersQuery';
import { convertSecretName, maskingPhoneNum } from '../util';

interface UsersTableProps {
  id: number;
  name: string;
  email: string;
  genderOrigin: string;
  birthDate: string;
  phoneNumber: string;
  lastLogin: string;
  allowMarketingPush: string;
  isActive: string;
  isStaff: string;
  createdAt: string;
}

const useUsersTable = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [list, setList] = useState<UsersTableProps[]>([]);

  const queries: QueriesParmas = useMemo(() => {
    if (router.query) {
      return {
        page: router.query.page ? Number(router.query.page) : 1,
        isActive:
          router.query.isActive === undefined
            ? undefined
            : router.query.isActive === '활성화'
            ? true
            : false,
        isStaff:
          router.query.isStaff === undefined
            ? undefined
            : router.query.isStaff === '임직원'
            ? true
            : false,
        q: router.query.q,
      };
    }
    return {
      page: 1,
    };
  }, [router.query]);

  const { data: resUsers, isLoading } = useUsersQuery(queries);

  useEffect(() => {
    if (resUsers) {
      const { totalCount, data: userList } = resUsers;

      const users = userList.map((user) => {
        return {
          id: user.id,
          name: convertSecretName(user.name),
          email: user.email,
          genderOrigin:
            user.genderOrigin === 1 || user.genderOrigin === 3 ? '남' : '여',
          birthDate: user.birthDate.slice(0, 10),
          phoneNumber: maskingPhoneNum(user.phoneNumber),
          lastLogin: user.lastLogin.slice(0, 10),
          allowMarketingPush: user.allowMarketingPush ? 'O' : 'X',
          isActive: user.isActive ? '활성화' : '비활성화',
          isStaff: user.isStaff ? '임직원' : '일반',
          createdAt: user.createdAt.slice(0, 10),
        };
      });

      dispatch(setTotalPage(totalCount));

      setList(users);
    }
  }, [resUsers, dispatch]);

  const handleClick = (id: number) => {
    router.push(`/user?id=${id}`);
  };

  return { list, isLoading, handleClick };
};

export default useUsersTable;
