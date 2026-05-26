export interface FamilyMember {
  id: string;
  userId: string;
  name: string;
  relationship: string;
  dob: string;
  phone: string;
  gender: 'Male' | 'Female' | 'Other';
}
