import { UserFilters as UserFiltersType } from '../types/user';
import { Search, Filter, X } from 'lucide-react';

interface UserFiltersProps {
  filters: UserFiltersType;
  onFilterChange: <K extends keyof UserFiltersType>(key: K, value: UserFiltersType[K]) => void;
  onClearFilters: () => void;
  hasActiveFilters: boolean;
  activeFilterCount: number;
}

export function UserFilters({
  filters,
  onFilterChange,
  onClearFilters,
  hasActiveFilters,
  activeFilterCount,
}: UserFiltersProps) {
  // Determine which fields should be disabled
  const hasEmail = Boolean(filters.email?.trim());
  const hasGender = Boolean(filters.gender);
  const hasRole = Boolean(filters.role);
  
  const emailDisabled = hasGender || hasRole;
  const genderDisabled = hasEmail || hasRole;
  const roleDisabled = hasEmail || hasGender;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-500" />
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          {activeFilterCount > 0 && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
              {activeFilterCount} active
            </span>
          )}
        </div>
        
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            <X className="w-4 h-4 mr-1" />
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="email-filter" className={`block text-sm font-medium mb-2 ${
            emailDisabled ? 'text-gray-400' : 'text-gray-700'
          }`}>
            Search by Email
            {emailDisabled && <span className="text-xs ml-1">(disabled)</span>}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className={`h-4 w-4 ${
                emailDisabled ? 'text-gray-300' : 'text-gray-400'
              }`} />
            </div>
            <input
              type="email"
              id="email-filter"
              value={filters.email || ''}
              onChange={(e) => onFilterChange('email', e.target.value)}
              placeholder={emailDisabled ? "Clear other filters to enable" : "Enter email address"}
              disabled={emailDisabled}
              className={`block w-full pl-10 pr-3 py-2 border rounded-md leading-5 text-sm ${
                emailDisabled
                  ? 'border-gray-200 bg-gray-50 text-gray-400 placeholder-gray-300 cursor-not-allowed'
                  : 'border-gray-300 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'
              }`}
            />
          </div>
        </div>

        <div>
          <label htmlFor="gender-filter" className={`block text-sm font-medium mb-2 ${
            genderDisabled ? 'text-gray-400' : 'text-gray-700'
          }`}>
            Gender
            {genderDisabled && <span className="text-xs ml-1">(disabled)</span>}
          </label>
          <select
            id="gender-filter"
            value={filters.gender || ''}
            onChange={(e) => onFilterChange('gender', e.target.value as 'male' | 'female' | '')}
            disabled={genderDisabled}
            className={`block w-full px-3 py-2 border rounded-md leading-5 text-sm ${
              genderDisabled
                ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                : 'border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'
            }`}
          >
            <option value="">{genderDisabled ? "Clear other filters" : "All Genders"}</option>
            {!genderDisabled && (
              <>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </>
            )}
          </select>
        </div>

        <div>
          <label htmlFor="role-filter" className={`block text-sm font-medium mb-2 ${
            roleDisabled ? 'text-gray-400' : 'text-gray-700'
          }`}>
            Role
            {roleDisabled && <span className="text-xs ml-1">(disabled)</span>}
          </label>
          <select
            id="role-filter"
            value={filters.role || ''}
            onChange={(e) => onFilterChange('role', e.target.value as 'admin' | 'moderator' | 'user' | '')}
            disabled={roleDisabled}
            className={`block w-full px-3 py-2 border rounded-md leading-5 text-sm ${
              roleDisabled
                ? 'border-gray-200 bg-gray-50 text-gray-400 cursor-not-allowed'
                : 'border-gray-300 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500'
            }`}
          >
            <option value="">{roleDisabled ? "Clear other filters" : "All Roles"}</option>
            {!roleDisabled && (
              <>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
                <option value="user">User</option>
              </>
            )}
          </select>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex flex-wrap gap-2">
            {filters.email && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                Email: {filters.email}
                <button
                  onClick={() => onFilterChange('email', '')}
                  className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-600 focus:outline-none"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.gender && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Gender: {filters.gender}
                <button
                  onClick={() => onFilterChange('gender', '')}
                  className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-green-400 hover:bg-green-200 hover:text-green-600 focus:outline-none"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.role && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                Role: {filters.role}
                <button
                  onClick={() => onFilterChange('role', '')}
                  className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full text-purple-400 hover:bg-purple-200 hover:text-purple-600 focus:outline-none"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}