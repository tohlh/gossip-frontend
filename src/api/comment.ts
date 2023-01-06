import { authClientGet, authClientPost } from "../api";
import { getAuthToken } from "../utils/auth";

export type comment = {
  id: number,
  content: string,
  is_edited: boolean,
  is_op: boolean,
  user: { name: string, username: string },
  created_at: Date
}

export const getComments = (post_id: number) => {
  const token = getAuthToken();
  return authClientGet(token, "/comments/", {
    post_id: post_id
  });
}

export const addComment = (post_id: number, content: string) => {
  const token = getAuthToken();
  return authClientPost(token, "/comment/", {
    post_id: post_id,
    content: content,
  })
}
