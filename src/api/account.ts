import { authClientPatch } from "."
import { getAuthToken } from "../utils/auth";

export const updateDetails = (name: string, username: string) => {
  const token = getAuthToken();
  return authClientPatch(token, "/account/details", {
    name: name,
    username: username
  });
}

export const updatePassword = (current_password: string, password: string, password_confirm: string) => {
  const token = getAuthToken();
  return authClientPatch(token, "/account/password", {
    current_password: current_password,
    password: password,
    password_confirmation: password_confirm
  })
}
