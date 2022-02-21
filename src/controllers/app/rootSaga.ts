// import authSaga from "features/auth/authSaga";
import productSaga from 'controllers/feature/product/productSaga'
import { all } from 'redux-saga/effects'


export default function* rootSaga() {
    yield all([
        // authSaga(),
        productSaga()
    ])
}
