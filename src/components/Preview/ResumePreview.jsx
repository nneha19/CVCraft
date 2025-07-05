import React, { useRef } from "react";
import html2pdf from "html2pdf.js";
import { useNavigate } from "react-router-dom";
import { useResume } from "../../context/ResumeContext";
import { sectionRenderers } from "../../config/sectionRenderers";

const ResumePreview = () => {
  const navigate = useNavigate();
  const { state } = useResume();
  const resumeRef = useRef(null);
  const sectionOrder = state.sectionOrder;

  const handleDownloadPDF = () => {
    if (!resumeRef.current) return;

    const opt = {
      margin: 0,
      filename: `${state.intro?.name || "resume"}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf()
      .set(opt)
      .from(resumeRef.current)
      .save()
      .catch((err) => console.error("PDF generation error:", err));
  };

  return (
    <div className="dark:bg-slate-900 bg-[#f8f8f82d] py-10 px-4 min-h-screen flex flex-col items-center justify-center">
      <div className="bg-white shadow-[0_0_20px_rgba(0,0,0,0.15)] border border-gray-300 w-full max-w-[794px] min-h-[1123px]">
        {/* ✅ Resume A4 */}
        <div
          ref={resumeRef}
          className="w-full max-w-[794px] bg-white text-black p-4 sm:p-6 md:p-8 lg:p-10 text-sm sm:text-base leading-relaxed"
          style={{
            fontFamily: "sans-serif",
          }}
        >
          {sectionOrder.map((id) => {
            const renderFn = sectionRenderers[id];

            const isVisible = state.sectionVisibility?.[id] ?? true;
            const hasData = (() => {
              const data = state[id];
              if (Array.isArray(data))
                return data.some((item) => Object.values(item).some(Boolean));
              if (typeof data === "object")
                return Object.values(data).some(Boolean);
              return false;
            })();

            if (!renderFn || !isVisible || !hasData) return null;

            return renderFn(state);
          })}
        </div>
      </div>

      <div className="flex justify-between items-center max-w-[794px] mx-auto mb-4 m-8 gap-6">
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-gray-300 text-black rounded cursor-pointer hover:bg-gray-400"
        >
          Back
        </button>

        <button
          onClick={handleDownloadPDF}
          className="px-6 py-2 bg-indigo-600 text-white rounded cursor-pointer hover:bg-indigo-700"
        >
          Download PDF
        </button>
      </div>
    </div>
  );
};

export default ResumePreview;
