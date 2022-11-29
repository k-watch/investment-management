import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import { brokerMap, statusMap } from '@src/components/accounts/types';
import { convertNumberFormat, initAssetColor } from '@src/utils/common';
import { IAccount } from '@src/models/IAccount';

import useGetUserQuery from '../api/useGetUserQuery';

export interface UserDetailProps {
  id: number;
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

  const { resUsers, resAccounts } = useGetUserQuery(router.query.id as string);

  useEffect(() => {
    if (resUsers.data) {
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
    }
  }, [resUsers.data]);

  useEffect(() => {
    if (resAccounts.data) {
      const { data: accountsData } = resAccounts;

      const accountList = accountsData.map((account: IAccount) => {
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
  }, [resAccounts.data]);

  return { user, accounts };
};

export default useUserDetail;
