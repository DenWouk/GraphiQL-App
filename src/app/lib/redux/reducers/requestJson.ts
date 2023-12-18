import { createSlice } from '@reduxjs/toolkit';

const requestJsonSlice = createSlice({
  name: 'requestJsonState',
  initialState: {
    requestJson: '',
  },
  reducers: {
    setRequestJson: (state, action) => {
      state.requestJson = action.payload;
    },
  },
});

export const { setRequestJson } = requestJsonSlice.actions;

export default requestJsonSlice.reducer;
