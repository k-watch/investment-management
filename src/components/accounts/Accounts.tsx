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
import {
  ACCOUNT_STATUS,
  API_URL,
  BROKERS,
  convertNumberFormat,
} from '@src/types/enum';
import { useQueries, useQuery } from '@tanstack/react-query';
import { reqGetAccountList, reqGetUsers } from '@src/api/accounts';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { blue } from '@mui/material/colors';
import { red } from '@mui/material/colors';

const test = (row) => {
  return row.assets === row.payments
    ? null
    : row.assets > row.payments
    ? 'revenue'
    : 'loss';
};

const AccountList = () => {
  const router = useRouter();
  const [list, setList] = useState<IAccount[]>([]);
  const { page, q, broker, status, isActive } = router.query;
  const [resAccounts, resUsers] = useQueries({
    queries: [
      {
        queryKey: ['accounts'],
        queryFn: () => reqGetAccountList(router.query),
      },
      {
        queryKey: ['users'],
        queryFn: () => reqGetUsers(),
      },
    ],
  });

  useEffect(() => {
    if (resAccounts.data && resUsers.data && list.length === 0) {
      const usersMap = (resUsers.data as any).reduce((map, user: any) => {
        map.set(user.id, user);
        return map;
      }, new Map());

      const accounts = resAccounts.data.map((account) => {
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

      setList(accounts);
    }
  }, [resAccounts, resUsers]);

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

export default AccountList;

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
