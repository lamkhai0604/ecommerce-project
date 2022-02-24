export interface IProductItem {
  categoryId?: string;
  id?: string;
  name?: string;
  price?: number;
  code?: number;
  amount?: number;
  starRating?: number;
  description?: string;
  imgUrl?: string;
  color?: string;
  brand?: string;
  createdAt?: string;
  updatedAt?: number;
}

export interface ICartItem {
  id: string;
  name: string;
  amount: number;
  price: number;
  imgUrl?: string;
}

export interface IProductList {
  items: IProductItem[];
  isLoading: boolean;
  isLoaded: boolean;
  errorMsg: string;
}

export interface IRecommendProductList {
  items: IProductItem[];
  isLoading: boolean;
  isLoaded: boolean;
  errorMsg: string;
}

export interface IItem {
  item: IProductItem;
  isLoading: boolean;
  isLoaded: boolean;
  errorMsg: string;
}

export interface IProductState {
  productList: IProductList;
  productItem: IItem;
  recommendProductList: IRecommendProductList;
  cartItems: ICartItem[];
  totalAmount: number;
}
