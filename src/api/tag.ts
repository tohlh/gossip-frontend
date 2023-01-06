import { authClientGet } from "../api";
import { getAuthToken } from "../utils/auth";

export type tag = {
  title: string
}

export const getTags = () => {
  const token = getAuthToken();
  return authClientGet(token, "/tags/");
}
