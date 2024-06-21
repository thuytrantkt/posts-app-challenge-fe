import React from "react";
import { PostProps } from "../../types";
import { dateFormatted } from "../../utils/helpers/date-helper";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const Post = ({ post, handleSelectedPostClick }: PostProps) => {
  const { author, content, createdAt, title } = post;
  return (
    <div className="cursor" onClick={handleSelectedPostClick}>
      <Card variant="outlined">
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography paddingBottom={1} variant="body2" color="text.secondary">
            {content}
          </Typography>
          <Typography paddingBottom={1} variant="body2" color="text.secondary">
            <strong>Author:</strong> {author}
          </Typography>
          <Typography paddingBottom={1} variant="body2" color="text.secondary">
            <strong>Posted on:</strong> {dateFormatted(createdAt)}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Post;
