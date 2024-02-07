import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config';
import { PostCard } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { setPublicPosts } from '../store/appSlice';
import { Link } from 'react-router-dom';


function AllPosts() {
  
    const allPosts = useSelector(state=>state.publicPosts)
    if (allPosts.length>0)
      return (
      <div className="flex flex-wrap gap-2 justify-center">
        {
          allPosts.map(post=><PostCard key={post.$createdAt} title={post.title} postID={post.$id} postImage={post.postImage} isPublic={true}/>)
        }
      </div>) 
    else{
      (
        <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">No Posts</h2>
        <p className="text-gray-700 mb-4">
          Oops! You have not published any post.
        </p>
        <p className="text-gray-500">
          Create a fresh post{" "}
          <Link to="/create" className="text-blue-500">
            Create Post
          </Link>
          .
        </p>
      </div>
      )
    }
}

export default AllPosts