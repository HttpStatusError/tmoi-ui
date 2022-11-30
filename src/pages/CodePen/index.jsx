import MonacoEditor from  'react-monaco-editor';
import {useRef, useState} from "react";

const CodePen = () => {
  const editorRef = useRef();
  const [editorValue, setEditorValue] = useState('');

  return (
    <>
      <MonacoEditor
        height={500}
        language={'javascript'}
        theme={'vs-dark'}
        value={editorValue}
        onChange={setEditorValue}
        ref={editorRef}
      />
    </>
  )
}

export default CodePen;