import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { blueGrey } from '@mui/material/colors';

import { PAGE_LIMIT } from '@src/types/enum';

import useAccountList from './hooks/useAccountsTable';
import CommonSkeleton from '../common/CommonSkeleton';

const AccountsTable = () => {
  const { list, isLoading } = useAccountList();

  if (isLoading) return CommonSkeleton(PAGE_LIMIT);

  return (
    <TableContainer component={Paper}>
      <S.Table>
        <TableHead>
          <TableRow>
            <S.TableCell align="center">고객명</S.TableCell>
            <S.TableCell align="center">증권사</S.TableCell>
            <S.TableCell align="center">계좌번호</S.TableCell>
            <S.TableCell align="center">계좌상태</S.TableCell>
            <S.TableCell align="center">계좌명</S.TableCell>
            <S.TableCell align="center">평가금액</S.TableCell>
            <S.TableCell align="center">입금금액</S.TableCell>
            <S.TableCell align="center">계좌활성화여부</S.TableCell>
            <S.TableCell align="center">계좌개설일</S.TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list &&
            list.map((account) => (
              <S.TableRow key={account.id}>
                <S.TableCell align="center">{account.userName}</S.TableCell>
                <S.TableCell align="center">{account.brokerName}</S.TableCell>
                <S.TableCell align="center">{account.number}</S.TableCell>
                <S.TableCell align="center">{account.status}</S.TableCell>
                <S.TableCell align="center">{account.name}</S.TableCell>
                <S.TableCell className={account.assetColor} align="right">
                  {account.assets}
                </S.TableCell>
                <S.TableCell align="right">{account.payments}</S.TableCell>
                <S.TableCell align="center">{account.isActive}</S.TableCell>
                <S.TableCell align="center">{account.createdAt}</S.TableCell>
              </S.TableRow>
            ))}
        </TableBody>
      </S.Table>
    </TableContainer>
  );
};

export default AccountsTable;

const S = {
  Table: styled(Table)(() => ({
    '&.MuiTable-root': {
      width: '100%',
    },
  })),
  TableCell: styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: `${blueGrey[900]}`,
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
  })),
  TableRow: styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },

    '&:last-child td, &:last-child th': {
      border: 0,
    },
  })),
};
