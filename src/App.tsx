import { useState } from "react";
import "./App.css";
import { testcall } from "./services/testCalls";
import { io } from "socket.io-client";

function App() {
  const [count, setCount] = useState(0);
  const socket = io("http://localhost:3000/");

  const handleClick = async () => {
    socket.on("click", (msg: "clicked") => {});
  };

  return (
    <>
      <h1>Tic Tac Toe</h1>
      <button onClick={() => handleClick()}>Call backend</button>
    </>
  );
}

export default App;
