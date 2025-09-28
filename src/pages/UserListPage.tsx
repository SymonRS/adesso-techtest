import { useState, useMemo } from 'react';
import { useUsers, useFilteredUsers } from '../hooks/useUsers';
import { useUserFilters } from '../hooks/useUserFilters';
import { UserCard } from '../components/UserCard';
import { UserFilters } from '../components/UserFilters';
import { Pagination } from '../components/Pagination';
import { Layout } from '../components/Layout';
import { Loader2, AlertCircle, Users } from 'lucide-react';

const USERS_PER_PAGE = 12;

function UserListPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const {
    filters,
    debouncedFilters,
    updateFilter,
    clearFilters,
    hasActiveFilters,
    activeFilterCount,
  } = useUserFilters();

  // Calculate pagination parameters
  const skip = (currentPage - 1) * USERS_PER_PAGE;
  const paginationParams = { limit: USERS_PER_PAGE, skip };

  const {
    data: filteredData,
    isLoading: isFilteredLoading,
    error: filteredError,
  } = useFilteredUsers(debouncedFilters, paginationParams);

  const {
    data: regularData,
    isLoading: isRegularLoading,
    error: regularError,
  } = useUsers(paginationParams);

  const data = hasActiveFilters ? filteredData : regularData;
  const isLoading = hasActiveFilters ? isFilteredLoading : isRegularLoading;
  const error = hasActiveFilters ? filteredError : regularError;

  const handleFilterChange = <K extends keyof typeof filters>(
    key: K,
    value: typeof filters[K]
  ) => {
    updateFilter(key, value);
    setCurrentPage(1);
  };

  const handleClearFilters = () => {
    clearFilters();
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center mb-4">
            <Users className="w-12 h-12 text-indigo-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">User Directory</h1>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse and search through our user database. Use the filters below to find specific users by email, gender, or role.
          </p>
        </div>

        <UserFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          hasActiveFilters={hasActiveFilters}
          activeFilterCount={activeFilterCount}
        />

        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mr-3" />
            <span className="text-lg text-gray-600">Loading users...</span>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-center">
              <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
              <div>
                <h3 className="text-lg font-semibold text-red-800">Error Loading Users</h3>
                <p className="text-red-700 mt-1">
                  {error.message || 'An unexpected error occurred while loading users.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {data && !isLoading && (
          <>
            {data.users.length === 0 ? (
              <div className="text-center py-12">
                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Users Found</h3>
                <p className="text-gray-600 mb-4">
                  {hasActiveFilters
                    ? 'No users match your current filters. Try adjusting your search criteria.'
                    : 'No users are available at the moment.'}
                </p>
                {hasActiveFilters && (
                  <button
                    onClick={handleClearFilters}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="flex justify-end mb-4">
                  <div className="text-sm text-gray-500">
                    Page {currentPage} of {Math.ceil(data.total / USERS_PER_PAGE)}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {data.users.map((user) => (
                    <UserCard key={user.id} user={user} />
                  ))}
                </div>

                {data && Math.ceil(data.total / USERS_PER_PAGE) > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    total={data.total}
                    limit={USERS_PER_PAGE}
                    onPageChange={handlePageChange}
                  />
                )}
              </>
            )}
          </>
        )}
      </div>
    </Layout>
  );
}

export default UserListPage;