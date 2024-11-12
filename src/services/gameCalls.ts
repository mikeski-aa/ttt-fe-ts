import { getHeaderInfo, URL_CONST } from "../utils/urlConst";
import { IResponse } from "../interface/responseInterface";

async function updateWins() {
  const url = URL_CONST + "wins";

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: getHeaderInfo(),
    });
    if (!response.ok) {
      return { error: true, errorMessage: "Error validating user" };
    }

    const json: IResponse = await response.json();

    return json;
  } catch (error) {
    return { error: true };
  }
}

async function updateLoss() {
  const url = URL_CONST + "loss";

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: getHeaderInfo(),
    });
    if (!response.ok) {
      return { error: true, errorMessage: "Error validating user" };
    }

    const json: IResponse = await response.json();

    return json;
  } catch (error) {
    return { error: true };
  }
}

async function updateDraws() {
  const url = URL_CONST + "draw";

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: getHeaderInfo(),
    });
    if (!response.ok) {
      return { error: true, errorMessage: "Error validating user" };
    }

    const json: IResponse = await response.json();

    return json;
  } catch (error) {
    return { error: true };
  }
}

async function updateLossForDC(id: number) {
  const url = URL_CONST + "dcloss";
  const newBody = {
    id: id,
  };
  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: getHeaderInfo(),
      body: JSON.stringify(newBody),
    });
    if (!response.ok) {
      return { error: true, errorMessage: "Error validating user" };
    }

    const json: IResponse = await response.json();

    return json;
  } catch (error) {
    return { error: true };
  }
}

export { updateWins, updateLoss, updateDraws, updateLossForDC };
