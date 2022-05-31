import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "controllers/app/store";
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
    userList: {
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
        fetchUserList(state, action: PayloadAction) {
            state.userList.items = [];
            state.userList.isLoading = true;
            state.userList.isLoaded = true;
        },
        fetchUserListSuccess(state, action: PayloadAction<IUser[]>) {
            state.userList.items = action.payload;
            state.userList.isLoading = false;
            state.userList.isLoaded = true;
        },
        addNewUser(state, action: PayloadAction<IUser>) {
            state.userList.items.push(action.payload)
        }
    }
})

//Actions
export const userActions = userSlice.actions

//Selectors
export const getUserList = (state: RootState) => state.user.userList.items;
export const getUserListLoading = (state: RootState) => state.user.userList.isLoading

//Reducers
export const userReducers = userSlice.reducer