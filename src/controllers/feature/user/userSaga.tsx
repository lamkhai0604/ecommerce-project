import { PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'models/types/user';
import { call, put, takeLatest } from 'redux-saga/effects';
import { userActions } from './userSlice';
import { IApiResponse, ListResponse } from 'models';
import userApi from 'controllers/api/userApi';

function* fetchUserListApi(action: PayloadAction<number>) {
    try {
        const res: ListResponse<IUser> = yield call(userApi.getUserList, {
            _page: 1,
            _limit: action.payload,
          })
          yield put(userActions.fetchUserListSuccess(res.data));
    } catch (err) {
        console.log(err);
    }
}

function* fetchUserInfoByIdApi(action: PayloadAction<string>) {
    try {
        const res: IApiResponse<IUser> = yield call(userApi.getUserInfoById, action.payload);
        yield put(userActions.fetchUserByIdSuccess(res.data as IUser));
    } catch (err) {}
}

export default function* productSaga() {
    yield takeLatest(userActions.fetchUserList.type, fetchUserListApi);
    yield takeLatest(userActions.fetchUserById.type, fetchUserInfoByIdApi);
  }