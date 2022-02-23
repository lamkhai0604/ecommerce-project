import { PayloadAction } from '@reduxjs/toolkit';
import productsApi from 'controllers/api/productApi';
import { IApiResponse, IProductItem, ListResponse } from 'models';
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
    const res: ListResponse<IProductItem> = yield call(productsApi.getRecommendProductsList, {
      _page: 1,
      _limit: action.payload,
    });
    yield put(productActions.fetchRecommendProductsListSuccess(res.data));
  } catch (err) {
    yield put(productActions.fetchRecommendProductsListFailure());
  }
}

function* fetchProductByIdApi(action: PayloadAction<string>) {
  try {
    const res: IApiResponse<IProductItem> = yield call(productsApi.getProductById, action.payload);
    yield put(productActions.fetchProductByIdSuccess(res as IProductItem))
  } catch (err) {
    yield put(productActions.fetchProductByIdFailure());
  }
}

export default function* productSaga() {
  yield takeLatest(productActions.fetchProductsList.type, fetchProductsListApi);
  yield takeLatest(productActions.fetchRecommendProductsList.type, fetchRecommendProductsListApi);
  yield takeLatest(productActions.fetchProductById.type, fetchProductByIdApi);
}
