import { render } from "@testing-library/react";
import Alert from "../Alert";
import { BrowserRouter } from "react-router-dom";

it("renders Alert component properly", () => {
  const view = render(
    <BrowserRouter>
      <Alert />
    </BrowserRouter>
  );
  expect(view).toMatchSnapshot();
});
