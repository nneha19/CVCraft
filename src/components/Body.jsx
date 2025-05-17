import React from 'react'
import Resume from './Resume/Resume'
import AI from './AI/AI'

function Body() {
  return (
    <div className='h-screen flex p-12'>
      <Resume/>
      <AI/>
    </div>
  )
}

export default Body