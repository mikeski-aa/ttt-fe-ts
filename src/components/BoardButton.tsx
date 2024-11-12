import { useContext } from "react";
import { GameContext } from "../App";
import cross from "../assets/cross-sign-svgrepo-com.svg";
import circle from "../assets/empty-circle-svgrepo-com.svg";

function BoardButton({
  xcoord,
  ycoord,
  marker,
  row,
}: {
  xcoord: number;
  ycoord: number;
  row: number;
  marker: string;
}) {
  const gameContext = useContext(GameContext);

  // on click -> emit event to check status
  // check status of whether it can be clicked, and secondly update the board if it is correct
  const handleBtnClick = (xcoord: number, ycoord: number) => {
    if (!gameContext.canClick) {
      return;
    }

    if (gameContext.playBoard && gameContext.socket) {
      // setting up object we will be sending with click
      const sentObject = {
        coords: [xcoord, ycoord],
        playerMarker: gameContext.playerMarker,
      };
      gameContext.socket.emit("userMove", sentObject);
    }
  };

  // if row does not match xcoord, we do not render those items
  if (row != xcoord) {
    return null;
  }

  return (
    <button
      onClick={() => handleBtnClick(xcoord, ycoord)}
      className={`boardItem ${marker}`}
    >
      {marker === "" ? null : (
        <img className="boardMarker" src={marker === "X" ? cross : circle} />
      )}
    </button>
  );
}

export default BoardButton;
