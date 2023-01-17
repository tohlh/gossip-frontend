import axios from "axios";
import { removeAuthToken } from "../utils/auth";

export const apiClient = axios.create({
  baseURL: "https://gossip-api.onrender.com",
  headers: {
    "Content-type": "application/json",
    Accept: "application/json",
  }
});

export const authClientGet = (token: string | null, path: string, params = {}) => {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return apiClient.get(path, { params: params })
    .then(r => r)
    .catch(e => {
      if (e.response.status === 401) {
        removeAuthToken();
        window.location.reload();
      }
      return null;
    });
}

export const authClientPost = (token: string | null, path: string, params = {}) => {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return apiClient.post(path, params);
}

export const authClientPatch = (token: string | null, path: string, params = {}) => {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return apiClient.patch(path, params);
}

export const authClientDelete = (token: string | null, path: string, params = {}) => {
  apiClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  return apiClient.delete(path, params);
}
