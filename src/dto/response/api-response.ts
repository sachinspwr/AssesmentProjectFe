export interface ApiResponse {
  status: 'failed';
  statusCode: number;
  message: string;
  errors: null | unknown;
  stack: string;
}
