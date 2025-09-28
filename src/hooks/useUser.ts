import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { userService } from '../services/userService';
import { User } from '../types/user';
import { userQueryKeys } from './useUsers';

export function useUser(id: number): UseQueryResult<User, Error> {
  return useQuery({
    queryKey: userQueryKeys.detail(id),
    queryFn: () => userService.getUserById(id),
    enabled: id > 0,
  });
}