import { createSlice } from '@reduxjs/toolkit';

const graphqlApiSlice = createSlice({
  name: 'graphqlApiState',
  initialState: {
    graphqlApi: '',
  },
  reducers: {
    setGraphqlApi: (state, action) => {
      state.graphqlApi = action.payload;
    },
  },
});

export const { setGraphqlApi } = graphqlApiSlice.actions;

export default graphqlApiSlice.reducer;
