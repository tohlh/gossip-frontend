import { authClientGet } from "."
import { getAuthToken } from "../utils/auth";

export const getCurrentUser = () => {
  const token = getAuthToken();
  return authClientGet(token, "/user/current");
}

export const getUser = (username: string | null) => {
  const token = getAuthToken();
  return authClientGet(token, "/user/", { username: username })
}
