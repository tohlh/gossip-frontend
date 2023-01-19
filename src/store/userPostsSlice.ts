import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { post, getUserPosts } from '../api/post';
import { RootState } from '.';

export interface userPostsState {
  userPosts: post[],
  hasMore: boolean,
  status: "idle" | "loading" | "failed";
}

const initialUserPostsState: userPostsState = {
  userPosts: [],
  hasMore: true,
  status: "idle"
}

export const setUserPostsAsync = createAsyncThunk(
  'post/getUserPosts',
  async (params: { username: string | null }) => {
    const { username } = params;
    const response = await getUserPosts(username, 0, 10);
    return response ? response.data : null;
  }
);

export const setMoreUserPostsAsync = createAsyncThunk(
  'post/getMoreUserPosts',
  async (params: { username: string | null, start: number, length: number }) => {
    const { username, start, length } = params;
    const response = await getUserPosts(username, start, length);
    return response ? response.data : null;
  }
);

export const userPostsSlice = createSlice({
  name: 'userPosts',
  initialState: initialUserPostsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setUserPostsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(setUserPostsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userPosts = action.payload;
        state.hasMore = action.payload.length >= 10;
      })
      .addCase(setUserPostsAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(setMoreUserPostsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(setMoreUserPostsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userPosts = state.hasMore ? state.userPosts.concat(action.payload) : state.userPosts;
        state.hasMore = action.payload.length >= 10;
      })
      .addCase(setMoreUserPostsAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectUserPosts = (state: RootState) => state

export default userPostsSlice.reducer
