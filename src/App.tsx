import { useEffect, useState } from "react";
import "./App.css";
import { testcall } from "./services/testCalls";
import { io, Socket } from "socket.io-client";

function App() {
  const [connectState, setConnectState] = useState<boolean>();
  const [socket, setSocket] = useState<Socket | null>();
  const [connectedUsers, setConnectedUsers] = useState<string[]>([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        socket.on("users", (users) => {
          setConnectedUsers(users);
        });
      });

      // socket.on("disconnect", () => {
      //   socket.on("users", (users) => {
      //     console.log(users);
      //     setConnectedUsers(users);
      //   });
      // });
    }
  }, [socket]);

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
    <div className="mainHolder">
      <h1>Tic Tac Toe</h1>
      <ul>
        {connectState ? (
          <>
            <div>Connected</div>
            {connectedUsers.map((user, index) => (
              <li key={index}>{user}</li>
            ))}
          </>
        ) : (
          <div>Disconnected</div>
        )}
      </ul>
      <button onClick={() => handleClick()}>
        {connectState ? "Disconnect" : "Connect"}
      </button>
    </div>
  );
}

export default App;
