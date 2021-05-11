import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: "theme",
    initialState: {
        dark: false,
    },
    reducers: {
        dark: (state) => {
            console.log("theme changed")
            state.dark = !state.dark;
        },
    },
});

export const { dark } = themeSlice.actions;

export const selectDarkTheme = (state: any) => state.theme.dark;

export default themeSlice.reducer;
