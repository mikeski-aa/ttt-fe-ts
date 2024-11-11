import { Dispatch, SetStateAction, SyntheticEvent, useState } from "react";
import "../styles/loginmodal.css";
import { validateInput, validatePwMatch } from "../utils/inputVal";
import { createUser, loginUser, tokenSend } from "../services/userCalls";
import { IUser } from "../interface/responseInterface";

function LoginModal({
  modalState,
  setModalState,
  setUser,
}: {
  modalState: boolean;
  setModalState: Dispatch<SetStateAction<boolean>>;
  setUser: Dispatch<SetStateAction<IUser | undefined>>;
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
  const [matchErr, setMatchErr] = useState<boolean>(false);
  const [logUError, setLogUError] = useState<boolean>(false);
  const [logPError, setLogPError] = useState<boolean>(false);
  const [logError, setLogError] = useState<boolean>(false);

  const handleModalClose = () => {
    setModalState(!modalState);
  };

  const handleToggleClick = () => {
    setToggleForm(!toggleForm);
  };

  const handleLoginClick = async (e: SyntheticEvent) => {
    console.log("login clicked");
    e.preventDefault();

    // make sure input is valid length
    if (
      validateInput(logUname, 1, setLogUError) ||
      validateInput(logPw, 5, setLogPError)
    ) {
      return;
    }

    const userInfo = await loginUser(logUname, logPw);

    // if logging in error
    if (userInfo.error) {
      return setLogError(true);
    }

    setLogError(false);
    setModalState(!modalState);
    if (userInfo) {
      setUser({
        username: userInfo.username,
        id: userInfo.id,
        gameswon: userInfo.gameswon,
        gameslost: userInfo.gameslost,
        gamesdrawn: userInfo.gamesdrawn,
        currentstreak: userInfo.currentstreak,
        maxstreak: userInfo.maxstreak,
      });
    }
  };

  const handleRegisterClick = async (e: SyntheticEvent) => {
    console.log("reg clicked");
    e.preventDefault();

    // handle validation of input before submitting
    if (
      validateInput(regUname, 1, setRegUError) ||
      validateInput(regPw, 5, setRegPError) ||
      validateInput(regConfPw, 5, setRegCError) ||
      validatePwMatch(regPw, regConfPw, setMatchErr)
    ) {
      console.log(validateInput(regUname, 1, setRegUError));
      console.log(validateInput(regPw, 5, setRegPError));
      console.log(validateInput(regConfPw, 5, setRegCError));
      return;
    }

    // handle register
    const reggedUser = await createUser(regUname, regPw, regConfPw);

    if (!reggedUser.error) {
      const userInfo = await loginUser(regUname, regPw);
      setModalState(!modalState);
      setUser({
        username: userInfo.username,
        id: userInfo.id,
        gameswon: userInfo.gameswon,
        gameslost: userInfo.gameslost,
        gamesdrawn: userInfo.gamesdrawn,
        currentstreak: userInfo.currentstreak,
        maxstreak: userInfo.maxstreak,
      });
    }
  };

  // set up all input handlers
  const handleInput = (input: string, e: SyntheticEvent) => {
    const target = e.target as HTMLInputElement;

    switch (input) {
      case "regU":
        validateInput(target.value, 1, setRegUError);
        setRegUname(target.value);
        break;
      case "regP":
        validateInput(target.value, 5, setRegPError);
        validatePwMatch(target.value, regConfPw, setMatchErr);
        setRegPw(target.value);
        break;
      case "regC":
        validateInput(target.value, 5, setRegCError);
        validatePwMatch(target.value, regPw, setMatchErr);
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
              <div className="inputholder">
                <input
                  type="text"
                  placeholder="username"
                  className="formInput"
                  value={logUname}
                  min={1}
                  max={16}
                  onChange={(e) => handleInput("logU", e)}
                ></input>
                <div className={logUError ? "error show" : "error hide"}>
                  Username too short
                </div>
              </div>
              <div className="inputholder">
                <input
                  type="password"
                  placeholder="password"
                  className="formInput"
                  value={logPw}
                  onChange={(e) => handleInput("logP", e)}
                ></input>
                <div className={logPError ? "error show" : "error hide"}>
                  Password too short
                </div>
              </div>
              <div className={logError ? "error show" : "error hide"}>
                Username or password is incorrect
              </div>
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
                  Username too short
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
                  Password too short
                </div>
              </div>

              <div className="inputHolder">
                <input
                  type="password"
                  placeholder="confirm password"
                  className="formInput"
                  value={regConfPw}
                  min={4}
                  max={16}
                  onChange={(e) => handleInput("regC", e)}
                ></input>
                <div className={regCError ? "error show" : "error hide"}>
                  Password too short
                </div>
              </div>
              <div className={matchErr ? "error show" : "error hide"}>
                Passwords need to match!
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
