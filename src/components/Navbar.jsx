import React from 'react'
import {useTheme} from '../context/ThemeContext'
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";
import Logo from  '../assets/favicon.png'


function Navbar() {

  const {theme, toggleTheme} =   useTheme();
  return (
    <div className='flex items-center justify-between p-4 bg-gray-200 dark:bg-red-500'>
      <span className='text-xl font-bold flex items-center gap-2'>
        <img src={Logo} alt="img" className='h-4'/>
        CVCraft</span>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 text-black transition dark:text-white hover:scale-105 cursor-pointer"
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