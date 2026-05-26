export interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  userId: string;
  date: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'Delivered' | 'Pending' | 'Cancelled';
  shippingAddress: string;
  paymentMethod: string;
}
