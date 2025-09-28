
export interface Address {
  address: string;
  city: string;
  state: string;
  stateCode: string;
  postalCode: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  country: string;
}

export interface Bank {
  cardExpire: string;
  cardNumber: string;
  cardType: string;
  currency: string;
  iban: string;
}

export interface Company {
  department: string;
  name: string;
  title: string;
  address: Address;
}

export interface Crypto {
  coin: string;
  wallet: string;
  network: string;
}

export interface Hair {
  color: string;
  type: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  maidenName: string;
  age: number;
  gender: 'male' | 'female';
  email: string;
  phone: string;
  username: string;
  password: string;
  birthDate: string;
  image: string;
  bloodGroup: string;
  height: number;
  weight: number;
  eyeColor: string;
  hair: Hair;
  ip: string;
  address: Address;
  macAddress: string;
  university: string;
  bank: Bank;
  company: Company;
  ein: string;
  ssn: string;
  userAgent: string;
  crypto: Crypto;
  role: 'admin' | 'moderator' | 'user';
}

export interface UsersResponse {
  users: User[];
  total: number;
  skip: number;
  limit: number;
}

export interface UserFilters {
  email?: string;
  gender?: 'male' | 'female' | '';
  role?: 'admin' | 'moderator' | 'user' | '';
}

export interface PaginationParams {
  limit: number;
  skip: number;
}

export interface UserSearchParams extends PaginationParams {
  q?: string;
}

export interface ApiError {
  message: string;
  status?: number;
}

export interface LoadingState {
  isLoading: boolean;
  error: ApiError | null;
}