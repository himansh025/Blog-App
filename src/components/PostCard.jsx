import { AiFillEdit } from "react-icons/ai";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { AiFillCloseCircle } from "react-icons/ai";
import React, { useState } from "react";
import appwriteService from "../appwrite/config";
import Button from "./button/Button";
import {
  deleteUserPost,
  setUserPost,
} from "../store/appSlice";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

function PostCard({ title, postImage, postID}) {
  const location = useLocation().pathname == '/'
  console.log(location)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const featuredImage = appwriteService.getPreviewImage(postImage);
  const editHandler = () => {
    dispatch(setUserPost(postID));
    navigate(`/edit/${postID}`);
  };
  const deleteHandler = async () => {
    const deletingToast = toast.loading('deleting')
    setLoading(true);
    await appwriteService.deletePost(postID);
    dispatch(deleteUserPost(postID));
    setLoading(false);
    toast.dismiss(deletingToast)
    toast.success('deleted')
  };
  return (
    <div className="shadow-2xl rounded-2xl overflow-hidden relative w-[300px] mt-6">
      <Link
        to={`/post/${postID}`}
        className="max-w-sm w-60 rounded overflow-hidden shadow-lg"
      >
        <img
          src={featuredImage}
          alt={title}
          className="w-full h-48 object-cover"
        />
        <div className="px-6 py-4 text-center">
          <div className="font-semibold text-xl mb-2 font-['Comic_Sans_MS']">{title}</div>
        </div>
      </Link>

      <button onClick={deleteHandler} className={`absolute top-0 right-0 p-2 ${location && 'hidden'}`}>
        <AiOutlineCloseCircle size={22}/>
      </button>
      <button onClick={editHandler} className={`absolute  bottom-0 right-0 p-2 ${location && 'hidden'}`}>
        <AiFillEdit size={22}/>
      </button>
    </div>
  );
}

export default PostCard;
