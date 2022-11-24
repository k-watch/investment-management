import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Pagination } from '@mui/material';

import { accountsSelector } from '@src/store/accounts/accounts';
import { queryParams } from '@src/utils/common';
import { QUERY_PARAM_KEYWORD } from '@src/types/enum';

const AccountsPagination = () => {
  const { totalPage } = useSelector(accountsSelector);

  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    queryParams(router, QUERY_PARAM_KEYWORD.PAGE, page.toString());
  };

  return <Pagination count={totalPage} onChange={handleChange} />;
};

export default AccountsPagination;
