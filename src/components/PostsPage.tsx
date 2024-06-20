import React, { useState, useEffect } from "react";
import { PostType } from "../types";
import Post from "./Post";
import SelectedPost from "./SelectedPost";

const fetchPosts = async (): Promise<PostType[]> => {
  const response = await fetch("/api/posts");

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
      <SelectedPost post={selectedPost} setSelectedPost={setSelectedPost} />
    );
  }

  return (
    <div style={{ padding: 10 }}>
      <h1>Posts</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "20px",
          backgroundColor: "#fff",
          gap: "20px",
        }}
      >
        {posts.map((post) => (
          <Post key={post.id} post={post} setSelectedPost={setSelectedPost} />
        ))}
      </div>
    </div>
  );
};

export default PostsPage;
