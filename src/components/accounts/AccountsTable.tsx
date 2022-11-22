import { IAccount } from '@src/models/IAccount';
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ACCOUNT_STATUS, BROKERS, convertNumberFormat } from '@src/types/enum';
import { useQueries, useQuery } from '@tanstack/react-query';
import { reqGetAccountList, reqGetUsers } from '@src/api/accounts';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { blue } from '@mui/material/colors';
import { red } from '@mui/material/colors';
import { useDispatch } from 'react-redux';
import { setTotalPage } from '@src/store/accounts/accounts';

const test = (row) => {
  return row.assets === row.payments
    ? null
    : row.assets > row.payments
    ? 'revenue'
    : 'loss';
};

const activeList = [
  ['true', '활성화'],
  ['false', '비활성화'],
];

const _statusMap = new Map([
  [9999, '관리자확인필요'],
  [1, '입금대기'],
  [2, '운용중'],
  [3, '투자중지'],
  [4, '해지'],
]);

const _nameMap = new Map([
  [209, '유안타증권'],
  [218, '현대증권'],
  [230, '미래에셋증권'],
  [238, '대우증권'],
  [240, '삼성증권'],
  [243, '한국투자증권'],
  [247, '우리투자증권'],
  [261, '교보증권'],
  [262, '하이투자증권'],
  [263, 'HMC투자증권'],
  [264, '키움증권'],
  [265, '이베스트투자증권'],
  [266, 'SK증권'],
  [267, '대신증권'],
  [268, '아이엠투자증권'],
  [269, '한화투자증권'],
  [270, '하나대투자증권'],
  [279, '동부증권'],
  [280, '유진투자증권'],
  [288, '카카오페이증권'],
  [287, '메리츠종합금융증권'],
  [290, '부국증권'],
  [291, '신영증권'],
  [292, 'LIG투자증권'],
  [271, '토스증권'],
]);

function getByValue(map, searchValue) {
  for (const [key, value] of map.entries()) {
    if (value === searchValue) return key;
  }
}

const AccountsTable = () => {
  const router = useRouter();
  const [list, setList] = useState<IAccount[]>([]);

  const query = useMemo(() => {
    if (router.query) {
      return {
        page: router.query.page ? Number(router.query.page) : 1,
        broker: getByValue(_nameMap, router.query.broker),
        status: getByValue(_statusMap, router.query.status),
        isActive:
          router.query.isActive === undefined
            ? undefined
            : router.query.isActive === '활성화'
            ? 'true'
            : 'false',
        q: router.query.q,
      };
    }
  }, [router.query]);

  const [resAccounts, resUsers] = useQueries({
    queries: [
      {
        queryKey: ['accounts', query],
        queryFn: () => reqGetAccountList(query),
      },
      {
        queryKey: ['users'],
        queryFn: () => reqGetUsers(),
      },
    ],
  });

  useEffect(() => {
    if (resAccounts.data && resUsers.data) {
      const usersMap = (resUsers.data.data as any).reduce((map, user: any) => {
        map.set(user.id, user);
        return map;
      }, new Map());

      const accounts = resAccounts.data.data.map((account) => {
        const {
          id,
          userId,
          uuid,
          brokerId,
          number,
          status,
          name: accountName,
          assets,
          payments,
          isActive,
          createdAt,
        } = account;

        const { name } = usersMap.get(userId);
        const a =
          number.slice(0, 2) +
          number.slice(2, number.length - 2).replace(/[0-9]/g, '*') +
          number.slice(-2);
        return {
          id,
          userId,
          uuid,
          brokerName: BROKERS[brokerId.toString()],
          number: convertNumberFormat(Number(brokerId), a),
          status: ACCOUNT_STATUS[status.toString()],
          userName: name,
          name: accountName,
          assets: Math.ceil(Number(assets)).toLocaleString() + ' 원',
          payments: Math.ceil(Number(payments)).toLocaleString() + ' 원',
          createdAt: createdAt.slice(0, 10),
          isActive: isActive ? '활성화' : '비활성화',
        };
      });
      dispatch(setTotalPage(resAccounts.data.totalCount));
      setList(accounts);
    }
  }, [resAccounts.data, resUsers.data]);
  const dispatch = useDispatch();
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">고객명</StyledTableCell>
            <StyledTableCell align="center">증권사</StyledTableCell>
            <StyledTableCell align="center">계좌번호</StyledTableCell>
            <StyledTableCell align="center">계좌상태</StyledTableCell>
            <StyledTableCell align="center">계좌명</StyledTableCell>
            <StyledTableCell align="center">평가금액</StyledTableCell>
            <StyledTableCell align="center">입금금액</StyledTableCell>
            <StyledTableCell align="center">계좌활성화여부</StyledTableCell>
            <StyledTableCell align="center">계좌개설일</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list &&
            list.map((row) => (
              <StyledTableRow key={row.id}>
                <StyledTableCell align="center">{row.userName}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.brokerName}
                </StyledTableCell>
                <StyledTableCell align="center">{row.number}</StyledTableCell>
                <StyledTableCell align="center">{row.status}</StyledTableCell>
                <StyledTableCell align="center">{row.name}</StyledTableCell>
                <StyledTableCell className={test(row)} align="right">
                  {row.assets}
                </StyledTableCell>
                <StyledTableCell align="right">{row.payments}</StyledTableCell>
                <StyledTableCell align="center">{row.isActive}</StyledTableCell>
                <StyledTableCell align="center">
                  {row.createdAt}
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AccountsTable;

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  '&.MuiTableCell-body': {
    '&.revenue': {
      color: 'blue',
    },

    '&.loss': {
      color: 'red',
    },
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
