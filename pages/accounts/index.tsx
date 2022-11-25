import httpInstance from '@src/api/httpInstance';
import AccountsSelect from '@src/components/accounts/AccountsSelect';
import AccountsTable from '@src/components/accounts/AccountsTable';
import Search from '@src/components/common/Search';
import { IAccount } from '@src/models/IAccount';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { styled } from '@mui/material';
import Pagination from '@src/components/common/Pagination';

const AccountListPage = () => {
  return (
    <div>
      <S.Header>
        <AccountsSelect />
        <Search placeholder="계좌명 검색" />
      </S.Header>
      <AccountsTable />
      <Pagination />
    </div>
  );
};

export default AccountListPage;

export const getServerSideProps = async (context: any) => {
  const queryClient = new QueryClient();
  const token = context.req.cookies.token;

  const { page, broker, status, isActive, q } = context.query;

  await Promise.all([
    queryClient.prefetchQuery(['accounts'], async () => {
      try {
        const { headers, data } = await httpInstance.get<IAccount[]>(
          'http://localhost:8000/accounts',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              _page: page,
              _limit: 15,
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
    queryClient.prefetchQuery(['users'], async () => {
      try {
        const { headers, data } = await httpInstance.get<IAccount[]>(
          'http://localhost:8000/users',
          {
            headers: {
              Authorization: `Bearer ${token}`,
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
