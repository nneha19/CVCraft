import React from 'react'
import Achievements from './Achievements'
import Hobby from './Hobby'
import Language from './Language'
import ProjectSection from './ProjectSection'
import Reference from './Reference'
import Extra from './Extra'

function AddMore({ dispatch }) {
  
  return (
      <div className='flex gap-4 flex-wrap pt-6'>
      <button className='cursor-pointer bg-gray-100 p-2 rounded' onClick={()=> dispatch({ type: "ADD_SECTION", payload: { id: crypto.randomUUID(), component: Achievements }})}>Achievements</button>
      <button className='cursor-pointer bg-gray-100 p-2 rounded' onClick={()=> dispatch({ type: "ADD_SECTION", payload: { id: crypto.randomUUID(), component: Hobby }})}>Hobbies</button>
      <button className='cursor-pointer bg-gray-100 p-2 rounded' onClick={()=> dispatch({ type: "ADD_SECTION", payload: { id: crypto.randomUUID(), component: Language }})}>Language</button>
      <button className='cursor-pointer bg-gray-100 p-2 rounded' onClick={()=> dispatch({ type: "ADD_SECTION", payload: { id: crypto.randomUUID(), component: ProjectSection }  })}>Projects</button>
      <button className='cursor-pointer bg-gray-100 p-2 rounded' onClick={()=> dispatch({ type: "ADD_SECTION", payload: { id: crypto.randomUUID(), component: Reference } })}>Reference</button>
      <button className='cursor-pointer bg-gray-100 p-2 rounded' onClick={()=> dispatch({ type: "ADD_SECTION", payload: { id: crypto.randomUUID(), component: Extra }})}>Extra-Carriculum</button>
      </div>

  )
}


export default AddMore