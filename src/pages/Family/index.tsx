import { useState } from 'react';
import { useFamilyStore } from '../../store/familyStore';
import { useUserStore } from '../../store/userStore';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { DataTable } from '../../components/tables/reusable/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { FamilyMember } from '../../types/family';
import { Button } from '../../components/ui/button';
import { Plus, Edit, Trash2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';

export default function FamilyManagement() {
  const { members, addMember, updateMember, deleteMember } = useFamilyStore();
  const { users } = useUserStore();
  
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const [selectedMember, setSelectedMember] = useState<FamilyMember | null>(null);
  const [formData, setFormData] = useState<Partial<FamilyMember>>({});

  const handleOpenAddModal = () => {
    setFormData({ userId: users[0]?.id || '' });
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (member: FamilyMember) => {
    setSelectedMember(member);
    setFormData(member);
    setIsEditModalOpen(true);
  };

  const handleOpenDeleteModal = (member: FamilyMember) => {
    setSelectedMember(member);
    setIsDeleteModalOpen(true);
  };

  const handleSaveMember = () => {
    if (selectedMember) {
      updateMember({ ...selectedMember, ...formData } as FamilyMember);
      setIsEditModalOpen(false);
    } else {
      addMember({
        ...formData,
        id: `FAM-${Date.now()}`,
      } as FamilyMember);
      setIsAddModalOpen(false);
    }
    setFormData({});
  };

  const handleDeleteMember = () => {
    if (selectedMember) {
      deleteMember(selectedMember.id);
      setIsDeleteModalOpen(false);
      setSelectedMember(null);
    }
  };

  const columns: ColumnDef<FamilyMember>[] = [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'relationship', header: 'Relationship' },
    { accessorKey: 'dob', header: 'DOB' },
    { accessorKey: 'phone', header: 'Phone' },
    { accessorKey: 'gender', header: 'Gender' },
    {
      accessorKey: 'userId',
      header: 'Associated User',
      cell: ({ row }) => {
        const user = users.find(u => u.id === row.original.userId);
        return user ? user.name : row.original.userId;
      }
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const member = row.original;
        return (
          <div className="flex space-x-2 justify-end">
            <Button variant="ghost" size="icon" onClick={() => handleOpenEditModal(member)}>
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700" onClick={() => handleOpenDeleteModal(member)}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        );
      }
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Family Members</h1>
        <Button onClick={handleOpenAddModal}>
          <Plus className="mr-2 h-4 w-4" /> Add Member
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Family Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{members.length}</div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Family Member List</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={members} searchKey="name" />
        </CardContent>
      </Card>

      {/* Add/Edit Modal */}
      <Dialog open={isAddModalOpen || isEditModalOpen} onOpenChange={(open) => {
        if (!open) {
          setIsAddModalOpen(false);
          setIsEditModalOpen(false);
        }
      }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditModalOpen ? 'Edit Family Member' : 'Add Family Member'}</DialogTitle>
            <DialogDescription>
              {isEditModalOpen ? 'Update the details for this family member.' : 'Enter the details to add a new family member.'}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Name</Label>
              <Input id="name" value={formData.name || ''} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="relationship" className="text-right">Relationship</Label>
              <Input id="relationship" value={formData.relationship || ''} onChange={(e) => setFormData({ ...formData, relationship: e.target.value })} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dob" className="text-right">DOB</Label>
              <Input id="dob" type="date" value={formData.dob || ''} onChange={(e) => setFormData({ ...formData, dob: e.target.value })} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">Phone</Label>
              <Input id="phone" value={formData.phone || ''} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSaveMember}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove {selectedMember?.name} from the family? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteMember}>Delete</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
