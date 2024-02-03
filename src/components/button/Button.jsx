import React from 'react'

import './loader.css'

function Button({
    loading=false,
    type='text',
    children,
    ...props
}) {
  return (
    <button className='flex justify-center items-center gap-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300' type={type}>{children}{loading && <div className="spinner"></div>}</button>
  )
}

export default Button