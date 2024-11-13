import { Dispatch, SetStateAction } from "react";
import "../styles/modaltemplate.css";
import { Socket } from "socket.io-client";
import spinner from "../assets/infinite-spinner.svg";
import { IUser } from "../interface/responseInterface";

function MatchingModal({
  modal,
  setModal,
  socket,
  leaderboards,
}: {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  socket: Socket;
  leaderboards: IUser[] | undefined;
}) {
  const handleModalClose = () => {
    setModal(!modal);
    socket.disconnect();
  };

  return (
    <div className="modal">
      <div className="modalContent">
        <div className="closeBar">
          <button className="closeModalBtn" onClick={handleModalClose}>
            X
          </button>
        </div>
        <div className={`modalText`}>Looking for a player...</div>
        {!leaderboards ? (
          <div className="serverMsg">
            Our servers are waking up, this can take some time...
          </div>
        ) : null}
        <img className="loading" src={spinner} />
        <div className="buttonHolder">
          <button className="quitMatchingButton" onClick={handleModalClose}>
            Exit matchmaker
          </button>
        </div>
      </div>
    </div>
  );
}

export default MatchingModal;
