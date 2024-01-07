import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks/redux';
import { useCallback } from 'react';
import { setResponseValue } from '@/lib/redux/reducers/responseValue';

export default function ResponseEditor() {
  const value = useAppSelector((state) => state.responseValue.responseValue);
  const dispatch = useAppDispatch();

  const onChange = useCallback((val: string) => {
    dispatch(setResponseValue(val));
  }, []);

  return (
    <CodeMirror
      className="request-editor"
      theme={'dark'}
      value={value}
      onChange={onChange}
      extensions={[json()]}
    />
  );
}
