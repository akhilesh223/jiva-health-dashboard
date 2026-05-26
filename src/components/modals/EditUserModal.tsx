import { useState, useEffect } from 'react';
import { useUserStore } from '../../store/userStore';
import { User } from '../../types/user';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

interface EditUserModalProps {
  user: User | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditUserModal({ user, open, onOpenChange }: EditUserModalProps) {
  const { updateUser } = useUserStore();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Patient',
    status: 'Active',
    isPrime: false
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status,
        isPrime: user.isPrime
      });
    }
  }, [user]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    // Create updated user object
    const updatedUser = {
      ...user,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      role: formData.role as "Patient" | "Doctor" | "Admin" | "Staff",
      status: formData.status as 'Active' | 'Inactive',
      isPrime: formData.isPrime,
    };

    updateUser(updatedUser);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="edit-name">Full Name</Label>
            <Input 
              id="edit-name" 
              required
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-email">Email</Label>
            <Input 
              id="edit-email" 
              type="email" 
              required
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="edit-phone">Phone</Label>
            <Input 
              id="edit-phone" 
              required
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="edit-role">Role</Label>
              <select 
                id="edit-role"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                value={formData.role}
                onChange={e => setFormData({...formData, role: e.target.value})}
              >
                <option value="Patient">Patient</option>
                <option value="Doctor">Doctor</option>
                <option value="Nurse">Nurse</option>
                <option value="Admin">Admin</option>
                <option value="Support Staff">Support Staff</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">Status</Label>
              <select 
                id="edit-status"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                value={formData.status}
                onChange={e => setFormData({...formData, status: e.target.value})}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 pt-2">
            <input 
              type="checkbox" 
              id="edit-isPrime" 
              className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
              checked={formData.isPrime}
              onChange={e => setFormData({...formData, isPrime: e.target.checked})}
            />
            <Label htmlFor="edit-isPrime" className="font-normal cursor-pointer">
              Mark as Prime User
            </Label>
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white">
              Save Changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
