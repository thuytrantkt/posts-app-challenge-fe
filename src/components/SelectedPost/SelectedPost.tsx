import React, { useEffect, useState } from "react";
import Comment from "../Comment/Comment";
import { CommentType, PostProps } from "../../types";
import { BASE_BACKEND_URL, PAGE_SIZE } from "../../utils/constant";
import { dateFormatted } from "../../utils/date-helper";
import "./selectedpost.css";

const fetchCommentsForPost = async (
  postId: number,
  pageNumber: number = 1
): Promise<CommentType[]> => {
  const params = new URLSearchParams({
    "per-page": PAGE_SIZE.toString(),
    page: pageNumber.toString(),
  });

  const response = await fetch(
    `${BASE_BACKEND_URL}/api/posts/${postId}/comments?${params}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch comments");
  }

  return response.json();
};

const SelectedPost = ({ post, handleSelectedPostClick }: PostProps) => {
  const { author, commentCount, content, createdAt, id, title } = post;
  const [comments, setComments] = useState<CommentType[]>([]);

  const hasNextPage = comments.length > 0 && comments.length < commentCount;

  const fetchMoreComments = () => {
    if (hasNextPage) {
      const pagesFetched = comments.length / PAGE_SIZE;
      const nextPage = pagesFetched + 1;
      fetchCommentsForPost(id, nextPage)
        .then((comments) => {
          setComments((prevComments) => [...prevComments, ...comments]);
        })
        .catch((error) => console.error("Failed to load comments:", error));
    }
  };

  // Fetch the first page of comments on mount
  useEffect(() => {
    fetchCommentsForPost(id)
      .then((comments) => {
        setComments(comments);
      })
      .catch((error) => console.error("Failed to load comments:", error));
  }, [id]);

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
          <strong>Posted on:</strong> {dateFormatted(createdAt)}
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
          <button type="submit" onClick={fetchMoreComments}>
            Fetch more comments
          </button>
        )}
      </div>
    </>
  );
};

export default SelectedPost;
