import React from 'react'
import service from './appwrite/config';

function App() {
 service.createPost({title: 'noor', content: "helloo", featuredImage: 'none', userID : '1'})
  return (
    <div className='flex h-screen justify-center items-center bg-red-100 text-5xl'>Quick React Setup with Tailwind</div>
  )
}

export default App