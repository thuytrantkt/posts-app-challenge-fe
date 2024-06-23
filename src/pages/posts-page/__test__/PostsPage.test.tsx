import { BASE_BACKEND_URL } from "../../../utils/helpers/constant";
import { PostType } from "../../../types";

const mockPostsData = [
  {
    author: "John Smith",
    commentCount: 4,
    content: "This is my very first post",
    createdAt: "Thu, 19 Aug 2004 16:21:06 GMT",
    id: 1,
    title: "First Post",
  },
  {
    author: "Mary Wilson",
    commentCount: 4,
    content: "This is the content for my second post !!",
    createdAt: "Thu, 15 Feb 2024 13:50:47 GMT",
    id: 2,
    title: "Second Post",
  },
  {
    author: "Steven Anderson",
    commentCount: 4,
    content:
      "I'm having trouble with my current task. Is anyone available to give me a hand?",
    createdAt: "Thu, 15 Feb 2024 13:51:49 GMT",
    id: 3,
    title: "Can someone help me fix this bug?",
  },
  {
    author: "Susan Davis",
    commentCount: 6,
    content: "I made a flask app that displays posts and comments like slack.",
    createdAt: "Wed, 21 Feb 2024 10:48:48 GMT",
    id: 4,
    title: "Check out this new thing!",
  },
];

describe("PostsPage", () => {
  const fetchPosts = async (): Promise<PostType[]> => {
    const response = await fetch(`${BASE_BACKEND_URL}/api/posts`);
    return response.json();
  };

  it("fetches a list of posts", async () => {
    const fetchMock = jest.spyOn(global, "fetch").mockImplementation(
      jest.fn(() =>
        Promise.resolve({
          ok: true,
          status: 200,
          json: () => Promise.resolve(mockPostsData),
        } as Response)
      ) as jest.Mock
    );

    const response = await fetchPosts();

    expect(fetchMock).toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledWith(`${BASE_BACKEND_URL}/api/posts`);
    expect(Array.isArray(response)).toEqual(true);
    expect(response.length).toEqual(4);

    jest.clearAllMocks();
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

    const response = await fetchPosts();

    expect(fetchMock).toHaveBeenCalled();
    expect(fetchMock).toHaveBeenCalledWith(`${BASE_BACKEND_URL}/api/posts`);
    expect(Array.isArray(response)).toEqual(true);
    expect(response.length).toEqual(0);

    jest.clearAllMocks();
  });
});
