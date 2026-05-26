import { useParams, Link } from 'react-router-dom';
import { useOrderStore } from '../../store/orderStore';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { ArrowLeft, Printer, Truck, CheckCircle2, Package, MapPin, CreditCard } from 'lucide-react';
import { PATHS } from '../../routes/paths';

export default function OrderDetail() {
  const { id } = useParams();
  const { orders } = useOrderStore();
  
  const order = orders.find(o => o.id === id);

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h2 className="text-2xl font-bold mb-4">Order not found</h2>
        <Button asChild>
          <Link to={PATHS.ORDERS}>Back to Orders</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-10">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="icon" asChild>
            <Link to={PATHS.ORDERS}>
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">Order {order.id}</h1>
          <Badge variant={order.status === 'Delivered' ? 'default' : order.status === 'Pending' ? 'secondary' : 'destructive'} className="text-sm px-3 py-1">
            {order.status}
          </Badge>
        </div>
        <Button variant="outline">
          <Printer className="mr-2 h-4 w-4" /> Print Invoice
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Itemized Medicine List</CardTitle>
              <CardDescription>Items in this order</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b last:border-0">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 p-2 rounded-md">
                        <Package className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="bg-gray-50 border-t flex justify-between p-6">
              <span className="font-bold">Total Amount</span>
              <span className="font-bold text-xl text-blue-600">${order.totalAmount.toFixed(2)}</span>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Delivery Status Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative border-l border-gray-200 ml-3 space-y-8">
                <div className="mb-8 ml-6">
                  <span className="absolute flex items-center justify-center w-6 h-6 bg-green-100 rounded-full -left-3 ring-8 ring-white">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </span>
                  <h3 className="font-medium leading-tight">Order Placed</h3>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
                <div className="mb-8 ml-6">
                  <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-8 ring-white ${order.status !== 'Pending' ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <Truck className={`w-4 h-4 ${order.status !== 'Pending' ? 'text-green-500' : 'text-gray-500'}`} />
                  </span>
                  <h3 className="font-medium leading-tight">Dispatched</h3>
                  <p className="text-sm text-gray-500">{order.status !== 'Pending' ? order.date : 'Pending...'}</p>
                </div>
                <div className="ml-6">
                  <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-8 ring-white ${order.status === 'Delivered' ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <Package className={`w-4 h-4 ${order.status === 'Delivered' ? 'text-green-500' : 'text-gray-500'}`} />
                  </span>
                  <h3 className="font-medium leading-tight">Delivered</h3>
                  <p className="text-sm text-gray-500">{order.status === 'Delivered' ? order.date : 'Pending...'}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-500">Date</span>
                <span className="font-medium">{order.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Items</span>
                <span className="font-medium">{order.items.reduce((acc, curr) => acc + curr.quantity, 0)}</span>
              </div>
              <div className="flex justify-between font-bold pt-4 border-t">
                <span>Total</span>
                <span>${order.totalAmount.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-gray-500" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{order.shippingAddress}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2 text-gray-500" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm">{order.paymentMethod}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
