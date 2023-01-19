import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { post, getPosts } from '../api/post';
import { RootState } from '.';

export interface postsState {
  posts: post[],
  hasMore: boolean,
  status: "idle" | "loading" | "failed";
}

const initialPostsState: postsState = {
  posts: [],
  hasMore: true,
  status: "idle"
}

export const setPostsAsync = createAsyncThunk(
  'post/getPosts',
  async (params: { tag: string | null }) => {
    const { tag } = params;
    const response = await getPosts(0, 10, tag);
    return response ? response.data : null;
  }
);

export const setMorePostsAsync = createAsyncThunk(
  'post/getMorePosts',
  async (params: { start: number, length: number, tag: string | null }) => {
    const { start, length, tag } = params;
    const response = await getPosts(start, length, tag);
    return response ? response.data : null;
  }
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState: initialPostsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setPostsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(setPostsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.hasMore = action.payload.length < 10 ? false : true;
        state.posts = action.payload;
      })
      .addCase(setPostsAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(setMorePostsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(setMorePostsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.posts = state.hasMore ? state.posts.concat(action.payload) : state.posts;
        state.hasMore = action.payload.length < 10 ? false : true;
      })
      .addCase(setMorePostsAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectPosts = (state: RootState) => state

export default postsSlice.reducer
