import * as React from 'react';
import {
  QueryClient,
  QueryClientProvider,
  Hydrate,
} from '@tanstack/react-query';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';

import initStyles from '@src/styles/initStyles';
import { createEmotionCache } from '@src/utils/createEmotionCache';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '@src/styles/theme';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { store } from '@src/store';
import { Global } from '@emotion/react';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}
const queryClient = new QueryClient();

const MyApp: React.FunctionComponent<MyAppProps> = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  return (
    <>
      <CacheProvider value={emotionCache}>
        <Global styles={initStyles} />
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <Hydrate state={pageProps.dehydratedState}>
              <ReactQueryDevtools initialIsOpen={false} />
              <CssBaseline />
              <Provider store={store}>
                <Component {...pageProps} />
              </Provider>
            </Hydrate>
          </QueryClientProvider>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
};

export default MyApp;
