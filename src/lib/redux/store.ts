'use client';

import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './reducers/auth';
import requestJson from './reducers/requestJson';
import responseValue from './reducers/responseValue';
import queryVariables from './reducers/queryVariables';
import httpHeaders from './reducers/httpHeaders';
import graphqlApi from './reducers/graphqlApi';
import { createWrapper } from 'next-redux-wrapper';

export const rootReducer = combineReducers({
  authReducer,
  requestJson,
  responseValue,
  queryVariables,
  httpHeaders,
  graphqlApi,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export default setupStore;

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];

export const wrapper = createWrapper<AppStore>(setupStore, { debug: true });
