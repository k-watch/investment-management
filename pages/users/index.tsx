import Head from 'next/head';
import { GetServerSidePropsContext } from 'next/types';
import { AxiosError } from 'axios';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { styled } from '@mui/material/styles';

import UsersSelect from '@src/components/users/UsersSelect';
import CommonSearch from '@src/components/common/CommonSearch';
import UsersTable from '@src/components/users/UsersTable';
import CommonPagination from '@src/components/common/CommonPagination';
import httpInstance from '@src/api/httpInstance';
import { IUser } from '@src/models/IUser';
import { PAGE_LIMIT } from '@src/types/enum';

const UsersPage = () => {
  return (
    <>
      <Head>
        <title>사용자 목록</title>
      </Head>
      <S.Header>
        <UsersSelect />
        <CommonSearch placeholder="사용자 검색" />
      </S.Header>
      <UsersTable />
      <CommonPagination />
    </>
  );
};

export default UsersPage;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const queryClient = new QueryClient();
  const token = context.req.cookies.token;

  const { page, isActive, isStaff, q } = context.query;

  await Promise.all([
    queryClient.prefetchQuery(['accounts'], async () => {
      try {
        const { headers, data } = await httpInstance.get<IUser[]>(`/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            _page: page ? page : 1,
            _limit: PAGE_LIMIT,
            isActive,
            isStaff,
            q,
          },
        });

        return {
          totalCount: headers['x-total-count'] || 0,
          data,
        };
      } catch (e) {
        if (e instanceof AxiosError && e.response?.status === 401) {
          context.res.setHeader('Set-Cookie', [
            `token=expired; Max-Age=0; Path=/`,
          ]);
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
