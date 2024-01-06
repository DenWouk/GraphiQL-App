import CodeMirror from '@uiw/react-codemirror';
import { json } from '@codemirror/lang-json';
import { useAppSelector } from '@/lib/redux/hooks/redux';

export default function RequestEditor() {
  const requestJson = useAppSelector((state) => state.requestJson.requestJson);

  return (
    <CodeMirror
      theme={'dark'}
      extensions={[json()]}
      height="400px"
      width="100%"
      value={requestJson}
      readOnly
    />
  );
}
