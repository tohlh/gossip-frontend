import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import currentUserReducer from "./currentUserSlice";
import postsReducer from "./postsSlice";
import postReducer from "./postSlice";
import commentsReducer from "./commentsSlice";
import tagsReducer from "./tagSlice";
import userPostsReducer from "./userPostsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    userPosts: userPostsReducer,
    currentUser: currentUserReducer,
    posts: postsReducer,
    post: postReducer,
    comments: commentsReducer,
    tags: tagsReducer,
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
