import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { Home, ArrowLeft, Search } from 'lucide-react';

function NotFoundPage() {
  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mb-8">
            <div className="text-8xl font-bold text-gray-200 mb-4">404</div>
            <div className="flex justify-center mb-4">
              <Search className="w-16 h-16 text-gray-400" />
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Page Not Found
            </h1>
            <p className="text-gray-600 leading-relaxed">
              Sorry, we couldn't find the page you're looking for. 
              The page might have been moved, deleted, or you entered the wrong URL.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center w-full px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors duration-200"
            >
              <Home className="w-5 h-5 mr-2" />
              Go to Users
            </Link>
            
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default NotFoundPage;