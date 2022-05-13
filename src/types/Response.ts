export type Response<T> = ResponseSuccess<T> | ResponseError;

export type ResponseSuccess<T> = Promise<{
  data: T;
  status: number;
}>;

export type ResponseError = {};
