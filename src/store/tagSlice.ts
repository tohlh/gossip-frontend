import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { tag, getTags } from '../api/tag';
import { RootState } from '.';

export interface tagsState {
  tags: tag[],
  status: "idle" | "loading" | "failed";
}

const initialState: tagsState = {
  tags: [],
  status: "idle"
}

export const setTagsAsync = createAsyncThunk(
  'post/getTags',
  async () => {
    const response = await getTags();
    return response ? response.data : null;
  }
);

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setTagsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(setTagsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.tags = action.payload;
      })
      .addCase(setTagsAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectTags = (state: RootState) => state.tags

export default tagsSlice.reducer