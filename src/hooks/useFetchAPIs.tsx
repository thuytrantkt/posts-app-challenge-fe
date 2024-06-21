import { useEffect, useState } from "react";
import { CommentType, PostType } from "../types";
import { BASE_BACKEND_URL, PAGE_SIZE } from "../utils/helpers/constant";

const useFetchAPIs = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [selectedPost, setSelectedPost] = useState<PostType | null>(null);
  const [comments, setComments] = useState<CommentType[]>([]);

  // Fetch all posts
  const fetchPosts = async (): Promise<PostType[]> => {
    const response = await fetch(`${BASE_BACKEND_URL}/api/posts`);

    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }

    return response.json();
  };

  //   Fetch initial first page of comments
  const fetchCommentsForPost = async (
    postId: number,
    pageNumber: number = 1
  ): Promise<CommentType[]> => {
    const params = new URLSearchParams({
      "per-page": PAGE_SIZE.toString(),
      page: pageNumber.toString(),
    });

    const response = await fetch(
      `${BASE_BACKEND_URL}/api/posts/${postId}/comments?${params}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch comments");
    }

    return response.json();
  };

  //   Fetch the rest of the comments after the initial fetch
  const fetchMoreComments = (hasNextPage: boolean, selectedPost: PostType) => {
    if (hasNextPage) {
      const pagesFetched = comments.length / PAGE_SIZE;
      const nextPage = pagesFetched + 1;
      fetchCommentsForPost(selectedPost?.id, nextPage)
        .then((comments) => {
          setComments((prevComments) => [...prevComments, ...comments]);
        })
        .catch((error) => console.error("Failed to load comments:", error));
    }
  };

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const fetchedPosts = await fetchPosts();
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Failed to load posts:", error);
      }
    };

    loadPosts();
  }, []);

  return {
    fetchPosts,
    fetchCommentsForPost,
    fetchMoreComments,
    posts,
    setPosts,
    selectedPost,
    setSelectedPost,
    comments,
    setComments,
  };
};

export default useFetchAPIs;
