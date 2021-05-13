import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice";
import headerReducer from "./headerSlice";
import themeReducer from "./themeSlice";
import contestReducer from "./contestSlice";
const Store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    header: headerReducer,
    theme: themeReducer,
    contest: contestReducer
  },
});
export default Store;

export type RootState = ReturnType<typeof Store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof Store.dispatch
