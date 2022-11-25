import { IUser } from './../../../models/IUser';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import useUserQuery from '../api/useUserQuery';
import { IAccount } from '@src/models/IAccount';
import { brokerMap, statusMap } from '@src/components/accounts/types';
import { convertNumberFormat } from '@src/components/accounts/utils';

const setAssetColor = (assets: string, payments: string) => {
  return assets === payments
    ? undefined
    : assets > payments
    ? 'revenue'
    : 'loss';
};

const useUserDetail = () => {
  const router = useRouter();
  const queries = useRef('');

  const [user, setUser] = useState<IUser>();
  const [accountList, setAccountList] = useState<IAccount[]>();

  useEffect(() => {
    if (router.query) {
      queries.current = router.query.id as string;
    }
  }, [router.query]);

  const { resAccounts, resUsers } = useUserQuery({ id: queries.current });

  useEffect(() => {
    if (resAccounts.data && resUsers) {
      const { data: accountsData } = resAccounts.data;
      const { data: userData } = resUsers;

      setUser({
        id: userData?.id,
        name: userData?.name,
        email: userData?.email,
        age: userData?.age,
        genderOrigin:
          userData?.genderOrigin === 1 || userData?.genderOrigin === 3
            ? '남'
            : '여',
        birthDate: userData?.birthDate.slice(0, 10),
        phoneNumber: userData?.phoneNumber,
        lastLogin: userData?.lastLogin.slice(0, 10),
        allowMarketingPush: userData?.allowMarketingPush ? 'O' : 'X',
        isActive: userData?.isActive ? '활성화' : '비활성화',
        isStaff: userData?.isStaff ? '임직원' : '일반',
        createdAt: userData?.createdAt.slice(0, 10),
      });

      const accounts = accountsData.map((account) => {
        const {
          id,
          userId,
          brokerId,
          number,
          status,
          name,
          assets,
          payments,
          isActive,
          createdAt,
        } = account;

        const convertNumber =
          number.slice(0, 2) +
          number.slice(2, number.length - 2).replace(/[0-9]/g, '*') +
          number.slice(-2);

        return {
          id,
          userId,
          brokerName: brokerMap.get(Number(brokerId)),
          number: convertNumberFormat(Number(brokerId), convertNumber),
          status: statusMap.get(status),
          name,
          assetColor: setAssetColor(assets, payments),
          assets: Math.ceil(Number(assets)).toLocaleString() + ' 원',
          payments: Math.ceil(Number(payments)).toLocaleString() + ' 원',
          isActive: isActive ? '활성화' : '비활성화',
          createdAt: createdAt.slice(0, 10),
        };
      });
      setAccountList(accounts);
    }
  }, [resAccounts.isFetched, resUsers.isFetched]);

  return { user, accountList };
};

export default useUserDetail;
