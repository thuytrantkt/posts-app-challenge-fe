import React from "react";
import Post from "../../components/Post/Post";
import useFetchAPIs from "../../hooks/useFetchAPIs";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import Alerts from "../../components/Alert/Alert";
import { PostType } from "../../types";

const PostsPage = () => {
  const navigate = useNavigate();
  const { isLoading, posts, openAlert } = useFetchAPIs();

  const handleSelectedPost = (post: PostType) => () => {
    navigate(`/posts/${post.id}`, {
      state: { post: post },
    });
  };

  const handleSelectedPostKeyDown =
    (event: React.KeyboardEvent, post: PostType) => () => {
      if (
        event.key === " " ||
        event.key === "Enter" ||
        event.key === "Spacebar"
      ) {
        // Prevent the default action to stop scrolling when space is pressed
        event.preventDefault();
        handleSelectedPost(post);
      }
    };

  return (
    <>
      <Typography gutterBottom variant="h2" component="h1" textAlign="center">
        Posts
      </Typography>
      {openAlert && <Alerts />}
      {isLoading && <Loading />}
      {posts.map((post) => {
        return (
          <Post
            key={post.id}
            post={post}
            handleSelectedPostClick={handleSelectedPost(post)}
            handleSelectedPostKeyDown={(event: React.KeyboardEvent) =>
              handleSelectedPostKeyDown(event, post)
            }
          />
        );
      })}
    </>
  );
};

export default PostsPage;
