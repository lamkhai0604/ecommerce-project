import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "controllers/app/store";
import { IUser } from "models/types/user";

export interface LoginPayload {
    email: string;
    password: string;
}

export interface AuthState {
    isLoggedIn: boolean;
    logging?: boolean;
    currentUser?: IUser;
    errorMessage?: string;
}

const initialState: AuthState = {
    isLoggedIn: false,
    logging: false,
    currentUser: undefined,
    errorMessage: "",
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login(state, action: PayloadAction<LoginPayload>) {
            state.logging = true
        },
        loginSuccess(state, action: PayloadAction<IUser>) {
            state.isLoggedIn = true;
            state.logging = false;
            state.currentUser = action.payload
        },
        loginFailed(state, action: PayloadAction<string>) {
            console.log("loginFailed", action.payload)
            state.logging = false;
            state.errorMessage = action.payload;
        },

        logout(state) {
            state.isLoggedIn = false;
            state.currentUser = undefined;
        },
    }
})

//Actions
export const authActions = authSlice.actions;

//Selectors
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsLogging = (state: RootState) => state.auth.logging;
export const currentUser = (state: RootState) => state.auth.currentUser;

//Reducers
const authReducers = authSlice.reducer;
export default authReducers;