import { Dispatch, SetStateAction } from "react";

function validateInput(
  string: string,
  limit: number,
  setErrorState: Dispatch<SetStateAction<boolean>>
) {
  if (string.length < limit) {
    setErrorState(true);
    return true;
  } else {
    setErrorState(false);
    return false;
  }
}

function validatePwMatch(
  pw: string,
  pwc: string,
  setState: Dispatch<SetStateAction<boolean>>
) {
  if (pw === pwc) {
    setState(false);
    return false;
  } else {
    setState(true);
    return true;
  }
}

export { validateInput, validatePwMatch };
