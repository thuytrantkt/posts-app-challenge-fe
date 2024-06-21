import React, { useState, useEffect } from "react";
import { PostType } from "../../types";
import Post from "../Post/Post";
import SelectedPost from "../SelectedPost/SelectedPost";
import { BASE_BACKEND_URL } from "../../utils/constant";
import "./postspage.css";

const fetchPosts = async (): Promise<PostType[]> => {
  const response = await fetch(`${BASE_BACKEND_URL}/api/posts`);

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
};

const PostsPage = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to load posts:", error);
      }
    };

    loadPosts();
  }, []);

  if (selectedPost) {
    return (
      <SelectedPost
        post={selectedPost}
        handleSelectedPostClick={() => setSelectedPost(null)}
      />
    );
  }

  return (
    <div className="posts-page-container">
      <h1>Posts</h1>
      <div className="posts-container">
        {posts.map((post) => (
          <Post
            key={post.id}
            post={post}
            handleSelectedPostClick={() => setSelectedPost(post)}
          />
        ))}
      </div>
    </div>
  );
};

export default PostsPage;
