import clsx from "clsx"

const Calender = ({
  isHidden,
  startDate,
  month,
  today
}) => {
  function toDateString (date) {
    return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`
  }

  return (
    <div className={`grid grid-cols-7 grid-rows-[5%_repeat(6,minmax(0,1fr))] h-[98%] border-t-2 border-l-2 ${isHidden}`}>
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
              <div className='pl-2 pt-1'>
                {date.getDate()}
              </div>
            </div>
          )
        })}
      </div>
  )
}

export default Calender