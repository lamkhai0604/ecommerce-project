export interface PaginationParams {
  _limit?: number;
  _page?: number;
  _totalRows?: number;
}

export interface ListResponse<T> {
  data: T[];
  paginations: PaginationParams;
}

export interface IApiResponse<T> {
  success: boolean;
  data: T | null;
}
export interface ListParams {
  _limit?: number;
  _page?: number;
  _sort?: string;
  _order?: 'asc' | 'desc';
  [key: string]: any;
}

