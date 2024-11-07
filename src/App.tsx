import { useState } from "react";
import "./App.css";
import { testcall } from "./services/testCalls";
import { io, Socket } from "socket.io-client";

function App() {
  const [connectState, setConnectState] = useState<boolean>();
  const [socket, setSocket] = useState<Socket | null>();
  const [count, setCount] = useState(0);

  const handleClick = async () => {
    if (!connectState) {
      const newSocket = io("http://localhost:3000/");
      console.log(newSocket);
      setSocket(newSocket);
      newSocket.on("connect", () => {
        console.log("connected to socket");
        setConnectState(true);
      });

      // test sending a message
      newSocket.emit("chat message", "hello world");
    } else {
      if (socket) {
        socket.disconnect();
        console.log("disconnected user");
        setConnectState(false);
      }
    }
  };

  return (
    <>
      <h1>Tic Tac Toe</h1>
      <button onClick={() => handleClick()}>Call backend</button>
    </>
  );
}

export default App;
