import { createSlice } from '@reduxjs/toolkit';
import { IntrospectionSchema } from 'graphql';
const schemaSlice = createSlice({
  name: 'schemaState',
  initialState: {
    schema: <IntrospectionSchema | undefined>undefined,
  },
  reducers: {
    setSchema: (state, action) => {
      state.schema = action.payload;
    },
  },
});

export const { setSchema } = schemaSlice.actions;

export default schemaSlice.reducer;
