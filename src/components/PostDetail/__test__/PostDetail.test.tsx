import { render } from "@testing-library/react";
import PostDetail from "../PostDetails";

it("renders PostDetail component properly", () => {
  const postDetailMockData = {
    author: "John Smith",
    commentCount: 4,
    content: "This is my very first post",
    createdAt: "Thu, 19 Aug 2004 16:21:06 GMT",
    id: 1,
    title: "First Post",
  };
  const view = render(<PostDetail post={postDetailMockData} />);
  expect(view).toMatchSnapshot();
});
