import React, { useEffect, useRef, useState } from 'react'
import clsx from 'clsx'

function toDateString (date) {
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
}

const HomePage = () => {
  const today = new Date()

  const yearInputRef = useRef(null)
  const monthInputRef = useRef(null)

  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth() + 1)
  const [startDate, setStartDate] = useState(new Date())
  const [isYearEdit, setIsYearEdit] = useState(false)
  const [isMonthEdit, setIsMonthEdit] = useState(false)
  const [monthInputValue, setMonthInputValue] = useState(month)
  const [yearInputValue, setYearInputValue] = useState(year)

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
      <div className='grid grid-cols-7 grid-rows-[5%_repeat(6,minmax(0,1fr))] h-[98%] border-t-2 border-l-2'>
        <div className='col-span-7 row-span-1 border-b-2 grid grid-cols-7'>
          <div className='col-span-1 border-r-2 flex justify-center items-center'>
          SUN
          </div>
          <div className='col-span-1 border-r-2 flex justify-center items-center'>
          MON
          </div>
          <div className='col-span-1 border-r-2 flex justify-center items-center'>
          TUE
          </div>
          <div className='col-span-1 border-r-2 flex justify-center items-center'>
          WED
          </div>
          <div className='col-span-1 border-r-2 flex justify-center items-center'>
          THU
          </div>
          <div className='col-span-1 border-r-2 flex justify-center items-center'>
          FRI
          </div>
          <div className='col-span-1 border-r-2 flex justify-center items-center'>
          SAT
          </div>
        </div>
        {Array.from({length: 42}, (_, index) => {
          const date = new Date(startDate)
          date.setDate(startDate.getDate() + index)


          const isNotSelectedMonth = (date.getMonth() + 1) !== month
          const isToday = toDateString(date) === toDateString(today)

          return (
            <div 
            key={toDateString(date)}
            className={clsx('col-span-1 row-span-1 border-r-2 border-b-2 cursor-pointer', { "text-slate-500": isNotSelectedMonth, "bg-yellow-200": isToday })}>
              {date.getDate()}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HomePage