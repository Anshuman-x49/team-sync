import { createSlice } from "@reduxjs/toolkit";

interface themeState {
    mode: string;
}

const initialState: themeState = {
    mode: localStorage.getItem("theme") || "dark",
}

const theme = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state: themeState) => {
            state.mode = state.mode === "light" ? "dark" : "light";
            localStorage.setItem("theme", state.mode);
        }
    }
});

export const { toggleTheme } = theme.actions;
export default theme.reducer;