import { IBoardItem } from "../interface/boardInterface";

function genBoard() {
  const board: IBoardItem[] = [];

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      board.push({ x: j, y: i, marker: "" });
    }
  }

  return board;
}

export default genBoard;
