import React, { useState } from 'react'

function LargeTime({remaining}) {

  return (
    <>
    <div className='grid grid-cols-4 justify-self-center w-11/12 lg:w-1/2 mt-4'>          
      { ['Days', 'Hours', 'Minutes', 'Seconds'].map( (unit, index) => {
        return (
        <>
        <div className='justify-items-center'>
          <p className='flex border border-slate-300 shadow-lg shadow-orange-200 bg-orange-50 h-24 w-24 rounded-full justify-center py-9 mb-4'>{remaining[index]}</p>
          <p>{unit}</p>
        </div>
        </>
        )})
      }   
    </div>
    {remaining.every(value => value == 0) && 
    <div className='justify-self-center mt-5 text-3xl font-light text-purple-600'>Completed!!!</div>}
    </>
  )
}

export default function Events({ events }) {
  const [ showLargeTimer, setShowLargeTimer ] = useState(false);
  const [ timerId, setTimerId] = useState('')
  const formatDateTime = ( date, time ) => {
    const dateTime = new Date(Date.parse(`${date} ${ (time === '' || !time) ? '00:00' : time }`));
    let [ year, month, day, hour, minute ] = [
      dateTime.getFullYear(),
      dateTime.getMonth(),
      dateTime.getDate().toString().padStart(2, '0'),
      dateTime.getHours(),
      dateTime.getMinutes().toString().padStart(2,'0')
    ]
    const months = ['Jan', 'Feb', 'Mar','Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    month = months[month];

    if (hour === 12) {
      hour = (`${hour}:${minute} PM`).padStart(8, '0');
    } else if (hour > 12) {
      hour = (`${hour % 12}:${minute} PM`).padStart(8, '0');
    } else {
      hour = (`${hour}:${minute} AM`).padStart(8, '0');
    }

    return `${day}-${month}-${year} ${hour}`
  }

  const handleShowLargeTimer = (event) => {
    event.preventDefault();
    setShowLargeTimer(true);
    setTimerId(event.currentTarget.id);
  };

  return (
    <>
    {events.map(( event ) => {
      const {id, eventName, eventDate, eventTime, remaining} = event;

      return (
        <>
        <button id={id} className='grid grid-rows-2 mt-5 border w-11/12 justify-self-center rounded-xl pt-2 pb-3 bg-violet-100'
        onClick={handleShowLargeTimer}>

          <div className='grid grid-cols-3 justify-items-center wi'>
            <p className='w-full text-left ms-10'>Event Name</p>
            <p className='w-full text-center'>Event date</p>
            <p className='w-full text-center'>Event remaining</p>
          </div>

          <div className='grid grid-cols-3 justify-items-center'>
            <p className='px-2 py-1 border border-slate-400 w-11/12 text-left rounded-lg overflow-auto whitespace-nowrap'
            >{`${eventName}`}</p>

            <p className='px-2 py-1 border border-slate-400 w-11/12 text-center rounded-lg overflow-auto whitespace-nowrap'
            >{`${formatDateTime(eventDate, eventTime)}`}</p>

            {remaining && (
              <p className='px-2 py-1 border border-slate-400 w-11/12 text-center rounded-lg overflow-auto whitespace-nowrap'>
                { (remaining.every(value => value == 0)) ? 'Event Completed' : (`${remaining[0]} days ${remaining[1]} hours ${remaining[2]} minutes ${remaining[3]} seconds`)}
              </p>
            ) }         
          </div>
        </button>        
        { (remaining && showLargeTimer && id === timerId) && <LargeTime remaining={remaining} />}
        </>
      )
    })}
    </>
  )
}