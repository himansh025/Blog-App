import React, { useEffect, useState } from 'react'
import appwriteService from '../appwrite/config';
import { PostCard } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { setPublicPosts } from '../store/appSlice';


function AllPosts() {
  
    const allPosts = useSelector(state=>state.publicPosts)
    return (
    <div className="flex flex-wrap gap-2 justify-center">
      {
        allPosts.map(post=><PostCard key={post.$createdAt} title={post.title} postID={post.$id} postImage={post.postImage}/>)
      }
    </div>
  ) 
}

export default AllPosts