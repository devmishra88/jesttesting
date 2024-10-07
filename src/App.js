import "./App.css";

function App() {
  return (
    <div className="App">
      <p>First React Test case</p>
      <p>Devesh Mishra</p>
      <img
        title="without copyright image"
        src="https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg"
        width={`200px`}
      />
      <br />
      <br />
      <br />
      <input
        type="text"
        name="username"
        id="username"
        placeholder="Enter User Name"
        value={`Devesh Mishra`}
      />
    </div>
  );
}

export default App;
