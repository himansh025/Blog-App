import React from 'react'
import service from '../appwrite/config'
import { Link } from 'react-router-dom'

function postCard({title, featuredImage, $id}) {
  return (
    <Link className='mx-auto rounded-2xl' to={`/post/${$id}`}>
        <img src={service.getPreviewFile(featuredImage)} className='w-[300px] rounded-2xl'  alt="" srcset="" />
        <h1>{title}</h1>
    </Link>
  )
}

export default postCard