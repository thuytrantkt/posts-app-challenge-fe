import React from "react";
import cn from "classnames";
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
    <div className={cn("comment-container", { hidden: !firstComment })}>
      <p>
        {content} - <i>{author}</i>, {dateFormatted(createdAt)}
      </p>
    </div>
  );
};

export default Comment;
