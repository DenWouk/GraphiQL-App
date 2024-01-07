import './ApiInput.css';
import { useAppDispatch } from '@/lib/redux/hooks/redux';
import { setGraphqlApi } from '@/lib/redux/reducers/graphqlApi';
import { setSchema } from '@/lib/redux/reducers/schema';
import { useEffect, useState } from 'react';

export const schemaQuery = `query {
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

export default function ApiInput() {
  const dispatch = useAppDispatch();

  const [value, setValue] = useState(localStorage.getItem('api-url') || '');
  const [req, setReq] = useState(false);

  const makeRequest = async (query: string) => {
    return fetch(value, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ query }),
    })
      .then((res) => res.json())
      .catch(() => console.error());
  };

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    dispatch(setGraphqlApi(event.target.value));
    setReq(true);

    localStorage.setItem('api-url', event.target.value);
  };

  useEffect(() => {
    if (req) {
      makeRequest(schemaQuery).then((response) =>
        dispatch(setSchema(response?.data?.__schema))
      );
      setReq(false);
    }
  }, [req]);

  return (
    <div className="api-input-container">
      <h6 className="api-input-title">API URL:</h6>
      <input
        className="api-input"
        placeholder="Enter API URL"
        value={value}
        onChange={inputHandler}
      />
    </div>
  );
}
