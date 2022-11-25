import { setTotalPage } from '@src/store/accounts/accounts';
import { QueriesParmas } from '@src/types';
import { useRouter } from 'next/router';
import { useMemo, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import useUsersQuery from '../api/useUsersQuery';
// ********************
// UsersTableProps
// id: 고객 ID
// name: 고객명
// email: 이메일
// genderOrigin: 성별
// birthDate: 생년월일
// phoneNumber: 휴대폰 번호
// lastLogin: 최근 로그인
// allowMarketingPush: 혜택수신 동의 여부
// payments: 입금금액
// isActive: 활성화 여부
// isStaff: 임직원 여부
// createdAt: 가입일
// ********************
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

const convertSecretName = (name: string) => {
  const nameArr = name.split('');
  let parsedName = '';
  nameArr.forEach((n, i) => {
    if (i === 0 || (i === nameArr.length - 1 && i !== 1) || n === ' ')
      parsedName += n;
    else parsedName += '*';
  });
  return parsedName;
};

export const maskingPhoneNum = (number: string) => {
  const splited = number.split('-');
  splited[1] = splited[1].replace(/./g, '*');
  return splited.join('-');
};

const useUsersTable = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [list, setList] = useState<UsersTableProps[]>([]);

  const queries: QueriesParmas = useMemo(() => {
    if (router.query) {
      return {
        page: Number(router.query.page),
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

  const data = useUsersQuery(queries);

  useEffect(() => {
    if (data) {
      const { totalCount, data: userList } = data;

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
  }, [data, dispatch]);

  const handleClick = (id: number) => {
    router.push(`/user?id=${id}`);
  };

  return { list, handleClick };
};

export default useUsersTable;
