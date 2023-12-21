import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'authState',
  initialState: {
    authUser: <string | null>null,
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
  },
});

export const { setAuthUser } = authSlice.actions;

export default authSlice.reducer;
