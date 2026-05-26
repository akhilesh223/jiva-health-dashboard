import { Routes, Route, Navigate } from 'react-router-dom';
import { PATHS } from './paths';
import Dashboard from '../pages/Dashboard';
import UserDetail from '../pages/Users/UserDetail';
import OrderHistory from '../pages/Orders';
import OrderDetail from '../pages/Orders/OrderDetail';
import FamilyManagement from '../pages/Family';
import Payments from '../pages/Payments';

// We will implement these components next
const Settings = () => <div>Settings Page</div>;

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={PATHS.USERS} replace />} />
      <Route path={PATHS.DASHBOARD} element={<Navigate to={PATHS.USERS} replace />} />
      <Route path={PATHS.USERS} element={<Dashboard />} />
      <Route path={PATHS.USER_DETAIL(':id')} element={<UserDetail />} />
      <Route path={PATHS.ORDERS} element={<OrderHistory />} />
      <Route path={PATHS.ORDER_DETAIL(':id')} element={<OrderDetail />} />
      <Route path={PATHS.PAYMENTS} element={<Payments />} />
      <Route path={PATHS.FAMILY} element={<FamilyManagement />} />
      <Route path={PATHS.SETTINGS} element={<Settings />} />
    </Routes>
  );
};
