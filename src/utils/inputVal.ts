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

function validatePwMatch(pw: string, pwc: string) {
  if (pw === pwc) {
    return false;
  } else {
    return true;
  }
}

export { validateInput, validatePwMatch };
