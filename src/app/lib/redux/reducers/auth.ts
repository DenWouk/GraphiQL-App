import { createSlice } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

const authSlice = createSlice({
  name: 'authState',
  initialState: {
    authUser: <User | null>null,
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
  },
});

export const { setAuthUser } = authSlice.actions;

export default authSlice.reducer;
