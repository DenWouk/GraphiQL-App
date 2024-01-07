import { getLocalStorage } from '@/utils/getLocalStorage';
import { createSlice } from '@reduxjs/toolkit';

const graphqlApiSlice = createSlice({
  name: 'graphqlApiState',
  initialState: {
    graphqlApi: getLocalStorage('graphql-api'),
  },
  reducers: {
    setGraphqlApi: (state, action) => {
      state.graphqlApi = action.payload;
      localStorage.setItem('graphql-api', state.graphqlApi);
    },
  },
});

export const { setGraphqlApi } = graphqlApiSlice.actions;

export default graphqlApiSlice.reducer;
