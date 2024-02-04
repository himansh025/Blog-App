import React, { useState } from 'react'
import appwriteService from '../appwrite/config';
import Button from './button/Button'
import { deleteUserPost, updateUserPosts } from '../store/appSlice';
import { useDispatch } from 'react-redux';
function PostCard({title, postImage, postID}) {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const featuredImage = appwriteService.getPreviewImage(postImage)
    const editHandler = async() =>{

    }
    const deleteHandler = async() =>{
      setLoading(true)
      await appwriteService.deletePost(postID)
      dispatch(deleteUserPost(postID))
      setLoading(false)
    }
  return (
    <div className="max-w-sm w-60 rounded overflow-hidden shadow-lg">
      <img src={featuredImage} alt={title} className="w-full h-48 object-cover" />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
      </div>
      <div className="flex gap-3 my-3">
        <Button onClick={editHandler}>Edit</Button>
        <Button onClick={deleteHandler}>Delete</Button>
        </div>
    </div>
  );
}

export default PostCard