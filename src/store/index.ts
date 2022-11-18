import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/auth';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
