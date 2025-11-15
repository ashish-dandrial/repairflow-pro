import { User, RepairRequest } from '@/data/dummyData';

const STORAGE_KEYS = {
  USERS: 'repair_users',
  REPAIRS: 'repair_requests',
  CURRENT_USER: 'current_user',
  AUTH_TOKEN: 'auth_token',
};

// User operations
export const getUsers = (): User[] => {
  const users = localStorage.getItem(STORAGE_KEYS.USERS);
  return users ? JSON.parse(users) : [];
};

export const saveUser = (user: User): void => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
};

export const getCurrentUser = (): User | null => {
  const user = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return user ? JSON.parse(user) : null;
};

export const setCurrentUser = (user: User | null): void => {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, 'dummy-token-' + user.id);
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  }
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
};

// Repair operations
export const getRepairs = (): RepairRequest[] => {
  const repairs = localStorage.getItem(STORAGE_KEYS.REPAIRS);
  return repairs ? JSON.parse(repairs) : [];
};

export const saveRepair = (repair: RepairRequest): void => {
  const repairs = getRepairs();
  repairs.push(repair);
  localStorage.setItem(STORAGE_KEYS.REPAIRS, JSON.stringify(repairs));
};

export const updateRepair = (id: string, updates: Partial<RepairRequest>): void => {
  const repairs = getRepairs();
  const index = repairs.findIndex(r => r.id === id);
  if (index !== -1) {
    repairs[index] = { ...repairs[index], ...updates, updatedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEYS.REPAIRS, JSON.stringify(repairs));
  }
};

export const getRepairById = (id: string): RepairRequest | null => {
  const repairs = getRepairs();
  return repairs.find(r => r.id === id) || null;
};

export const getRepairsByCustomer = (customerId: string): RepairRequest[] => {
  const repairs = getRepairs();
  return repairs.filter(r => r.customerId === customerId);
};

export const generateRepairId = (): string => {
  const repairs = getRepairs();
  const lastId = repairs.length > 0 ? parseInt(repairs[repairs.length - 1].id.replace('REQ', '')) : 0;
  return `REQ${String(lastId + 1).padStart(3, '0')}`;
};

// Initialize storage with dummy data
export const initializeStorage = (): void => {
  if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.REPAIRS)) {
    localStorage.setItem(STORAGE_KEYS.REPAIRS, JSON.stringify([]));
  }
};
