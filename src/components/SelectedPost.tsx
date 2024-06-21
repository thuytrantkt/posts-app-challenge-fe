import React, { useEffect } from "react";
import Comment from "./Comment";
import { PostProps } from "../types";
import { dateFormatted } from "../utils/date-helper";
import useFetchAPIs from "../hooks/useFetchAPIs";
import { Button, Card, CardContent, Container, Link } from "@mui/material";
const SelectedPost = ({ post, handleSelectedPostClick }: PostProps) => {
  const { fetchCommentsForPost, fetchMoreComments, comments, setComments } =
    useFetchAPIs();

  const { title, content, author, createdAt } = post;

  const hasNextPage =
    comments.length > 0 && post && comments.length < post.commentCount;

  // Fetch the first page of comments on mount
  useEffect(() => {
    fetchCommentsForPost(post.id)
      .then((comments) => {
        setComments(comments);
      })
      .catch((error) => console.error("Failed to load comments:", error));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post.id]);

  return (
    <Container maxWidth="md" sx={{ pt: 6 }}>
      <Card variant="outlined">
        <CardContent>
          <Link
            component="button"
            variant="inherit"
            onClick={handleSelectedPostClick}
          >
            {" "}
            Back
          </Link>
          <h2>{title}</h2>
          <p>{content}</p>
          <p>
            <strong>Author:</strong> {author}
          </p>
          <p>
            <strong>Posted on:</strong> {post && dateFormatted(createdAt)}
          </p>
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

export default SelectedPost;
