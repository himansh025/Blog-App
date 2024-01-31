import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import service from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { Link } from "react-router-dom";

function Post() {
  const {slug} = useParams();
  const [post, setPost] = useState({});
  const [featuredImage, setFeaturedImage] = useState("");

  useEffect(() => {
    service.getPost(slug).then((post) => {
      setPost(post);
      service
        .getFile(post.featuredImage)
        .then((image) => setFeaturedImage(image));
    });
  }, [slug]);

  const navigate = useNavigate()

  const clickHandler = () =>{
    service.deletePost(slug).then(()=>{
        service.deleteFile(post.featuredImage)
        navigate('/posts')})
  }

  if (post == {}) return <p>loading....</p>;
  else
    return (
      <Container>
        <div className="shadow-2xl rounded-3xl mx-auto">
          <div>
            <img src={featuredImage} alt="" srcset="" />
          </div>
          <h1>{post.title}</h1>
          <div>{parse(String(post.content))}</div>
          <p>
            Created at{" "}
            {post?.$createdAt ? post?.$createdAt.split("T")[0] : "unknown"}
          </p>
        </div>
        <div className="flex">
            <Link to={`/edit/${slug}`}><Button>Edit</Button></Link>
            <Button onClick={clickHandler} >Delete</Button>
        </div>
      </Container>
    );
}

export default Post;
