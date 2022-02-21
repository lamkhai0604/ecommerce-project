export interface IProductItem {
  categoryId: string;
  id: string;
  name: string;
  price: number;
  starRating: number;
  description: string;
  imgUrl: string;
  color: string;
  createdAt: number;
  updatedAt: number;
}

export interface IProductState {
  items: IProductItem[];
  isLoading: boolean;
  isLoaded: boolean;
  errorMsg: string;
}
