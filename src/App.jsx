import React from 'react'
import service from './appwrite/config';
import authService from './appwrite/auth'

function App() {
    // authService.loginAccount({email: 'nooralamf42@gmail.com', password: "meonly42@"})
    //authService.getAccount()
  //service.createPost({title: 'noor', content: "helloooooo hshfskjf", featuredImage: 'none', userID : '1'})
  service.deletePost("65af58ce5dcb08e9ec43")
  return (
    <div className='flex h-screen justify-center items-center bg-red-100 text-5xl'>Quick React Setup with Tailwind</div>
  )
}

export default App