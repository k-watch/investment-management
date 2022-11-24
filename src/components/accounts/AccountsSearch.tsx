import { useRef } from 'react';
import { useRouter } from 'next/router';
import { TextField } from '@mui/material';

import { queryParams } from '@src/utils/common';
import { QUERY_PARAM_KEYWORD } from '@src/types/enum';

const AccountsSearch = () => {
  const router = useRouter();

  const accountRef = useRef<HTMLInputElement>(null);

  const handleChange = () => {
    if (accountRef.current) {
      queryParams(router, QUERY_PARAM_KEYWORD.Q, accountRef.current.value, {
        shallow: true,
      });
    }
  };

  return (
    <div>
      <TextField
        size="small"
        placeholder="계좌명 검색"
        inputRef={accountRef}
        variant="outlined"
        onChange={handleChange}
      />
    </div>
  );
};

export default AccountsSearch;
