import httpInstance from '@src/api/httpInstance';
import UserDetail from '@src/components/user/UserDetail';
import { IUser } from '@src/models/IUser';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const UserPage = () => {
  return (
    <div>
      <UserDetail />
    </div>
  );
};

export default UserPage;

export const getServerSideProps = async (context: any) => {
  const queryClient = new QueryClient();
  const token = context.req.cookies.token;

  const { id } = context.query;

  await Promise.all([
    queryClient.prefetchQuery(['accounts'], async () => {
      try {
        const { data } = await httpInstance.get<IUser[]>(
          'http://localhost:8000/users',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              id,
            },
          }
        );

        return data;
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
