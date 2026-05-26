export const PATHS = {
  DASHBOARD: '/',
  USERS: '/users',
  USER_DETAIL: (id: string) => `/users/${id}`,
  ORDERS: '/orders',
  ORDER_DETAIL: (id: string) => `/orders/${id}`,
  PAYMENTS: '/payments',
  FAMILY: '/family',
  SETTINGS: '/settings',
};
