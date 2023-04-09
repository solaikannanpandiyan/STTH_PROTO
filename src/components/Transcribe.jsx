import { Fragment } from "react";
import React, { useState, useEffect } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "reactspeech/SpeechRecognition";
import { Detector } from "react-detect-offline";
import { useContext } from "react";
import { SpeechContext } from "context/SpeechContext";
import PdfUploader from "./PdfUploader";
import createPersistedState from "use-persisted-state";
import { PdfContext } from "context/PdfContext";
import CustomizeSearchControl from "./PdfViewTs";

function Transcribe() {
  const usePdfState = createPersistedState("pdf");

  const options = [
    { label: "English (Australia)", value: "en-AU" },
    { label: "English (Canada)", value: "en-CA" },
    { label: "English (India)", value: "en-IN" },
    { label: "English (New Zealand)", value: "en-NZ" },
    { label: "English (South Africa)", value: "en-ZA" },
    { label: "English (UK)", value: "en-GB" },
    { label: "English (US)", value: "en-US" },
    { label: "Japanese", value: "ja-JP" },
  ];

  const { pdffile, setpdffile } = useContext(PdfContext);
  const { setspeechtext, speechtext } = useContext(SpeechContext);

  const [instruction, setInstruction] = useState("Fine");
  const [selectLanguage, setSelectLanguage] = useState("en-US");
  const [voiceRecognition, setVoiceRecognition] = useState(false);
  let indicator = "";

  const {
    transcript,
    finalTranscript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    browserSupportsContinuousListening,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  function on() {
    if (indicator === "online") {
      alert("Internet connection has been restored. Now this application is available to use.");
    }
  }
  function off() {
    indicator = "online";
    alert("Internet connection is lost or very low. Please note that internet connection is required to support the speech recognition.");
  }

  if (!browserSupportsSpeechRecognition) {
    setInstruction("This Browser does not support speech recognition.");
  }

  if (!isMicrophoneAvailable) {
    setInstruction("Please accept Microphone Access.");
  }

  if (!browserSupportsContinuousListening) {
    setInstruction("Browser does not support continous listening.");
  }

  const recognitionOn = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: selectLanguage,
    });
    setVoiceRecognition(true);
  };

  const recognitionOff = () => {
    SpeechRecognition.stopListening();
    setVoiceRecognition(false);
    resetTranscript();
  };

  const onChange = (event) => {
    const value = event.target.value;
    setSelectLanguage(value);
  };

  return (
    <Fragment>

<div className="c-main">
      <div className="c-top">
      <h1 style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '10'}}>SPEECH TO TEXT HIGHLIGHTING</h1>
      <span class=" w-15 badge bg-light text-dark">Microphone:</span>
      <span class={listening ? "badge bg-success w-10 m-2" : "badge bg-danger w-10 m-2"}>{listening ? "on" : "off"}</span>
      <span class=" w-15  badge bg-light text-dark">Voice Recognition:</span>
      <span class={voiceRecognition ? "badge bg-success w-10 m-2" : "badge bg-danger w-10 m-2"}>{voiceRecognition ? "on" : "off"}</span>
      <span class=" w-15  badge bg-light text-dark">Compatibility:</span>
      <span class={instruction == "Fine" ? "badge bg-success w-10 m-2" : "badge bg-danger w-10 m-2"}>{instruction}</span>
      </div>
      <div className="c-bottom">
        <div className="c-bottomleft">
        <div>
          <div style={{ width: "100%" }}>
            <Detector
              render={({ online }) => (
                <div className={online ? "normal" : "warning"}>
                  {online ? on() : off()}
                </div>
              )}
            />
            <textarea
              id="textbox"
              rows="14"
              className="form-control mb-1 mt-4"
              defaultValue={transcript}
            />
            {setspeechtext(transcript)}
            <div
              className="btn-group"
              style={{ position: "relative", width: "100%" }}
            >
              <button
                id="start-btn"
                onClick={recognitionOn}
                className="btn btn-success mb-2 m-1"
              >
                start
              </button>
              <button
                id="stop-btn"
                onClick={recognitionOff}
                className="btn btn-danger mb-2 m-1"
              >
                stop
              </button>
            </div>
          </div>
        </div>
  
        <PdfUploader  />
        </div>
        <div className="c-bottomright">
        <div className="st-pdfcontainer m-2">
        {pdffile && <CustomizeSearchControl /> }
      </div>
        </div>
      </div>
    </div>





  
      
      {/* <div
        style={{
          width: "100%",
          position: "-webkit - sticky",
          position: "sticky",
          top: "0",
        }}
      >
        
      </div> */}
 
    </Fragment>
  );
}

export default Transcribe;
