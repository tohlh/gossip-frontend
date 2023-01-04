import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { post, getPosts } from '../api/post';
import { RootState } from '.';

export interface postsState {
  posts: post[],
  status: "idle" | "loading" | "failed";
}

const initialState: postsState = {
  posts: [],
  status: "idle"
}

export const setPostsAsync = createAsyncThunk(
  'post/getPosts',
  async (params: { start: number, length: number, tag: string | null }) => {
    const { start, length, tag } = params;
    const response = await getPosts(start, length, tag);
    return response.data;
  }
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setPostsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(setPostsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.posts = action.payload;
      })
      .addCase(setPostsAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectPosts = (state: RootState) => state.posts

export default postsSlice.reducer