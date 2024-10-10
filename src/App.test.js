import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";

test("on change event testing", () => {
  render(<App />);
  let input = screen.getByRole("textbox");
  fireEvent.change(input, { target: { value: "a" } });
  expect(input.value).toBe("a");
});
