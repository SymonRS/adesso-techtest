import { useParams } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { Layout } from '../components/Layout';
import {
  Loader2,
  AlertCircle,
  Mail,
  Phone,
  MapPin,
  Building,
  User as UserIcon,
  Calendar,
  Eye,
  Palette,
  CreditCard,
  University,
  Globe,
  Shield,
  Hash,
  Smartphone,
} from 'lucide-react';

function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const userId = id ? parseInt(id, 10) : 0;
  
  const { data: user, isLoading, error } = useUser(userId);

  if (isLoading) {
    return (
      <Layout isDetail>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-indigo-600 mr-3" />
          <span className="text-lg text-gray-600">Loading user details...</span>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout isDetail>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center">
            <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
            <div>
              <h3 className="text-lg font-semibold text-red-800">Error Loading User</h3>
              <p className="text-red-700 mt-1">
                {error.message || 'An unexpected error occurred while loading user details.'}
              </p>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout isDetail>
        <div className="text-center py-12">
          <UserIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">User Not Found</h3>
          <p className="text-gray-600">The requested user could not be found.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout isDetail>
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="flex-shrink-0">
              <img
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
                className="w-24 h-24 rounded-full object-cover border-4 border-gray-200"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {user.firstName} {user.lastName}
                </h1>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  user.role === 'admin' 
                    ? 'bg-red-100 text-red-800'
                    : user.role === 'moderator'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}>
                  {user.role}
                </span>
              </div>
              <p className="text-lg text-gray-600 mb-4">{user.company.title} at {user.company.name}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center text-gray-600">
                  <Mail className="w-5 h-5 mr-2" />
                  <span>{user.email}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Phone className="w-5 h-5 mr-2" />
                  <span>{user.phone}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <UserIcon className="w-6 h-6 mr-2" />
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Full Name</label>
              <p className="text-gray-900">{user.firstName} {user.maidenName} {user.lastName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Username</label>
              <p className="text-gray-900">{user.username}</p>
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-gray-400" />
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Birth Date</label>
                <p className="text-gray-900">{new Date(user.birthDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Age</label>
              <p className="text-gray-900">{user.age} years old</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Gender</label>
              <p className="text-gray-900 capitalize">{user.gender}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Blood Group</label>
              <p className="text-gray-900">{user.bloodGroup}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Eye className="w-6 h-6 mr-2" />
            Physical Characteristics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Height</label>
              <p className="text-gray-900">{user.height} cm</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Weight</label>
              <p className="text-gray-900">{user.weight} kg</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">Eye Color</label>
              <p className="text-gray-900 capitalize">{user.eyeColor}</p>
            </div>
            <div className="flex items-center">
              <Palette className="w-4 h-4 mr-2 text-gray-400" />
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">Hair</label>
                <p className="text-gray-900 capitalize">{user.hair.color} {user.hair.type}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <MapPin className="w-6 h-6 mr-2" />
            Contact & Address
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Address</h3>
              <div className="space-y-2">
                <p className="text-gray-900">{user.address.address}</p>
                <p className="text-gray-900">{user.address.city}, {user.address.state} {user.address.postalCode}</p>
                <p className="text-gray-900">{user.address.country}</p>
                <p className="text-sm text-gray-500">
                  Coordinates: {user.address.coordinates.lat}, {user.address.coordinates.lng}
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Network Information</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-2 text-gray-400" />
                  <div>
                    <label className="block text-sm font-medium text-gray-500">IP Address</label>
                    <p className="text-gray-900">{user.ip}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Smartphone className="w-4 h-4 mr-2 text-gray-400" />
                  <div>
                    <label className="block text-sm font-medium text-gray-500">MAC Address</label>
                    <p className="text-gray-900 font-mono text-sm">{user.macAddress}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Building className="w-6 h-6 mr-2" />
            Professional Information
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Company</h3>
              <div className="space-y-2">
                <p className="text-gray-900 font-medium">{user.company.name}</p>
                <p className="text-gray-600">{user.company.title}</p>
                <p className="text-gray-600">{user.company.department}</p>
                <div className="mt-3">
                  <label className="block text-sm font-medium text-gray-500 mb-1">Company Address</label>
                  <p className="text-gray-900">{user.company.address.address}</p>
                  <p className="text-gray-900">{user.company.address.city}, {user.company.address.state}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                <University className="w-5 h-5 mr-2" />
                Education
              </h3>
              <p className="text-gray-900">{user.university}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <CreditCard className="w-6 h-6 mr-2" />
            Financial Information
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Banking</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Card Type</label>
                  <p className="text-gray-900">{user.bank.cardType}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Card Number</label>
                  <p className="text-gray-900 font-mono">**** **** **** {user.bank.cardNumber.slice(-4)}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Expires</label>
                  <p className="text-gray-900">{user.bank.cardExpire}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Currency</label>
                  <p className="text-gray-900">{user.bank.currency}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">IBAN</label>
                  <p className="text-gray-900 font-mono text-sm">{user.bank.iban}</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Cryptocurrency</h3>
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Coin</label>
                  <p className="text-gray-900">{user.crypto.coin}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Wallet</label>
                  <p className="text-gray-900 font-mono text-sm break-all">{user.crypto.wallet}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">Network</label>
                  <p className="text-gray-900">{user.crypto.network}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center">
            <Shield className="w-6 h-6 mr-2" />
            Security Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex items-center">
              <Hash className="w-4 h-4 mr-2 text-gray-400" />
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">EIN</label>
                <p className="text-gray-900 font-mono">{user.ein}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Hash className="w-4 h-4 mr-2 text-gray-400" />
              <div>
                <label className="block text-sm font-medium text-gray-500 mb-1">SSN</label>
                <p className="text-gray-900 font-mono">***-**-{user.ssn.slice(-4)}</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1">User Agent</label>
              <p className="text-gray-900 text-sm break-all">{user.userAgent}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default UserDetailPage;