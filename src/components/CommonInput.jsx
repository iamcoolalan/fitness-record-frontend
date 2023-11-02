import React from 'react'

const CommonInput = ({
  label,
  name,
  placeholder,
  type,
  className
}) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label className='font-mono text-lg' htmlFor={label}>
        {label}
      </label>
      <input
        className='border-2 border-stone-950 rounded focus:outline-none focus:border-4 focus:border-yellow-200 focus:ring focus:ring-orange-300 focus:rounded h-10 px-2 font-mono text-lg'
        type={type}
        name={name}
        placeholder={placeholder}
        id={label}
      />
    </div>
  )
}

export default CommonInput