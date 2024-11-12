import { createContext, useEffect, useState } from "react";
import "./App.css";
import { io, Socket } from "socket.io-client";
import GameBoard from "./components/GameBoard";
import { IBoardItem } from "./interface/boardInterface";
import ModalTemplate from "./components/ModalTemplate";
import MatchingModal from "./components/MatchingModal";
import LoginModal from "./components/LoginModal";
import { IUser } from "./interface/responseInterface";
import { getLbs, ILeaderboard, tokenSend } from "./services/userCalls";
import {
  updateDraws,
  updateLoss,
  updateLossForDC,
  updateWins,
} from "./services/gameCalls";
import Leaderboards from "./components/Leaderboards";
import LoadingBox from "./components/LoadingBox";

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
  const [loginModal, setLoginModal] = useState<boolean>(false);
  const [user, setUser] = useState<IUser>();
  const [leaderboards, setLeaderboards] = useState<IUser[]>();
  const [loginLoading, setLoginLoading] = useState<boolean>(false);

  const roomReset = (socket: Socket) => {
    setRoomFull(false);
    socket.disconnect();
    setConnectState(false);
    setCanClick(false);
  };

  useEffect(() => {
    if (socket) {
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
      socket.on("gameWon", async (boolean) => {
        setWinStreak(winStreak + 1);
        setWinModal(boolean);
        roomReset(socket);

        if (user) {
          const newUser = await updateWins();

          // update state to reflect new score
          if (!newUser.error) {
            setUser(newUser);
          }
        }
      });

      // on game lost action
      socket.on("gameLost", async (boolean) => {
        setWinStreak(0);
        setLoseModal(boolean);
        roomReset(socket);

        if (user) {
          const newUser = await updateLoss();

          // update state to reflect new score
          if (!newUser.error) {
            setUser(newUser);
          }
        }
      });

      // on game draw
      socket.on("gameDraw", async (boolean) => {
        setDrawModal(boolean);
        roomReset(socket);

        if (user) {
          const newUser = await updateDraws();

          // update state to reflect new score
          if (!newUser.error) {
            setUser(newUser);
          }
        }
      });

      // on other player disconnect
      socket.on("player disconnect", async (boolean) => {
        setWinStreak(winStreak + 1);
        setDisconnectWin(boolean);
        roomReset(socket);

        if (user) {
          const newUser = await updateWins();

          // update state to reflect new score
          if (!newUser.error) {
            setUser(newUser);
          }
        }
      });

      socket.on("handleDisconnectLoss", async (item) => {
        if (user) {
          const filtered = item.filter((item: number) => item !== user.id);
          console.log(filtered[0]);
          await updateLossForDC(filtered[0]);
        } else {
          const filtered = item.filter(
            (item: number) => typeof item === "number"
          );
          await updateLossForDC(filtered[0]);
        }
      });
    }

    // added cleanup

    return () => {
      socket?.off("user join");
      socket?.off("disconnect");
      socket?.off("firstmove", setCanClick);
      socket?.off("playerMarker", setPlayerMarker);
      socket?.off("initialBoard", setPlayBoard);
      socket?.off("gameWon");
      socket?.off("gameLost");
      socket?.off("gameDraw");
      socket?.off("player disconnect");
      socket?.off("handleDisconnectLoss");
    };
  }, [socket]);

  // fetch leaderboards on page load
  useEffect(() => {
    const getLeaderboards = async () => {
      const newLeaderboards: ILeaderboard = await getLbs();
      console.log(newLeaderboards);
      if (!newLeaderboards.error) {
        setLeaderboards(newLeaderboards.users);
      }
    };
    getLeaderboards();
  }, []);

  const handleClick = async () => {
    if (!connectState) {
      setMatchingModal(true);
      const newSocket = io("http://localhost:3000/");
      setSocket(newSocket);

      newSocket.on("connect", () => {
        console.log("connected to socket");
        setConnectState(true);
        // immediately send user info
        if (user) {
          newSocket.emit("userInfo", user.id);
        } else {
          newSocket.emit("userInfo", null);
        }
      });
    } else {
      if (socket) {
        socket.disconnect();
        roomReset(socket);

        // force user update to state on volountary quit click
        if (user && user.gameslost) {
          let gameslostnew = user.gameslost + 1;
          setUser({ ...user, gameslost: gameslostnew });
        }
      }
    }
  };

  const handleLoginClick = async () => {
    if (localStorage.getItem("token")) {
      setLoginLoading(true);
      // inform user we are fetching their info
      const userInfo = await tokenSend();

      if (!userInfo.error) {
        setUser({
          username: userInfo.username,
          id: userInfo.id,
          gameswon: userInfo.gameswon,
          gameslost: userInfo.gameslost,
          gamesdrawn: userInfo.gamesdrawn,
          currentstreak: userInfo.currentstreak,
          maxstreak: userInfo.maxstreak,
        });
        setLoginLoading(false);
        return;
      }
    }

    setLoginModal(true);
  };

  const handleLogoutClick = () => {
    setUser(undefined);
    localStorage.removeItem("token");
  };

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

      {loginModal ? (
        <LoginModal
          modalState={loginModal}
          setModalState={setLoginModal}
          setUser={setUser}
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
      {winStreak > -1 && !user ? (
        <div className="streak">Win streak: {winStreak}</div>
      ) : null}

      {loginLoading ? (
        <LoadingBox text="Logging in..." />
      ) : (
        <>
          <button onClick={() => handleClick()}>
            {connectState ? "Quit Match" : "Find opponent"}
          </button>
          {!user && !connectState ? (
            <button onClick={() => handleLoginClick()} className="loginButton">
              Login
            </button>
          ) : null}
          {user && !connectState ? (
            <button onClick={() => handleLogoutClick()} className="loginButton">
              Logout
            </button>
          ) : null}
        </>
      )}

      {user && !connectState ? (
        <div className="userInfoBar">
          <div className="userInfo name">{user.username}</div>
          <div className="userInfo">Games won: {user.gameswon}</div>
          <div className="userInfo">Games lost: {user.gameslost}</div>
          <div className="userInfo">Games drawn: {user.gamesdrawn}</div>
          <div className="userInfo">Current streak: {user.currentstreak}</div>
          <div className="userInfo">Highest streak: {user.maxstreak}</div>
        </div>
      ) : null}
      {leaderboards ? (
        <Leaderboards
          leaderboards={leaderboards}
          setLeaderboards={setLeaderboards}
        />
      ) : (
        <div className="lbloadholder">
          {" "}
          <LoadingBox text={"Loading leaderboards..."} />
        </div>
      )}
    </div>
  );
}

export default App;
