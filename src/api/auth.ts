import { apiClient } from "../api";

export const login = (username: string, password: string) => {
  return apiClient.post("/auth/login", {
    username: username,
    password: password,
  })
}

export const signup = (
  name: string,
  username: string,
  password: string,
  password_confirmation: string
) => {
  return apiClient.post("/auth/signup", {
    name: name,
    username: username,
    password: password,
    password_confirmation: password_confirmation,
  }).then(response => { return response; })
}
