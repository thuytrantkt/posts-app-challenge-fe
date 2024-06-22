import React from "react";
import Comment from "../../components/Comment/Comment";
import { Button, Card, CardContent, Container } from "@mui/material";
import PostDetail from "../../components/PostDetail/PostDetails";
import useFetchAPIs from "../../hooks/useFetchAPIs";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading/Loading";
import Alerts from "../../components/Alert/Alert";

const SelectedPostPage = () => {
  const { selectedPost, comments, fetchMoreComments, openAlert } =
    useFetchAPIs();

  const hasNextPage =
    comments.length > 0 &&
    selectedPost &&
    comments.length < selectedPost.commentCount;

  if (!selectedPost) return;

  return (
    <Container maxWidth="md" sx={{ pt: 6 }}>
      <Card variant="outlined">
        <CardContent>
          {openAlert && <Alerts />}
          <Link to="/posts">Back</Link>
          <PostDetail post={selectedPost} hasPaddingX={false} />
          <div>
            {comments.length === 0 && <Loading />}
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
              onClick={() => fetchMoreComments(hasNextPage, selectedPost)}
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
