import React, { useEffect } from "react";
import Post from "../Post/Post";
import SelectedPost from "../SelectedPost/SelectedPost";
import "./postspage.css";
import useFetchAPIs from "../../hooks/useFetchAPIs";

const PostsPage = () => {
  const { fetchPosts, posts, setPosts, selectedPost, setSelectedPost } =
    useFetchAPIs();

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
