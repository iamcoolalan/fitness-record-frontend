import React, { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import addDays from 'date-fns/addDays'
import subDays from 'date-fns/subDays'

import FullCalender from '../components/FullCalendar.jsx'
import WeekCalendar from '../components/WeekCalendar.jsx'

const HomePage = () => {
  const today = new Date()
  const startDayForDayModeInitialValue = new Date(today)
  startDayForDayModeInitialValue.setDate(today.getDate() - 3)

  const yearInputRef = useRef(null)
  const monthInputRef = useRef(null)

  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth() + 1)
  const [startDate, setStartDate] = useState(new Date())
  const [isYearEdit, setIsYearEdit] = useState(false)
  const [isMonthEdit, setIsMonthEdit] = useState(false)
  const [monthInputValue, setMonthInputValue] = useState(month)
  const [yearInputValue, setYearInputValue] = useState(year)
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [startDayForDayMode, setStartDayForDayMode] = useState(startDayForDayModeInitialValue)

  function handleYearLeftClick() {
    setYear(year - 1)
  }

   function handleYearRightClick() {
    setYear(year + 1)
  }

  function handleMonthLeftClick() {
    if (month - 1 < 1) {
      setMonth(12)
    } else {
      setMonth(month - 1)
    }
  }

  function handleMonthRightClick() {
    if (month + 1 > 12) {
      setMonth(1)
    } else {
      setMonth(month + 1)
    }
  }

  async function handleDoubleClick(cb, ref) {
    await cb(true)
    ref.current.focus()
  }

  async function handleYearKeyDown(e) {
    const inputValue = yearInputValue

    if (inputValue.length > 0 && e.key === 'Enter') {
      if (inputValue > 0) {
        const setValue = Math.floor(Number(inputValue))
  
        await setYear(setValue)
      }
      
      await setYearInputValue(year)
      await setIsYearEdit(false)
      e.preventDefault()
    }

    if (e.key === 'Escape') {
      setIsYearEdit(false)
    }
  }

  async function handleMonthKeyDown(e) {
    const inputValue = monthInputValue

    if (inputValue.length > 0 && e.key === 'Enter') {
      if (1 <= inputValue && inputValue <= 12) {
        const setValue = Math.floor(Number(inputValue))
        await setMonth(setValue)
      }
      
      await setMonthInputValue(month)
      await setIsMonthEdit(false)
      e.preventDefault()
    }

    if (e.key === 'Escape') {
      setIsMonthEdit(false)
    }
  } 

  function handleBlur(cb1, cb1Value, cb2) {
    cb1(cb1Value)
    cb2(false)
  }

  function handleOnChange(e, cb) {
    cb(e.target.value);
  }

  function handleSelectedDateClick (selectedDate) {
    if ((selectedDate.getMonth() + 1) !== month ) {
      setMonth(selectedDate.getMonth() + 1)
    }

    if (selectedDate.getFullYear() !== year) {
      setYear(selectedDate.getFullYear())
    }

    setSelectedDate(selectedDate)
  }

  function handleSelectedPreviousDateClick() {
    const setDate = subDays(selectedDate, 1)

    if ((setDate.getMonth() + 1) !== month ) {
      setMonth(setDate.getMonth() + 1)
    }

    if (setDate.getFullYear() !== year) {
      setYear(setDate.getFullYear())
    }

    setSelectedDate(setDate)
  }

  function handleSelectedFutureDateClick() {
    const setDate = addDays(selectedDate, 1)

    if ((setDate.getMonth() + 1) !== month ) {
      setMonth(setDate.getMonth() + 1)
    }

    if (setDate.getFullYear() !== year) {
      setYear(setDate.getFullYear())
    }

    setSelectedDate(setDate)
  }

  useEffect(() => {
    function getCalendar (
    date,
    weekLabelIndex = 0
    ) {
      let _date = new Date(date)

      _date = new Date(_date.setDate(_date.getDate() - _date.getDay() + weekLabelIndex))

      if (_date > date) {
        _date = new Date(_date.setDate(_date.getDate() - 7))
      }

      setStartDate(_date)
    }

    const formattedMonth = month.toString().padStart(2, '0')
    const inputDate = `${year}-${formattedMonth}-01`

    getCalendar(inputDate)
  }, [year, month])

  useEffect(() => {
    function getStartDate(
      date
    ) {
      let _date = new Date(date)
      _date.setDate(_date.getDate() - 3)

      setStartDayForDayMode(_date)
    }

    getStartDate(selectedDate)
  }, [selectedDate])

  return (
    <div className='w-full h-full flex flex-col'>
      <div>
        <div className={clsx('flex gap-2', { "hidden": isYearEdit })}>
          <button 
            className='hover:bg-yellow-200'
            onClick={handleYearLeftClick}
          >Left</button>
          <h1 
            className='text-5xl'
            onDoubleClick={() => handleDoubleClick(setIsYearEdit, yearInputRef)}
          >{ year }</h1>
          <button 
            className='hover:bg-yellow-200'
            onClick={handleYearRightClick}
          >Right</button>
        </div>
        <div className={clsx('text-5xl', { "hidden": !isYearEdit })}>
          <input
            type="text"
            ref={yearInputRef}
            onKeyDown={handleYearKeyDown}
            onBlur={() => handleBlur(setYearInputValue, year, setIsYearEdit)}
            onChange={(e) => handleOnChange(e, setYearInputValue)}
            value={yearInputValue}
          />
        </div>
        <div className={clsx('flex gap-2', { "hidden": isMonthEdit })}>
          <button 
            className='hover:bg-yellow-200'
            onClick={handleMonthLeftClick}
          >Left</button>
          <h3 
            className='text-4xl'
            onDoubleClick={() => handleDoubleClick(setIsMonthEdit, monthInputRef)}
          >{ month }</h3>
          <button 
            className='hover:bg-yellow-200'
            onClick={handleMonthRightClick}
          >Right</button>
        </div>
         <div className={clsx('text-4xl', { "hidden": !isMonthEdit })}>
          <input
            type="text"
            ref={monthInputRef}
            onKeyDown={handleMonthKeyDown}
            onBlur={() => handleBlur(setMonthInputValue, month, setIsMonthEdit)}
            onChange={(e) => handleOnChange(e, setMonthInputValue)}
            value={monthInputValue}
          />
        </div>
      </div>
      <div className='grid grid-rows-[90%_10%] border-4 border-gray-600 rounded-lg h-full'>
        <div className='row-span-1 grid grid-rows-5 gap-2 border-b-4 border-gray-600 p-1'>
           <div className='flex justify-between items-center border-4 border-slate-300 px-3 rounded-lg shadow-lg hover:bg-yellow-200 hover:shadow-slate-600 hover:border-zinc-800 cursor-pointer'>
            <div className='flex flex-col'>
              <h2 className='text-2xl'>Leg Day</h2>
              <h2 className='text-xl'>1h35min</h2>
            </div>
            <div>
              <p className='text-2xl'>2023-11-01</p>
            </div>
          </div> 
           <div className='flex justify-between items-center border-4 border-slate-300 px-3 rounded-lg shadow-lg hover:bg-yellow-200 hover:shadow-slate-600 hover:border-zinc-800 cursor-pointer'>
            <div className='flex flex-col'>
              <h2 className='text-2xl'>Leg Day</h2>
              <h2 className='text-xl'>1h35min</h2>
            </div>
            <div>
              <p className='text-2xl'>2023-11-01</p>
            </div>
          </div> 
           <div className='flex justify-between items-center border-4 border-slate-300 px-3 rounded-lg shadow-lg hover:bg-yellow-200 hover:shadow-slate-600 hover:border-zinc-800 cursor-pointer'>
            <div className='flex flex-col'>
              <h2 className='text-2xl'>Leg Day</h2>
              <h2 className='text-xl'>1h35min</h2>
            </div>
            <div>
              <p className='text-2xl'>2023-11-01</p>
            </div>
          </div> 
           <div className='flex justify-between items-center border-4 border-slate-300 px-3 rounded-lg shadow-lg hover:bg-yellow-200 hover:shadow-slate-600 hover:border-zinc-800 cursor-pointer'>
            <div className='flex flex-col'>
              <h2 className='text-2xl'>Leg Day</h2>
              <h2 className='text-xl'>1h35min</h2>
            </div>
            <div>
              <p className='text-2xl'>2023-11-01</p>
            </div>
          </div> 
           <div className='flex justify-between items-center border-4 border-slate-300 px-3 rounded-lg shadow-lg hover:bg-yellow-200 hover:shadow-slate-600 hover:border-zinc-800 cursor-pointer'>
            <div className='flex flex-col'>
              <h2 className='text-2xl'>Leg Day</h2>
              <h2 className='text-xl'>1h35min</h2>
            </div>
            <div>
              <p className='text-2xl'>2023-11-01</p>
            </div>
          </div> 
        </div>
        <div className='row-span-1 flex flex-row justify-center items-center gap-2'>
          <button className='border-2 border-gray-600 rounded p-0.5 text-lg hover:bg-yellow-200'>1</button>
          <button className='border-2 border-gray-600 rounded p-0.5 text-lg hover:bg-yellow-200'>2</button>
          <button className='border-2 border-gray-600 rounded p-0.5 text-lg hover:bg-yellow-200'>3</button>
          <button className='border-2 border-gray-600 rounded p-0.5 text-lg hover:bg-yellow-200'>4</button>
          <button className='border-2 border-gray-600 rounded p-0.5 text-lg hover:bg-yellow-200'>5</button>
        </div>
      </div>
      <FullCalender
        isHidden='hidden'
        startDate={startDate}
        month={month}
        today={today}
      ></FullCalender>
      <WeekCalendar
        isHidden='hidden'
        startDayForDayMode= {startDayForDayMode}
        selectedDate= {selectedDate}
        onSelectedPreviousDateClick = {handleSelectedPreviousDateClick}
        onSelectedFutureDateClick = {handleSelectedFutureDateClick}
        onSelectedDateClick = {handleSelectedDateClick}
      ></WeekCalendar>
    </div>
  )
}

export default HomePage