import { useState } from "react";
import "./App.css";

function App() {
  const [username, setUserName] = useState("");
  return (
    <div className="App">
      <h1>Test OnChange Event with Input Text</h1>
      <input
        type="text"
        name="username"
        id="username"
        value={username}
        onChange={(e) => setUserName(e.target.value)}
      />
    </div>
  );
}

export default App;
