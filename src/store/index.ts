import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import postsReducer from "./postSlice";
import tagsReducer from "./tagSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    tags: tagsReducer
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
