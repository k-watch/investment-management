import { useRef } from 'react';
import { useRouter } from 'next/router';
import { TextField } from '@mui/material';

import { queryParams } from '@src/utils/common';
import { QUERY_PARAM_KEYWORD } from '@src/types/enum';

const Search = () => {
  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = () => {
    if (inputRef.current) {
      queryParams(router, QUERY_PARAM_KEYWORD.Q, inputRef.current.value, {
        shallow: true,
      });
    }
  };

  return (
    <div>
      <TextField
        size="small"
        placeholder="사용자 검색"
        inputRef={inputRef}
        variant="outlined"
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;
