import React from "react";
import { useSelector } from "react-redux";
import { PostCard } from "../components";
import { Link } from "react-router-dom";

function UserPosts() {
  const userPosts = useSelector((state) => state.userPosts) || [];

  if (userPosts.length > 0) {
    return (
      <div className="flex flex-wrap gap-2 justify-center">
        {userPosts.map((post) => (
          <PostCard
            key={post.$id}
            postImage={post.postImage}
            title={post.title}
            postID={post.$id}
          />
        ))}
      </div>
    );
  } else
    return (
      <div className="max-w-md mx-auto mt-8 p-4 bg-white rounded-md shadow-md">
        <h2 className="text-2xl font-bold mb-4">No Posts</h2>
        <p className="text-gray-700 mb-4">
          Oops! There are no posts have been published.
        </p>
        <p className="text-gray-500">
          Create a fresh post{" "}
          <Link to="/create" className="text-blue-500">
            Create Post
          </Link>
          .
        </p>
      </div>
    );
}

export default UserPosts;
