export type TError = {
  status: number;
  data: {
    success: boolean;
    message: string;
    stack: string;
  };
};

export type TResponse = {
  data?: any;
  error?: TError;
};
