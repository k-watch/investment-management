import * as React from 'react';
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from '@tanstack/react-query';

import { createEmotionCache } from '@src/styles/utils/createEmotionCache';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '@src/styles/theme';
import { AppProps } from 'next/app';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const queryClient = new QueryClient();

  return (
    <>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <ReactQueryDevtools initialIsOpen={false} />
              <CssBaseline />
              <Component {...pageProps} />
            </Hydrate>
          </QueryClientProvider>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
};

export default MyApp;
