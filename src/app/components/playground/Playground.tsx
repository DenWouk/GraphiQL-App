'use client';
import { useCallback, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import './Playground.css';
import TextField from '@mui/material/TextField/TextField';
import Button from '@mui/material/Button/Button';

export default function Playground() {
  const [api, setApi] = useState('');
  const [value, setValue] = useState('');
  const [responseJson, setResponseJson] = useState('');

  const onChange = useCallback((val: string) => {
    console.log(val);
    setValue(val);
  }, []);

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
    makeRequest(value).then((response) =>
      setResponseJson(JSON.stringify(response, undefined, 2))
    );
  };

  return (
    <div className="playground-wrapper">
      <TextField
        sx={{ width: 500 }}
        placeholder="Enter api"
        id="outlined-basic"
        variant="outlined"
        size="small"
        value={api}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setApi(event.target.value);
        }}
      />
      <Button onClick={btnHandler}>play</Button>
      <div className="editors-wrapper">
        <CodeMirror
          theme={'dark'}
          value={value}
          height="500px"
          width="500px"
          onChange={onChange}
          extensions={[json()]}
        />
        <CodeMirror
          theme={'dark'}
          extensions={[json()]}
          height="500px"
          width="500px"
          value={responseJson}
        />
      </div>
    </div>
  );
}
