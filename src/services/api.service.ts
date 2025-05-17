import { AxiosResponse, AxiosError } from 'axios';
import axios from '@config/axios.config';

class APIService {
  baseURL = axios.getUri();

  async get<T>(endpoint: string, params: unknown = {}): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.get(`/${endpoint}`, { params });
      return response.data;
    } catch (error) {
      throw new Error(`GET request to ${this.baseURL}/${endpoint} failed: ${(error as AxiosError).message}`);
    }
  }

  async post<T>(endpoint: string, data: Partial<T> = {}): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.post(`${endpoint}`, data);
      return response.data;
    } catch (error) {
      throw new Error(`POST request to ${this.baseURL}/${endpoint} failed: ${(error as AxiosError).message}`);
    }
  }

  async post2<T, U>(endpoint: string, data: Partial<T> = {}): Promise<U> {
    try {
      const response: AxiosResponse<U> = await axios.post(`${endpoint}`, data);
      return response.data;
    } catch (error) {
      throw new Error(`POST request to ${this.baseURL}/${endpoint} failed: ${(error as AxiosError).message}`);
    }
  }


  async put<T>(endpoint: string, data: Partial<T> = {}): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.put(`/${endpoint}`, data);
      return response.data;
    } catch (error) {
      throw new Error(`PUT request to ${this.baseURL}/${endpoint} failed: ${(error as AxiosError).message}`);
    }
  }

  async delete(endpoint: string): Promise<void> {
    try {
      await axios.delete(`/${endpoint}`);
    } catch (error) {
      throw new Error(`DELETE request to ${this.baseURL}/${endpoint} failed: ${(error as AxiosError).message}`);
    }
  }
}

export const apiService = new APIService();
