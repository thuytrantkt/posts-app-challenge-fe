import React from "react";
import { PostProps } from "../../types";
import { dateFormatted } from "../../utils/date-helper";
import "./post.css";

const Post = ({ post, handleSelectedPostClick }: PostProps) => {
  const { author, content, createdAt, title } = post;
  return (
    <div className="post-container" onClick={handleSelectedPostClick}>
      <h2 className="post-heading">{title}</h2>
      <p className="margin-bottom">{content}</p>
      <p>
        <strong>Author:</strong> {author}
      </p>
      <p>
        <strong>Posted on:</strong> {dateFormatted(createdAt)}
      </p>
    </div>
  );
};

export default Post;
