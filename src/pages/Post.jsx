import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
import {Button} from '../components'
import { deleteUserPost, setUserPost, login } from "../store/appSlice";

function Post() {
  const {slug} = useParams();
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(()=>{
    dispatch(setUserPost(slug))
  },[])


  const [loading, setLoading] = useState(false)
  const postData = useSelector((state) => state.userPost);
  

  if (postData!={} && postData) {

    const deleteHandler = async() =>{
      setLoading(true)
      await appwriteService.deletePost(postData.$id)
      dispatch(deleteUserPost(postData.$id))
      navigate('/')
    }

    const editHandler = () =>{
      navigate(`/edit/${slug}`)
    }

    const { title, content, postImage } = postData;

    const featuredImage = appwriteService.getImage(postImage);
    return (
      <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <div className="mb-4">
          <img
            src={featuredImage}
            alt={title}
            className="w-full h-auto rounded-md"
          />
        </div>
        <p className="text-gray-700">{content}</p>
        <p className="text-gray-500 mt-4">Slug: {slug}</p>
        <div className="flex gap-3 my-3">
        <Button onClick={editHandler}>Edit</Button>
        <Button onClick={deleteHandler}>Delete</Button>
        </div>
      </div>
    );
  } else
    return (
      <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">404 Not Found</h2>
        <p className="text-gray-700 mb-4">
          Oops! The page you are looking for does not exist.
        </p>
        <p className="text-gray-500">
          Go back to the{" "}
          <Link to="/" className="text-blue-500">
            home page
          </Link>
          .
        </p>
      </div>
    );
}

export default Post;
