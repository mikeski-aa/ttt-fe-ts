import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  const handleClick = async () => {};

  return (
    <>
      <h1>Tic Tac Toe</h1>
      <button onClick={handleClick}>Call backend</button>
    </>
  );
}

export default App;
