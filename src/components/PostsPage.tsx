import React, { useEffect } from "react";
import Post from "./Post";
import SelectedPost from "./SelectedPost";
import useFetchAPIs from "../hooks/useFetchAPIs";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";

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

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md">
        <Box
          sx={{
            bgcolor: "#fff",
            height: "100vh",
            display: "flex",
            flexFlow: "column",
            gap: 2,
          }}
        >
          {selectedPost && (
            <SelectedPost
              post={selectedPost}
              handleSelectedPostClick={() => setSelectedPost(null)}
            />
          )}
          {!selectedPost && (
            <>
              <Typography
                gutterBottom
                variant="h2"
                component="h1"
                textAlign="center"
              >
                Posts
              </Typography>
              {posts.map((post) => (
                <Post
                  key={post.id}
                  post={post}
                  handleSelectedPostClick={() => setSelectedPost(post)}
                />
              ))}
            </>
          )}
        </Box>
      </Container>
    </>
  );
};

export default PostsPage;
