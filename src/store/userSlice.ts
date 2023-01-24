import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUser } from '../api/user';
import { RootState } from '.';

export interface UserState {
  user: {
    name: string;
    username: string;
  }
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
  user: {
    name: "",
    username: "",
  },
  status: "idle",
}

export const setUserAsync = createAsyncThunk(
  'user/getUser',
  async (username: string) => {
    const response = await getUser(username);
    return response ? response.data : null;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(setUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.user = action.payload;
      })
      .addCase(setUserAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer
