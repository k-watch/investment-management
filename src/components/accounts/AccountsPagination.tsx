import { Pagination, SelectChangeEvent } from '@mui/material';
import { accountsSelector } from '@src/store/accounts/accounts';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';

export const getParams = (query: { [key: string]: any }) =>
  Object.keys(query).reduce((result: string, key: string) => {
    if (!result) {
      result += `?${key}=${query[key]}`;
    } else {
      result += `&${key}=${query[key]}`;
    }
    return result;
  }, '');

const AccountsPagination = () => {
  const { totalPage } = useSelector(accountsSelector);

  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    const path = router.asPath.split('?')[1];
    const searchParams = new URLSearchParams(path);

    searchParams.delete('page');
    searchParams.set('page', page.toString());

    router.push(`${router.pathname}?${searchParams}`);
  };
  return <Pagination count={totalPage} onChange={handleChange} />;
};

export default AccountsPagination;
