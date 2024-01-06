import { useAppDispatch } from '@/lib/redux/hooks/redux';
import { setGraphqlApi } from '@/lib/redux/reducers/graphqlApi';
import { setSchema } from '@/lib/redux/reducers/schema';
import TextField from '@mui/material/TextField/TextField';
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
  const [value, setValue] = useState('');
  const [req, setReq] = useState(false);
  const dispatch = useAppDispatch();
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
    <TextField
      sx={{ width: 500 }}
      placeholder="Enter api"
      id="outlined-basic"
      variant="outlined"
      size="small"
      value={value}
      onChange={inputHandler}
    />
  );
}
