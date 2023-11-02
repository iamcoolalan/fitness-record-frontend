import clsx from "clsx"

import { toDateString } from "../helpers/day"

const FullCalender = ({
  onClick,
  mode,
  startDate,
  month,
  today
}) => {
  const isNotFullCalendarMode = mode !== 'FullCalender'

  return (
    <div className={clsx('grid grid-cols-7 grid-rows-[5%_repeat(6,minmax(0,1fr))] h-[98%] border-t-4 border-l-4 border-gray-600', { "hidden": isNotFullCalendarMode })}>
        <div className='col-span-7 row-span-1 border-b-4 border-gray-600 grid grid-cols-7'>
          <div className='col-span-1 border-r-4 border-gray-600 flex justify-center items-center'>
          SUN
          </div>
          <div className='col-span-1 border-r-4 border-gray-600 flex justify-center items-center'>
          MON
          </div>
          <div className='col-span-1 border-r-4 border-gray-600 flex justify-center items-center'>
          TUE
          </div>
          <div className='col-span-1 border-r-4 border-gray-600 flex justify-center items-center'>
          WED
          </div>
          <div className='col-span-1 border-r-4 border-gray-600 flex justify-center items-center'>
          THU
          </div>
          <div className='col-span-1 border-r-4 border-gray-600 flex justify-center items-center'>
          FRI
          </div>
          <div className='col-span-1 border-r-4 border-gray-600 flex justify-center items-center'>
          SAT
          </div>
        </div>
        {Array.from({length: 42}, (_, index) => {
          const date = new Date(startDate)
          date.setDate(date.getDate() + index)

          const isNotSelectedMonth = (date.getMonth() + 1) !== month
          const isToday = toDateString(date) === toDateString(today)

          return (
            <div 
              className={clsx('col-span-1 row-span-1 border-r-4 border-b-4 border-gray-600 cursor-pointer hover:bg-yellow-200', { "text-slate-400": isNotSelectedMonth, "bg-orange-200": isToday })}
              key={toDateString(date)}
              onClick={() => onClick(date)}
            >
              <div className='pl-2 pt-1'>
                {date.getDate()}
              </div>
            </div>
          )
        })}
      </div>
  )
}

export default FullCalender