import { render } from "@testing-library/react";
import Comment from "../Comment";

it("renders Comment component properly without the border line if this is the first comment", () => {
  const commentMockData = {
    author: "John Smith",
    content: "Great post, really made me think.",
    createdAt: "Thu, 15 Feb 2024 17:40:30 GMT",
    id: 1,
    postId: 1,
  };
  const view = render(<Comment comment={commentMockData} firstComment />);
  expect(view).toMatchSnapshot();
});

it("renders Comment component properly with the border line if this is not the first comment", () => {
  const commentMockData = {
    author: "John Smith",
    content: "Great post, really made me think.",
    createdAt: "Thu, 15 Feb 2024 17:40:30 GMT",
    id: 1,
    postId: 1,
  };
  const view = render(
    <Comment comment={commentMockData} firstComment={false} />
  );
  expect(view).toMatchSnapshot();
});
