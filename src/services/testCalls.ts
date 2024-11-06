import { URL_CONST } from "../utils/urlConst";

async function testcall() {
  try {
    const response = await fetch(URL_CONST, { method: "GET" });

    console.log(response);

    const json = await response.json();

    console.log(json);
  } catch (error: any) {
    throw new Error(error);
  }
}
export { testcall };
