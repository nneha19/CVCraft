import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import Logo from "../assets/favicon.png";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="flex items-center justify-between p-4 bg-slate-50  dark:bg-slate-800 shadow-md">
      <Link
        to="/"
        className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-slate-100 hover:no-underline"
      >
        <img src={Logo} alt="CVCraft Logo" className="h-5" />
        CVCraft
      </Link>

      <button
        onClick={toggleTheme}
        className="p-2 rounded transition hover:bg-slate-100 cursor-pointer dark:hover:bg-slate-700 text-gray-800 dark:text-white"
      >
        {theme === "light" ? (
          <MoonIcon className="w-6 h-6 text-blue-600" />
        ) : (
          <SunIcon className="w-6 h-6 text-yellow-400" />
        )}
      </button>
    </div>
  );
}

export default Navbar;
