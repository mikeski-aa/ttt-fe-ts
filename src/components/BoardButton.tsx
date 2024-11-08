import { Dispatch, SetStateAction } from "react";
import { IBoardItem } from "../interface/boardInterface";

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
  const handleBtnClick = (xcoord, ycoord, marker) => {};

  // if row does not match xcoord, we do not render those items
  if (row != xcoord) {
    return null;
  }

  return (
    <button
      onClick={() => handleBtnClick(xcoord, ycoord, marker)}
      className="boardItem"
    >
      {marker}
    </button>
  );
}

export default BoardButton;
