import React from 'react'
import { useSelector } from 'react-redux'
import { PostCard } from '../components'

function UserPosts() {
  const userPosts = useSelector(state=> state.userPosts) || []
  return (
    <div className='flex flex-wrap gap-3'>
      {
      userPosts.map(post=><PostCard key={post.$id} postImage={post.postImage} title={post.title} postID={post.$id}/>
      )}
    </div>
  )
}

export default UserPosts