import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../index';

interface AccountsState {
  totalPage: number;
}

const initialState: AccountsState = {
  totalPage: 0,
};

export const accountsSlice = createSlice({
  name: 'accounts',
  initialState,
  reducers: {
    setTotalPage(state, { payload: totalCount }) {
      state.totalPage = Math.ceil(totalCount / 15);
    },
  },
});

export const accountsSelector = (state: RootState) => state.accounts;
export const { setTotalPage } = accountsSlice.actions;

export default accountsSlice.reducer;
