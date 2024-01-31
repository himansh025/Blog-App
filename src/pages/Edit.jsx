import React, { useEffect, useState } from "react";
import PostForm from "../components/post-form/PostForm";
import { useParams } from "react-router";
import service from "../appwrite/config";

function Edit() {
  const { slug } = useParams();
  const [data, setData] = useState(null);
  console.log(data)

  useEffect(() => {
    service.getPost(slug).then((post) => setData(post));
  },[]);

  if (data) return <PostForm postData={data} />;
  else return <p>loading...</p>
}

export default Edit;
