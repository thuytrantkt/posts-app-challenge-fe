import React, { lazy } from "react";
import { Route, Routes } from "react-router-dom";
const HomePage = lazy(() => import("../pages/home-page/HomePage"));
const LayoutPage = lazy(() => import("../components/Layout/Layout"));
const PostsPage = lazy(() => import("../pages/posts-page/PostsPage"));
const SelectedPostPage = lazy(
  () => import("../pages/selected-post-page/SelectedPostPage")
);
const NotFoundPage = lazy(() => import("../pages/not-found-page/NotFoundPage"));

const Routers = () => {
  return (
    <LayoutPage>
      <Routes>
        <Route index path="/" element={<HomePage />} />

        <Route path="/posts" element={<PostsPage />} />
        <Route path="/posts/:postId" element={<SelectedPostPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </LayoutPage>
  );
};

export default Routers;
