import { useState } from 'react';
import { useUserStore } from '../../store/userStore';
import { useFamilyStore } from '../../store/familyStore';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { PATHS } from '../../routes/paths';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { 
  Plus, 
  Search, 
  Mail, 
  Phone, 
  Calendar, 
  Crown, 
  Eye, 
  Edit,
  Filter
} from 'lucide-react';
import { AddUserModal } from '../../components/modals/AddUserModal';
import { EditUserModal } from '../../components/modals/EditUserModal';
import { User } from '../../types/user';

export default function Dashboard() {
  const { users, updateUser } = useUserStore();
  const { members } = useFamilyStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);

  const totalUsers = users.length;
  const primeUsers = users.filter((u) => u.isPrime).length;
  const nonPrimeUsers = totalUsers - primeUsers;
  const totalFamilyMembers = members.length;

  const stats = [
    { title: 'Total User', value: totalUsers, valueColor: 'text-gray-900' },
    { title: 'Prime User', value: primeUsers, valueColor: 'text-success' },
    { title: 'Non-Prime User', value: nonPrimeUsers, valueColor: 'text-success' },
    { title: 'Total Family members', value: totalFamilyMembers, valueColor: 'text-success' },
  ];

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 max-w-7xl mx-auto pb-10"
    >
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">User Management</h1>
          <p className="text-sm text-gray-500 mt-1">Manage user accounts and permissions</p>
        </div>
        <Button 
          className="bg-orange-500 hover:bg-orange-600 text-white rounded-md"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" /> Add User
        </Button>
      </div>

      {/* Metric Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm flex flex-col justify-between h-28">
            <h3 className="text-sm font-medium text-gray-500">{stat.title}</h3>
            <div className={`text-4xl font-bold ${stat.valueColor}`}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center pt-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input 
            placeholder="Search by patient, doctor, or specialty..." 
            className="pl-9 bg-white border-gray-200"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-40">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select className="w-full h-10 pl-9 pr-4 rounded-md border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary appearance-none">
              <option>All Status</option>
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>
          <div className="relative flex-1 md:w-40">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select className="w-full h-10 pl-9 pr-4 rounded-md border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary appearance-none">
              <option>All Status</option>
              <option>Prime</option>
              <option>Normal</option>
            </select>
          </div>
        </div>
      </div>

      {/* User List Cards */}
      <div className="space-y-4">
        {filteredUsers.map((user) => (
          <motion.div 
            key={user.id}
            whileHover={{ scale: 1.005, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)" }}
            className="bg-white rounded-xl border border-gray-200 p-5 flex flex-col xl:flex-row xl:items-center gap-6 shadow-sm transition-all"
          >
            {/* Avatar & Basic Info */}
            <div className="flex items-center gap-4 xl:w-[250px]">
              <div className="flex-shrink-0 h-14 w-14 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
                {user.name.split(' ').map(n => n[0]).join('').substring(0,2)}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{user.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{user.role}</span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {user.status}
                  </span>
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {user.isPrime ? 'Prime User' : 'Normal User'}
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col gap-2 xl:w-[250px]">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="h-4 w-4 mr-2 text-gray-400" />
                {user.email}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Phone className="h-4 w-4 mr-2 text-gray-400" />
                {user.phone}
              </div>
            </div>

            {/* Join Date */}
            <div className="flex flex-col gap-1 xl:w-[180px]">
              <div className="flex items-center text-sm text-gray-600">
                <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                Joined
              </div>
              <div className="text-sm font-medium pl-6">{user.joinedDate}</div>
              <div className="text-xs text-gray-400 pl-6">Last: {user.lastActive}</div>
            </div>

            {/* Appointments */}
            <div className="flex flex-col xl:items-center xl:w-[120px]">
              <span className="text-xs text-gray-500 font-medium">Appointments</span>
              <span className="text-2xl font-bold text-blue-600">{user.appointmentsCount}</span>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-end gap-3 w-full xl:w-auto mt-4 xl:mt-0">
              <Button 
                className="bg-orange-500 hover:bg-orange-600 text-white rounded-md border-0"
                onClick={() => updateUser({ ...user, isPrime: true })}
                disabled={user.isPrime}
              >
                <Crown className="mr-2 h-4 w-4" /> {user.isPrime ? 'Prime Active' : 'Upgrade to Prime'}
              </Button>
              <Button variant="outline" className="rounded-md dark:border-gray-700 dark:text-gray-300" asChild>
                <Link to={PATHS.USER_DETAIL(user.id)}>
                  <Eye className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" /> View
                </Link>
              </Button>
              <Button 
                variant="outline" 
                className="rounded-md dark:border-gray-700 dark:text-gray-300"
                onClick={() => {
                  setUserToEdit(user);
                  setIsEditModalOpen(true);
                }}
              >
                <Edit className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" /> Edit
              </Button>
            </div>
          </motion.div>
        ))}
        {filteredUsers.length === 0 && (
          <div className="text-center py-12 text-gray-500">No users found.</div>
        )}
      </div>

      {/* Modals */}
      <AddUserModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} />
      <EditUserModal open={isEditModalOpen} onOpenChange={setIsEditModalOpen} user={userToEdit} />
    </motion.div>
  );
}
