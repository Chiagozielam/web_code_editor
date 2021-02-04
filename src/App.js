import React, { useState, useEffect } from 'react';
import './App.css';
import Button from './components/Button';
import Editor from './components/Editor';

function App() {
  const [htmlEditorIsOpen, setHtmlEditorIsOpen] = useState(true);
  const [cssEditorIsOpen, setCssEditorIsOpen] = useState(false);
  const [jsEditorIsOpen, setJsEditorIsOpen] = useState(false);

  const [html, setHtml] = useState('');
  const [css, setCss] = useState('');
  const [js, setJs] = useState('');
  const [srcDoc, setSrcDoc] = useState(``);

  const onTabClick = (currentState, firstOtherState, secondOtherState) => {
    currentState(true);
    firstOtherState(false);
    secondOtherState(false);
  }

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setSrcDoc(
        `
          <html>
            <body>${html}</body>
            <style>${css}</style>
            <script>${js}</script>
          </html>
        `
      )
    }, 250);

    return () => clearTimeout(timeOut)
  }, [html, css, js])

  return (
    <div className="App">
      <p>Welcome to the edior</p>
      <div className="tab-button-container">
        <Button title="HTML" onClick={() => {
          onTabClick(setHtmlEditorIsOpen, setCssEditorIsOpen, setJsEditorIsOpen)
        }} />
        <Button title="CSS" onClick={() => {
          onTabClick(setCssEditorIsOpen, setHtmlEditorIsOpen, setJsEditorIsOpen)
        }} />
        <Button title="JavaScript" onClick={() => {
          onTabClick(setJsEditorIsOpen, setCssEditorIsOpen, setHtmlEditorIsOpen)
        }} />
      </div>
      <div className="editor-container">
        {
          htmlEditorIsOpen ? (
            <Editor
              language="xml"
              displayName="HTML"
              value={html}
              setEditorState={setHtml}
            />
          ) : cssEditorIsOpen ? (
            <Editor
              language="css"
              displayName="CSS"
              value={css}
              setEditorState={setCss}
            />
          ) : (
            <Editor
              language="javascript"
              displayName="JS"
              value={js}
              setEditorState={setJs}
            />
          )
        }
      </div>
      <div>
        <iframe
          id="my_iframe"
          srcDoc={srcDoc}
          title="output"
          sandbox="allow-scripts"
          frameBorder="1"
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
}

export default App;
