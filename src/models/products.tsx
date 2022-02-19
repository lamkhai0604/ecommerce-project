export interface IProductItem {
    categoryId: string;
    id: string;
    name: string;
    price: number;
    description: string;
    imgUrl: string;
    color: string;
    createdAt: number;
    updatedAt: number;
}

export interface IProductList {
    item: IProductItem[]
}