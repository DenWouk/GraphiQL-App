import { getLocalStorage } from '@/utils/getLocalStorage';
import { createSlice } from '@reduxjs/toolkit';

const queryVariablesSlice = createSlice({
  name: 'queryVariables',
  initialState: {
    queryVariables: getLocalStorage('query-variables'),
  },
  reducers: {
    setQueryVariables: (state, action) => {
      state.queryVariables = action.payload;
      localStorage.setItem('query-variables', state.queryVariables);
    },
  },
});

export const { setQueryVariables } = queryVariablesSlice.actions;

export default queryVariablesSlice.reducer;
