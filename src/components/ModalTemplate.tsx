import { Dispatch, SetStateAction } from "react";
import "../styles/modaltemplate.css";

function ModalTemplate({
  text,
  modalState,
  setModalState,
  type,
}: {
  text: string;
  modalState: boolean;
  setModalState: Dispatch<SetStateAction<boolean>>;
  type: string;
}) {
  const handleModalClose = () => {
    setModalState(!modalState);
  };

  return (
    <div className="modal">
      <div className="modalContent">
        <div className="closeBar">
          <button className="closeModalBtn" onClick={handleModalClose}>
            X
          </button>
        </div>
        <div className={`modalText ${type}`}>{text}</div>
      </div>
    </div>
  );
}

export default ModalTemplate;
