import React from "react";

function Reference() {
  return (
    <div className="flex items-center gap-3 p-3 border border-indigo-100 rounded-md bg-indigo-50 shadow-sm">
      <div className="w-6 h-6 flex items-center justify-center text-indigo-700 text-xl">
        📋
      </div>
      <div className="flex flex-col items-start">
        <span className="font-semibold text-teal-800">References</span>
        <span className="text-xs text-teal-600">Mentors or supervisors</span>
      </div>
    </div>
  );
}

export default Reference;
