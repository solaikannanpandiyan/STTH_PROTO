import React, { Fragment, useEffect, useState } from "react";
import { Viewer, PageLayout } from "@react-pdf-viewer/core";
import { Worker } from "@react-pdf-viewer/core";
import { searchPlugin } from "@react-pdf-viewer/search";
import { PdfContext } from "context/PdfContext";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/search/lib/styles/index.css";
import { useContext } from "react";
import { SpeechContext } from "context/SpeechContext";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import { dropPlugin } from "@react-pdf-viewer/drop";
import { propertiesPlugin } from "@react-pdf-viewer/properties";
import {
  pageNavigationPlugin,
  CurrentPageLabelProps,
} from "@react-pdf-viewer/page-navigation";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

const CustomizeSearchControl = (props) => {
  const pageNavigationPluginInstance = pageNavigationPlugin();
  const dropPluginInstance = dropPlugin();
  const pageLayout = {
    tranformSize: ({ size }) => ({
      height: size.height + 30,
      width: size.width + 30,
    }),
  };
  const {
    CurrentPageInput,
    GoToFirstPageButton,
    GoToLastPageButton,
    GoToNextPageButton,
    GoToPreviousPage,
  } = pageNavigationPluginInstance;
  const { CurrentPageLabel } = pageNavigationPluginInstance;
  const { speechtext, setspeechtext } = useContext(SpeechContext);
  //const [pageNumber, setPageNumber] = useState(0); 
  let searchPluginInstance = searchPlugin();
  let searchprops = null;
  let lock = false;
  let pagenumber = 0;
  const renderToolbar = (Toolbar) => (
    <>
      <Toolbar />
      <GoToLastPageButton />
      <GoToFirstPageButton />
    </>
  );
  useEffect(() => {
    if (speechtext.split(" ").length >= 3) {
      setspeechtext(speechtext.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, ""));
      searchprops.clearKeyword();
      searchprops.setKeyword(speechtext);
      lock = true;
    }
  }, [speechtext]);
  const defaultLayoutPluginInstance = defaultLayoutPlugin({ renderToolbar });
  const { pdffile } = useContext(PdfContext);
  const { Search } = searchPluginInstance;

  const onChange = (props) => {
    pagenumber = props.currentPage;
    //setPageNumber(props.currentPage);
  };

  return (
    <>
      <br></br>
      {/* <h4>View PDF</h4> */}

      {/* <div
            style={{
                alignItems: 'center',
                backgroundColor: '#eeeeee',
                borderBottom: '1px solid rgba(0, 0, 0, 0.3)',
                display: 'flex',
                justifyContent: 'center',
                padding: '8px',
            }}
        > */}
      <CurrentPageLabel>
        {(props) => (
          <>
            {/* <span>{`${props.currentPage + 1} of ${props.numberOfPages}`}</span> */}
            {console.log(props.currentPage)}
            {onChange(props)}
          </>
        )}
      </CurrentPageLabel>
      {/* </div> */}

      <Search>
        {(RenderSearchProps) => {
          searchprops = RenderSearchProps;
          if (lock) {
            RenderSearchProps.setTargetPages(
              (target) => target.pageIndex === pagenumber
            );
            RenderSearchProps.search();
            lock = false;
          }
        }}
      </Search>
      <div className="pdf-container">
        
        {true && pdffile && (
          <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.3.122/pdf.worker.min.js">
            <Viewer
              fileUrl={pdffile}
              plugins={[
                searchPluginInstance,
                pageNavigationPluginInstance,
                defaultLayoutPluginInstance,
                dropPluginInstance,
              ]}
              pageLayout={pageLayout}
            />
          </Worker>
        )}
        {false || (!pdffile && "Please upload any Document")}
      </div>
    </>
  );
};

export default CustomizeSearchControl;
