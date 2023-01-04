import axios from "axios";
import { removeAuthToken } from "../utils/auth";

export const apiClient = axios.create({
  baseURL: "http://192.168.1.28:3000",
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  }
});

export const authClientGet = (token: string | null, path: string, params = {}) => {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return apiClient.get(path, params)
    .then(r => r)
    .catch(e => {
      if (e.response.status === 401) {
        removeAuthToken();
        window.location.reload();
      }
      return e;
    });
}

export const authClientPost = (token: string | null, path: string, params = {}) => {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return apiClient.post(path, params)
    .then(r => r)
    .catch(e => {
      if (e.response.status === 401) {
        removeAuthToken();
        window.location.reload();
      }
      return e;
    });
}
