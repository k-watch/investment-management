import { createSlice, Slice } from '@reduxjs/toolkit';

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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const accountsSelector = (state: any) => state.accounts;
export const { setTotalPage } = accountsSlice.actions;

export default accountsSlice.reducer;
