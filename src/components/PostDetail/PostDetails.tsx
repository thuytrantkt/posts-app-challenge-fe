import React from "react";
import { PostDetaiProps } from "../../types";
import { dateFormatted } from "../../utils/helpers/date-helper";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

const PostDetail = ({ post, hasPaddingX = true }: PostDetaiProps) => {
  const { author, content, createdAt, title } = post;
  return (
    <CardContent sx={{ paddingX: hasPaddingX ? 4 : 0 }}>
      <Typography gutterBottom variant="h5" component="h2" color="black">
        {title}
      </Typography>
      <Typography paddingBottom={1} color="black">
        {content}
      </Typography>
      <Typography paddingBottom={1} color="black">
        <strong>Author:</strong> {author}
      </Typography>
      <Typography paddingBottom={1} color="black">
        <strong>Posted on:</strong> {dateFormatted(createdAt)}
      </Typography>
    </CardContent>
  );
};

export default PostDetail;
