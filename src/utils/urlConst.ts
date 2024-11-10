const URL_CONST: string = "http://localhost:3000/api/";

const getHeaderInfo = (): HeadersInit => {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  };
};

export { URL_CONST, getHeaderInfo };
