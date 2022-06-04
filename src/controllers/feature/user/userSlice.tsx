import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "controllers/app/store";
import { IUser, IUserState } from "models/types/user";

//State
const initialState: IUserState = {
    user: {
        isLoading: false,
        isLoaded: false,
        item: {
            id: "",
            firstName: "",
            lastName: "",
            phone: "",
            email: "",
            password: "",
            createdAt: "",
            updatedAt: "",
        },
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
        fetchUserList(state, action: PayloadAction<number>) {
            state.userList.items = [];
            state.userList.isLoading = true;
            state.userList.isLoaded = false;
        },
        fetchUserListSuccess(state, action: PayloadAction<IUser[]>) {
            state.userList.items = action.payload;
            state.userList.isLoading = false;
            state.userList.isLoaded = true;
        },

        fetchUserById(state, action: PayloadAction<string>) {
            state.user.isLoading = true;
            state.user.isLoaded = false;
            state.user.item = {
                id: "",
                firstName: "",
                lastName: "",
                phone: "",
                email: "",
                password: "",
                createdAt: "",
                updatedAt: "",
            };
        },
        fetchUserByIdSuccess(state, action: PayloadAction<IUser>) {
            state.user.isLoading = false;
            state.user.isLoaded = true;
            state.user.item = action.payload;
        },
    }
})

//Actions
export const userActions = userSlice.actions

//Selectors
export const getUserList = (state: RootState) => state.user.userList.items;
export const getUserListLoading = (state: RootState) => state.user.userList.isLoading

export const getUserInfoById = (state: RootState) => state.user.user.item;
export const getUserInfoByIdIsLoading = (state: RootState) => state.user.user.isLoading;

//Reducers
export const userReducers = userSlice.reducer