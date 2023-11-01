import clsx from "clsx"

const RecordListMode = ({
  mode
}) => {
  const isNotListMode = mode !== 'List'

  return (
    <div className={clsx('grid grid-rows-[90%_10%] border-4 border-gray-600 rounded-lg h-full', { "hidden" : isNotListMode })}>
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
  )
}

export default RecordListMode