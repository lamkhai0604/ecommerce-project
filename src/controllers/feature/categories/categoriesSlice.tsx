import { ICategoriesState, ICategory } from "models/categories";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from "controllers/app/store";


//State
const initialState: ICategoriesState = {
    categoryItem: {
        item: {},
        isLoading: false,
        isLoaded: false,
        errorMsg: '',
    }
}

//Slice
const categorySlice = createSlice({
    name: 'categories',
    initialState: initialState,
    reducers: {
        fetchCategoryById(state, action: PayloadAction<string>) {
            state.categoryItem.isLoading = true;
            state.categoryItem.isLoaded = false;
            state.categoryItem.item = {};
        },
        fetchCategoryByIdSuccess(state, action: PayloadAction<ICategory>) {
            state.categoryItem.isLoading = true;
            state.categoryItem.isLoaded = false;
            state.categoryItem.item = action.payload;
        },
        fetchCategoryByIdFailure(state, action: PayloadAction) {
            state.categoryItem.isLoading = true;
            state.categoryItem.isLoaded = false;
            state.categoryItem.item = {};
            state.categoryItem.errorMsg = 'Data not found';
        },
    }
})
//Actions
export const categoriesActions = categorySlice.actions;

//Selectors
export const getCategoryById = (state: RootState) => state.categories.categoryItem.item;
export const getCategoryByIdIsLoading = (state: RootState) => state.categories.categoryItem.isLoading;

//Reducer
export const categoriesReducer = categorySlice.reducer;