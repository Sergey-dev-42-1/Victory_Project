import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice";
import headerReducer from "./headerSlice";
import themeReducer from "./themeSlice";
const Store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    header: headerReducer,
    theme: themeReducer,
  },
});
export default Store;
