import React from "react";
import { PostProps } from "../../types";
import { dateFormatted } from "../../utils/helpers/date-helper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const Post = ({
  post,
  handleSelectedPostClick,
  handleSelectedPostKeyDown,
}: PostProps) => {
  const { author, content, createdAt, title } = post;
  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed="false"
      className="cursor"
      onClick={handleSelectedPostClick}
      onKeyDown={(event) => handleSelectedPostKeyDown(event)}
    >
      <Card variant="outlined">
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography paddingBottom={1}>{content}</Typography>
          <Typography paddingBottom={1}>
            <strong>Author:</strong> {author}
          </Typography>
          <Typography paddingBottom={1}>
            <strong>Posted on:</strong> {dateFormatted(createdAt)}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Post;
