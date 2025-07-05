import React from "react";

function Language() {
  return (
    <div className="flex items-center gap-3 p-3 border border-indigo-100 rounded-md bg-indigo-50 shadow-sm">
      <div className="w-6 h-6 flex items-center justify-center text-indigo-700 text-xl">
        🌐
      </div>
      <div className="flex flex-col items-start">
        <span className="font-semibold text-pink-800">Languages</span>
        <span className="text-xs text-pink-600">
          Spoken/written proficiency
        </span>
      </div>
    </div>
  );
}

export default Language;
