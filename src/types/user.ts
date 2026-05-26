export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Admin' | 'Doctor' | 'Patient' | 'Staff';
  status: 'Active' | 'Inactive';
  joinedDate: string;
  lastActive: string;
  appointmentsCount: number;
  isPrime: boolean;
  dob?: string;
  gender?: 'Male' | 'Female' | 'Other';
  bloodGroup?: string;
  homeAddress?: string;
  workAddress?: string;
  avatarUrl?: string;
}
