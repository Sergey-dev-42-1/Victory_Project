import {createSlice, PayloadAction} from "@reduxjs/toolkit";



const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    show: false,
    open: false,
  },
  reducers: {
    show: (state) => {
      state.show = !state.show;
    },
    toggle: (state,action:PayloadAction<boolean>) => {
      if(action.payload){
        state.open = true;
        return
      }
      state.open = false;
    },
  },
});

export const { toggle,show } = sidebarSlice.actions;

export const selectSidebarOpen = (state: any) => state.sidebar.open;
export const selectSidebarShow = (state: any) => state.sidebar.show;
export default sidebarSlice.reducer;
