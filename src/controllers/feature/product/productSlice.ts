import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from 'controllers/app/store'
import { ICartItem, IProductItem, IProductState } from 'models';

//State
const initialState: IProductState = {
    productList: {
        isLoading: false,
        isLoaded: false,
        items: [],
        errorMsg: ''
    },
    recommendProductList: {
        isLoading: false,
        isLoaded: false,
        items: [],
        errorMsg: ''

    },
    productItem: {
        isLoading: false,
        isLoaded: false,
        item: {},
        errorMsg: ''
    },
    cartItems: [],
    totalAmount: 0
}

//Slice
const productsSlice = createSlice({
    name: 'Product',
    initialState: initialState,
    reducers: {
        fetchProductsList(state, action: PayloadAction<number>) {
            state.productList.isLoading = true;
            state.productList.isLoaded = false;
            state.productList.items = [];
        },
        fetchProductsListSuccess(state, action: PayloadAction<IProductItem[]>) {
            state.productList.isLoading = false;
            state.productList.isLoaded = true;
            state.productList.items = action.payload;
        },
        fetchProductsListFailure(state, action: PayloadAction<string>) {
            state.productList.isLoading = true;
            state.productList.isLoaded = false;
            state.productList.items = [];
            state.productList.errorMsg = action.payload;
        },

        fetchRecommendProductsList(state, action: PayloadAction<number>) {
            state.recommendProductList.isLoading = true;
            state.recommendProductList.isLoaded = false;
            state.recommendProductList.items = [];
        },
        fetchRecommendProductsListSuccess(state, action: PayloadAction<IProductItem[]>) {
            state.recommendProductList.isLoading = false;
            state.recommendProductList.isLoaded = true;
            state.recommendProductList.items = action.payload;
        },
        fetchRecommendProductsListFailure(state) {
            state.recommendProductList.isLoading = true;
            state.recommendProductList.isLoaded = false;
            state.recommendProductList.items = [];
            state.recommendProductList.errorMsg = "Data not found, please try again.";
        },

        fetchProductById(state, action: PayloadAction<string>) {
            state.productItem.isLoading = true;
            state.productItem.isLoaded = false;
            state.productItem.item = {};
        },
        fetchProductByIdSuccess(state, action: PayloadAction<IProductItem>) {
            state.productItem.isLoading = false;
            state.productItem.isLoaded = true;
            state.productItem.item = action.payload;
        },
        fetchProductByIdFailure(state, action: PayloadAction) {
            state.productItem.isLoading = true;
            state.productItem.isLoaded = false;
            state.productItem.item = {};
            state.productItem.errorMsg = "Product not found"
        },

        addItemIntoCart(state, action: PayloadAction<ICartItem>) {
            let updatedTotalAmount = state.totalAmount + action.payload.price * action.payload.amount;
            let existingCartItemIndex = state.cartItems.findIndex(c => c.id === action.payload.id)

            let existingCartItem = state.cartItems[existingCartItemIndex]

            let updatedItems;

            if (existingCartItem) {

                let updatedItem;
                updatedItem = {
                    ...existingCartItem,
                    amount: existingCartItem.amount + action.payload.amount
                }
                updatedItems = [...state.cartItems];
                updatedItems[existingCartItemIndex] = updatedItem;
            } else {

                updatedItems = state.cartItems.concat(action.payload)
            }
            state.cartItems = updatedItems;
            state.totalAmount = updatedTotalAmount;
        },
        removeItemCart(state, action: PayloadAction<string>) {
            let existingCartItemIndex = state.cartItems.findIndex(item => item.id === action.payload)
            let existingItem = state.cartItems[existingCartItemIndex];

            let updatedTotalAmount = state.totalAmount - existingItem.price;

            let updatedItems;
            if (existingItem.amount === 1) {
                updatedItems = state.cartItems.filter(item => item.id === action.payload)
            } else {
                let updatedItem = { ...existingItem, amount: existingItem.amount - 1 }
                updatedItems = [...state.cartItems]
                updatedItems[existingCartItemIndex] = updatedItem;
            }
            state.cartItems = updatedItems;
            state.totalAmount = updatedTotalAmount;
        },
        deleteItemCart(state, action: PayloadAction<ICartItem[]>) {
            let updatedTotalAmount = 0;
            action.payload.forEach((v) => {
                updatedTotalAmount += v.amount * v.price
            })
            state.cartItems = action.payload;
            state.totalAmount = updatedTotalAmount;
        }
    }
})

//Actions
export const productActions = productsSlice.actions

//Selectors
export const getProductsList = (state: RootState) => state.products.productList.items;
export const getProductsListLoading = (state: RootState) => state.products.productList.isLoading;

export const getRecommendProductsList = (state: RootState) => state.products.recommendProductList.items;
export const getRecommendProductsListLoading = (state: RootState) => state.products.recommendProductList.isLoading;

export const getProductById = (state: RootState) => state.products.productItem.item;
export const getProductByIdLoading = (state: RootState) => state.products.productItem.isLoading

export const getTotalAmount = (state: RootState) => state.products.totalAmount;
export const getCartItems = (state: RootState) => state.products.cartItems;
//Reducer
export const productsReducer = productsSlice.reducer