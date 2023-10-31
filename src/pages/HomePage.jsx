import React, { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import addDays from 'date-fns/addDays'
import subDays from 'date-fns/subDays'

import Calender from '../components/Calendar.jsx'

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

  function getDayOfWeek(date) {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    return daysOfWeek[date.getDay()]
  }

  function toDateString (date) {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
  }


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
      <div className='grid grid-cols-7 w-full h-full'>
        <div className='col-span-1 border-4 border-r-0 border-gray-600 rounded-l-lg grid grid-rows-[5%_repeat(7,minmax(0,1fr))_5%]'>
          <button className='row-span-1 border-r-4 border-b-2 border-gray-600 rounded-tl bg-orange-300'
            onClick={handleSelectedPreviousDateClick}
          >
            top
          </button>
          {Array.from({ length: 7 }, (_, index) => {
            const date = new Date(startDayForDayMode)
            date.setDate(startDayForDayMode.getDate() + index)
            const isSelectedDate = toDateString(date) === toDateString(selectedDate)

            return (
            <div className='row-span-1 border-r-4 border-b-2 border-gray-600'>
              <div className={clsx('flex flex-col justify-center items-center h-full hover:bg-yellow-200 hover:border-black cursor-pointer', { "bg-yellow-200": isSelectedDate, "text-gray-300 hover:text-gray-600": !isSelectedDate})}
                key={date}
                onClick={() => handleSelectedDateClick(date)}
              >
                <h3 className='text-lg font-extrabold'>
                  { date.getDate() }
                </h3>
                <h3 className='text-lg font-extrabold'>
                  { getDayOfWeek(date) }
                </h3>
              </div>
            </div>
            )
          })}
          <button className='row-span-1 border-r-4 border-gray-600 rounded-bl bg-orange-300'
            onClick={handleSelectedFutureDateClick}
          >
            down
          </button>
        </div>
        <div className='col-span-6 border-4 border-l-0 border-gray-600 rounded-r-lg p-2'>
          <div className='border-4 border-gray-500 rounded-lg h-full grid grid-rows-[15%_77%_8%]'>
            <div className='row-span-1 border-b-2 border-gray-500 flex justify-center items-center'>
              <h2 className='text-3xl'>{`${toDateString(selectedDate)} Records`}</h2>
            </div>
            <div className='row-span-1 border-t-2 border-gray-500 grid grid-rows-5 p-1 gap-2'>
              <div className='flex justify-between items-center border-4 border-slate-300 p-1 rounded-lg shadow-lg hover:bg-yellow-200 hover:shadow-slate-600 hover:border-black cursor-pointer'>
                <h2 className='text-2xl'>Leg Day</h2>
                <h2 className='text-2xl'>1h35min</h2>
              </div>
              <div className='flex justify-between items-center border-4 border-slate-300 p-1 rounded-lg shadow-lg hover:bg-yellow-200 hover:shadow-slate-600 hover:border-black cursor-pointer'>
                <h2 className='text-2xl'>Leg Day</h2>
                <h2 className='text-2xl'>1h35min</h2>
              </div>
              <div className='flex justify-between items-center border-4 border-slate-300 p-1 rounded-lg shadow-lg hover:bg-yellow-200 hover:shadow-slate-600 hover:border-black cursor-pointer'>
                <h2 className='text-2xl'>Leg Day</h2>
                <h2 className='text-2xl'>1h35min</h2>
              </div>
              <div className='flex justify-between items-center border-4 border-slate-300 p-1 rounded-lg shadow-lg hover:bg-yellow-200 hover:shadow-slate-600 hover:border-black cursor-pointer'>
                <h2 className='text-2xl'>Leg Day</h2>
                <h2 className='text-2xl'>1h35min</h2>
              </div>
              <div className='flex justify-between items-center border-4 border-slate-300 p-1 rounded-lg shadow-lg hover:bg-yellow-200 hover:shadow-slate-600 hover:border-black cursor-pointer'>
                <h2 className='text-2xl'>Leg Day</h2>
                <h2 className='text-2xl'>1h35min</h2>
              </div>
            </div>
            <div className='row-span-1 border-t-4 border-gray-500 flex justify-center items-center gap-2 h-full'>
              <button className='hover:bg-yellow-200'>left</button>
              <button className='hover:bg-yellow-200'>right</button>
            </div>
          </div>
        </div>
      </div>
      <Calender
        isHidden='hidden'
        startDate={startDate}
        month={month}
        today={today}
      ></Calender>
    </div>
  )
}

export default HomePage