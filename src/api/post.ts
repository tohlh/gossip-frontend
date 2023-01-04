import { authClientGet, authClientPost } from "../api";
import { getAuthToken } from "../utils/auth";

export type post = {
  id: number,
  title: string,
  content: string,
  tags: { title: string }[],
  is_edited: boolean,
  is_op: boolean,
  user: { name: string, username: string },
  created_at: Date
}

export const getPosts = (start: number, length: number, tag: string | null) => {
  const token = getAuthToken();
  return authClientGet(token, "/posts/", {
    params:
    {
      start: start,
      length: length,
      tag: tag
    }
  });
}

export const createPost = (post: post) => {
  const token = getAuthToken();
  return authClientPost(token, "/post/");
}
