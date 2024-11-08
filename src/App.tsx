import { useEffect, useState } from "react";
import "./App.css";
import { testcall } from "./services/testCalls";
import { io, Socket } from "socket.io-client";

interface IRoom {
  roomId: string;
  users: string[];
}

function App() {
  const [connectState, setConnectState] = useState<boolean>();
  const [socket, setSocket] = useState<Socket | null>();
  const [connectedUsers, setConnectedUsers] = useState<string[]>([]);
  const [roomState, setRoomState] = useState<boolean>(false);
  const [roomInfo, setRoomInfo] = useState<IRoom[]>([]);
  const [room, setRoom] = useState<string>("");
  const [roomFull, setRoomFull] = useState<boolean>(false);

  useEffect(() => {
    if (socket) {
      // states can be set directly by passing state setter
      socket.on("users", setConnectedUsers);

      socket.on("rooms", setRoomInfo);

      socket.on("warning", (arg) => {
        alert(arg);
        setRoom("");
        setRoomFull(false);
      });

      socket.on("roomId", setRoom);

      socket.on("user join", (message) => {
        alert(message);
        setRoomFull(true);
      });

      socket.on("disconnect", () => {
        setRoom("");
        setRoomFull(false);
      });
    }

    // added cleanup

    return () => {
      socket?.off("users", setConnectedUsers);
      socket?.off("rooms", setRoomInfo);
      socket?.off("warning");
      socket?.off("roomId", setRoom);
      socket?.off("user join");
      socket?.off("disconnect");
    };
  }, [socket]);

  useEffect(() => {});

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

  const handleRoomJoin = () => {};

  return (
    <div className="mainHolder">
      <h1>Tic Tac Toe</h1>
      {roomFull ? <div className="board">XAXA</div> : null}
      <ul>
        {connectState ? (
          <>
            <div>Connected</div>

            {connectedUsers.map((user, index) => (
              <li
                key={index}
                className={
                  socket ? (socket.id == user ? "me" : undefined) : undefined
                }
              >
                {user}
              </li>
            ))}
          </>
        ) : (
          <div>Disconnected</div>
        )}
      </ul>

      <div className="yourRoom">
        {room === ""
          ? "Not conntected to a room"
          : `Connected to room: ${room}`}
      </div>
      <button onClick={() => handleClick()}>
        {connectState ? "Disconnect" : "Connect"}
      </button>
    </div>
  );
}

export default App;
