import { useState } from "react";
import "./App.css";
import Users from "./Users";

function App() {
  const [pagetitle, setPageTitle] = useState("");
  return (
    <div className="App">
      <h1>Test Click Event with Button</h1>
      <button onClick={()=>setPageTitle("I am updated title")}>Update</button>
      <h1>{pagetitle}</h1>
      <Users />
    </div>
  );
}

export default App;
