import React from "react";
import { Route, Routes } from "react-router-dom";
import useFetchAPIs from "../hooks/useFetchAPIs";

const PostsPage = React.lazy(() => import("../pages/posts-page/PostsPage"));
const SelectedPostPage = React.lazy(
  () => import("../pages/selected-post-page/SelectedPostPage")
);

const Routers = () => {
  const { selectedPost, setSelectedPost } = useFetchAPIs();
  return (
    <Routes>
      <Route index path="posts" element={<PostsPage />} />
      {selectedPost && (
        <Route
          path="posts/:id"
          element={
            <SelectedPostPage
              post={selectedPost}
              handleSelectedPostClick={() => setSelectedPost(null)}
            />
          }
        />
      )}
    </Routes>
  );
};

export default Routers;
