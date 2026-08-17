import { createSlice } from "@reduxjs/toolkit";
import { loginEmployee, currentEmployee } from "./AuthActions";

export interface Employee {
    _id: string;
    name: string;
    email: string;
    role: string;
    [key: string]: unknown; // allow any extra fields from the API
}

interface AuthState {
    employee: Employee | null;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    employee: null,
    isLoading: false,
    error: null,
};

const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        addEmployee: (state, action) => {
            state.employee = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        removeEmployee: (state) => {
            state.employee = null;
            state.isLoading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginEmployee.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(loginEmployee.fulfilled, (state, action) => {
                state.isLoading = false;
                state.employee = action.payload;
                state.error = null;
            })
            .addCase(loginEmployee.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            })
            .addCase(currentEmployee.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(currentEmployee.fulfilled, (state, action) => {
                state.isLoading = false;
                state.employee = action.payload;
                state.error = null;
            })
            .addCase(currentEmployee.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string;
            });
    },
});

export const { addEmployee, removeEmployee } = AuthSlice.actions;
export default AuthSlice.reducer;