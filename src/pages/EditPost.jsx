import React, { useState } from 'react'
import { PostForm } from '../components'
import { useSelector } from 'react-redux'

function EditPost() {
  // const [userPost, setUserPost] = useState({})
  const userPost = useSelector((state)=>state.userPost)
  if(userPost =={})
    return <p>Loading</p>
  return (
    <div>
      <PostForm oldPostData={userPost}/>
    </div>
  )
}

export default EditPost