import './App.css';
import { Fragment,useState } from 'react';
import Transcribe from './components/Transcribe';

// import { createContext } from "react";
import { SpeechContext } from './context/SpeechContext';
import { PdfContext } from "context/PdfContext";
import createPersistedState from "use-persisted-state";


function App() {
  const usePdfState = createPersistedState("pdf");
  const [speechtext, setspeechtext] = useState("");
  const [pdffile, setpdffile] = usePdfState(null);
  const [loaded, setloaded] = useState(false);
  // const context = createContext({});
  // const [load, setLoad] = useState(true);
 
  return (
    <Fragment>
       <SpeechContext.Provider value={{ speechtext, setspeechtext}}>
       <PdfContext.Provider value={{ pdffile, setpdffile, loaded, setloaded }}>
          {/* <Transcribeweb/> */}
          <Transcribe/> 
          </PdfContext.Provider>
      </SpeechContext.Provider>
    </Fragment>
  );
}

export default App;
