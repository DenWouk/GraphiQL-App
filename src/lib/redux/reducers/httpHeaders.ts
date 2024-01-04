import { a } from '@/utils/getLocalStorage';
import { createSlice } from '@reduxjs/toolkit';

const httpHeadersSlice = createSlice({
  name: 'httpHeaders',
  initialState: {
    httpHeaders: a('http-headers'),
  },
  reducers: {
    setHttpHeaders: (state, action) => {
      state.httpHeaders = action.payload;
      localStorage.setItem('http-headers', state.httpHeaders);
    },
  },
});

export const { setHttpHeaders } = httpHeadersSlice.actions;

export default httpHeadersSlice.reducer;
