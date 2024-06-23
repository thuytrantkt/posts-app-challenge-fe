import { render } from "@testing-library/react";
import Post from "../Post";

it("renders Post component properly", () => {
  const postMockData = {
    author: "John Smith",
    commentCount: 4,
    content: "This is my very first post",
    createdAt: "Thu, 19 Aug 2004 16:21:06 GMT",
    id: 1,
    title: "First Post",
  };
  const view = render(
    <Post post={postMockData} handleSelectedPostClick={() => {}} />
  );
  expect(view).toMatchSnapshot();
});
