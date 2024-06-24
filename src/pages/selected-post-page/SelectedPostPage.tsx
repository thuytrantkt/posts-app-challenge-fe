import React, { useEffect, useState } from "react";
import Comment from "../../components/Comment/Comment";
import {
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Container,
} from "@mui/material";
import PostDetail from "../../components/PostDetail/PostDetails";
import useFetchAPIs from "../../hooks/useFetchAPIs";
import { Link, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import Alerts from "../../components/Alert/Alert";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const SelectedPostPage = () => {
  const navigate = useNavigate();

  const {
    isLoading,
    setIsLoading,
    selectedPost,
    setSelectedPost,
    setComments,
    comments,
    fetchCommentsForPost,
    fetchMoreComments,
    openAlert,
    setOpenAlert,
    posts,
  } = useFetchAPIs();

  const [postId, setPostId] = useState(0);

  useEffect(() => {
    if (selectedPost) {
      setPostId(selectedPost.id);
    }
  }, [selectedPost]);

  const hasNextPage =
    comments.length > 0 &&
    selectedPost &&
    comments.length < selectedPost.commentCount;

  const handleFetchMoreComments = (hasNextPage: boolean) => () => {
    if (selectedPost) {
      fetchMoreComments(hasNextPage, selectedPost, comments);
    }
  };

  const fetchCommentsAPI = (id: number) => {
    fetchCommentsForPost(id)
      .then((comments) => {
        setComments(comments);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Failed to load comments:", error);
        setOpenAlert(true);
      });
  };

  const handlePrevNextPostClick = (type: "previous" | "next") => {
    const listOfPostIds = posts.map((post) => post.id);
    const currentIndex = listOfPostIds.indexOf(postId);

    // When the current page is the first post of the list
    if (currentIndex === 0 && type === "previous") return;

    // When the current page is the last post of the list
    if (currentIndex === posts.length - 1 && type === "next") return;

    const newPostId =
      type === "previous"
        ? listOfPostIds[currentIndex - 1]
        : listOfPostIds[currentIndex + 1];
    const newPost = posts.filter((post) => {
      return post.id === newPostId;
    })[0];

    setPostId(newPostId);
    setSelectedPost(newPost);
    fetchCommentsAPI(newPostId);
    navigate(`/posts/${newPostId}`);
  };

  const handlePrevPostClick = () => handlePrevNextPostClick("previous");
  const handleNextPostClick = () => handlePrevNextPostClick("next");

  if (!selectedPost) return <></>;

  return (
    <Container maxWidth="md" sx={{ pt: 6 }}>
      <Card variant="outlined">
        <CardContent>
          {openAlert && <Alerts />}
          <Link to="/posts">Back</Link>
          <div>
            <ButtonGroup
              variant="text"
              aria-label="Basic button group"
              sx={{ padding: 2, display: "flex", justifyContent: "center" }}
            >
              <Button type="submit" onClick={handlePrevPostClick}>
                <ArrowBackIosIcon />
                Previous Post
              </Button>
              <Button type="submit" onClick={handleNextPostClick}>
                Next Post <ArrowForwardIosIcon />
              </Button>
            </ButtonGroup>
          </div>
          <PostDetail post={selectedPost} hasPaddingX={false} />
          <div>
            {isLoading && <Loading />}
            {comments.map((comment, index) => (
              <Comment
                key={comment.id}
                comment={comment}
                firstComment={index === 0}
              />
            ))}
          </div>
          {hasNextPage && (
            <Button
              type="button"
              variant="contained"
              onClick={handleFetchMoreComments(hasNextPage)}
            >
              Fetch more comments
            </Button>
          )}
        </CardContent>
      </Card>
    </Container>
  );
};

export default SelectedPostPage;
