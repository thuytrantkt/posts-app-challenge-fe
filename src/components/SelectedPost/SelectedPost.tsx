import React, { useEffect } from "react";
import Comment from "../Comment/Comment";
import { PostProps } from "../../types";
import { dateFormatted } from "../../utils/date-helper";
import "./selectedpost.css";
import useFetchAPIs from "../../hooks/useFetchAPIs";

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
    <>
      <div className="selected-post-container">
        <button type="button" onClick={handleSelectedPostClick}>
          Back
        </button>
        <h2 className="selected-post-heading">{title}</h2>
        <p className="margin-bottom">{content}</p>
        <p>
          <strong>Author:</strong> {author}
        </p>
        <p>
          <strong>Posted on:</strong> {post && dateFormatted(createdAt)}
        </p>
        <div className="selected-post-comment-container">
          {comments.map((comment, index) => (
            <Comment
              key={comment.id}
              comment={comment}
              firstComment={index === 0}
            />
          ))}
        </div>
        {hasNextPage && (
          <button
            type="submit"
            onClick={() => fetchMoreComments(hasNextPage, post)}
          >
            Fetch more comments
          </button>
        )}
      </div>
    </>
  );
};

export default SelectedPost;
