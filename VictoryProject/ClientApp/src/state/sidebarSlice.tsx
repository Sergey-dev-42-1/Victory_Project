import { createSlice } from "@reduxjs/toolkit";



const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    open: false,
  },
  reducers: {
    toggle: (state) => {
      state.open = state.open ? false : true;
      console.log(state.open);
    },
  },
});

export const { toggle } = sidebarSlice.actions;

export const selectSidebarOpen = (state: any) => state.sidebar.open;
export default sidebarSlice.reducer;
