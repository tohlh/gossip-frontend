import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCurrentUser } from '../api/user';
import { RootState } from '.';

export interface CurrentUserState {
  currentUser: {
    name: string;
    username: string;
  };
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CurrentUserState = {
  currentUser: {
    name: "",
    username: "",
  },
  status: "idle",
}

export const setCurrentUserAsync = createAsyncThunk(
  'user/getCurrentUser',
  async () => {
    const response = await getCurrentUser();
    return response ? response.data : null;
  }
);

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setCurrentUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(setCurrentUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.currentUser = action.payload;
      })
      .addCase(setCurrentUserAsync.rejected, (state) => {
        state.status = 'failed';
      })
  },
});

export const selectCurrentUser = (state: RootState) => state.currentUser

export default currentUserSlice.reducer
