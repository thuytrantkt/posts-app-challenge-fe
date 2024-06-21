import React from "react";
import Post from "../../components/Post/Post";
import SelectedPost from "../selected-post-page/SelectedPostPage";
import useFetchAPIs from "../../hooks/useFetchAPIs";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";

const PostsPage = () => {
  const { posts, selectedPost, setSelectedPost } = useFetchAPIs();

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
