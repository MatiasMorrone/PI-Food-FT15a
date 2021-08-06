import "./App.css";
import Landing from "./Components/Landing/Landing.js";

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className="flexbox">
          <h1 className="Tituloapp">Food Master</h1>
          <p className="landing">
            <Landing />
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
