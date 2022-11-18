import { createSlice } from '@reduxjs/toolkit';
import { IAuth } from '@src/models/IAuth';

type AuthState = IAuth;

const initialState: AuthState = {
  accessToken: '',
  user: {
    email: '',
    id: -1,
  },
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, { payload: auth }) {
      state = { ...auth };
    },
  },
});

export const { setAuth } = authSlice.actions;

export default authSlice.reducer;
