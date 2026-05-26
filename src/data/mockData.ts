import { User } from '../types/user';
import { Order } from '../types/order';
import { FamilyMember } from '../types/family';

export const mockUsers: User[] = [
  {
    id: 'USR-001',
    name: 'Eleanor Pena',
    email: 'eleanor@example.com',
    phone: '+1 234 567 8900',
    role: 'Patient',
    status: 'Active',
    joinedDate: '2023-01-15',
    lastActive: '2023-10-24T10:30:00Z',
    appointmentsCount: 12,
    isPrime: true,
    dob: '1985-04-12',
    gender: 'Female',
    bloodGroup: 'O+',
    homeAddress: '123 Main St, Springfield, IL',
    workAddress: '456 Business Pkwy, Springfield, IL',
    avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026024d'
  },
  {
    id: 'USR-002',
    name: 'Wade Warren',
    email: 'wade@example.com',
    phone: '+1 234 567 8902',
    role: 'Patient',
    status: 'Inactive',
    joinedDate: '2023-03-22',
    lastActive: '2023-09-10T14:20:00Z',
    appointmentsCount: 5,
    isPrime: false,
    avatarUrl: 'https://i.pravatar.cc/150?u=a04258a2462d826712d'
  }
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-54321',
    userId: 'USR-001',
    date: '2023-10-20',
    items: [
      { name: 'Amoxicillin 500mg', quantity: 1, price: 15.99 },
      { name: 'Ibuprofen 200mg', quantity: 2, price: 8.50 }
    ],
    totalAmount: 32.99,
    status: 'Delivered',
    shippingAddress: '123 Main St, Springfield, IL',
    paymentMethod: 'Visa ending in 4242'
  },
  {
    id: 'ORD-54322',
    userId: 'USR-001',
    date: '2023-10-24',
    items: [
      { name: 'Vitamin C 1000mg', quantity: 1, price: 12.00 }
    ],
    totalAmount: 12.00,
    status: 'Pending',
    shippingAddress: '123 Main St, Springfield, IL',
    paymentMethod: 'Visa ending in 4242'
  }
];

export const mockFamilyMembers: FamilyMember[] = [
  {
    id: 'FAM-001',
    userId: 'USR-001',
    name: 'Robert Pena',
    relationship: 'Spouse',
    dob: '1982-11-05',
    phone: '+1 234 567 8901',
    gender: 'Male'
  },
  {
    id: 'FAM-002',
    userId: 'USR-001',
    name: 'Jenny Pena',
    relationship: 'Child',
    dob: '2010-05-14',
    phone: '',
    gender: 'Female'
  }
];
