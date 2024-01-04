import CodeMirror from '@uiw/react-codemirror';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks/redux';
import { useCallback } from 'react';
import { setResponseValue } from '@/lib/redux/reducers/responseValue';
import { graphql } from 'cm6-graphql';

export default function ResponseEditor() {
  const value = useAppSelector((state) => state.responseValue.responseValue);
  const schema = useAppSelector((state) => state.schema.schema);
  const dispatch = useAppDispatch();

  const onChange = useCallback((val: string) => {
    dispatch(setResponseValue(val));
  }, []);

  return (
    <CodeMirror
      theme={'dark'}
      value={value}
      height="500px"
      width="500px"
      onChange={onChange}
      extensions={[graphql(schema)]}
    />
  );
}
