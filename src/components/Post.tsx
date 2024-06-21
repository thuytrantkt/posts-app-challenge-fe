import React from "react";
import { PostProps } from "../types";
import { dateFormatted } from "../utils/date-helper";
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
          <Typography variant="body2" color="text.secondary">
            <p>{content}</p>
            <p>
              <strong>Author:</strong> {author}
            </p>
            <p>
              <strong>Posted on:</strong> {dateFormatted(createdAt)}
            </p>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default Post;
