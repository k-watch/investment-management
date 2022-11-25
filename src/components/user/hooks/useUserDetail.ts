import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import { brokerMap, statusMap } from '@src/components/accounts/types';
import { convertNumberFormat, initAssetColor } from '@src/utils/common';

import useUserQuery from '../api/useUserQuery';

// ********************
// UsersTableProps
// id: 고객 ID
// name: 고객명
// email: 이메일
// age: 생일
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
export interface UserDetailProps {
  id?: number;
  name: string;
  email: string;
  age: number;
  genderOrigin?: string;
  birthDate: string;
  phoneNumber: string;
  lastLogin?: string;
  allowMarketingPush?: string;
  isActive?: string;
  isStaff?: string;
  createdAt?: string;
}

// ********************
// AccountsTableProps
// id: 계좌 ID
// userId: 계좌주 ID
// brokerName: 증권사
// number: 계좌번호
// status: 계좌상태
// name: 계좌명
// assetColor: 평가금액과 입금금액 손익 상태
// assets: 평가금액
// payments: 입금금액
// isActive: 계좌활성여부
// createdAt: 계좌개설일
// ********************
export interface AccountsTableProps {
  id: number;
  userId: number;
  brokerName: string | undefined;
  number: string;
  status: string | undefined;
  name: string;
  assetColor: string | undefined;
  assets: string;
  payments: string;
  isActive: string;
  createdAt: string;
}

const useUserDetail = () => {
  const router = useRouter();

  const queries = useRef('');

  const [user, setUser] = useState<UserDetailProps>();
  const [accounts, setAccounts] = useState<AccountsTableProps[]>();

  useEffect(() => {
    if (router.query) {
      queries.current = router.query.id as string;
    }
  }, [router.query]);

  const { resAccounts, resUsers } = useUserQuery({ id: queries.current });

  useEffect(() => {
    if (resAccounts.data && resUsers.data) {
      const { data: accountsData } = resAccounts.data;
      const { data: userData } = resUsers;

      setUser({
        id: userData.id,
        name: userData.name,
        email: userData.email,
        age: userData.age,
        genderOrigin:
          userData.genderOrigin === 1 || userData?.genderOrigin === 3
            ? '남'
            : '여',
        birthDate: userData.birthDate.slice(0, 10),
        phoneNumber: userData.phoneNumber,
        lastLogin: userData.lastLogin.slice(0, 10),
        allowMarketingPush: userData.allowMarketingPush ? 'O' : 'X',
        isActive: userData.isActive ? '활성화' : '비활성화',
        isStaff: userData.isStaff ? '임직원' : '일반',
        createdAt: userData.createdAt.slice(0, 10),
      });

      const accountList = accountsData.map((account) => {
        const convertNumber =
          account.number.slice(0, 2) +
          account.number
            .slice(2, account.number.length - 2)
            .replace(/[0-9]/g, '*') +
          account.number.slice(-2);

        return {
          id: account.id,
          userId: account.userId,
          brokerName: brokerMap.get(Number(account.brokerId)),
          number: convertNumberFormat(Number(account.brokerId), convertNumber),
          status: statusMap.get(account.status),
          name: account.name,
          assetColor: initAssetColor(account.assets, account.payments),
          assets: Math.ceil(Number(account.assets)).toLocaleString() + ' 원',
          payments:
            Math.ceil(Number(account.payments)).toLocaleString() + ' 원',
          isActive: account.isActive ? '활성화' : '비활성화',
          createdAt: account.createdAt.slice(0, 10),
        };
      });
      setAccounts(accountList);
    }
  }, [resAccounts.isFetched, resUsers.isFetched]);

  return { user, accounts };
};

export default useUserDetail;
