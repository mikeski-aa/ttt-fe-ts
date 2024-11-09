import { Dispatch, SetStateAction, useContext } from "react";
import { IBoardItem } from "../interface/boardInterface";
import { GameContext } from "../App";

function BoardButton({
  setBoard,
  xcoord,
  ycoord,
  marker,
  row,
  pmarker,
}: {
  setBoard: Dispatch<SetStateAction<IBoardItem[]>>;
  xcoord: number;
  ycoord: number;
  row: number;
  marker: string;
  pmarker: string;
}) {
  const gameContext = useContext(GameContext);

  // on click -> emit event to check status
  // check status of whether it can be clicked, and secondly update the board if it is correct
  const handleBtnClick = (xcoord: number, ycoord: number) => {
    if (!gameContext.canClick) {
      return;
    }

    if (gameContext.playBoard) {
      const copyBoard: IBoardItem[] = [...gameContext.playBoard];

      copyBoard.map((item) => {
        if (item.x === xcoord && item.y === ycoord) {
          item.marker = pmarker;
        }
      });

      setBoard(copyBoard);
    }
  };

  // if row does not match xcoord, we do not render those items
  if (row != xcoord) {
    return null;
  }

  return (
    <button
      onClick={() => handleBtnClick(xcoord, ycoord)}
      className="boardItem"
    >
      {marker}
    </button>
  );
}

export default BoardButton;
