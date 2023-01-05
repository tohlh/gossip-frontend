import { authClientGet } from "."
import { getAuthToken } from "../utils/auth";

export const getCurrentUser = () => {
  const token = getAuthToken();
  return authClientGet(token, "/user");
}
