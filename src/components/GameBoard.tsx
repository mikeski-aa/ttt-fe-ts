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
  return (
    <div className="gameBoard">
      <div className="row0">
        {board.map((item, index) => (
          <BoardButton
            key={index}
            setBoard={setBoard}
            board={board}
            row={0}
            xcoord={item.x}
            ycoord={item.y}
            marker={item.marker}
            pmarker={gameContext.playerMarker}
          />
        ))}
      </div>
      <div className="row1">
        {board.map((item, index) => (
          <BoardButton
            key={index}
            setBoard={setBoard}
            board={board}
            row={1}
            xcoord={item.x}
            ycoord={item.y}
            marker={item.marker}
            pmarker={gameContext.playerMarker}
          />
        ))}
      </div>
      <div className="row2">
        {board.map((item, index) => (
          <BoardButton
            key={index}
            setBoard={setBoard}
            board={board}
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

export default GameBoard;
