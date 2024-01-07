import CodeMirror from '@uiw/react-codemirror';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks/redux';
import { useCallback } from 'react';
import { setResponseValue } from '@/lib/redux/reducers/responseValue';
import { graphql } from 'cm6-graphql';
import { GraphQLSchema } from 'graphql';

export default function ResponseEditor() {
  const value = useAppSelector((state) => state.responseValue.responseValue);
  const schema = useAppSelector((state) => state.schema.schema);
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
      extensions={[graphql(schema as unknown as GraphQLSchema)]}
    />
  );
}
