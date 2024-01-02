import { createSlice } from '@reduxjs/toolkit';

const queryVariablesSlice = createSlice({
  name: 'queryVariables',
  initialState: {
    queryVariables: '',
  },
  reducers: {
    setQueryVariables: (state, action) => {
      state.queryVariables = action.payload;
    },
  },
});

export const { setQueryVariables } = queryVariablesSlice.actions;

export default queryVariablesSlice.reducer;
