import { createSlice } from '@reduxjs/toolkit';
import { GraphQLSchema } from 'graphql';
const schemaSlice = createSlice({
  name: 'schemaState',
  initialState: {
    schema: <GraphQLSchema | undefined>undefined,
  },
  reducers: {
    setSchema: (state, action) => {
      state.schema = action.payload;
    },
  },
});

export const { setSchema } = schemaSlice.actions;

export default schemaSlice.reducer;
