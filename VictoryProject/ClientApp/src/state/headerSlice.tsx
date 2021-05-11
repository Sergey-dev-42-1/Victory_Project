import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const headerSlice = createSlice({
    name: "header",
    initialState: {
        hide: false,
    },
    reducers: {
        hide: (state,action:PayloadAction<boolean>) => {
            state.hide = action.payload;
        },
    },
});

export const { hide } = headerSlice.actions;

export const selectHeaderHide= (state: any) => state.header.hide;
export default headerSlice.reducer;
