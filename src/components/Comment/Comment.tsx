import cn from "classnames";
import { dateFormatted } from "../../utils/helpers/date-helper";
import { CommentProps } from "../../types";

const Comment = ({ comment, firstComment }: CommentProps) => {
  const { content, author, createdAt } = comment;
  return (
    <div className={cn({ "border-line": !firstComment })}>
      <p>
        {content} - <i>{author}</i>, {dateFormatted(createdAt)}
      </p>
    </div>
  );
};

export default Comment;
