import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { grey, blueGrey } from '@mui/material/colors';

import { PAGE_LIMIT } from '@src/types/enum';

import useUsersTable from './hooks/useUsersTable';
import CommonSkeleton from '../common/CommonSkeleton';

const UsersTable = () => {
  const { list, isLoading, handleClick } = useUsersTable();

  if (isLoading) return CommonSkeleton(PAGE_LIMIT);

  return (
    <TableContainer component={Paper}>
      <S.Table>
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
        <TableBody>
          {list &&
            list.map((user) => (
              <S.TableRow key={user.id} onClick={() => handleClick(user.id)}>
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
            ))}
        </TableBody>
      </S.Table>
    </TableContainer>
  );
};

export default UsersTable;

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
    '&.MuiTableRow-root': {
      '&:hover': {
        backgroundColor: grey[300],
        cursor: 'pointer',
      },
    },

    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },

    '&:last-child td, &:last-child th': {
      border: 0,
    },
  })),
};
