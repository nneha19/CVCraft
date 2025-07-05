import React from "react";

function Extra() {
  return (
    <div className="flex items-center gap-3 p-3 border border-indigo-100 rounded-md bg-indigo-50 shadow-sm">
      <div className="w-6 h-6 flex items-center justify-center text-indigo-700 text-xl">
        🎯
      </div>
      <div className="flex flex-col items-start">
        <span className="font-semibold text-orange-800">Extra Curricular</span>
        <span className="text-xs text-orange-600">
          Clubs, events, volunteering
        </span>
      </div>
    </div>
  );
}

export default Extra;
