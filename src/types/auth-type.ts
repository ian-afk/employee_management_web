export type LoginResponse = {
  message: string;
  status: string;
  authenticated: number;
};

export type ApiErrorResponse = {
  statusCode: number;
  message: string;
  error: string;
};
