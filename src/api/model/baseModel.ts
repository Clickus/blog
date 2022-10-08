export interface BasicPageParams {
  page: number;
  pageSize: number;
}

export interface BasicFetchResult<T> {
  data: T[];
  totalCount: number;
}

export interface BasicData<T> {
  code: number;
  msg: string;
  data: T;
}
