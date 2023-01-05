import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import postsReducer from "./postSlice";
import tagsReducer from "./tagSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    tags: tagsReducer,
    user: userReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
