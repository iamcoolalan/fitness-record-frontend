import React from 'react'

const DateInput = () => {
  return (
    <div className='flex flex-col gap-1'>
      <label className='text-lg' htmlFor="data">Date</label>
      <input className='border-2 border-stone-950 rounded focus:outline-none focus:border-4 focus:border-yellow-200 focus:ring focus:ring-orange-300 focus:rounded h-10 px-2 text-lg hover:cursor-pointer'
        type="date"
        name=""
        id=""
      />
    </div>
  )
}

export default DateInput