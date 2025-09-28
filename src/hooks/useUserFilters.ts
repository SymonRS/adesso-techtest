import { useState, useCallback, useMemo } from 'react';
import { UserFilters } from '../types/user';
import { useDebounce } from './useDebounce';

interface UseUserFiltersReturn {
  filters: UserFilters;
  debouncedFilters: UserFilters;
  setFilters: (filters: UserFilters) => void;
  updateFilter: <K extends keyof UserFilters>(key: K, value: UserFilters[K]) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
  activeFilterCount: number;
}

const initialFilters: UserFilters = {
  email: '',
  gender: '',
  role: '',
};

/**
 * Hook to manage user filters state
 */
export function useUserFilters(): UseUserFiltersReturn {
  const [filters, setFilters] = useState<UserFilters>(initialFilters);
  
  // Debounce email filter to reduce API calls
  const debouncedEmail = useDebounce(filters.email, 400);
  const debouncedFilters = useMemo(() => ({
    ...filters,
    email: debouncedEmail,
  }), [filters, debouncedEmail]);

  const updateFilter = useCallback(<K extends keyof UserFilters>(
    key: K,
    value: UserFilters[K]
  ) => {
    setFilters(prev => ({
      ...prev,
      [key]: value,
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
  }, []);

  const hasActiveFilters = useMemo(() => {
    return Object.values(debouncedFilters).some(value => value && value !== '');
  }, [debouncedFilters]);

  const activeFilterCount = useMemo(() => {
    return Object.values(debouncedFilters).filter(value => value && value !== '').length;
  }, [debouncedFilters]);

  return {
    filters,
    debouncedFilters,
    setFilters,
    updateFilter,
    clearFilters,
    hasActiveFilters,
    activeFilterCount,
  };
}

/**
 * Hook to manage user filters with URL synchronization
 */
export function useUserFiltersWithURL(): UseUserFiltersReturn {
  // Get initial filters from URL params
  const getFiltersFromURL = useCallback((): UserFilters => {
    if (typeof window === 'undefined') return initialFilters;
    
    const params = new URLSearchParams(window.location.search);
    return {
      email: params.get('email') || '',
      gender: (params.get('gender') as 'male' | 'female') || '',
      role: (params.get('role') as 'admin' | 'moderator' | 'user') || '',
    };
  }, []);

  const [filters, setFiltersState] = useState<UserFilters>(getFiltersFromURL);
  
  // Debounce email filter to reduce API calls
  const debouncedEmail = useDebounce(filters.email, 400);
  const debouncedFilters = useMemo(() => ({
    ...filters,
    email: debouncedEmail,
  }), [filters, debouncedEmail]);

  // Update URL when filters change
  const updateURL = useCallback((newFilters: UserFilters) => {
    if (typeof window === 'undefined') return;
    
    const params = new URLSearchParams();
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value !== '') {
        params.set(key, value);
      }
    });

    const newURL = params.toString() 
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    
    window.history.replaceState({}, '', newURL);
  }, []);

  const setFilters = useCallback((newFilters: UserFilters) => {
    setFiltersState(newFilters);
    updateURL(newFilters);
  }, [updateURL]);

  const updateFilter = useCallback(<K extends keyof UserFilters>(
    key: K,
    value: UserFilters[K]
  ) => {
    const newFilters = {
      ...filters,
      [key]: value,
    };
    setFilters(newFilters);
  }, [filters, setFilters]);

  const clearFilters = useCallback(() => {
    setFilters(initialFilters);
  }, [setFilters]);

  const hasActiveFilters = useMemo(() => {
    return Object.values(debouncedFilters).some(value => value && value !== '');
  }, [debouncedFilters]);

  const activeFilterCount = useMemo(() => {
    return Object.values(debouncedFilters).filter(value => value && value !== '').length;
  }, [debouncedFilters]);

  return {
    filters,
    debouncedFilters,
    setFilters,
    updateFilter,
    clearFilters,
    hasActiveFilters,
    activeFilterCount,
  };
}