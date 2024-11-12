import { useContext } from "react";
import "../styles/gameboard.css";
import BoardButton from "./BoardButton";
import { GameContext } from "../App";

function GameBoard() {
  const gameContext = useContext(GameContext);

  // making sure that playBoard is actually defined by fetching it
  if (gameContext.playBoard) {
    return (
      <div className="gameBoard">
        <div className="row0">
          {gameContext.playBoard.map((item, index) => (
            <BoardButton
              key={index}
              row={0}
              xcoord={item.x}
              ycoord={item.y}
              marker={item.marker}
            />
          ))}
        </div>
        <div className="row1">
          {gameContext.playBoard.map((item, index) => (
            <BoardButton
              key={index}
              row={1}
              xcoord={item.x}
              ycoord={item.y}
              marker={item.marker}
            />
          ))}
        </div>
        <div className="row2">
          {gameContext.playBoard.map((item, index) => (
            <BoardButton
              key={index}
              row={2}
              xcoord={item.x}
              ycoord={item.y}
              marker={item.marker}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default GameBoard;
