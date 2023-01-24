import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { post, getPost } from '../api/post';
import { RootState } from '.';

export interface postState {
  post: post | null,
  status: "idle" | "loading" | "failed";
}

const initialPostState: postState = {
  post: null,
  status: "idle",
}

export const setPostAsync = createAsyncThunk(
  'post/getPost',
  async (params: { id: number }) => {
    const { id } = params;
    const response = await getPost(id);
    return response ? response.data : null;
  }
);

export const postSlice = createSlice({
  name: 'post',
  initialState: initialPostState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setPostAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(setPostAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(setPostAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.post = action.payload;
      });
  },
});

export const selectPost = (state: RootState) => state.post

export default postSlice.reducer
