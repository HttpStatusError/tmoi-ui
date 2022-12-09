import MonacoEditor from  'react-monaco-editor';
import {useRef, useState} from "react";
import {Button, Typography} from "antd";
import styles from './index.module.css';

const FormatInitConsole = `
let everything = []
if (console.everything === undefined)
{
    console.everything = true;
    console.defaultLog = console.log.bind(console);
    console.log = function(){
        everything.push({"type":"console.log", "datetime":Date().toLocaleString().split(" ")[4], "value":Array.from(arguments)});
        console.defaultLog.apply(console, arguments);
    }
    console.defaultError = console.error.bind(console);
    console.error = function(){
        everything.push({"type":"console.error", "datetime":Date().toLocaleString().split(" ")[4], "value":Array.from(arguments)});
        console.defaultError.apply(console, arguments);
    }
    console.defaultWarn = console.warn.bind(console);
    console.warn = function(){
        everything.push({"type":"console.warn", "datetime":Date().toLocaleString().split(" ")[4], "value":Array.from(arguments)});
        console.defaultWarn.apply(console, arguments);
    }
    console.defaultDebug = console.debug.bind(console);
    console.debug = function(){
        everything.push({"type":"console.debug", "datetime":Date().toLocaleString().split(" ")[4], "value":Array.from(arguments)});
        console.defaultDebug.apply(console, arguments);
    }
}`
const FormatClearConsole = `
console.everything = undefined
console.log = console.defaultLog
console.error = console.defaultError
console.warn = console.defaultWarn
console.debug = console.defaultDebug
`
const InitCode = `
// 检测是否是合法的 URL
function isUrl(url) {
    const regex = /\\b(https?):\\/\\/[\\-A-Za-z0-9+&@#\\/%?=~_|!:,.;]*[\\-A-Za-z0-9+&@#\\/%=~_|]/i;
    return regex.test(url);
}
// 测试代码
let url = "https://www.zqskate.com";
let r = isUrl(url);

// 输出结果
console.log(url);
console.log(r);
`

const CodePen = () => {
  const editorRef = useRef();
  const [val, setVal] = useState(InitCode);
  const [result, setResult] = useState('');

  return (
    <div style={{ marginTop: '1.37rem' }}>
      <div className={styles.title}>
        <Typography.Text>请输入代码</Typography.Text>
      </div>
      <MonacoEditor
        value={InitCode}
        height={400}
        language={'javascript'}
        theme={'vs-dark'}
        onChange={(value) => setVal(value)}
        ref={editorRef}
      />
      <div style={{ margin: '1rem 0' }}>
        <Button
          type={'primary'}
          size={'large'}
          onClick={() => {
            // eslint-disable-next-line no-new-func
            let ret = new Function(`
              "use strict";
              ${FormatInitConsole}
              ${val}
              ${FormatClearConsole}
              return(everything)
            `)();
            if(ret && ret.length > 0) {
              const res = ret.map(r => `${r.value.join("\n")}`).join("\n")
              return setResult(res)
            }
          }
        }>
          运行代码
        </Button>
      </div>
      <div className={styles.title}>
        <Typography.Text>代码运行结果</Typography.Text>
      </div>
      <MonacoEditor
        height={200}
        language={'text'}
        theme={'vs-dark'}
        ref={editorRef}
        value={result}
        options={{ readOnly: true }}
      />
    </div>
  )
}

export default CodePen;