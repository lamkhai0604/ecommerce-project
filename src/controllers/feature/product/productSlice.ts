import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from 'controllers/app/store'
import { IProductItem, IProductState } from 'models';

//State
const initialState: IProductState = {
    isLoading: false,
    isLoaded: false,
    items: [],
    errorMsg: ''
}

//Slice
const productsSlice = createSlice({
    name: 'Product',
    initialState: initialState,
    reducers: {
        fetchProductsList(state, action: PayloadAction<number>) {
            state.isLoading = true;
            state.isLoaded = false;
            state.items = [];
        },
        fetchProductsListSuccess(state, action: PayloadAction<IProductItem[]>) {
            state.isLoading = false;
            state.isLoaded = true;
            state.items = action.payload;
        },
        fetchProductsListFailure(state) {
            state.isLoading = true;
            state.isLoaded = false;
            state.items = [];
            state.errorMsg = "Data not found, please try again.";
        },
        fetchRecommendedProductsList(state, action: PayloadAction<number>) {
            state.isLoading = true;
            state.isLoaded = false;
            state.items = [];
        },
        fetchRecommendedProductsListSuccess(state, action: PayloadAction<IProductItem[]>) {
            state.isLoading = false;
            state.isLoaded = true;
            state.items = action.payload;
        },
        fetchRecommendedProductsListFailure(state) {
            state.isLoading = true;
            state.isLoaded = false;
            state.items = [];
            state.errorMsg = "Data not found, please try again.";
        },
    }
})

//Actions
export const productActions = productsSlice.actions

//Selectors
export const getProductsList = (state: RootState) => state.products.items;
export const getProductsListLoading = (state: RootState) => state.products.isLoading;

export const getReccomendProductsList = (state: RootState) => state.products.items;
export const getReccomendProductsListLoading = (state: RootState) => state.products.isLoading;

//Reducer
export const productsReducer = productsSlice.reducer