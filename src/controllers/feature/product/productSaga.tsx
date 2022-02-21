import { PayloadAction } from '@reduxjs/toolkit';
import productsApi from 'controllers/api/productList';
import { IProductItem, ListResponse } from 'models';
import { call, put, takeLatest } from 'redux-saga/effects';
import { productActions } from './productSlice';

function* fetchProductsListApi(action: PayloadAction<number>) {
  try {
    const res: ListResponse<IProductItem> = yield call(productsApi.getProductsList, {
      _page: 1,
      _limit: action.payload,
    });
    yield put(productActions.fetchProductsListSuccess(res.data));
  } catch (err) {
    yield put(productActions.fetchProductsListFailure());
  }
}

function* fetchRecommendProductsListApi(action: PayloadAction<number>) {
  try {
    const res: ListResponse<IProductItem> = yield call(productsApi.getProductsList, {
      _page: 1,
      _limit: action.payload,
    });
    yield put(productActions.fetchProductsListSuccess(res.data));
  } catch (err) {
    yield put(productActions.fetchProductsListFailure());
  }
}

export default function* productSaga() {
  yield takeLatest(productActions.fetchProductsList.type, fetchProductsListApi);
}
