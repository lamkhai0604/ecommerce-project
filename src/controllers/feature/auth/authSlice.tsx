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
    currentuser?: IUser;
}

const initialState: AuthState = {
    isLoggedIn: false,
    logging: false,
    currentuser: undefined,
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
            state.currentuser = action.payload
        },
        loginFailed(state, action: PayloadAction<string>) {
            state.logging = false;
        },

        logout(state) {
            state.isLoggedIn = false;
            state.currentuser = undefined;
        },
    }
})

//Actions
export const authActions = authSlice.actions;

//Selectors
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsLogging = (state: RootState) => state.auth.logging;

//Reducers
const authReducers = authSlice.reducer;
export default authReducers;