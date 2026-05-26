import { useOrderStore } from '../../store/orderStore';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { DataTable } from '../../components/tables/reusable/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { Order } from '../../types/order';
import { Badge } from '../../components/ui/badge';
import { CreditCard, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Payments() {
  const { orders } = useOrderStore();
  
  // Calculate some stats
  const totalRevenue = orders.reduce((acc, order) => acc + order.totalAmount, 0);
  const successfulPayments = orders.filter(o => o.status === 'Delivered').length;

  const columns: ColumnDef<Order>[] = [
    { accessorKey: 'id', header: 'Transaction ID' },
    { accessorKey: 'date', header: 'Date' },
    { accessorKey: 'paymentMethod', header: 'Method' },
    { 
      accessorKey: 'totalAmount', 
      header: 'Amount',
      cell: ({ row }) => <span className="font-medium">${row.original.totalAmount.toFixed(2)}</span>
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.original.status;
        const isSuccess = status === 'Delivered';
        const isPending = status === 'Pending';
        return (
          <Badge variant={isSuccess ? 'default' : isPending ? 'secondary' : 'destructive'}>
            {isSuccess ? 'Successful' : isPending ? 'Processing' : 'Failed'}
          </Badge>
        );
      }
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Payments</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Successful Transactions</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{successfulPayments}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={orders} searchKey="id" />
        </CardContent>
      </Card>
    </motion.div>
  );
}
