import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { comment, getComments } from '../api/comment';
import { RootState } from '.';

export interface postsState {
  comments: comment[],
  status: "idle" | "loading" | "failed";
}

const initialCommentsState: postsState = {
  comments: [],
  status: "idle"
}

export const setCommentsAsync = createAsyncThunk(
  'comment/getComments',
  async (params: { id: number }) => {
    const { id } = params;
    const response = await getComments(id);
    return response ? response.data : null;
  }
);

export const commentsSlice = createSlice({
  name: 'comments',
  initialState: initialCommentsState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setCommentsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(setCommentsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.comments = action.payload;
      })
      .addCase(setCommentsAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectComments = (state: RootState) => state.comments

export default commentsSlice.reducer
