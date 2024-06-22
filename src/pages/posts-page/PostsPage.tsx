import React from "react";
import Post from "../../components/Post/Post";
import useFetchAPIs from "../../hooks/useFetchAPIs";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import Alerts from "../../components/Alert/Alert";

const PostsPage = () => {
  const navigate = useNavigate();
  const { posts, openAlert } = useFetchAPIs();

  return (
    <>
      <Typography gutterBottom variant="h2" component="h1" textAlign="center">
        Posts
      </Typography>
      {openAlert && <Alerts />}
      {posts.length === 0 && <Loading />}
      {posts.map((post) => {
        const handleSelectedPost = () => {
          navigate(`/posts/${post.id}`, {
            state: { post: post },
          });
        };
        const handleSelectedPostKeyDown = (event: any) => {
          if (
            event.key === " " ||
            event.key === "Enter" ||
            event.key === "Spacebar"
          ) {
            // Prevent the default action to stop scrolling when space is pressed
            event.preventDefault();
            handleSelectedPost();
          }
        };

        return (
          <Post
            key={post.id}
            post={post}
            handleSelectedPostClick={handleSelectedPost}
            handleSelectedPostKeyDown={handleSelectedPostKeyDown}
          />
        );
      })}
    </>
  );
};

export default PostsPage;
