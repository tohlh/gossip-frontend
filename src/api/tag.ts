import { apiClient } from "../api";
import { getAuthToken } from "../utils/auth";

export type tag = {
  title: string
}

export const getTags = () => {
  const token = getAuthToken();
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return apiClient.get("/tags/")
}
