import { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';
import { localStorageService } from '@services/local-storage.service';
import { StorageKeys } from '@utils/index';
import { getApiError } from './api.error';

export interface AxiosBaseQueryArgs {
  url: string;
  method?: AxiosRequestConfig['method'];
  body?: unknown;
  params?: unknown;
}

export interface AxiosBaseQueryError {
  status?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
}

export const axiosBaseQuery: BaseQueryFn<
  AxiosBaseQueryArgs,
  unknown,
  AxiosBaseQueryError
> = async ({ url, method = 'GET', body, params }: AxiosBaseQueryArgs) => {
  try {
    const result = await axios({
      url: import.meta.env.VITE_REACT_APP_BASE_URL + url,
      method,
      data: body,
      params,
      headers: {
        Authorization: localStorageService.getItem<string>(StorageKeys.TOKEN)
          ? `Bearer ${localStorageService.getItem<string>(StorageKeys.TOKEN)}`
          : '',
        'Content-Type': 'application/json',
      },
    });

    return { data: result.data };
  } catch (error) {
    const axiosError = error as AxiosError;
    const status = axiosError.response?.status;
    const errorResponse = axiosError.response?.data as AxiosBaseQueryError;
    const errorMessage = getApiError({ data: errorResponse });

    // Handle unauthorized access (401)
    if (status === 401) {
      localStorageService.removeItem(StorageKeys.TOKEN); // Remove token from storage
      window.location.href = '/sign-in'; // Redirect to login page
    }

    return {
      error: {
        status,
        data: errorResponse,
        message: errorMessage,
      },
    };
  }
};
