import { localStorageService } from '@services/local-storage.service';
import { StorageKeys } from '@utils/constants/storage.constant';
import axios, { AxiosError } from 'axios';
import { ApiResponse } from 'dto/response/api-response';
import toast from 'react-hot-toast';

const axiosInstance = axios.create({ baseURL: import.meta.env.VITE_REACT_APP_BASE_URL });
//intercept request for attaching auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorageService.getItem<string>(StorageKeys.TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//intercept response to handle error
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError<ApiResponse>) => {
    // Log the full error for debugging purposes
    console.log('Axios error:', error);

    // Check if the error response exists and if it's an unauthorized error
    if (error.response?.status === 401) {
      // Redirect to login page
      // window.location.replace('/sign-in'); // Use replace to avoid adding to history
      return Promise.reject(error); // Ensure the promise is rejected
    }

    // Handle other errors and display appropriate messages
    let errorMessage = 'An unknown error occurred.';
    if (error.response) {
      errorMessage = error.response.data.message || error.response.statusText;
    } else if (error.request) {
      errorMessage = 'No response received from the server.';
    } else {
      errorMessage = error.message;
    }
    toast.error(errorMessage, { id: 'globalError' });
    return Promise.reject(error); // Ensure the promise is rejected
  }
);

export default axiosInstance;
