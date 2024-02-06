import React, { useState } from "react";
import { PostForm } from "../components";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

function EditPost() {
  const navigate = useNavigate()
  const userPost = useSelector((state) => state.userPost);
  if (userPost.$id)
    return (
      <div>
        <PostForm oldPostData={userPost} />
      </div>
    );
  else {
    navigate('/posts')
  }
}

export default EditPost;
