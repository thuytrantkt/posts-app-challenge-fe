import React from "react";
import Post from "../../components/Post/Post";
import useFetchAPIs from "../../hooks/useFetchAPIs";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";

const PostsPage = () => {
  const { posts, setSelectedPost } = useFetchAPIs();

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" sx={{ paddingY: 8 }}>
        <Box
          sx={{
            bgcolor: "#fff",
            height: "100vh",
            display: "flex",
            flexFlow: "column",
            gap: 2,
          }}
        >
          <>
            <Typography
              gutterBottom
              variant="h2"
              component="h1"
              textAlign="center"
            >
              Posts
            </Typography>
            {posts.map((post) => {
              const handleSelectedPostKeyDown = (event: any) => {
                if (
                  event.key === " " ||
                  event.key === "Enter" ||
                  event.key === "Spacebar"
                ) {
                  // Prevent the default action to stop scrolling when space is pressed
                  event.preventDefault();
                  setSelectedPost(post);
                }
              };
              return (
                <Post
                  key={post.id}
                  post={post}
                  handleSelectedPostClick={() => setSelectedPost(post)}
                  handleSelectedPostKeyDown={handleSelectedPostKeyDown}
                />
              );
            })}
          </>
        </Box>
      </Container>
    </>
  );
};

export default PostsPage;
