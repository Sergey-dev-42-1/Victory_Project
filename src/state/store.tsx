import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice";
export type RootState = {
  open: boolean;
};
const Store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
  },
});
export default Store;
