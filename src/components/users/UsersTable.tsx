import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useUsersTable from './hooks/useUsersTable';

const UsersTable = () => {
  const { list } = useUsersTable();

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">고객명</StyledTableCell>
            <StyledTableCell align="center">이메일</StyledTableCell>
            <StyledTableCell align="center">성별</StyledTableCell>
            <StyledTableCell align="center">생년월일</StyledTableCell>
            <StyledTableCell align="center">휴대폰 번호</StyledTableCell>
            <StyledTableCell align="center">최근 로그인</StyledTableCell>
            <StyledTableCell align="center">수신동의</StyledTableCell>
            <StyledTableCell align="center">계좌 활성화</StyledTableCell>
            <StyledTableCell align="center">임지원 여부</StyledTableCell>
            <StyledTableCell align="center">가입일</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list &&
            list.map((user) => (
              <StyledTableRow key={user.id}>
                <StyledTableCell align="center">{user.name}</StyledTableCell>
                <StyledTableCell align="center">{user.email}</StyledTableCell>
                <StyledTableCell align="center">
                  {user.genderOrigin}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {user.birthDate}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {user.phoneNumber}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {user.lastLogin}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {user.allowMarketingPush}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {user.isActive}
                </StyledTableCell>
                <StyledTableCell align="center">{user.isStaff}</StyledTableCell>
                <StyledTableCell align="center">
                  {user.createdAt}
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;

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
