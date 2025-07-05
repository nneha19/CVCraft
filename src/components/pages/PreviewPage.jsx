import React, { useEffect, useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import ResumePreview from "../Preview/ResumePreview";

const PreviewPage = () => {
  const [resumeData, setResumeData] = useState(null);
  const componentRef = useRef();

  useEffect(() => {
    const storedData = localStorage.getItem("resume-preview");
    if (storedData) {
      setResumeData(JSON.parse(storedData));
    }
  }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Resume",
  });

  if (!resumeData) return <div>Loading...</div>;

  return (
    <div className="p-4 bg-gray-100">
      <div className="flex justify-end mb-4">
        <button
          onClick={handlePrint}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Download PDF
        </button>
      </div>
      <div ref={componentRef}>
        <ResumePreview />
      </div>
    </div>
  );
};

export default PreviewPage;
