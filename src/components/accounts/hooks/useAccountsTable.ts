import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import {
  convertNumberFormat,
  getMapValue,
  initAssetColor,
} from '@src/utils/common';
import { setTotalPage } from '@src/store/accounts/accounts';
import { QueriesParmas } from '@src/types';

import { brokerMap, statusMap } from '../types';
import useAccountsQuery from '../api/useAccountsQuery';

interface AccountsTableProps {
  id: number;
  userId: number;
  userName: string | undefined;
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

const useAccountList = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const [list, setList] = useState<AccountsTableProps[]>([]);

  const queries: QueriesParmas = useMemo(() => {
    if (Object.keys(router.query).length !== 0) {
      return {
        page: router.query.page ? Number(router.query.page) : 1,
        broker: getMapValue(brokerMap, router.query.broker),
        status: getMapValue(statusMap, router.query.status),
        isActive:
          router.query.isActive === undefined
            ? undefined
            : router.query.isActive === '활성화'
            ? true
            : false,
        q: router.query.q,
      };
    }
    return {
      page: 1,
    };
  }, [router.query]);

  const { resAccounts, resUsers } = useAccountsQuery(queries);

  useEffect(() => {
    if (resAccounts.data && resUsers.data) {
      const { totalCount, data: accountsData } = resAccounts.data;
      const { data: usersData } = resUsers.data;

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

        const result: AccountsTableProps = {
          id,
          userId,
          userName: usersData.get(userId),
          brokerName: brokerMap.get(Number(brokerId)),
          number: convertNumberFormat(Number(brokerId), convertNumber),
          status: statusMap.get(status),
          name,
          assetColor: initAssetColor(assets, payments),
          assets: Math.ceil(Number(assets)).toLocaleString() + ' 원',
          payments: Math.ceil(Number(payments)).toLocaleString() + ' 원',
          isActive: isActive ? '활성화' : '비활성화',
          createdAt: createdAt.slice(0, 10),
        };

        return result;
      });
      dispatch(setTotalPage(totalCount));

      setList([...accounts]);
    }
  }, [resAccounts.data, dispatch]);

  return { list, isLoading: resAccounts.isLoading };
};

export default useAccountList;
