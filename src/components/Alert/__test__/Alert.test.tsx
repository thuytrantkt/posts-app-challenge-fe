import { render } from "@testing-library/react";
import Alert from "../Alert";
import { BrowserRouter } from "react-router-dom";

it("renders PostDetail component properly", () => {
  const view = render(
    <BrowserRouter>
      <Alert />
    </BrowserRouter>
  );
  expect(view).toMatchSnapshot();
});
