import { useParams, Link } from 'react-router-dom';
import { useUserStore } from '../../store/userStore';
import { useOrderStore } from '../../store/orderStore';
import { useFamilyStore } from '../../store/familyStore';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Button } from '../../components/ui/button';
import { 
  ArrowLeft, Edit, MapPin, Mail, Phone, Calendar, Crown, Activity,
  ShoppingBag, Stethoscope, CreditCard, User, ClipboardList, Users, 
  Droplet, Home, Trash2, Plus
} from 'lucide-react';
import { PATHS } from '../../routes/paths';
import { DataTable } from '../../components/tables/reusable/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { Order } from '../../types/order';
import { FamilyMember } from '../../types/family';
import { motion } from 'framer-motion';

export default function UserDetail() {
  const { id } = useParams();
  const { users } = useUserStore();
  const { orders } = useOrderStore();
  const { members } = useFamilyStore();

  const user = users.find((u) => u.id === id);
  const userOrders = orders.filter((o) => o.userId === id);
  const userFamily = members.filter((m) => m.userId === id);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-bold mb-4">User not found</h2>
        <Button asChild>
          <Link to={PATHS.DASHBOARD}>Back to Dashboard</Link>
        </Button>
      </div>
    );
  }

  const orderColumns: ColumnDef<Order>[] = [
    { accessorKey: 'id', header: 'Order ID' },
    { accessorKey: 'date', header: 'Date' },
    { 
      accessorKey: 'totalAmount', 
      header: 'Amount',
      cell: ({ row }) => <span className="font-medium">₹{row.original.totalAmount.toFixed(2)}</span>
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <Badge variant={status === 'Delivered' ? 'default' : status === 'Pending' ? 'secondary' : 'destructive'}
                 className={status === 'Delivered' ? 'bg-green-100 text-green-700 hover:bg-green-100' : ''}>
            {status}
          </Badge>
        );
      }
    }
  ];

  const familyColumns: ColumnDef<FamilyMember>[] = [
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'relationship', header: 'Relationship' },
    { accessorKey: 'dob', header: 'DOB' },
    { accessorKey: 'phone', header: 'Phone' },
    { accessorKey: 'gender', header: 'Gender' },
  ];

  const totalSpent = userOrders.reduce((acc, curr) => acc + curr.totalAmount, 0);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 max-w-7xl mx-auto pb-10 px-2"
    >
      {/* Back Link */}
      <Link to={PATHS.DASHBOARD} className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to User Management
      </Link>

      {/* Profile Header section */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div className="flex items-center gap-5">
          {/* Avatar */}
          <div className="h-20 w-20 rounded-full bg-[#b8e8d5] text-[#0d4734] flex items-center justify-center font-bold text-2xl flex-shrink-0">
            {user.name.split(' ').map(n => n[0]).join('').substring(0,2)}
          </div>
          
          {/* Info */}
          <div className="space-y-1.5">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{user.name}</h1>
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <Badge className={user.status === 'Active' ? 'bg-green-100 text-green-700 hover:bg-green-100' : 'bg-gray-100 text-gray-600 hover:bg-gray-100'}>
                {user.status}
              </Badge>
              <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
                {user.role}
              </Badge>
              <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">
                {user.isPrime ? 'Prime User' : 'Normal User'}
              </Badge>
              <span className="text-gray-500 ml-2 font-medium">ID: #{user.id.substring(0, 4)}</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-1.5 text-gray-400" />
                Joined {user.joinedDate || '1/15/2025'}
              </div>
              <div className="flex items-center">
                <Activity className="h-4 w-4 mr-1.5 text-gray-400" />
                Last active {user.lastActive || '4/2/2026'}
              </div>
            </div>
          </div>
        </div>

        {/* Top Right Actions */}
        <div className="flex items-center gap-3">
          <Button className="bg-[#f5860a] hover:bg-[#d97708] text-white font-medium border-0 shadow-sm rounded-md h-10 px-4">
            <Crown className="mr-2 h-4 w-4" /> Upgrade to Prime
          </Button>
          <select className="h-10 px-3 rounded-md border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary appearance-none min-w-[120px]">
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm border border-gray-100 rounded-xl">
          <CardContent className="p-5 flex justify-between items-center h-full">
            <div>
              <p className="text-sm font-medium text-gray-400 mb-1">Total Orders</p>
              <h3 className="text-3xl font-semibold text-gray-800">{userOrders.length}</h3>
            </div>
            <div className="h-12 w-12 rounded-xl bg-blue-50 flex items-center justify-center">
              <ShoppingBag className="h-6 w-6 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="shadow-sm border border-gray-100 rounded-xl">
          <CardContent className="p-5 flex justify-between items-center h-full">
            <div>
              <p className="text-sm font-medium text-gray-400 mb-1">Total Booking &<br/>Appointment</p>
              <h3 className="text-3xl font-semibold text-green-500">{user.appointmentsCount}</h3>
            </div>
            <div className="h-12 w-12 rounded-xl bg-[#e6f4ef] flex items-center justify-center">
              <Stethoscope className="h-6 w-6 text-[#0d4734]" />
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border border-gray-100 rounded-xl">
          <CardContent className="p-5 flex justify-between items-center h-full">
            <div>
              <p className="text-sm font-medium text-gray-400 mb-1">Total Family Member</p>
              <h3 className="text-3xl font-semibold text-[#0d4734]">{userFamily.length}</h3>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border border-gray-100 rounded-xl">
          <CardContent className="p-5 flex justify-between items-center h-full">
            <div>
              <p className="text-sm font-medium text-gray-400 mb-1">Total Spent</p>
              <h3 className="text-3xl font-semibold text-gray-800">₹{totalSpent.toFixed(2)}</h3>
            </div>
            <div className="h-12 w-12 rounded-xl bg-[#e6f4ef] flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-[#0d4734]" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="w-full mt-8">
        <TabsList className="bg-transparent border-b border-gray-200 w-full justify-start rounded-none h-12 p-0 gap-6">
          <TabsTrigger 
            value="overview" 
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#0d4734] data-[state=active]:text-[#0d4734] rounded-none px-0 text-sm font-medium h-full text-gray-500"
          >
            <User className="w-4 h-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="orders" 
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#0d4734] data-[state=active]:text-[#0d4734] rounded-none px-0 text-sm font-medium h-full text-gray-500"
          >
            <ClipboardList className="w-4 h-4 mr-2" />
            Orders & Bookings
          </TabsTrigger>
          <TabsTrigger 
            value="payments"
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#0d4734] data-[state=active]:text-[#0d4734] rounded-none px-0 text-sm font-medium h-full text-gray-500"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Payments
          </TabsTrigger>
          <TabsTrigger 
            value="family"
            className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-[#0d4734] data-[state=active]:text-[#0d4734] rounded-none px-0 text-sm font-medium h-full text-gray-500"
          >
            <Users className="w-4 h-4 mr-2" />
            Family Members
          </TabsTrigger>
        </TabsList>

        <div className="pt-6">
          {/* OVERVIEW TAB */}
          <TabsContent value="overview" className="mt-0 outline-none">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Personal Information */}
              <Card className="shadow-sm border border-gray-100 rounded-xl">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-base font-semibold text-gray-800">Personal Information</CardTitle>
                  <Button variant="outline" size="sm" className="h-8 rounded-md text-gray-600 border-gray-200">
                    <Edit className="h-3.5 w-3.5 mr-1.5" /> Edit
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                  <div className="flex items-center">
                    <div className="w-32 flex items-center text-[#4da884] text-sm font-medium">
                      <Mail className="h-4 w-4 mr-2" /> Email:
                    </div>
                    <div className="text-sm text-gray-800">{user.email}</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-32 flex items-center text-[#4da884] text-sm font-medium">
                      <Phone className="h-4 w-4 mr-2" /> Phone:
                    </div>
                    <div className="text-sm text-gray-800">{user.phone}</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-32 flex items-center text-[#4da884] text-sm font-medium">
                      <Calendar className="h-4 w-4 mr-2" /> Date of Birth:
                    </div>
                    <div className="text-sm text-gray-800">{user.dob || 'Not provided'}</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-32 flex items-center text-[#4da884] text-sm font-medium">
                      <User className="h-4 w-4 mr-2" /> Gender:
                    </div>
                    <div className="text-sm text-gray-800">{user.gender || 'Not provided'}</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-32 flex items-center text-[#4da884] text-sm font-medium">
                      <Droplet className="h-4 w-4 mr-2" /> Blood Group:
                    </div>
                    <div className="text-sm text-gray-800">{user.bloodGroup || 'Not provided'}</div>
                  </div>
                </CardContent>
              </Card>

              {/* Addresses */}
              <Card className="shadow-sm border border-gray-100 rounded-xl">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-base font-semibold text-gray-800">Addresses</CardTitle>
                  <Button variant="outline" size="sm" className="h-8 rounded-md text-gray-600 border-gray-200">
                    <Plus className="h-3.5 w-3.5 mr-1.5" /> Add
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                  {/* Address 1 */}
                  <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100 relative group">
                    <div className="flex gap-4">
                      <div className="h-10 w-10 rounded-lg bg-[#b8e8d5] flex items-center justify-center flex-shrink-0">
                        <Home className="h-5 w-5 text-[#0d4734]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-800 text-sm">Home</span>
                          <Badge variant="secondary" className="bg-white border-gray-200 text-xs font-normal">Default</Badge>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed max-w-[80%]">
                          {user.homeAddress || 'Flat 301, Sunshine Apartments, MG Road\nMumbai, Maharashtra 400001\nIndia'}
                        </p>
                      </div>
                    </div>
                    {/* Actions */}
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                      <Button variant="outline" size="icon" className="h-8 w-8 bg-white text-gray-500 border-gray-200">
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8 bg-white text-red-500 border-red-100 hover:bg-red-50 hover:text-red-600">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>

                  {/* Address 2 */}
                  <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100 relative group">
                    <div className="flex gap-4">
                      <div className="h-10 w-10 rounded-lg bg-[#b8e8d5] flex items-center justify-center flex-shrink-0">
                        <Home className="h-5 w-5 text-[#0d4734]" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-800 text-sm">Home</span>
                        </div>
                        <p className="text-sm text-gray-500 leading-relaxed max-w-[80%]">
                          {user.workAddress || 'Flat 301, Sunshine Apartments, MG Road\nMumbai, Maharashtra 400001\nIndia'}
                        </p>
                      </div>
                    </div>
                    {/* Actions */}
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                      <Button variant="outline" size="icon" className="h-8 w-8 bg-white text-gray-500 border-gray-200">
                        <Edit className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="outline" size="icon" className="h-8 w-8 bg-white text-red-500 border-red-100 hover:bg-red-50 hover:text-red-600">
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="mt-0">
            <Card className="shadow-sm border border-gray-100 rounded-xl">
              <CardContent className="pt-6">
                <DataTable columns={orderColumns} data={userOrders} searchKey="id" />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="mt-0">
            <Card className="shadow-sm border border-gray-100 rounded-xl">
              <CardContent className="pt-6">
                <div className="text-center py-12 text-gray-500 flex flex-col items-center">
                  <CreditCard className="h-12 w-12 text-gray-200 mb-4" />
                  <p>No recent payment history available.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="family" className="mt-0">
            <Card className="shadow-sm border border-gray-100 rounded-xl">
              <CardContent className="pt-6">
                <DataTable columns={familyColumns} data={userFamily} searchKey="name" />
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </motion.div>
  );
}
