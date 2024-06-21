import React from "react";
import { PostType } from "../types";
import { dateFormatted } from "../utils/date-helper";

const Post = ({
  post,
  handleSelectedPostClick,
}: {
  post: PostType;
  handleSelectedPostClick: () => void;
}) => {
  const { author, content, createdAt, title } = post;
  return (
    <div
      style={{
        border: "1px solid #ccc",
        borderRadius: "5px",
        padding: "0px 20px",
        cursor: "pointer",
        userSelect: "none",
      }}
      onClick={handleSelectedPostClick}
    >
      <h2
        style={{
          fontSize: "1.5em",
          fontWeight: "700",
          marginBottom: "10px",
        }}
      >
        {title}
      </h2>
      <p style={{ marginBottom: "10px" }}>{content}</p>
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
