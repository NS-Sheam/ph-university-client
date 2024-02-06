import { BaseQueryApi } from "@reduxjs/toolkit/query";
import React from "react";

export type TError = {
  status: number;
  data: {
    success: boolean;
    message: string;
    stack: string;
  };
};

export type TMeta = {
  limit: number;
  page: number;
  total: number;
  totalPages: number;
};

export type TResponse<T> = {
  success: boolean;
  message: string;
  data?: T;
  error?: TError;
  meta?: TMeta;
};
export type TResponseRedux<T> = TResponse<T> & BaseQueryApi;
export type TQueryParams = {
  name: string;
  value: boolean | React.Key;
};
