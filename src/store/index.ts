import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth';
import accountsReducer from './accounts/accounts';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    accounts: accountsReducer,
  },
});
