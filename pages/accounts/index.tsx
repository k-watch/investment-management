import Head from 'next/head';
import { GetServerSidePropsContext } from 'next/types';
import { AxiosError } from 'axios';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { styled } from '@mui/material/styles';

import AccountsSelect from '@src/components/accounts/AccountsSelect';
import AccountsTable from '@src/components/accounts/AccountsTable';
import CommonSearch from '@src/components/common/CommonSearch';
import CommonPagination from '@src/components/common/CommonPagination';
import httpInstance from '@src/api/httpInstance';
import { IAccount } from '@src/models/IAccount';
import { PAGE_LIMIT } from '@src/types/enum';

const AccountListPage = () => {
  return (
    <>
      <Head>
        <title>계좌 목록</title>
      </Head>
      <S.Header>
        <AccountsSelect />
        <CommonSearch placeholder="계좌명 검색" />
      </S.Header>
      <AccountsTable />
      <CommonPagination />
    </>
  );
};

export default AccountListPage;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const queryClient = new QueryClient();
  const token = context.req.cookies.token;

  const { page, broker, status, isActive, q } = context.query;

  await Promise.all([
    queryClient.prefetchQuery(['accounts'], async () => {
      try {
        const { headers, data } = await httpInstance.get<IAccount[]>(
          `/accounts`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              _page: page,
              _limit: PAGE_LIMIT,
              brokerId: broker,
              status: status,
              isActive: isActive,
              q,
            },
          }
        );

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
    queryClient.prefetchQuery(['users'], async () => {
      try {
        const { headers, data } = await httpInstance.get<IAccount[]>(`/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
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
