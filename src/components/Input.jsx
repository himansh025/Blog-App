import React from 'react'

function Input({
    label='',
    bgColor='',
    width='',
    textColor='',
    type='text',
    placeholder = 'your name',
    ...props
}, ref) {
  return (
    <div>
       {
        label && <label className='block text-sm font-semibold text-gray-600'>{label} : </label>
       }
       <input type={type} ref={ref} placeholder={placeholder} className={`${bgColor} ${width} ${textColor} p-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:border-blue-500 my-3`} {...props}/>
    </div>
  )
}

export default React.forwardRef(Input)