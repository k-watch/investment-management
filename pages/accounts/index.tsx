import { httpInstance } from '@src/api/httpInstance';
import AccountList from '@src/components/accounts/Accounts';
import { IAccount } from '@src/models/IAccount';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { GetServerSideProps } from 'next';

const AccountListPage = () => {
  return (
    <div>
      <AccountList />
    </div>
  );
};

export default AccountListPage;

export const getServerSideProps = async (context: any) => {
  const queryClient = new QueryClient();
  const token = context.req.cookies.token;

  const { page, broker, status, isActive, q } = context.query;
  console.log(page);
  await Promise.all([
    queryClient.prefetchQuery(['accounts'], async () => {
      return await httpInstance.get<IAccount[]>(
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
    }),
    queryClient.prefetchQuery(['users'], async () => {
      return await httpInstance.get<IAccount[]>('http://localhost:8000/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }),
  ]);

  return {
    props: { dehydratedState: dehydrate(queryClient) },
  };
};
