import { createContext, useEffect, useState } from "react";
import "./App.css";
import { testcall } from "./services/testCalls";
import { io, Socket } from "socket.io-client";
import GameBoard from "./components/GameBoard";
import { IBoardItem } from "./interface/boardInterface";
import ModalTemplate from "./components/ModalTemplate";
import MatchingModal from "./components/MatchingModal";

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
  const [room, setRoom] = useState<string>("");
  const [roomFull, setRoomFull] = useState<boolean>(false);
  const [playerMarker, setPlayerMarker] = useState<string>("");
  const [canClick, setCanClick] = useState<boolean>(false);
  const [playBoard, setPlayBoard] = useState<IBoardItem[]>();
  const [winModal, setWinModal] = useState<boolean>(false);
  const [loseModal, setLoseModal] = useState<boolean>(false);
  const [drawModal, setDrawModal] = useState<boolean>(false);
  const [disconnectWin, setDisconnectWin] = useState<boolean>(false);
  const [matchingModal, setMatchingModal] = useState<boolean>(false);
  const [winStreak, setWinStreak] = useState<number>(0);

  const roomReset = (socket: Socket) => {
    setRoom("");
    setRoomFull(false);
    socket.disconnect();
    setConnectState(false);
  };

  useEffect(() => {
    if (socket) {
      // states can be set directly by passing state setter
      socket.on("users", setConnectedUsers);

      socket.on("roomId", setRoom);

      socket.on("user join", () => {
        setRoomFull(true);
        setMatchingModal(false);
      });

      socket.on("disconnect", () => {
        roomReset(socket);
      });

      // set player markers X or Y
      socket.on("playerMarker", setPlayerMarker);

      // send the initial board state and set it up
      socket.on("initialBoard", setPlayBoard);

      // assign first move
      socket.on("firstMove", setCanClick);

      // on game won action
      socket.on("gameWon", (boolean) => {
        setWinStreak(winStreak + 1);
        setWinModal(boolean);
        roomReset(socket);
      });

      // on game lost action
      socket.on("gameLost", (boolean) => {
        setWinStreak(0);
        setLoseModal(boolean);
        roomReset(socket);
      });

      // on game draw
      socket.on("gameDraw", (boolean) => {
        setDrawModal(boolean);
        roomReset(socket);
      });

      // on other player disconnect
      socket.on("player disconnect", (boolean) => {
        setWinStreak(winStreak + 1);
        setDisconnectWin(boolean);
        roomReset(socket);
      });
    }

    // added cleanup

    return () => {
      socket?.off("users", setConnectedUsers);
      socket?.off("roomId", setRoom);
      socket?.off("user join");
      socket?.off("disconnect");
      socket?.off("firstmove", setCanClick);
      socket?.off("playerMarker", setPlayerMarker);
      socket?.off("initialBoard", setPlayBoard);
      socket?.off("gameWon");
      socket?.off("gameLost");
      socket?.off("gameDraw");
      socket?.off("player disconnect");
    };
  }, [socket]);

  useEffect(() => {});

  const handleClick = async () => {
    if (!connectState) {
      setMatchingModal(true);
      const newSocket = io("http://localhost:3000/");
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
        roomReset(socket);
      }
    }
  };

  const handleRoomJoin = () => {};

  return (
    <div className="mainHolder">
      {winModal ? (
        <ModalTemplate
          text="You win!"
          modalState={winModal}
          setModalState={setWinModal}
          type={"win"}
        />
      ) : null}
      {loseModal ? (
        <ModalTemplate
          text="You lose!"
          modalState={loseModal}
          setModalState={setLoseModal}
          type={"lose"}
        />
      ) : null}
      {drawModal ? (
        <ModalTemplate
          text="Draw!"
          modalState={drawModal}
          setModalState={setDrawModal}
          type={"draw"}
        />
      ) : null}
      {disconnectWin ? (
        <ModalTemplate
          text="You win! The other player has disconnected!"
          modalState={disconnectWin}
          setModalState={setDisconnectWin}
          type={"win"}
        />
      ) : null}
      {matchingModal && socket ? (
        <MatchingModal
          modal={matchingModal}
          setModal={setMatchingModal}
          socket={socket}
        />
      ) : null}

      <GameContext.Provider
        value={{ socket, playerMarker, canClick, playBoard }}
      >
        <h1>Multiplayer Tic Tac Toe</h1>
        {roomFull ? (
          <>
            <GameBoard />{" "}
            <h1 className={canClick ? "canMove yes" : "canMove no"}>
              {canClick
                ? `Your move! You are ${playerMarker}`
                : "Waiting for other player to make a move!"}
            </h1>
          </>
        ) : null}
      </GameContext.Provider>
      {/* <ul>
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
      </ul> */}

      {/* <div className="yourRoom">
        {room === ""
          ? "Not conntected to a room"
          : `Connected to room: ${room}`}
      </div> */}
      {winStreak > -1 ? (
        <div className="streak">Win streak: {winStreak}</div>
      ) : null}
      <button onClick={() => handleClick()}>
        {connectState ? "Quit Match" : "Find opponent"}
      </button>
    </div>
  );
}

export default App;
