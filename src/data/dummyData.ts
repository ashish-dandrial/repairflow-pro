export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'customer' | 'admin' | 'technician';
  phone?: string;
}

export interface RepairRequest {
  id: string;
  customerId: string;
  customerName: string;
  deviceType: string;
  problemDescription: string;
  image?: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  assignedTechnician?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Service {
  id: string;
  name: string;
  icon: string;
  description: string;
  price: string;
}

// Dummy users
export const dummyUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    role: 'customer',
    phone: '+91 9876543210',
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@repair.com',
    password: 'admin123',
    role: 'admin',
    phone: '+91 9876543211',
  },
  {
    id: '3',
    name: 'Tech Mike',
    email: 'mike@repair.com',
    password: 'tech123',
    role: 'technician',
    phone: '+91 9876543212',
  },
  {
    id: '4',
    name: 'Tech Sarah',
    email: 'sarah@repair.com',
    password: 'tech123',
    role: 'technician',
    phone: '+91 9876543213',
  },
];

// Dummy repair requests
export const dummyRepairs: RepairRequest[] = [
  {
    id: 'REQ001',
    customerId: '1',
    customerName: 'John Doe',
    deviceType: 'Mobile',
    problemDescription: 'Screen cracked, touch not working properly',
    status: 'in-progress',
    assignedTechnician: 'Tech Mike',
    createdAt: '2025-01-10T10:30:00Z',
    updatedAt: '2025-01-11T14:20:00Z',
  },
  {
    id: 'REQ002',
    customerId: '1',
    customerName: 'Jane Smith',
    deviceType: 'Laptop',
    problemDescription: 'Battery not charging, overheating issues',
    status: 'pending',
    createdAt: '2025-01-12T09:15:00Z',
    updatedAt: '2025-01-12T09:15:00Z',
  },
  {
    id: 'REQ003',
    customerId: '1',
    customerName: 'Bob Wilson',
    deviceType: 'AC',
    problemDescription: 'Not cooling properly, making noise',
    status: 'completed',
    assignedTechnician: 'Tech Sarah',
    createdAt: '2025-01-08T11:00:00Z',
    updatedAt: '2025-01-10T16:45:00Z',
  },
];

// Services offered
export const services: Service[] = [
  {
    id: 's1',
    name: 'Mobile Repair',
    icon: 'Smartphone',
    description: 'Screen replacement, battery issues, software problems',
    price: '₹500 - ₹5,000',
  },
  {
    id: 's2',
    name: 'Laptop Repair',
    icon: 'Laptop',
    description: 'Hardware upgrades, OS installation, virus removal',
    price: '₹800 - ₹10,000',
  },
  {
    id: 's3',
    name: 'AC Repair',
    icon: 'Wind',
    description: 'Gas refill, cleaning, installation and servicing',
    price: '₹400 - ₹3,000',
  },
  {
    id: 's4',
    name: 'TV Repair',
    icon: 'Tv',
    description: 'Display issues, audio problems, remote control',
    price: '₹600 - ₹8,000',
  },
  {
    id: 's5',
    name: 'Appliance Repair',
    icon: 'Refrigerator',
    description: 'Washing machine, refrigerator, microwave repairs',
    price: '₹500 - ₹6,000',
  },
  {
    id: 's6',
    name: 'Computer Repair',
    icon: 'Monitor',
    description: 'Desktop repair, peripheral issues, networking',
    price: '₹700 - ₹7,000',
  },
];
