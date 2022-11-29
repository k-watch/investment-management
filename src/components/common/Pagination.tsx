import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Pagination as MuiPagination } from '@mui/material';
import { styled } from '@mui/material';

import { accountsSelector } from '@src/store/accounts/accounts';
import { queryParams } from '@src/utils/common';
import { QUERY_PARAM_KEYWORD } from '@src/types/enum';

const Pagination = () => {
  const { totalPage } = useSelector(accountsSelector);

  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<unknown>, page: number) => {
    queryParams(router, QUERY_PARAM_KEYWORD.PAGE, page.toString(), {
      shallow: true,
    });
  };

  return <S.Pagination count={totalPage} onChange={handleChange} />;
};

export default Pagination;

const S = {
  Pagination: styled(MuiPagination)(() => ({
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30,
  })),
};
