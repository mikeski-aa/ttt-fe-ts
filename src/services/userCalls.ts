import { getHeaderInfo, URL_CONST } from "../utils/urlConst";

async function createUser(
  username: string,
  password: string,
  confirmPassword: string
) {
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
      return console.log(response.status);
    }

    const json = response.json();

    console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
}

export { createUser };
