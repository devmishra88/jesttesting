import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import Users from "./Users";
import renderer from "react-test-renderer";

// test("on click event testing", () => {
//   render(<App />);
//   let button = screen.getByRole("button");

//   fireEvent.click(button)

//   expect(screen.getByText("I am updated title")).toBeInTheDocument();
// });

test("Class component method testing",()=>{
  const componentData = renderer.create(<Users/>).getInstance();
  // console.log(componentData);
  expect(componentData.getUserList()).toMatch("user list")
})