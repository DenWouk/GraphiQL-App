'use client';

import './Playground.css';
import JSON5 from 'json5';
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

interface Headers {
  [key: string]: string;
}

export default function Playground() {
  const dispatch = useAppDispatch();
  const api = useAppSelector((state) => state.graphqlApi.graphqlApi);
  const responseValue = useAppSelector(
    (state) => state.responseValue.responseValue
  );
  const queryVariables = useAppSelector(
    (state) => state.queryVariables.queryVariables
  );
  const httpHeaders = useAppSelector((state) => state.httpHeaders.httpHeaders);

  const setHeaders = () => {
    const headers: Headers = {
      'Content-type': 'application/json',
    };

    if (httpHeaders) {
      const headersValues = JSON5.parse(httpHeaders);

      for (const key in headersValues) {
        headers[key] = headersValues[key];
      }
    }

    return headers;
  };

  const makeRequest = async (query: string) => {
    return fetch(api, {
      method: 'POST',
      headers: setHeaders(),
      body: JSON.stringify({ query }),
    }).then((res) => res.json());
  };

  const playHandler = () => {
    const variablesValues = queryVariables ? JSON5.parse(queryVariables) : '';

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

      <div className="request-response-editors">
        <div className="editor">
          <h6 className="editor-title-1">QUERY EDITOR</h6>

          <div className="playground-controls">
            <button className="btn prettify-btn" onClick={prettifyHandler}>
              PRETTIFY
            </button>
            <button className="btn play-btn" onClick={playHandler}>
              PLAY
            </button>
          </div>

          <ResponseEditor />
        </div>
        <div className="editor">
          <h6 className="editor-title-2">RESPONSE VIEWIER (read only)</h6>
          <RequestEditor />
        </div>
      </div>

      <div className="variables-headers-editors">
        <div className="editor">
          <h6 className="editor-title-3">QUERY VARIABLES</h6>
          <QueryVariablesEditor />
        </div>
        <div className="editor">
          <h6 className="editor-title-4">HTTP HEADERS</h6>
          <HeadersEditor />
        </div>
      </div>
    </div>
  );
}
