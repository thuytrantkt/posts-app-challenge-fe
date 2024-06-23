import { render, fireEvent } from "@testing-library/react";
import Post from "../Post";

const postMockData = {
  author: "John Smith",
  commentCount: 4,
  content: "This is my very first post",
  createdAt: "Thu, 19 Aug 2004 16:21:06 GMT",
  id: 1,
  title: "First Post",
};

describe("Post component", () => {
  it("renders Post component properly", () => {
    const view = render(
      <Post post={postMockData} handleSelectedPostClick={() => {}} />
    );
    expect(view).toMatchSnapshot();
  });

  it("should call handleSelectedPostClick when clicked", () => {
    const handleSelectedPostClick = jest.fn();
    const handleSelectedPostKeyDown = jest.fn();

    const { container } = render(
      <Post
        post={postMockData}
        handleSelectedPostClick={handleSelectedPostClick}
        handleSelectedPostKeyDown={handleSelectedPostKeyDown}
      />
    );

    const postDiv = container.firstChild;

    if (postDiv) {
      fireEvent.click(postDiv);
    }

    expect(handleSelectedPostClick).toHaveBeenCalledTimes(1);
  });

  it("should call handleSelectedPostKeyDown when a key is pressed as an 'Enter' key", () => {
    const handleSelectedPostClick = jest.fn();
    const handleSelectedPostKeyDown = jest.fn();

    const { container } = render(
      <Post
        post={postMockData}
        handleSelectedPostClick={handleSelectedPostClick}
        handleSelectedPostKeyDown={handleSelectedPostKeyDown}
      />
    );

    const postDiv = container.firstChild;

    if (postDiv) {
      fireEvent.keyDown(postDiv, { key: "Enter" });
    }

    expect(handleSelectedPostKeyDown).toHaveBeenCalledTimes(1);
  });

  it("should call handleSelectedPostKeyDown when a key is pressed as a space '' key", () => {
    const handleSelectedPostClick = jest.fn();
    const handleSelectedPostKeyDown = jest.fn();

    const { container } = render(
      <Post
        post={postMockData}
        handleSelectedPostClick={handleSelectedPostClick}
        handleSelectedPostKeyDown={handleSelectedPostKeyDown}
      />
    );

    const postDiv = container.firstChild;

    if (postDiv) {
      fireEvent.keyDown(postDiv, { key: " " });
    }

    expect(handleSelectedPostKeyDown).toHaveBeenCalledTimes(1);
  });
});
