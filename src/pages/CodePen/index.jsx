import MonacoEditor from  'react-monaco-editor';
import {useRef} from "react";

const CodePen = () => {
  const editorRef = useRef();

  return (
    <div style={{ marginTop: '1.37rem' }}>
      <MonacoEditor
        height={500}
        language={'javascript'}
        theme={'vs-dark'}
        ref={editorRef}
      />
    </div>
  )
}

export default CodePen;