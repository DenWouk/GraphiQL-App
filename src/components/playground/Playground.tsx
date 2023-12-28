'use client';

import './Playground.css';
import Button from '@mui/material/Button/Button';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks/redux';
import { setRequestJson } from '@/lib/redux/reducers/requestJson';
import ResponseEditor from './responseEditor/ResponseEditor';
import RequestEditor from './requestEditor/RequestEditor';
import ApiInput from './apiInput/ApiInput';
import { toPrettify } from '@/utils/prettify';
import { setResponseValue } from '@/lib/redux/reducers/responseValue';

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
    makeRequest(responseValue).then((response) =>
      dispatch(setRequestJson(JSON.stringify(response, undefined, 2)))
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
      </div>
    </div>
  );
}
