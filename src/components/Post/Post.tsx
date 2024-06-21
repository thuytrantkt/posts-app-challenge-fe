import React from "react";
import { PostEventActionProps } from "../../types";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PostDetail from "../PostDetail/PostDetails";

const Post = ({
  post,
  handleSelectedPostClick,
  handleSelectedPostKeyDown = () => null,
}: PostEventActionProps) => {
  return (
    <div
      role="button"
      tabIndex={0}
      className="cursor"
      onClick={handleSelectedPostClick}
      onKeyDown={(event) => handleSelectedPostKeyDown(event)}
    >
      <Card variant="outlined">
        <CardContent>
          <PostDetail post={post} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Post;
