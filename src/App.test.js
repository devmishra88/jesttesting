import { render, screen } from "@testing-library/react";
import App from "./App";

test("Test First React app case", () => {
  render(<App />);
  const text = screen.getByText(/First React Test Case/i); //testing with case insensitivity
  const iamgetitle = screen.getByTitle("without copyright image");
  expect(text).toBeInTheDocument();
  expect(iamgetitle).toBeInTheDocument();
});
