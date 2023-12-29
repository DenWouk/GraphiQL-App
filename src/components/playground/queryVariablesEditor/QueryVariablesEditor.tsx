import './QueryVariablesEditor.css';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks/redux';
import { setQueryVariables } from '@/lib/redux/reducers/queryVariables';

export default function QueryVariablesEditor() {
  const variables = useAppSelector(
    (state) => state.queryVariables.queryVariables
  );
  const dispatch = useAppDispatch();

  function onChange(value: string) {
    dispatch(setQueryVariables(value));
  }

  return (
    <CodeMirror
      theme={'dark'}
      value={variables}
      height="500px"
      width="250px"
      onChange={onChange}
      extensions={[json()]}
    />
  );
}
