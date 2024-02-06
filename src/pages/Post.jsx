import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import appwriteService from "../appwrite/config";
import { Link } from "react-router-dom";
import { Button } from "../components";
import { deleteUserPost, setUserPost} from "../store/appSlice";
import parser from 'html-react-parser'

function Post() {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setUserPost(slug));
  }, []);

  const [featuredImage, setFeaturedImage] = useState('');
  const postData = useSelector((state) => state.userPost);

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
      <p className="text-gray-500 mt-4">Slug: {slug}</p>
      <div className="flex gap-3 my-3">
        <Button onClick={editHandler}>Edit</Button>
        <Button onClick={deleteHandler}>Delete</Button>
      </div>
    </div>
  );

  else return(
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
