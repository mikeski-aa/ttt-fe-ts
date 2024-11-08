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
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        socket.on("users", (users) => {
          setConnectedUsers(users);
        });

        socket.on("rooms", (roomObject) => {
          setRoomInfo(roomObject);
        });

        socket.on("disconnect", () => {
          socket.on("rooms", (roomObject) => {
            setRoomInfo(roomObject);
          });
        });

        socket.on("warning", (arg) => {
          alert(arg);
          setRoom("");
        });

        socket.on("roomId", (roomId) => {
          setRoom(roomId);
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

  const handleRoomJoin = () => {};

  return (
    <div className="mainHolder">
      <h1>Tic Tac Toe</h1>
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
