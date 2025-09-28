import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { userService } from '../services/userService';
import { UsersResponse, UserSearchParams, UserFilters } from '../types/user';

export const userQueryKeys = {
  all: ['users'] as const,
  list: (params: UserSearchParams) => [...userQueryKeys.all, 'list', params] as const,
  filtered: (filters: UserFilters, params: UserSearchParams) => 
    [...userQueryKeys.all, 'filtered', filters, params] as const,
  detail: (id: number) => [...userQueryKeys.all, 'detail', id] as const,
};

export function useUsers(
  params: UserSearchParams = { limit: 30, skip: 0 }
): UseQueryResult<UsersResponse, Error> {
  return useQuery({
    queryKey: userQueryKeys.list(params),
    queryFn: () => userService.getUsers(params),
  });
}
export function useFilteredUsers(
  filters: UserFilters,
  params: UserSearchParams = { limit: 30, skip: 0 }
): UseQueryResult<UsersResponse, Error> {
  return useQuery({
    queryKey: userQueryKeys.filtered(filters, params),
    queryFn: () => userService.getFilteredUsers(filters, params),
    enabled: Object.values(filters).some(value => value && value !== ''),
  });
}