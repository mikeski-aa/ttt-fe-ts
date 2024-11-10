import { Dispatch, SetStateAction } from "react";
import "../styles/modaltemplate.css";
import { Socket } from "socket.io-client";

function MatchingModal({
  modal,
  setModal,
  socket,
}: {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  socket: Socket;
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
        <div className={`modalText`}>Looking for a player + gif here</div>
        <button className="quitMatchingButton" onClick={handleModalClose}>
          Exit matchmaker
        </button>
      </div>
    </div>
  );
}

export default MatchingModal;
