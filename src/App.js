import "./App.css";
import HomePage from "./components/HomePage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
      <h1>Tic Tac Toe</h1>
      </header>
      <header className="App-header App-body">
        <HomePage />
      </header>
    </div>
  );
}

export default App;
