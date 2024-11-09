import { Dispatch, SetStateAction, useContext } from "react";
import { IBoardItem } from "../interface/boardInterface";
import { GameContext } from "../App";

function BoardButton({
  setBoard,
  board,
  xcoord,
  ycoord,
  marker,
  row,
  pmarker,
}: {
  setBoard: Dispatch<SetStateAction<IBoardItem[]>>;
  board: IBoardItem[];
  xcoord: number;
  ycoord: number;
  row: number;
  marker: string;
  pmarker: string;
}) {
  const gameContext = useContext(GameContext);

  const handleBtnClick = (xcoord: number, ycoord: number) => {
    if (!gameContext.canClick) {
      return;
    }

    const copyBoard: IBoardItem[] = [...board];

    copyBoard.map((item) => {
      if (item.x === xcoord && item.y === ycoord) {
        item.marker = pmarker;
      }
    });

    setBoard(copyBoard);
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
