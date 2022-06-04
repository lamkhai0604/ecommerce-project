// import authSaga from "features/auth/authSaga";
import authSaga from 'controllers/feature/auth/authSaga'
import categoriesSaga from 'controllers/feature/categories/categoriesSaga'
import productSaga from 'controllers/feature/product/productSaga'
import userSaga from 'controllers/feature/user/userSaga'
import { all } from 'redux-saga/effects'


export default function* rootSaga() {
    yield all([
        userSaga(),
        productSaga(),
        categoriesSaga(),
        authSaga()
    ])
}
