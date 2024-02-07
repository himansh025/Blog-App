import React, { useState } from "react";
import { PostForm } from "../components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

function EditPost() {
  const navigate = useNavigate()
  const userPost = useSelector((state) => state.userPost);
  console.log(userPost, typeof userPost)
  if (userPost)
    return (
      <div>
        <PostForm oldPostData={userPost} />
      </div>
    )
  
  else
      return (
        <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">Unauthorized</h2>
        <p className="text-gray-700 mb-4">
          Oops! You can not edit this post, you are not logged as publisher.
        </p>
        <p className="text-gray-500">
        <Link to="/login" className="text-blue-500">
            Login
          </Link> to Edit Post
          .
        </p>
      </div>
      )
  
}

export default EditPost;
