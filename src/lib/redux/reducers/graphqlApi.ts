import { a } from '@/utils/getLocalStorage';
import { createSlice } from '@reduxjs/toolkit';

const graphqlApiSlice = createSlice({
  name: 'graphqlApiState',
  initialState: {
    graphqlApi: a('graphq-api'),
  },
  reducers: {
    setGraphqlApi: (state, action) => {
      state.graphqlApi = action.payload;
      localStorage.setItem('graphq-api', state.graphqlApi);
    },
  },
});

export const { setGraphqlApi } = graphqlApiSlice.actions;

export default graphqlApiSlice.reducer;
