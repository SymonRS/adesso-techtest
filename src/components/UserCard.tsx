import { User } from '../types/user';
import { Mail, Phone, MapPin, Building, User as UserIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { formatPhoneNumber } from '../utils/formatters';

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border border-gray-200">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <img
            src={user.image}
            alt={`${user.firstName} ${user.lastName}`}
            className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-900 truncate">
              {user.firstName} {user.lastName}
            </h3>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              user.role === 'admin' 
                ? 'bg-red-100 text-red-800'
                : user.role === 'moderator'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-green-100 text-green-800'
            }`}>
              {user.role}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <Mail className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">{user.email}</span>
            </div>

            <div className="flex items-center text-sm text-gray-600">
              <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">{formatPhoneNumber(user.phone)}</span>
            </div>

            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">
                {user.address.city}, {user.address.state}
              </span>
            </div>

            <div className="flex items-center text-sm text-gray-600">
              <Building className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="truncate">{user.company.name}</span>
            </div>

            <div className="flex items-center text-sm text-gray-600">
              <UserIcon className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="capitalize">{user.gender}, {user.age} years old</span>
            </div>
          </div>

          <div className="mt-4">
            <Link
              to={`/users/${user.id}`}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}