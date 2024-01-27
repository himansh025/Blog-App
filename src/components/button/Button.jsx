import React from 'react'

function Button({
    children,
    className='',
    ...props
}) {
  return (
    <button className={`${className} px-4 rounded-full py-2 bg-gray-50`} {...props}>{children}</button>
  )
}

export default Button