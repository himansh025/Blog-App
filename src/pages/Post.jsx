import React from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import appwriteService from '../appwrite/config';

function Post() {
  const {slug} = useParams()
  console.log(slug)
  const data = useSelector(state=>state.userPosts)
  const postData = data.find(data=>data.$id ==slug)
  const {title, content, postImage} = postData
  if(postData )
      {
        const featuredImage = appwriteService.getImage(postImage)
        return (
        <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          <div className="mb-4">
            <img src={featuredImage} alt={title} className="w-full h-auto rounded-md" />
          </div>
          <p className="text-gray-700">{content}</p>
          <p className="text-gray-500 mt-4">Slug: {slug}</p>
        </div>
      )}
  else
      return (
        <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
          <h2 className="text-2xl font-bold mb-4">404 Not Found</h2>
          <p className="text-gray-700 mb-4">Oops! The page you are looking for does not exist.</p>
          <p className="text-gray-500">Go back to the <Link to="/" className="text-blue-500">home page</Link>.</p>
        </div>)
}

export default Post