import './CodeEditor.scss'
import React, {useContext, useEffect, useState} from 'react';
import { StateContext } from '../../provider/StateProvider';
import MonacoEditor from 'react-monaco-editor';
import options from './options'
const { remote } = window.require('electron');
const fs = remote.require('fs');
import { TestContext } from "../../provider/TestProvider";


const CodeEditor = () => {
    //from our glabal state
    const { activeFile, fileTree }: any = useContext(StateContext);
     //local state
    const [getContents, setContents] = useState('');
    const getFileContents = (path: String) => {
        if (path.length > 0){
            setContents(fs.readFileSync(path, 'utf8'))
        }
    }
    useEffect(()=> {
        getFileContents(activeFile);
        [activeFile, fileTree]
    })

  return (
      <div id='code-editor-head'>
          {/* <header>editor</header> */}
          <MonacoEditor
          height="60vh"
          width="30vw"
          language="javascript"
          theme="vs-dark"
          options={options}
          value={getContents}
        />
      </div>
  )
}



export default CodeEditor