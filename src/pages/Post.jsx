import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import appwriteService from "../appwrite/config";
import { Button } from "../components";
import { deleteUserPost, setPublicUserPost, setUserPost} from "../store/appSlice";
import parser from 'html-react-parser'
import NotFound from "./NotFound";

function Post() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(state=>state.isAuth)
  const userPost = useSelector(state=>state.userPost)

  useEffect(() => {
    dispatch(setUserPost(slug))
    dispatch(setPublicUserPost(slug))
  }, []);

  const [featuredImage, setFeaturedImage] = useState('');
  const postData = useSelector((state) => isAuth && userPost ? state.userPost : state.publicUserPost);

  if(postData?.postImage){
    appwriteService.getImage(postData.postImage).then(image=>setFeaturedImage(image.href))
  }

  const deleteHandler = async () => {
    await appwriteService.deletePost(postData.$id);
    dispatch(deleteUserPost(postData.$id));
    navigate("/");
  };

  const editHandler = () => {
    navigate(`/edit/${slug}`);
  };

  if (postData) return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">{postData?.title}</h2>
      <div className="mb-4">
        <img
          src={featuredImage}
          alt={postData?.title}
          className="w-full h-auto rounded-md"
        />
      </div>
      <div className="postContent">{parser(postData?.content || '')}</div>
      <p className={`text-gray-500 mt-4 ${!isAuth ? 'hidden' : 'inline-block'}`}>Slug: {slug}</p>
      <div className={`flex gap-3 my-3 ${!isAuth && 'hidden'}`}>
        <Button onClick={editHandler}>Edit</Button>
        <Button onClick={deleteHandler}>Delete</Button>
      </div>
      <h1 className={`${isAuth ? 'hidden' : 'inline-block'}`}><span>Publisher Name : </span>{postData.userName}</h1>
    </div>
  );

  else return(
    <NotFound/>
  );
}

export default Post;
