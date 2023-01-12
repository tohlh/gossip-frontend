import { authClientGet, authClientPost, authClientPatch, authClientDelete } from "../api";
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
  });
}

export const editComment = (id: number, content: string) => {
  const token = getAuthToken();
  return authClientPatch(token, "/comment/?id=" + id, {
    content: content
  });
}

export const deleteComment = (id: number) => {
  const token = getAuthToken();
  return authClientDelete(token, "/comment/?id=" + id, {});
}
