import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import useAccountList from './hooks/useAccountsTable';

const AccountsTable = () => {
  const { list } = useAccountList();

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
            list.map((account) => (
              <StyledTableRow key={account.id}>
                <StyledTableCell align="center">
                  {account.userName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {account.brokerName}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {account.number}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {account.status}
                </StyledTableCell>
                <StyledTableCell align="center">{account.name}</StyledTableCell>
                <StyledTableCell className={account.assetColor} align="right">
                  {account.assets}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {account.payments}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {account.isActive}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {account.createdAt}
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

  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));
