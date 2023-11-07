import React from 'react'

const CommonInput = ({
  label,
  name,
  placeholder,
  type,
  defaultValue,
  step,
  disabled,
  min,
  max,
  className,
  onChange,
  inputTextSize,
  inputClassName
}) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label className='font-mono text-lg' htmlFor={label}>
        {label}
      </label>
      <input
        className={`border-2 border-stone-950 rounded focus:outline-none focus:border-4 focus:border-yellow-200 focus:ring focus:ring-orange-300 focus:rounded h-10 px-2 font-mono ${inputTextSize ? inputTextSize : 'text-lg'} ${inputClassName}`}
        type={type}
        name={name}
        placeholder={placeholder}
        defaultValue={defaultValue}
        step={type === 'number' ? step : undefined}
        id={label}
        disabled={disabled}
        min={min}
        max={max}
        onChange={(e) => onChange(e)}
      />
    </div>
  )
}

export default CommonInput