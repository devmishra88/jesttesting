import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";

// beforeAll(()=>{
//   console.log("********I am before all hook test********")
// })

// beforeEach(()=>{
//   console.log("********I am before all hook test********")
// })

test("on click event testing 1", () => {
  console.log(`test 1`)
  render(<App />);
  let button = screen.getByRole("button");

  fireEvent.click(button)

  expect(screen.getByText("I am updated title")).toBeInTheDocument();
});

test("on click event testing 2", () => {
  console.log(`test 2`)
  render(<App />);
  let button = screen.getByRole("button");

  fireEvent.click(button)

  expect(screen.getByText("I am updated title")).toBeInTheDocument();
});

test("on click event testing 3", () => {
  console.log(`test 3`)
  render(<App />);
  let button = screen.getByRole("button");

  fireEvent.click(button)

  expect(screen.getByText("I am updated title")).toBeInTheDocument();
});

// afterAll(()=>{
//   console.log("********I am after all hook test********")
// })

afterEach(()=>{
  console.log("********I am after each hook test********")
})