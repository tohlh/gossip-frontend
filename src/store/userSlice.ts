import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCurrentUser } from '../api/user';
import { RootState } from '.';

export interface UserState {
  currentUser: {
    name: String;
    username: String;
  };
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
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
    return response.data;
  }
);

export const userSlice = createSlice({
  name: "user",
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
      });
  },
});

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer