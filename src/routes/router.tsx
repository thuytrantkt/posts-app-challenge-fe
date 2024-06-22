import React from "react";
import { Route, Routes } from "react-router-dom";
import useFetchAPIs from "../hooks/useFetchAPIs";
import Layout from "../components/Layout/Layout";
import NotFoundPage from "../pages/not-found-page/NotFoundPage";

const PostsPage = React.lazy(() => import("../pages/posts-page/PostsPage"));
const SelectedPostPage = React.lazy(
  () => import("../pages/selected-post-page/SelectedPostPage")
);

const Routers = () => {
  const { selectedPost } = useFetchAPIs();

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index path="/posts" element={<PostsPage />} />
        {selectedPost && (
          <Route path="/posts/:postId" element={<SelectedPostPage />} />
        )}
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default Routers;
