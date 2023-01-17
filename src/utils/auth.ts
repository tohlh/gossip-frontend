export const setAuthToken = (token: string) => {
  localStorage.setItem("token", token);
}

export const getAuthToken = () => {
  const ret = localStorage.getItem("token");
  return ret ? ret : "";
}

export const removeAuthToken = () => {
  localStorage.removeItem("token");
}

export const hasAuthToken = () => {
  return localStorage.getItem("token") !== null;
}
