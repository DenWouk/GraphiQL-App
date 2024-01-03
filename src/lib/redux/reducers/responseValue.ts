import { createSlice } from '@reduxjs/toolkit';

const responseValueSlice = createSlice({
  name: 'responseValueState',
  initialState: {
    responseValue: localStorage.getItem('request-value') || '',
  },
  reducers: {
    setResponseValue: (state, action) => {
      state.responseValue = action.payload;
      localStorage.setItem('request-value', state.responseValue);
    },
  },
});

export const { setResponseValue } = responseValueSlice.actions;

export default responseValueSlice.reducer;
