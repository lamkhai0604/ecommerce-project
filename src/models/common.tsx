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

export interface IId<T = string>{
  id: T;
}

export interface IName<T = string>{
  name: T;
}

export interface ICode<T = string>{
  code: T;
}

export interface IIdName<T = string, N = string> extends IId<T>, IName<N>{}

export interface IIdCodeName<I = string, C = string, N = string>
  extends IId<I>, ICode<C>, IName<N>{}

export interface ICodeName<C = string, N = string> extends ICode<C>, IName<N>{}
