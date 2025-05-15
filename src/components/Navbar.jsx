import React from 'react'
import {useTheme} from '../context/ThemeContext'
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";



function Navbar() {

  const {theme, toggleTheme} =   useTheme();
  return (
    <div>Navbar
        <button
          onClick={toggleTheme}
          className="px-4 py-2 text-black transition dark:text-white hover:scale-105"
        >
          {theme === "light" ? (
            <MoonIcon className="w-6 h-6 text-gray-500" />
          ) : (
            <SunIcon className="w-6 h-6 text-yellow-400" />
          )}
        </button>
    </div>

  )
}

export default Navbar