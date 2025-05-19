import React from 'react'

function IntroForm() {
  return (
    <form>
      <p>Enter your Details</p>
      <div>
        <label>Full Name</label>
        <input type="text" required />
      </div>

      <div className='flex'>
      <div>
        <label>Mobile Number</label>
        <input type="number" placeholder='xxx-xxxx'/>
      </div>
      <div>
        <label>Link</label>
        <input type="text" placeholder='Enter your link'/>
      </div>
      </div>
     

    </form>
  )
}

export default IntroForm