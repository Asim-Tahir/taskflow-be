export interface ResponseBodyFail {
  success: false;
  errors: string[];
}

export interface ResponseBodySuccess<T = unknown> {
  success: true;
  data: T;
  message?: string;
}

export interface ResponseBodyPaginatedSuccess<T = unknown> {
  success: true;
  data: T[];
  page: number;
  limit: number;
  total: number;
  message?: string;
}

export type ResponseBody<T = unknown> = ResponseBodySuccess<T> | ResponseBodyFail;
export type ResponseBodyPaginated<T = unknown> = ResponseBodyPaginatedSuccess<T> | ResponseBodyFail;
