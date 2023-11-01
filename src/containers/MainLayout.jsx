import React from 'react'
import { Link } from 'react-router-dom';

const MainLayout = ({ children }) => {
  return (
    <div className='grid grid-cols-12 h-screen font-mono'>
      <div className='col-span-3 bg-zinc-800 text-white relative'>
        <div className='flex flex-col justify-center items-center gap-24 mt-[10%]'>
          <Link className='text-3xl hover:text-yellow-200 hover:border-2 hover:border-yellow-200 hover:ring-4 p-2 w-[95%] hover:ring-orange-300 hover:ring-offset-2 hover:ring-offset-white hover:rounded text-center' to="/homepage">Fitness Record</Link>
          <div className='flex flex-col justify-center items-center gap-5 w-full'>
            <Link className='text-2xl border-2 rounded hover:bg-yellow-200 hover:text-black w-3/4 text-center'to="/profile">Profile</Link>
            <Link className='text-2xl border-2 rounded hover:bg-yellow-200 hover:text-black w-3/4 text-center'to="/data">Data</Link>
            <button className='w-3/4 text-2xl text-center border-2 rounded hover:bg-yellow-200 hover:text-black '>New Record</button>
          </div>
        </div>
        <button className='text-2xl border-4 rounded-xl p-1 w-[40%] absolute bottom-1 right-2 hover:border-yellow-200 hover:text-yellow-200 hover:shadow-md hover:shadow-orange-300'>Logout</button>
      </div>
      <div className='col-span-9 p-5'>
        <div className='flex flex-col items-center h-full gap-8'>
          <div className='w-[98%]'>
            <div className='flex text-lg gap-1 border-b-4 border-gray-300'>
              <Link className='border-4 p-2 rounded-t-2xl border-yellow-300 ring-4 ring-orange-300'>Workout</Link>
              <Link className='border-4 border-gray-300 border-b-0 rounded-t-2xl hover:border-4 hover:border-yellow-300 hover:ring-4 hover:ring-orange-300 p-2'>Bodydata</Link>
            </div>
          </div>
          <div className='border-4 border-gray-300 ring-8 ring-gray-600 ring-offset-8 rounded-xl p-2 h-[98%] w-[98%]'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainLayout