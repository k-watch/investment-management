import { configureStore } from '@reduxjs/toolkit';
import accountsReducer from './accounts/accounts';

export const store = configureStore({
  reducer: {
    accounts: accountsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
