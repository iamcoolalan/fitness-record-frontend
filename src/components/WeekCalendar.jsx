import clsx from "clsx"

import { toDateString, getDayOfWeek } from "../helpers/day"

const WeekCalendar = ({
  mode,
  startDayForDayMode,
  selectedDate,
  onSelectedPreviousDateClick,
  onSelectedFutureDateClick,
  onSelectedDateClick,
}) => {
  const isNotWeekCalendarMode = mode !== 'WeekCalendar'

  return (
    <div className={clsx('grid grid-cols-7 w-full h-full', { "hidden": isNotWeekCalendarMode })}>
        <div className='col-span-1 border-4 border-r-0 border-gray-600 rounded-l-lg grid grid-rows-[5%_repeat(7,minmax(0,1fr))_5%]'>
          <button className='row-span-1 border-r-4 border-b-2 border-gray-600 rounded-tl bg-orange-300'
            onClick={() => onSelectedPreviousDateClick()}
          >
            top
          </button>
          {Array.from({ length: 7 }, (_, index) => {
            const date = new Date(startDayForDayMode)
            date.setDate(date.getDate() + index)
            const isSelectedDate = toDateString(date) === toDateString(selectedDate)

            return (
            <div className='row-span-1 border-r-4 border-b-2 border-gray-600'>
              <div className={clsx('flex flex-col justify-center items-center h-full hover:bg-yellow-200 hover:text-gray-600 hover:border-black cursor-pointer', { "bg-orange-200 text-zinc-900": isSelectedDate, "text-gray-300": !isSelectedDate})}
                key={date}
                onClick={() => onSelectedDateClick(date)}
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
            onClick={() => onSelectedFutureDateClick()}
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
              <div className='flex justify-between items-center border-4 border-slate-300 p-1 rounded-lg shadow-lg hover:bg-yellow-200 hover:shadow-slate-600 hover:border-zinc-800 cursor-pointer'>
                <h2 className='text-2xl'>Leg Day</h2>
                <h2 className='text-2xl'>1h35min</h2>
              </div>
              <div className='flex justify-between items-center border-4 border-slate-300 p-1 rounded-lg shadow-lg hover:bg-yellow-200 hover:shadow-slate-600 hover:border-zinc-800 cursor-pointer'>
                <h2 className='text-2xl'>Leg Day</h2>
                <h2 className='text-2xl'>1h35min</h2>
              </div>
              <div className='flex justify-between items-center border-4 border-slate-300 p-1 rounded-lg shadow-lg hover:bg-yellow-200 hover:shadow-slate-600 hover:border-zinc-800 cursor-pointer'>
                <h2 className='text-2xl'>Leg Day</h2>
                <h2 className='text-2xl'>1h35min</h2>
              </div>
              <div className='flex justify-between items-center border-4 border-slate-300 p-1 rounded-lg shadow-lg hover:bg-yellow-200 hover:shadow-slate-600 hover:border-zinc-800 cursor-pointer'>
                <h2 className='text-2xl'>Leg Day</h2>
                <h2 className='text-2xl'>1h35min</h2>
              </div>
              <div className='flex justify-between items-center border-4 border-slate-300 p-1 rounded-lg shadow-lg hover:bg-yellow-200 hover:shadow-slate-600 hover:border-zinc-800 cursor-pointer'>
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
  )
}

export default WeekCalendar