import React from "react";
import { BASE_BACKEND_URL, PAGE_SIZE } from "../../../utils/helpers/constant";
import { CommentType, PostType } from "../../../types";
import { render, fireEvent, screen } from "@testing-library/react";
import SelectedPostPage from "../SelectedPostPage";
import useFetchAPIs from "../../../hooks/useFetchAPIs";
import { BrowserRouter } from "react-router-dom";

jest.mock("../../../hooks/useFetchAPIs");

const mockUseFetchAPIs = useFetchAPIs as jest.MockedFunction<
  typeof useFetchAPIs
>;

const mockSelectedPostData = {
  author: "John Smith",
  commentCount: 4,
  content: "This is my very first post",
  createdAt: "Thu, 19 Aug 2004 16:21:06 GMT",
  id: 1,
  title: "First Post",
};

const mockCommentsDataPageOne = [
  {
    author: "Steven Anderson",
    content: "This is insightful, thanks for sharing!",
    createdAt: "Thu, 15 Feb 2024 17:40:30 GMT",
    id: 1,
    postId: 1,
  },
  {
    author: "Susan Davis",
    content: "I have a different perspective on this.",
    createdAt: "Thu, 15 Feb 2024 17:40:30 GMT",
    id: 2,
    postId: 2,
  },
];

const mockCommentsDataPageTwo = [
  {
    author: "Steven Anderson",
    content: "This is insightful, thanks for sharing!",
    createdAt: "Thu, 15 Feb 2024 17:40:30 GMT",
    id: 3,
    postId: 3,
  },
  {
    author: "Susan Davis",
    content: "I have a different perspective on this.",
    createdAt: "Thu, 15 Feb 2024 17:40:30 GMT",
    id: 4,
    postId: 4,
  },
];

const fetchCommentsForPost = async (
  postId: number,
  pageNumber: number = 1
): Promise<CommentType[]> => {
  const params = new URLSearchParams({
    "per-page": PAGE_SIZE.toString(),
    page: pageNumber.toString(),
  });

  const url = `${BASE_BACKEND_URL}/api/posts/${postId}/comments?${params}`;
  const response = await fetch(url);
  return response.json();
};

beforeEach(() => {
  mockUseFetchAPIs.mockReturnValue({
    isLoading: false,
    selectedPost: mockSelectedPostData,
    comments: mockCommentsDataPageOne,
    fetchMoreComments: jest.fn(),
    openAlert: false,
    fetchCommentsForPost: jest.fn(),
    fetchPosts: jest.fn(),
    posts: [],
    setComments: jest.fn(),
    setOpenAlert: jest.fn(),
    setPosts: jest.fn(),
    setSelectedPost: jest.fn(),
  });
});

afterAll(() => jest.resetAllMocks());

describe("SelectedPostPage", () => {
  it("fetches a selected post with the first page of comments loading", async () => {
    const fetchMock = jest.spyOn(global, "fetch").mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(mockCommentsDataPageOne),
        } as Response)
      ) as jest.Mock
    );

    const response = await fetchCommentsForPost(1);

    expect(fetchMock).toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledWith(
      `${BASE_BACKEND_URL}/api/posts/1/comments?per-page=2&page=1`
    );
    expect(Array.isArray(response)).toEqual(true);
    expect(response.length).toEqual(2);
  });

  it("does not fetch a list of posts", async () => {
    const fetchMock = jest.spyOn(global, "fetch").mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 400,
          json: () => Promise.resolve([]),
        } as Response)
      ) as jest.Mock
    );

    const response = await fetchCommentsForPost(1);

    expect(fetchMock).toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledWith(
      `${BASE_BACKEND_URL}/api/posts/1/comments?per-page=2&page=1`
    );
    expect(Array.isArray(response)).toEqual(true);
    expect(response.length).toEqual(0);
  });

  it("fetches a selected post with the second page of comments loading", async () => {
    const fetchMock = jest.spyOn(global, "fetch").mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(mockCommentsDataPageTwo),
        } as Response)
      ) as jest.Mock
    );

    const response = await fetchCommentsForPost(1, 2);

    expect(fetchMock).toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledWith(
      `${BASE_BACKEND_URL}/api/posts/1/comments?per-page=2&page=2`
    );
    expect(Array.isArray(response)).toEqual(true);
    expect(response.length).toEqual(2);
  });

  it("does not fetch a list of posts", async () => {
    const fetchMock = jest.spyOn(global, "fetch").mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          ok: false,
          status: 400,
          json: () => Promise.resolve([]),
        } as Response)
      ) as jest.Mock
    );

    const response = await fetchCommentsForPost(1, 2);

    expect(fetchMock).toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledWith(
      `${BASE_BACKEND_URL}/api/posts/1/comments?per-page=2&page=2`
    );
    expect(Array.isArray(response)).toEqual(true);
    expect(response.length).toEqual(0);
  });

  it("should render the selected post and comments", () => {
    render(
      <BrowserRouter>
        <SelectedPostPage />
      </BrowserRouter>
    );

    expect(screen.getByText(mockSelectedPostData.title)).toBeInTheDocument();
    expect(screen.getByText(mockSelectedPostData.content)).toBeInTheDocument();
    expect(
      screen.getByText(/This is insightful, thanks for sharing!/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/I have a different perspective on this./i)
    ).toBeInTheDocument();
  });

  it('should call fetchMoreComments when "Fetch more comments" button is clicked', () => {
    const mockFetchMoreComments = jest.fn();
    mockUseFetchAPIs.mockReturnValue({
      isLoading: false,
      selectedPost: mockSelectedPostData,
      comments: mockCommentsDataPageOne,
      fetchMoreComments: mockFetchMoreComments,
      openAlert: false,
      fetchCommentsForPost: jest.fn(),
      fetchPosts: jest.fn(),
      posts: [],
      setComments: jest.fn(),
      setOpenAlert: jest.fn(),
      setPosts: jest.fn(),
      setSelectedPost: jest.fn(),
    });

    render(
      <BrowserRouter>
        <SelectedPostPage />
      </BrowserRouter>
    );

    const fetchMoreCommentsButton = screen.getByText("Fetch more comments");
    fireEvent.click(fetchMoreCommentsButton);

    expect(mockFetchMoreComments).toHaveBeenCalledTimes(1);
    expect(mockFetchMoreComments).toHaveBeenCalledWith(
      true,
      mockSelectedPostData,
      mockCommentsDataPageOne
    );
  });

  it('should not render the "Fetch more comments" button if hasNextPage is false', () => {
    mockUseFetchAPIs.mockReturnValue({
      isLoading: false,
      selectedPost: mockSelectedPostData,
      comments: [],
      fetchMoreComments: jest.fn(),
      openAlert: false,
      fetchCommentsForPost: jest.fn(),
      fetchPosts: jest.fn(),
      posts: [],
      setComments: jest.fn(),
      setOpenAlert: jest.fn(),
      setPosts: jest.fn(),
      setSelectedPost: jest.fn(),
    });

    render(
      <BrowserRouter>
        <SelectedPostPage />
      </BrowserRouter>
    );

    const fetchMoreCommentsButton = screen.queryByText("Fetch more comments");

    expect(fetchMoreCommentsButton).toBeNull();
  });
});
