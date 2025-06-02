import { BaseQueryFn } from '@reduxjs/toolkit/query/react';
import axios, { AxiosRequestConfig, AxiosError, AxiosResponse, Method } from 'axios';

import { localStorageService } from '@services/local-storage.service';
import { StorageKeys } from '@utils/index';
import { TestFlowRoutes } from './endpoint.constant';

export interface SerializedApiError {
  message: string;
  status: number;
  data?: unknown;
  isCritical?: boolean;
  isUnauthorized?: boolean;
}

interface TestRunnerBaseQueryArgs {
  url: string;
  method?: Method;
  body?: unknown;
  params?: unknown;
  includeSessionId?: boolean; // default: true
  headers?: Record<string, string>;
  timeout?: number;
}

const TEST_RUNNER_API_BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL as string;
const DEFAULT_TIMEOUT = 30000;
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000;

const getDefaultHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'X-Test-Mode': 'strict',
  };

  const token = localStorageService.getItem<string>(StorageKeys.TOKEN);
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

const shouldRetryRequest = (error: AxiosError): boolean => {
  if (!error.response) return true;
  const status = error.response.status;
  return status >= 500 && status <= 599;
};

const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

export const testRunnerBaseQuery: BaseQueryFn<TestRunnerBaseQueryArgs, unknown, SerializedApiError> = async (args) => {
  const {
    url,
    method = 'GET',
    body,
    params,
    headers: customHeaders = {},
    timeout = DEFAULT_TIMEOUT,
  } = args;

  let retryCount = 0;
  let lastError: AxiosError | null = null;

  while (retryCount <= MAX_RETRIES) {
    try {
      const config: AxiosRequestConfig = {
        url: `${TEST_RUNNER_API_BASE_URL}${url}`,
        method,
        data: body,
        params,
        headers: {
          ...getDefaultHeaders(),
          ...customHeaders,
        },
        timeout,
        withCredentials: true,
      };

      const response: AxiosResponse = await axios(config);
      return { data: response.data };
    } catch (err) {
      const error = err as AxiosError;
      lastError = error;

      if (!shouldRetryRequest(error) || retryCount >= MAX_RETRIES) {
        break;
      }

      retryCount++;
      await delay(RETRY_DELAY * retryCount);
    }
  }

  const status = lastError?.response?.status ?? 500;
  const errorData = lastError?.response?.data;

  // Handle special redirect cases with plain SerializedApiError
  if (status === 403 && (errorData as any)?.code === 'TEST_SUSPENDED') {
    window.location.href = TestFlowRoutes.ERROR_FORBIDDEN;
    return {
      error: {
        message: 'Redirecting to suspension page.',
        status,
      },
    };
  }

  if (status === 401) {
    localStorageService.removeItem(StorageKeys.TOKEN);
    window.location.href = TestFlowRoutes.ERROR_ACCESS_DENIED;
    return {
      error: {
        message: 'Authentication required',
        status,
        isUnauthorized: true,
      },
    };
  }

  return {
    error: {
      message: (errorData as Error)?.message || 'Unknown error occurred',
      status,
      data: errorData,
      isCritical: status === 423,
      isUnauthorized: status === 401,
    },
  };
};
