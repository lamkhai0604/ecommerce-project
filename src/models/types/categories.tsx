import { IProductItem } from "./products";

export interface ICategory {
    id?: string;
    name?: string;
    productGroup?: IProductItem[];
}

export interface ICategoryItem {
    item: ICategory;
    isLoading: boolean;
    isLoaded: boolean;
    errorMsg: string;
}

export interface ICategoriesState {
    categoryItem: ICategoryItem;
}