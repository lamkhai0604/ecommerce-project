import { PayloadAction } from '@reduxjs/toolkit';
import userApi from 'controllers/api/userApi';
import { ListResponse } from 'models';
import { IUser } from 'models/types/user';
import { call, delay, fork, put, take } from 'redux-saga/effects';
import { authActions, LoginPayload } from './authSlice';

function* handleLogin(payload: LoginPayload) {
  try {
    const res: ListResponse<IUser> = yield call(userApi.getUserList, {
      _page: 1,
      _limit: 10,
    });
    let newArr = res.data.filter((user) => user.email === payload.email && user.password === payload.password);
    let user = {
      id: newArr[0].id,
      email: newArr[0].email,
      firstName: newArr[0].firstName,
      lastName: newArr[0].lastName,
      phone: newArr[0].phone,
      password: newArr[0].password,
      createdAt: newArr[0].createdAt,
      updatedAt: newArr[0].updatedAt,
    };

    localStorage.setItem('access_token', user.id);
    yield put(authActions.loginSuccess(user))
    //redirect to admin page
  } catch (err) {
    console.log("failed")
    yield put(authActions.loginFailed('Failed to login'));
  }
}

function* handleLogout() {
  yield delay(1000);
  localStorage.removeItem('access_token');
  //redirect back to login page
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));
    if (!isLoggedIn) {
      const action: PayloadAction<LoginPayload> = yield take(authActions.login.type);
      yield fork(handleLogin, action.payload);
    }

    yield take(authActions.logout.type);
    yield call(handleLogout);
  }
}

export default function* authSaga() {
  yield fork(watchLoginFlow);
}
