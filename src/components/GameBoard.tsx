import { useContext, useState } from "react";
import "../styles/gameboard.css";
import genBoard from "../utils/genBoard";
import { IBoardItem } from "../interface/boardInterface";
import BoardButton from "./BoardButton";
import { GameContext } from "../App";

function GameBoard() {
  const [board, setBoard] = useState<IBoardItem[]>(genBoard());
  const gameContext = useContext(GameContext);

  console.log(board);

  // making sure that playBoard is actually defined by fetching it
  if (gameContext.playBoard) {
    return (
      <div className="gameBoard">
        <div className="row0">
          {gameContext.playBoard.map((item, index) => (
            <BoardButton
              key={index}
              setBoard={setBoard}
              row={0}
              xcoord={item.x}
              ycoord={item.y}
              marker={item.marker}
              pmarker={gameContext.playerMarker}
            />
          ))}
        </div>
        <div className="row1">
          {gameContext.playBoard.map((item, index) => (
            <BoardButton
              key={index}
              setBoard={setBoard}
              row={1}
              xcoord={item.x}
              ycoord={item.y}
              marker={item.marker}
              pmarker={gameContext.playerMarker}
            />
          ))}
        </div>
        <div className="row2">
          {gameContext.playBoard.map((item, index) => (
            <BoardButton
              key={index}
              setBoard={setBoard}
              row={2}
              xcoord={item.x}
              ycoord={item.y}
              marker={item.marker}
              pmarker={gameContext.playerMarker}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default GameBoard;
