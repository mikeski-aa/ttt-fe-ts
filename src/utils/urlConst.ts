const URL_CONST: string = import.meta.env.VITE_ENDPOINT_API;

const getHeaderInfo = (): HeadersInit => {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  };
};

export { URL_CONST, getHeaderInfo };
