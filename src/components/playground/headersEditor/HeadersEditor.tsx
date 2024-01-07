import './HeadersEditor.css';
import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks/redux';
import { setHttpHeaders } from '@/lib/redux/reducers/httpHeaders';

export default function HeadersEditor() {
  const variables = useAppSelector((state) => state.httpHeaders.httpHeaders);
  const dispatch = useAppDispatch();

  function onChange(value: string) {
    dispatch(setHttpHeaders(value));
  }

  return (
    <CodeMirror
      className="headers-editor"
      theme={'dark'}
      value={variables}
      onChange={onChange}
      extensions={[json()]}
    />
  );
}
