import Head from 'next/head';
import { GetServerSidePropsContext } from 'next/types';
import { AxiosError } from 'axios';
import { dehydrate, QueryClient } from '@tanstack/react-query';

import httpInstance from '@src/api/httpInstance';
import UserDetail from '@src/components/user/UserDetail';
import { IUser } from '@src/models/IUser';
import { IAccount } from '@src/models/IAccount';

const UserPage = () => {
  return (
    <>
      <Head>
        <title>사용자 정보</title>
      </Head>
      <UserDetail />
    </>
  );
};

export default UserPage;

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const queryClient = new QueryClient();
  const token = context.req.cookies.token;

  const { id } = context.query;

  await Promise.all([
    queryClient.prefetchQuery(['user', id], async () => {
      try {
        const { data } = await httpInstance.get<IUser[]>(`/users`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            id,
          },
        });

        return data;
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
    queryClient.prefetchQuery(['user', 'accounts', id], async () => {
      try {
        const { data } = await httpInstance.get<IAccount[]>(`/accounts`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            userId: id,
          },
        });

        return data;
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
