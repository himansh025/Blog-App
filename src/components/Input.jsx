import React from 'react'

function Input({
    label='',
    className='',
    bgColor='',
    width='',
    textColor='',
    type='text',
    placeholder = 'your name',
    ...props
}, ref) {
  return (
    <div className='w-full'>
       {
        label && <label className='block text-sm font-semibold text-gray-600'>{label} : </label>
       }
       <input type={type} minLength={5} ref={ref} placeholder={placeholder} className={`${bgColor} ${width} ${textColor} ${className} p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-500 my-3`} {...props}/>
    </div>
  )
}

export default React.forwardRef(Input)