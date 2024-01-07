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
import { useEffect, useRef } from 'react';
import { resizeContainer } from '@/utils/resizeContainer';

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

  const refBoxVariables = useRef<HTMLDivElement | null>(null);
  const refTopVariables = useRef<HTMLDivElement | null>(null);
  const refBoxHeaders = useRef<HTMLDivElement | null>(null);
  const refTopHeaders = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    resizeContainer(refBoxVariables, refTopVariables);
  }, []);

  useEffect(() => {
    resizeContainer(refBoxHeaders, refTopHeaders);
  }, []);

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

  const playBtnHandler = () => {
    try {
      const variablesValues = queryVariables ? JSON5.parse(queryVariables) : {};

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
    } catch {
      makeRequest(addVariablesValues(responseValue, {})).then((response) => {
        dispatch(setRequestJson(JSON.stringify(response, undefined, 2)));
      });
    }
  };

  const prettifyHandler = () => {
    const formattedQuery = toPrettify(responseValue);
    dispatch(setResponseValue(formattedQuery));
  };

  return (
    <div className="playground">
      <ApiInput />

      <div className="editors-container">
        <div className="query-editors-container">
          <div className="editor-wrapper">
            <h6 className="editor-title">QUERY EDITOR</h6>

            <div className="playground-controls">
              <button className="btn prettify-btn" onClick={prettifyHandler}>
                PRETTIFY
              </button>
              <button className="btn play-btn" onClick={playBtnHandler}>
                PLAY
              </button>
            </div>

            <ResponseEditor />
          </div>

          <div className="editor-wrapper variables-editor-wrapper">
            <div className="resizable-container" ref={refBoxVariables}>
              <div
                className="resizer resizer-variables-editor"
                ref={refTopVariables}
              ></div>
              <h6 className="editor-title">QUERY VARIABLES</h6>
              <QueryVariablesEditor />
            </div>
          </div>

          <div className="editor-wrapper headers-editor-wrapper">
            <div className="resizable-container" ref={refBoxHeaders}>
              <div
                className="resizer resizer-headers-editor"
                ref={refTopHeaders}
              ></div>
              <h6 className="headers-editor-title">HTTP HEADERS</h6>
              <HeadersEditor />
            </div>
          </div>
        </div>

        <div className="response-editor-container">
          <div className="editor-wrapper">
            <h6 className="editor-title">RESPONSE VIEWIER (read only)</h6>
            <RequestEditor />
          </div>
        </div>
      </div>
    </div>
  );
}
