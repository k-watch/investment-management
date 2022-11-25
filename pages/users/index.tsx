import Head from 'next/head';
import { AxiosError } from 'axios';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { styled } from '@mui/material';

import UsersSelect from '@src/components/users/UsersSelect';
import Search from '@src/components/common/Search';
import UsersTable from '@src/components/users/UsersTable';
import Pagination from '@src/components/common/Pagination';
import httpInstance from '@src/api/httpInstance';
import { IUser } from '@src/models/IUser';

const UsersPage = () => {
  return (
    <>
      <Head>사용자 목록</Head>
      <S.Header>
        <UsersSelect />
        <Search placeholder="사용자 검색" />
      </S.Header>
      <UsersTable />
      <Pagination />
    </>
  );
};

export default UsersPage;

export const getServerSideProps = async (context: any) => {
  const queryClient = new QueryClient();
  const token = context.req.cookies.token;

  const { page, isActive, isStaff, q } = context.query;

  await Promise.all([
    queryClient.prefetchQuery(['accounts'], async () => {
      try {
        const { headers, data } = await httpInstance.get<IUser[]>(
          'http://localhost:8000/users',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              _page: page,
              _limit: 15,
              isActive,
              isStaff,
              q,
            },
          }
        );

        return {
          totalCount: headers['x-total-count'] || 0,
          data,
        };
      } catch (e) {
        if (e instanceof AxiosError) {
          return {
            redirect: {
              destination: '/login',
            },
            props: {},
          };
        }
      }
    }),
  ]);

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};

const S = {
  Header: styled('div')(() => ({
    display: 'flex',
    marginBottom: 30,
  })),
};
