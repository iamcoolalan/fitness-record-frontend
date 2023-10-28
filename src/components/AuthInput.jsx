import React from 'react'

const AuthInput = () => {
  return (
    <div className='flex flex-col gap-1'>
      <label className='font-mono text-lg' htmlFor='name'>
        Label
      </label>
      <input
        className='border-2 border-stone-950 rounded focus:outline-none focus:border-4 focus:border-yellow-200 focus:ring focus:ring-orange-300 focus:rounded h-10 px-2 font-mono text-lg'
        type="text" 
        placeholder='placeholder'
        id='name'
      />
    </div>
  )
}

export default AuthInput