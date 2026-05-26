import { useOrderStore } from '../../store/orderStore';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { DataTable } from '../../components/tables/reusable/DataTable';
import { ColumnDef } from '@tanstack/react-table';
import { Order } from '../../types/order';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PATHS } from '../../routes/paths';

export default function OrderHistory() {
  const { orders } = useOrderStore();

  const columns: ColumnDef<Order>[] = [
    { accessorKey: 'id', header: 'Order ID' },
    { accessorKey: 'date', header: 'Date' },
    { 
      accessorKey: 'items', 
      header: 'Medicine Items',
      cell: ({ row }) => (
        <span className="truncate max-w-[200px] block">
          {row.original.items.map(item => item.name).join(', ')}
        </span>
      )
    },
    { 
      accessorKey: 'items', 
      id: 'quantity',
      header: 'Quantity',
      cell: ({ row }) => row.original.items.reduce((acc, curr) => acc + curr.quantity, 0)
    },
    { 
      accessorKey: 'totalAmount', 
      header: 'Amount',
      cell: ({ row }) => `$${row.original.totalAmount.toFixed(2)}`
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.original.status;
        return (
          <Badge variant={status === 'Delivered' ? 'default' : status === 'Pending' ? 'secondary' : 'destructive'}>
            {status}
          </Badge>
        );
      }
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <Button variant="ghost" size="sm" asChild>
          <Link to={PATHS.ORDER_DETAIL(row.original.id)}>
            <Eye className="h-4 w-4 mr-2" /> View
          </Link>
        </Button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Order History</h1>
      <Card>
        <CardHeader>
          <CardTitle>All Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={orders} searchKey="id" />
        </CardContent>
      </Card>
    </div>
  );
}
