import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import handleData2 from "./helper";

test("method testing case 1", () => {
  render(<App />);
  let button = screen.getByTestId("btn1");

  fireEvent.click(button)

  expect(screen.getByText("hello")).toBeInTheDocument();
});

test("method testing case 2", () => {
  expect(handleData2()).toMatch("devesh");
  // render(<App />);
  // let button = screen.getByTestId("btn1");

  // fireEvent.click(button)

  // expect(screen.getByText("hello")).toBeInTheDocument();
});