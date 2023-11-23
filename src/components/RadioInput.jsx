import React from 'react'

const RadioInput = ({
  userGender,
  name,
  className,
  options,
  title,
  onChange
}) => {
  return (
    <div className={className}>
      <h3 className='text-lg'>{title}</h3>
      <div className='flex flex-row justify-around align-middle'>
      {options.map((option, index) => {
        return (
          <div className="flex items-center gap-1" key={index}>
            <input
              className="text-lg w-[16px] h-[16px]"
              type="radio"
              name={name}
              id="option1"
              value={option.value}
              checked={userGender === option.value}
              onChange={(e) => onChange(e)}
            />
            <label className="text-xl" htmlFor="option1">
              {option.name}
            </label>
          </div>
        );
      })}
      </div>
    </div>
  )
}

export default RadioInput