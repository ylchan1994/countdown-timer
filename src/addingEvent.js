import React, { useRef } from 'react'

export default function AddingEvent( {handleDone, handleInputChange} ) {

  const formRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formRef.current.checkValidity()) {
      handleDone(event);
    } else {
      formRef.current.reportValidity();
    }
  };

  return (
  <div className='grid grid-rows-2 mt-5 gap-2 border w-11/12 justify-self-center rounded-xl py-4 bg-violet-100'>

    <div className='grid grid-cols-3 justify-items-center wi'>
      <label htmlFor='eventName' className='w-full text-left ms-10'>Event Name</label>
      <label htmlFor='eventDate' className='w-full text-center'>Event date</label>
      <label className='w-full text-center'>Event remaining</label>
    </div>

    <form ref={formRef} className='grid grid-cols-3 justify-items-center'>
      <input name="eventName" type="text" className='p-2 border w-11/12 text-left rounded-lg'
      onChange={handleInputChange} required={true}></input>

      <div className='grid md:grid-cols-2 gap-2 grid-cols-1 border w-11/12 text-center'>
        <input type='date' name='eventDate' className='border rounded-lg'
        onChange={handleInputChange} required={true}></input>
        <input type='time' name='eventTime' className='border rounded-lg'
        onChange={handleInputChange}></input>
      </div>

      <input className='border w-11/12 rounded-xl text-center' disabled={true}></input>            
    </form>
    <button type='submit' className='mt-3 ms-3 py-1 border border-gray-700 rounded-lg bg-yellow-50 hover:bg-sky-300 w-1/6'
        onClick={handleSubmit}>
        Done
      </button>
  </div>
  )
}