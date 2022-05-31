import { PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'models/types/user';
import { call, put, takeLatest } from 'redux-saga/effects';
import { userActions } from './userSlice';
import { ListResponse } from 'models';
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

function* createNewUserApi(action: PayloadAction<IUser>) {
    // try {
    //     const res
    // } catch (err) {}
}

export default function* productSaga() {
    yield takeLatest(userActions.fetchUserList.type, fetchUserListApi);
    yield takeLatest(userActions.addNewUser.type, createNewUserApi);
  }