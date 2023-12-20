import { createSlice } from '@reduxjs/toolkit';

const responseValueSlice = createSlice({
  name: 'responseValueState',
  initialState: {
    responseValue: '',
  },
  reducers: {
    setResponseValue: (state, action) => {
      state.responseValue = action.payload;
    },
  },
});

export const { setResponseValue } = responseValueSlice.actions;

export default responseValueSlice.reducer;
