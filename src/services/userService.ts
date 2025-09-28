import { apiClient } from './apiClient';
import { User, UsersResponse, UserSearchParams, UserFilters } from '../types/user';

class UserService {
  private readonly baseEndpoint = '/users';

  async getUsers(params: UserSearchParams = { limit: 30, skip: 0 }): Promise<UsersResponse> {
    const queryParams: Record<string, string | number> = {
      limit: params.limit,
      skip: params.skip,
    };

    if (params.q) {
      queryParams.q = params.q;
    }

    return apiClient.get<UsersResponse>(this.baseEndpoint, queryParams);
  }

  async getUserById(id: number): Promise<User> {
    return apiClient.get<User>(`${this.baseEndpoint}/${id}`);
  }

  async searchUsers(query: string, params: UserSearchParams = { limit: 30, skip: 0 }): Promise<UsersResponse> {
    const queryParams: Record<string, string | number> = {
      q: query,
      limit: params.limit,
      skip: params.skip,
    };

    return apiClient.get<UsersResponse>(`${this.baseEndpoint}/search`, queryParams);
  }

  async filterUsers(key: 'gender' | 'role', value: string, params: UserSearchParams = { limit: 30, skip: 0 }): Promise<UsersResponse> {
    const queryParams: Record<string, string | number> = {
      key,
      value,
      limit: params.limit,
      skip: params.skip,
    };

    return apiClient.get<UsersResponse>(`${this.baseEndpoint}/filter`, queryParams);
  }

  async getFilteredUsers(
    filters: UserFilters,
    params: UserSearchParams = { limit: 30, skip: 0 }
  ): Promise<UsersResponse> {

    if (!filters.email && !filters.gender && !filters.role) {
      return this.getUsers(params);
    }


    if (filters.email) {
      return this.searchUsers(filters.email, params);
    }


    if (filters.gender) {
      return this.filterUsers('gender', filters.gender, params);
    }


    if (filters.role) {
      return this.filterUsers('role', filters.role, params);
    }


    return this.getUsers(params);
  }
}

export const userService = new UserService();
export default userService;