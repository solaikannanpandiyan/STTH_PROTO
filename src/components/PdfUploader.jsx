import React, { useState, useContext, useEffect } from "react";
import { PdfContext } from "context/PdfContext";
import CustomizeSearchControl from "./PdfViewTs";

const PdfUploader = () => {
  const [pdfuploadError, setpdfuploadError] = useState("");
  const [pdfupload, setpdfupload] = useState(null);
  const { pdffile, setpdffile } = useContext(PdfContext);
  const fileType = ["application/pdf"];
  const handlePdfFileChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setpdfupload(e.target.result);
          setpdffile(pdfupload);
          console.log("pdf inserted");
          setpdfuploadError("");
        };
      } else {
        setpdfupload(null);
        setpdfuploadError("Please select valid pdf file");
      }
    } else {
      console.log("select your file");
    }
  };

  const handlePdfFileSubmit = (e) => {
    e.preventDefault();

    if (pdfupload && true) {
      setpdffile(pdfupload);
      setpdfupload(null);
      setpdfuploadError("");
    } else {
      setpdffile(null);
    }
  };

  return (
    <>

      <form className="form-group" onSubmit={handlePdfFileSubmit}>
        <input
          type="file"
          className="form-control mb-2"
          required
          onChange={handlePdfFileChange}
        />
                <button type="submit" className="btn btn-success">
          UPLOAD
        </button>
      </form>
              {pdfuploadError && <div className="error-msg">{pdfuploadError}</div>}

    </>
  );
};

export default PdfUploader;
