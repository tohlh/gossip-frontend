import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import postsReducer from "./postsSlice";
import postReducer from "./postSlice";
import tagsReducer from "./tagSlice";
import userReducer from "./userSlice";
import currentUserReducer from "./currentUserSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    post: postReducer,
    tags: tagsReducer,
    user: userReducer,
    currentUser: currentUserReducer,
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
