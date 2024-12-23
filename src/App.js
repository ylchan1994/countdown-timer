import React, { useEffect, useState } from 'react';
import Events from './events';
import AddingEvent from './addingEvent';

function Str_Random(length) {
  let result = '';
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  
  for (let i = 0; i < length; i++) {
      const randomInd = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomInd);
  }
  return result;
}

export default function App() {
  const [ events, setEvents ] = useState(JSON.parse(localStorage.getItem('events')));
  const [ isAdding, setIsAdding ] = useState(false);
  const [ newEvent, setNewEvent ] = useState({});

  const handleAddEvent = (event) => {
    event.preventDefault();
    setIsAdding(true);
  }

  const handleChange = (event) => {
    const {name, value} = event.target;
    const id = newEvent.id ? newEvent.id : Str_Random(8);
    setNewEvent((prev) => ({
      ...prev,
      [name]: value,
      id: id
    }))

  };

  const handleDone = (event) => {
    event.preventDefault();
    if (Object.keys(newEvent).length === 0) {
      setIsAdding(false);
      return;
    }

    setEvents((prev) => {
      
      return ([...prev, newEvent])
    })
    setNewEvent({});
    setIsAdding(false);
  }

  useEffect(() => {

    localStorage.setItem('events', JSON.stringify(events))

    const interval = setInterval(() => {
      
      const dateNow = Date.now();
      if (events.keys().length === 0) {return;};
      events.forEach( (event) => {
        const { eventDate, eventTime } = event;
        const eventDateTime = Date.parse(`${eventDate} ${ (eventTime === '' || !eventTime) ? '00:00' : eventTime } GMT+0800`);

        let remainingDateTime = Math.floor((eventDateTime - dateNow) / 1000);
        let remainingDecompose = Array(4);

        [1,2,3,4].forEach((_, index) => {
          if(remainingDateTime < 0) {
            remainingDecompose = [0, 0, 0, 0];
            return;
          }

          const timeUnit = [ 86400, 3600, 60, 1];
          remainingDecompose[index] = Math.floor(remainingDateTime / timeUnit[index]);
          remainingDateTime = remainingDateTime % timeUnit[index];
        })

        setEvents((prev) => {
          return [...prev.slice(1), {...event, remaining: remainingDecompose} ];
        })
      })
    }, 1000);

    return () => {
      clearInterval(interval)
    };
    
  }, [events])

  return (
    <>
    <h1 className='text-3xl font-semibold mt-5 text-center text-'>Countdown</h1>
    <button className='mt-10 mx-5 px-3 py-2 border border-gray-700 rounded-lg bg-sky-100 hover:bg-sky-300'
      onClick={handleAddEvent}>
      Add new Event
    </button>

    {isAdding? <AddingEvent handleDone={handleDone} handleInputChange={handleChange}/> : ''}

    <Events events={events} />
    </>
  );
};