import { useState } from "react";
import "./App.css";
import handleData2 from "./helper";

function App() {
  // const [pagetitle, setPageTitle] = useState("");
  const [data, setData] = useState("");

  const handleData=()=>{
    setData("hello")
  }

  return (
    <div className="App">
      <h1>Functional Component method testing</h1>
      <button data-testid="btn1" onClick={handleData}>Update</button>
      <button onClick={handleData2}>Check Return</button>
      <h2>{data}</h2>
    </div>
  );
}

export default App;
