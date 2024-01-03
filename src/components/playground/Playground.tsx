'use client';

import './Playground.css';
import JSON5 from 'json5';
import Button from '@mui/material/Button/Button';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks/redux';
import { setRequestJson } from '@/lib/redux/reducers/requestJson';
import ResponseEditor from './responseEditor/ResponseEditor';
import RequestEditor from './requestEditor/RequestEditor';
import ApiInput from './apiInput/ApiInput';
import { toPrettify } from '@/utils/prettify';
import { setResponseValue } from '@/lib/redux/reducers/responseValue';
import { addVariablesValues } from '@/utils/addVariablesValues';
import QueryVariablesEditor from './queryVariablesEditor/QueryVariablesEditor';
import HeadersEditor from './headersEditor/HeadersEditor';

export default function Playground() {
  const dispatch = useAppDispatch();
  const api = useAppSelector((state) => state.graphqlApi.graphqlApi);
  const responseValue = useAppSelector(
    (state) => state.responseValue.responseValue
  );
  const variables = useAppSelector(
    (state) => state.queryVariables.queryVariables
  );

  const makeRequest = async (query: string) => {
    return fetch(api, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ query }),
    }).then((res) => res.json());
  };

  const btnHandler = () => {
    const variablesValues = variables ? JSON5.parse(variables) : '';

    for (const key in variablesValues) {
      if (typeof variablesValues[key] === 'object') {
        variablesValues[key] = JSON5.stringify(variablesValues[key]).replace(
          /'/g,
          '"'
        );
      }
    }

    makeRequest(addVariablesValues(responseValue, variablesValues)).then(
      (response) => {
        dispatch(setRequestJson(JSON.stringify(response, undefined, 2)));
      }
    );
  };
  const prettifyHandler = () => {
    const formattedQuery = toPrettify(responseValue);
    dispatch(setResponseValue(formattedQuery));
  };

  return (
    <div className="playground-wrapper">
      <ApiInput />
      <Button onClick={btnHandler}>play</Button>
      <Button onClick={prettifyHandler}>prettify</Button>
      <div className="editors-wrapper">
        <ResponseEditor />
        <RequestEditor />
        <QueryVariablesEditor />
        <HeadersEditor />
      </div>
    </div>
  );
}
