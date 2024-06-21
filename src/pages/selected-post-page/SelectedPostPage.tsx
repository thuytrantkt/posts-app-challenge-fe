import React, { useEffect } from "react";
import Comment from "../../components/Comment/Comment";
import { PostClickActionProps } from "../../types";
import useFetchAPIs from "../../hooks/useFetchAPIs";
import { Button, Card, CardContent, Container, Link } from "@mui/material";
import PostDetail from "../../components/PostDetail/PostDetails";

const SelectedPostPage = ({
  post,
  handleSelectedPostClick,
}: PostClickActionProps) => {
  const { fetchCommentsForPost, fetchMoreComments, comments, setComments } =
    useFetchAPIs();

  const hasNextPage =
    comments.length > 0 && post && comments.length < post.commentCount;

  // Fetch the first page of comments on mount
  useEffect(() => {
    fetchCommentsForPost(post.id)
      .then((comments) => {
        setComments(comments);
      })
      .catch((error) => console.error("Failed to load comments:", error));
  }, [post.id]);

  return (
    <Container maxWidth="md" sx={{ pt: 6 }}>
      <Card variant="outlined">
        <CardContent>
          <Link
            type="button"
            component="button"
            variant="inherit"
            onClick={handleSelectedPostClick}
          >
            Back
          </Link>
          <PostDetail post={post} hasPaddingX={false} />
          <div>
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
              onClick={() => fetchMoreComments(hasNextPage, post)}
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
