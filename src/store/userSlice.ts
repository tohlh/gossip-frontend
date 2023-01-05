import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCurrentUser, getUser } from '../api/user';
import { RootState } from '.';

export interface UserState {
  currentUser: {
    name: string;
    username: string;
  };
  user: {
    name: string;
    username: string;
  }
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
  currentUser: {
    name: "",
    username: "",
  },
  user: {
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

export const setUserAsync = createAsyncThunk(
  'user/getUser',
  async (username: string | null) => {
    const response = await getUser(username);
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
      })
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
