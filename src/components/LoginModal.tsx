import { Dispatch, SetStateAction } from "react";

function LoginModal({
  modalState,
  setModalState,
}: {
  modalState: boolean;
  setModalState: Dispatch<SetStateAction<boolean>>;
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
        <div className={`loginDiv`}>Lqogin form goes here</div>
        <div className={`registerDiv`}>Register form goes here</div>
      </div>
    </div>
  );
}

export default LoginModal;
