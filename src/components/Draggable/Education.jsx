import React from "react";

function Education() {
  return (
    <div className="flex items-center gap-3 p-3 border border-indigo-100 rounded-md bg-indigo-50 shadow-sm">
      <div className="w-6 h-6 flex items-center justify-center text-indigo-700 text-xl">
        🎓
      </div>
      <div className="flex flex-col items-start">
        <span className="font-semibold text-blue-800">Education</span>
        <span className="text-xs text-blue-500">School, degree, duration</span>
      </div>
    </div>
  );
}

export default Education;
