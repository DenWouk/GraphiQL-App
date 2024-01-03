import { createSlice } from '@reduxjs/toolkit';

const httpHeadersSlice = createSlice({
  name: 'httpHeaders',
  initialState: {
    httpHeaders: '',
  },
  reducers: {
    setHttpHeaders: (state, action) => {
      state.httpHeaders = action.payload;
    },
  },
});

export const { setHttpHeaders } = httpHeadersSlice.actions;

export default httpHeadersSlice.reducer;
