import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("on click event testing", () => {
  render(<App />);
  let button = screen.getByRole("button");

  fireEvent.click(button)

  expect(screen.getByText("I am updated title")).toBeInTheDocument();
});
