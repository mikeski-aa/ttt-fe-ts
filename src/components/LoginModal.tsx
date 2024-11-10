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
  const [regUError, setRegUError] = useState<boolean>(false);
  const [regPError, setRegPError] = useState<boolean>(false);
  const [regCError, setRegCError] = useState<boolean>(false);
  const [errText, setErrText] = useState<string>("");
  const [errPwText, setErrPwText] = useState<string>("");

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

    if (regUname.length < 1) {
      setRegUError(true);
      setErrText("Username is required");
    } else {
      setRegUError(false);
    }

    if (regPw.length < 5) {
      setRegPError(true);
      setErrPwText("Password is too short");
    } else {
      setRegPError(false);
      setErrPwText("");
    }

    if (regConfPw.length < 5) {
      setRegCError(true);
      setErrPwText("Password is too short");
    } else {
      setRegCError(false);
      setErrPwText("");
    }
  };

  // set up all input handlers
  const handleInput = (input: string, e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;

    switch (input) {
      case "regU":
        if (target.value.length > 0) {
          setRegUError(false);
        }
        setRegUname(target.value);
        break;
      case "regP":
        setRegPw(target.value);
        break;
      case "regC":
        setRegConfPw(target.value);
        break;
      case "logU":
        setLogUname(target.value);
        break;
      case "logP":
        setLogPw(target.value);
        break;
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
                min={1}
                max={16}
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
              <div className="inputHolder">
                <input
                  type="text"
                  placeholder="username"
                  className="formInput"
                  value={regUname}
                  min={1}
                  max={16}
                  onChange={(e) => handleInput("regU", e)}
                ></input>
                <div className={regUError ? "error show" : "error hide"}>
                  {errText}
                </div>
              </div>

              <div className="inputHolder">
                <input
                  type="password"
                  placeholder="password"
                  className="formInput"
                  value={regPw}
                  onChange={(e) => handleInput("regP", e)}
                  min={4}
                  max={16}
                ></input>
                <div className={regPError ? "error show" : "error hide"}>
                  {errPwText}
                </div>
              </div>
              <input
                type="password"
                placeholder="confirm password"
                className="formInput"
                value={regConfPw}
                min={4}
                max={16}
                onChange={(e) => handleInput("regC", e)}
              ></input>

              <div className="inputHolder">
                <div className={regConfPw ? "error show" : "error hide"}>
                  {errPwText}
                </div>
              </div>

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
