import { PayloadAction } from "@reduxjs/toolkit";
import categoriesApi from "controllers/api/categoriesApi";
import { IApiResponse } from "models";
import { ICategory } from "models/categories";
import { call, put, takeLatest } from "redux-saga/effects";
import { categoriesActions } from "./categoriesSlice";

function* fetchCategoriesById(action: PayloadAction<string>) {
    try {
        const res: IApiResponse<ICategory> = yield call(categoriesApi.getCategoryById, action.payload)
        yield put(categoriesActions.fetchCategoryByIdSuccess(res as ICategory))
    } catch (err) {
        yield put(categoriesActions.fetchCategoryByIdFailure)
    }
}

export default function* categoriesSaga() {
    yield takeLatest(categoriesActions.fetchCategoryById.type, fetchCategoriesById)
}