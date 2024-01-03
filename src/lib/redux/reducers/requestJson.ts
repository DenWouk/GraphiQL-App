import { createSlice } from '@reduxjs/toolkit';

const requestJsonSlice = createSlice({
  name: 'requestJsonState',
  initialState: {
    requestJson: localStorage.getItem('response-json') || '',
  },
  reducers: {
    setRequestJson: (state, action) => {
      state.requestJson = action.payload;
      localStorage.setItem('response-json', state.requestJson);
    },
  },
});

export const { setRequestJson } = requestJsonSlice.actions;

export default requestJsonSlice.reducer;
