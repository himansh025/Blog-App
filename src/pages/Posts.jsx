import React, { useEffect, useState } from "react";
import { PostCard } from "../components";
import { useNavigate } from "react-router";
import service from "../appwrite/config";


function Posts() {
  let [posts, setPosts] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    service.getPosts().then((posts) => setPosts(posts.documents));
  }, [navigate]);

  return (
    <div className="flex justify-center flex-wrap">
      {posts.length == 0 ? (
        <p className="text-center">Loading.......</p>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post.$id}
            $id={post?.$id}
            featuredImage={post?.featuredImage}
            title={post?.title}
          />
        ))
      )}
    </div>
  );
}

export default Posts;
