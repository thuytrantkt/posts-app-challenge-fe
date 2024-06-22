import React from "react";
import { Route, Routes } from "react-router-dom";
const LayoutPage = React.lazy(() => import("../components/Layout/Layout"));
const PostsPage = React.lazy(() => import("../pages/posts-page/PostsPage"));
const SelectedPostPage = React.lazy(
  () => import("../pages/selected-post-page/SelectedPostPage")
);
const NotFoundPage = React.lazy(
  () => import("../pages/not-found-page/NotFoundPage")
);

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutPage />}>
        <Route index path="/posts" element={<PostsPage />} />
        <Route path="/posts/:postId" element={<SelectedPostPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
};

export default Routers;
