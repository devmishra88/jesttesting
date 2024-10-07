import { render, screen } from "@testing-library/react";
import App from "./App";

test("Test First React app case", () => {
  render(<App />);
  const text = screen.getByText(/First React Test Case/i); //testing with case insensitivity
  const iamgetitle = screen.getByTitle("without copyright image");
  expect(text).toBeInTheDocument();
  expect(iamgetitle).toBeInTheDocument();
});

test("Testing input box", () => {
  render(<App />);
  const checkInput = screen.getByRole(`textbox`);
  const checkInputPlaceholer = screen.getByPlaceholderText("Enter User Name");
  expect(checkInput).toBeInTheDocument();
  expect(checkInputPlaceholer).toBeInTheDocument();
  expect(checkInput).toHaveAttribute("name", "username");
  expect(checkInput).toHaveAttribute("id", "username");
  expect(checkInput).toHaveAttribute("type", "text");
  expect(checkInput).toHaveAttribute("value", "Devesh Mishra");
});
