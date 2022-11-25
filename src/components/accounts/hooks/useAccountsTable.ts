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

// ********************
// AccountsTableProps
// id: 계좌 ID
// userId: 계좌주 ID
// userName: 계좌주
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
    if (router.query) {
      return {
        page: Number(router.query.page),
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

      setList(accounts);
    }
  }, [resAccounts.isFetched, resUsers.isFetched, dispatch]);

  return { list };
};

export default useAccountList;
