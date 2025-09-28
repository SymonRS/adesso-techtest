import { ReactNode } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Users, ArrowLeft } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  isDetail?: boolean;
}

export function Layout({ children, isDetail = false }: LayoutProps) {

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              {isDetail && (
                <Link
                  to="/users"
                  className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors duration-200"
                >
                  <ArrowLeft className="w-5 h-5 mr-1" />
                  Back to Users
                </Link>
              )}
              {!isDetail && (
                <Link to="/" className="flex items-center space-x-2">
                  <Users className="w-8 h-8 text-indigo-600" />
                  <h1 className="text-xl font-bold text-gray-900">User Management</h1>
                </Link>
              )}
            </div>

            <nav className="flex items-center space-x-4">
              <NavLink
                to="/users"
                end
                className={({ isActive }) =>
                  `inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                    isActive
                      ? 'text-indigo-600 bg-indigo-50'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`
                }
              >
                <Users className="w-4 h-4 mr-1" />
                Users
              </NavLink>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              © 2024.
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>Powered by tanta pazienza</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}