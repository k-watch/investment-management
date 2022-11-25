import React, { use } from 'react';
import useUserDetail from './hooks/useUserDetail';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import UserDialog from './UserDialog';
import { reqDeleteUser } from '@src/api/user';

const UserDetail = () => {
  const { user, accountList } = useUserDetail();

  return (
    <div>
      <UserDialog
        name={user?.name}
        email={user?.email}
        age={user?.age}
        gender={user?.genderOrigin}
        birth={user?.birthDate}
        phone={user?.phoneNumber}
        isStaff={user?.isStaff}
      />
      <button onClick={() => reqDeleteUser(user.id)}>삭제</button>
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
            {user && (
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
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
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
            {accountList &&
              accountList.map((account) => (
                <StyledTableRow key={account.id}>
                  <StyledTableCell align="center">
                    {account.brokerName}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {account.number}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {account.status}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    {account.name}
                  </StyledTableCell>
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
    </div>
  );
};

export default UserDetail;

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
