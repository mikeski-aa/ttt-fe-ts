import { IResponse, IUser } from "../interface/responseInterface";
import { getHeaderInfo, URL_CONST } from "../utils/urlConst";

async function createUser(
  username: string,
  password: string,
  confirmPassword: string
): Promise<IResponse> {
  const url = URL_CONST + "register";
  const reqBody = {
    username: username,
    password: password,
    confirmPassword: confirmPassword,
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: getHeaderInfo(),
      body: JSON.stringify(reqBody),
    });

    if (!response.ok) {
      return { error: true, errorMessage: "Register error" };
    }

    const json: IResponse = await response.json();

    return json;
  } catch (error) {
    return { error: true, errorMessage: "Error connecting to API" };
  }
}

async function loginUser(
  username: string,
  password: string
): Promise<IResponse> {
  const url = URL_CONST + "login";
  const reqBody = {
    username: username,
    password: password,
  };
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: getHeaderInfo(),
      body: JSON.stringify(reqBody),
    });

    if (!response.ok) {
      return { error: true, errorMessage: "Error validating user" };
    }

    const json: IResponse = await response.json();

    // assuming json.token is returned
    if (json.token) {
      localStorage.setItem("token", json.token);
    }

    return json;
  } catch (error) {
    return { error: true, errorMessage: "Error connecting to API" };
  }
}

async function tokenSend(): Promise<IResponse> {
  const url = URL_CONST + "token";
  try {
    const response = await fetch(url, {
      method: "GET",
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

export interface ILeaderboard {
  users?: IUser[];
  error?: boolean;
  errorMessage?: string;
}

async function getLbs(): Promise<ILeaderboard> {
  const url = URL_CONST + "leaderboards";
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: getHeaderInfo(),
    });
    if (!response.ok) {
      return { error: true, errorMessage: "Getting response from server" };
    }

    const json: IUser[] = await response.json();

    return { users: json, error: false };
  } catch (error) {
    return { error: true, errorMessage: "Getting response from server" };
  }
}

export { createUser, loginUser, tokenSend, getLbs };
