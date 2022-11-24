import { NextRouter } from 'next/router';

interface TransitionOptions {
  shallow?: boolean;
  locale?: string | false;
  scroll?: boolean;
  unstable_skipClientCache?: boolean;
}

export const queryParams = (
  router: NextRouter,
  param: string,
  value: string,
  options?: TransitionOptions
) => {
  // query string 가져옴 /xxx?query=1
  const path = router.asPath.split('?')[1];
  const searchParams = new URLSearchParams(path);

  searchParams.delete(param);
  // 값 체크를 안하면 query= 와 같은 상황이 발생
  if (value) {
    searchParams.set(param, value);
  }

  router.push(`${router.pathname}?${searchParams}`, undefined, options);
};

export const getMapValue = <K, V>(
  map: Map<K, V>,
  searchValue: string | string[] | undefined
) => {
  for (const [key, value] of map.entries()) {
    if (value === searchValue) {
      return key;
    }
  }
};
