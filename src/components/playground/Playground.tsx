'use client';

import './Playground.css';
import Button from '@mui/material/Button/Button';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks/redux';
import { setRequestJson } from '@/lib/redux/reducers/requestJson';
import ResponseEditor from './responseEditor/ResponseEditor';
import RequestEditor from './requestEditor/RequestEditor';
import ApiInput from './apiInput/ApiInput';
import { setSchema } from '@/lib/redux/reducers/schema';

const schemaQuery = `query {
  __schema {
    types {
      name
      kind
      description
      fields {
        name
      }
    }
  }
}`;

export default function Playground() {
  const dispatch = useAppDispatch();
  const api = useAppSelector((state) => state.graphqlApi.graphqlApi);
  const responseValue = useAppSelector(
    (state) => state.responseValue.responseValue
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
    makeRequest(schemaQuery)
      .then((response) => dispatch(setSchema(response)))
      .then(() => {
        makeRequest(responseValue).then((response) =>
          dispatch(setRequestJson(JSON.stringify(response, undefined, 2)))
        );
      });
  };

  return (
    <div className="playground-wrapper">
      <ApiInput />
      <Button onClick={btnHandler}>play</Button>
      <div className="editors-wrapper">
        <ResponseEditor />
        <RequestEditor />
      </div>
    </div>
  );
}
