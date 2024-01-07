import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { useAppSelector } from '@/lib/redux/hooks/redux';

export default function RequestEditor() {
  const requestJson = useAppSelector((state) => state.requestJson.requestJson);

  return (
    <CodeMirror
      className="response-editor"
      theme={'dark'}
      extensions={[json()]}
      value={requestJson}
      readOnly
    />
  );
}
