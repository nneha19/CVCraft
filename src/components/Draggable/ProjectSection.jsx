import React from "react";

function ProjectSection() {
  return (
    <div className="flex items-center gap-3 p-3 border border-indigo-100 rounded-md bg-indigo-50 shadow-sm">
      <div className="w-6 h-6 flex items-center justify-center text-indigo-700 text-xl">
        🗂️
      </div>
      <div className="flex flex-col items-start">
        <span className="font-semibold text-purple-800">Projects</span>
        <span className="text-xs text-purple-600">
          Title, description, tech stack
        </span>
      </div>
    </div>
  );
}

export default ProjectSection;
