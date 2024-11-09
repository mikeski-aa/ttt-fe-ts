import { createContext, useEffect, useState } from "react";
import "./App.css";
import { testcall } from "./services/testCalls";
import { io, Socket } from "socket.io-client";
import GameBoard from "./components/GameBoard";
import { IBoardItem } from "./interface/boardInterface";

interface IRoom {
  roomId: string;
  users: string[];
}

interface IGameContext {
  socket: Socket | undefined;
  playerMarker: string;
  canClick: boolean;
  playBoard: IBoardItem[] | undefined;
}

export const GameContext = createContext<IGameContext>({
  socket: undefined,
  playerMarker: "",
  canClick: false,
  playBoard: undefined,
});

function App() {
  const [connectState, setConnectState] = useState<boolean>();
  const [socket, setSocket] = useState<Socket>();
  const [connectedUsers, setConnectedUsers] = useState<string[]>([]);
  const [roomInfo, setRoomInfo] = useState<IRoom[]>([]);
  const [room, setRoom] = useState<string>("");
  const [roomFull, setRoomFull] = useState<boolean>(false);
  const [playerMarker, setPlayerMarker] = useState<string>("");
  const [canClick, setCanClick] = useState<boolean>(false);
  const [playBoard, setPlayBoard] = useState<IBoardItem[]>();

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
        // alert(message);
        setRoomFull(true);
      });

      socket.on("disconnect", () => {
        setRoom("");
        setRoomFull(false);
      });

      // set player markers X or Y
      socket.on("playerMarker", setPlayerMarker);

      // send the initial board state and set it up
      socket.on("initialBoard", setPlayBoard);

      // assign first move
      socket.on("firstMove", setCanClick);
    }

    // added cleanup

    return () => {
      socket?.off("users", setConnectedUsers);
      socket?.off("rooms", setRoomInfo);
      socket?.off("warning");
      socket?.off("roomId", setRoom);
      socket?.off("user join");
      socket?.off("disconnect");
      socket?.off("firstmove", setCanClick);
      socket?.off("playerMarker", setPlayerMarker);
      socket?.off("initialBoard", setPlayBoard);
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
      <GameContext.Provider
        value={{ socket, playerMarker, canClick, playBoard }}
      >
        <h1>Tic Tac Toe</h1>
        {roomFull ? (
          <>
            <GameBoard /> <h1>You are {playerMarker}</h1>
          </>
        ) : null}
      </GameContext.Provider>
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
