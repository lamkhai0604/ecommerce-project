import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUserState } from "models/types/user";

//State
const initialState: IUserState = {
    user: {
        id: "",
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        password: "",
        createdAt: "",
        updatedAt: "",
    },
    list: {
        isLoading: false,
        isLoaded: false,
        items: [],
    }
}

//Slice
const userSlice = createSlice({
    name: "User",
    initialState,
    reducers: {
        addNewUser(state, action: PayloadAction<IUser>) {
            console.log("state", state);
            console.log("action", action);
            state.list.items.push(action.payload)
        }
    }
})

//Actions
export const userActions = userSlice.actions

//Selectors

//Reducers
export const userReducers = userSlice.reducer