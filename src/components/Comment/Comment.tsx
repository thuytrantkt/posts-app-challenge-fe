import React from "react";
import { CommentType } from "../../types";
import { dateFormatted } from "../../utils/date-helper";

const Comment = ({
  comment,
  firstComment,
}: {
  comment: CommentType;
  firstComment: boolean;
}) => {
  const { content, author, createdAt } = comment;
  return (
    <div
      style={{
        borderTop: !firstComment ? "1px solid #ccc" : "none",
        padding: "10px 0",
        fontSize: "0.9em",
      }}
    >
      <p>
        {content} - <i>{author}</i>, {dateFormatted(createdAt)}
      </p>
    </div>
  );
};

export default Comment;
