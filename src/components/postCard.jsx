import React from 'react'
import service from '../appwrite/config'
import { Link } from 'react-router-dom'

function PostCard({title, featuredImage, $id}) {
  
  return (
    <Link className='mx-auto rounded-2xl w-[300px]' to={`/post/${$id}`}>
        <img src={service.getPreviewFile(featuredImage).href} className='w-[300px] rounded-2xl'  alt="" srcset="" />
        <h1>{title}</h1>
    </Link>
  )
}

export default PostCard