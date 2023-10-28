import React from 'react'

const RadioInput = ({
  options,
  title
}) => {
  return (
    <div >
      <h3 className='text-lg'>{title}</h3>
      <div className='flex flex-row justify-around align-middle'>
      {options.map((option, index) => {
        return (
          <div className='flex items-center gap-1' key={index}>
          <input className='text-lg w-[16px] h-[16px]'
            type="radio"
            name={title}
            id='option1'
          />
          <label className='text-xl'
            htmlFor="option1"
          >
            {option.name}
          </label>
        </div>
        )
      })}
      </div>
    </div>
  )
}

export default RadioInput