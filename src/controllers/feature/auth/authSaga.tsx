import { PayloadAction } from '@reduxjs/toolkit';
import { call, delay, fork, put, take } from 'redux-saga/effects';
import { authActions, LoginPayload } from './authSlice';

function* handleLogin(payload: LoginPayload) {
  try {
    console.log('handleLogin', payload);
    yield delay(1000);
    localStorage.setItem('access_token', '123');
    // yield put(authActions.loginSuccess('res'))
    //redirect to admin page
  } catch (err) {
    yield put(authActions.loginFailed('Failed to login'))
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
