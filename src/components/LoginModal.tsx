import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import "../styles/loginmodal.css";

function LoginModal({
  modalState,
  setModalState,
}: {
  modalState: boolean;
  setModalState: Dispatch<SetStateAction<boolean>>;
}) {
  const [toggleForm, setToggleForm] = useState<boolean>(true);
  const [regUname, setRegUname] = useState<string>("");
  const [regPw, setRegPw] = useState<string>("");
  const [regConfPw, setRegConfPw] = useState<string>("");
  const [logUname, setLogUname] = useState<string>("");
  const [logPw, setLogPw] = useState<string>("");

  const handleModalClose = () => {
    setModalState(!modalState);
  };

  const handleToggleClick = () => {
    setToggleForm(!toggleForm);
  };

  const handleLoginClick = async (e: SyntheticEvent) => {
    console.log("login clicked");
    e.preventDefault();
  };

  const handleRegisterClick = async (e: SyntheticEvent) => {
    console.log("reg clicked");
    e.preventDefault();
  };

  // set up all input handlers
  const handleInput = (input: string, e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;
    if (input === "regU") {
      setRegUname(target.value);
    } else if (input === "regP") {
      setRegPw(target.value);
    } else if (input === "regC") {
      setRegConfPw(target.value);
    } else if (input === "logU") {
      setLogUname(target.value);
    } else if (input === "logP") {
      setLogPw(target.value);
    }
  };

  return (
    <div className="modal">
      <div className="modalContent">
        <div className="closeBar">
          <button className="closeModalBtn" onClick={handleModalClose}>
            X
          </button>
        </div>

        {toggleForm ? (
          <div className={`loginDiv`}>
            <form className="logregform">
              <input
                type="text"
                placeholder="username"
                className="formInput"
                value={logUname}
                onChange={(e) => handleInput("logU", e)}
              ></input>
              <input
                type="password"
                placeholder="password"
                className="formInput"
                value={logPw}
                onChange={(e) => handleInput("logP", e)}
              ></input>
              <button
                type="submit"
                className="submitBtn"
                onClick={(e) => handleLoginClick(e)}
              >
                Log in
              </button>
            </form>
            <button className="goRegister" onClick={handleToggleClick}>
              Don't have an account? Register
            </button>
          </div>
        ) : (
          <div className={`registerDiv`}>
            <form className="logregform">
              <input
                type="text"
                placeholder="username"
                className="formInput"
                value={regUname}
                onChange={(e) => handleInput("regP", e)}
              ></input>
              <input
                type="password"
                placeholder="password"
                className="formInput"
                value={regPw}
                onChange={(e) => handleInput("regU", e)}
              ></input>
              <input
                type="password"
                placeholder="confirm password"
                className="formInput"
                value={regConfPw}
                onChange={(e) => handleInput("regC", e)}
              ></input>

              <button
                type="submit"
                className="submitBtn"
                onClick={(e) => handleRegisterClick(e)}
              >
                Register
              </button>
            </form>
            <button className="goRegister" onClick={handleToggleClick}>
              Already have an account? Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginModal;
