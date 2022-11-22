import { TextField } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useRef } from 'react';

const AccountsSearch = () => {
  const router = useRouter();

  const emailRef = useRef<any>();

  const handleChange = () => {
    if (emailRef.current) {
      const path = router.asPath.split('?')[1];
      const searchParams = new URLSearchParams(path);

      searchParams.delete('q');
      if (emailRef.current.value) {
        searchParams.set('q', emailRef.current.value);
      }
      router.push(`${router.pathname}?${searchParams}`, undefined, {
        shallow: true,
      });
    }
  };

  return (
    <div>
      <TextField
        size="small"
        placeholder="계좌명 검색"
        inputRef={emailRef}
        variant="outlined"
        onChange={handleChange}
      />
    </div>
  );
};

export default AccountsSearch;
