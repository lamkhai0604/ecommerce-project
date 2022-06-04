
export interface IUser {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    password: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IUserList {
    items: IUser[],
    isLoading: boolean;
    isLoaded: boolean;
}

export interface IUserInfo {
    item: IUser,
    isLoading: boolean;
    isLoaded: boolean;
}
export interface IUserState {
    user: IUserInfo;
    userList: IUserList;
}