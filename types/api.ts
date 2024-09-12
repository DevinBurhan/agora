export interface Result<T = any> {
  statusCode: number;
  message: string;
  data?: T;
  error: boolean;
}
