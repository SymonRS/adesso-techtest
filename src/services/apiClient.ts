import { ApiError } from '../types/user';

const BASE_URL = 'https://dummyjson.com';

class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = BASE_URL) {
    this.baseURL = baseURL;
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({
        message: `HTTP Error: ${response.status} ${response.statusText}`
      }));
      
      const error: ApiError = {
        message: errorData.message || `Request failed with status ${response.status}`,
        status: response.status
      };
      
      throw error;
    }

    return response.json();
  }

  async get<T>(endpoint: string, params?: Record<string, string | number>): Promise<T> {
    const url = new URL(`${this.baseURL}${endpoint}`);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      if (error instanceof Error) {
        throw {
          message: error.message,
          status: 0
        } as ApiError;
      }
      throw error;
    }
  }


}

export const apiClient = new ApiClient();
export default apiClient;