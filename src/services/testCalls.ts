import { URL_CONST } from "../utils/urlConst";

async function testcall() {
  const url = URL_CONST + "";
  try {
    const response = await fetch(url, { method: "GET" });

    console.log(response);

    const json = await response.json();

    console.log(json);
  } catch (error: any) {
    throw new Error(error);
  }
}

export { testcall };
