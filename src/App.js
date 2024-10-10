import { useState } from "react";
import "./App.css";

function App() {
  const [pagetitle, setPageTitle] = useState("");
  return (
    <div className="App">
      <h1>Test Click Event with Button</h1>
      <button onClick={()=>setPageTitle("I am updated title")}>Update</button>
      <h1>{pagetitle}</h1>
    </div>
  );
}

export default App;
