import { createContext, useContext, useEffect, useState } from "react";


export const ThemeContext = createContext();

export function ThemeProvider({children}){

    const [theme,setTheme]=useState('light');

   useEffect(() => {
     if(theme==='dark'){
        document.documentElement.classList.add("dark");
     }else{
         document.documentElement.classList.remove("dark");
     }
   }, [theme])

   const toggleTheme=()=>{
    setTheme((prev)=>(prev==='dark'?'light':'dark'))
   }

   return(
    <ThemeContext.Provider value={{theme,toggleTheme}}>
        {children}
    </ThemeContext.Provider>
   )
   
}


export const useTheme=()=>useContext(ThemeContext);