import React from 'react'
// import { useParams } from 'react-router-dom'

const RecordDetailPage = () => {
  // const { recordId } = useParams()

  return (
    <div className='grid grid-rows-[15%_75%_10%] border-4 border-gray-600 rounded-lg h-full'>
        <div className='row-span-1 border-b-4 border-gray-600 flex flex-col justify-center items-center'>
          <h1 className='text-4xl'>Leg Day</h1>
          <div className='flex gap-3'>
            <p className='text-lg text-gray-500'>Date:2023-10-31</p>
            <p className='text-lg text-gray-500'>Time:1h35min</p>
          </div>
        </div>
        <div className='row-span-1 grid grid-cols-2 grid-rows-4 gap-2 border-b-4 border-gray-600 p-1'>
         <div className='col-span-1 row-span-1 border-4 border-slate-300 rounded-lg shadow-md shadow-zinc-400 flex flex-row justify-between items-center px-2'>
            <div>
              <h3 className='text-2xl'>胸部斜上推</h3>
              <h5 className='text-xl'>雙手推</h5>
            </div>
            <div className='flex flex-col justify-center'>
              <p className='text-sm'>組數: 4</p>
              <p className='text-sm'>次數: 12</p>
              <p className='text-sm'>重量: 20kg</p>
            </div>
          </div>
        </div>
        <div className='row-span-1 flex flex-row justify-between items-center p-2'>
          <button className='text-lg border-2 border-zinc-800 rounded-lg w-[15%] hover:bg-yellow-200'>Back</button>
          <button className='text-lg border-2 border-zinc-800 rounded-lg w-[15%] hover:bg-yellow-200'>Edit</button>
        </div>
      </div>
  )
}

export default RecordDetailPage