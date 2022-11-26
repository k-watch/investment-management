import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { blueGrey } from '@mui/material/colors';

import { UserDetailProps } from './hooks/useUserDetail';

interface UserTableProps {
  user: UserDetailProps;
}

const UserTable = ({ user }: UserTableProps) => {
  return (
    <>
      <S.Title>사용자 정보</S.Title>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <S.TableCell align="center">고객명</S.TableCell>
              <S.TableCell align="center">이메일</S.TableCell>
              <S.TableCell align="center">성별</S.TableCell>
              <S.TableCell align="center">생년월일</S.TableCell>
              <S.TableCell align="center">휴대폰 번호</S.TableCell>
              <S.TableCell align="center">최근 로그인</S.TableCell>
              <S.TableCell align="center">수신동의</S.TableCell>
              <S.TableCell align="center">계좌 활성화</S.TableCell>
              <S.TableCell align="center">임지원 여부</S.TableCell>
              <S.TableCell align="center">가입일</S.TableCell>
            </TableRow>
          </TableHead>
          {user && (
            <TableBody>
              <S.TableRow key={user.id}>
                <S.TableCell align="center">{user.name}</S.TableCell>
                <S.TableCell align="center">{user.email}</S.TableCell>
                <S.TableCell align="center">{user.genderOrigin}</S.TableCell>
                <S.TableCell align="center">{user.birthDate}</S.TableCell>
                <S.TableCell align="center">{user.phoneNumber}</S.TableCell>
                <S.TableCell align="center">{user.lastLogin}</S.TableCell>
                <S.TableCell align="center">
                  {user.allowMarketingPush}
                </S.TableCell>
                <S.TableCell align="center">{user.isActive}</S.TableCell>
                <S.TableCell align="center">{user.isStaff}</S.TableCell>
                <S.TableCell align="center">{user.createdAt}</S.TableCell>
              </S.TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  );
};

export default UserTable;

const S = {
  Title: styled('h2')(() => ({
    margin: '10px 0',
    fontSize: 17,
    fontWeight: 500,
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
