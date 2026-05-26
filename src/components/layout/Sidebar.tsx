import { Link, useLocation } from 'react-router-dom';
import { PATHS } from '../../routes/paths';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  CreditCard,
  Users2,
  Settings
} from 'lucide-react';
import { cn } from '../../lib/utils';

const navItems = [
  { name: 'Dashboard', path: PATHS.DASHBOARD, icon: LayoutDashboard },
  { name: 'Organization', path: '#', icon: Users },
  { name: 'User Management', path: PATHS.USERS, icon: Users2 },
  { name: 'Services', path: '#', icon: CreditCard },
  { name: 'Consultation', path: '#', icon: Users },
  { name: 'Lab test Booking', path: '#', icon: LayoutDashboard },
  { name: 'Medicine Orders', path: PATHS.ORDERS, icon: ShoppingCart },
  { name: 'Ambulance booking', path: '#', icon: CreditCard },
  { name: 'Vendor & Partners', path: '#', icon: Users2 },
  { name: 'Report', path: '#', icon: LayoutDashboard },
  { name: 'User Access', path: '#', icon: Users },
  { name: 'Setting', path: PATHS.SETTINGS, icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <motion.aside 
      initial={{ x: -250 }}
      animate={{ x: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="hidden w-64 flex-col border-r bg-white dark:bg-gray-900 dark:border-gray-800 transition-colors md:flex h-[calc(100vh-4rem)] sticky top-16"
    >
      <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-900 px-3 pb-4">
        <ul className="space-y-2 font-medium mt-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
            
            return (
              <li key={item.name}>
                <Link
                  to={item.path}
                  className={cn(
                    "flex items-center rounded-lg p-2 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800 group transition-colors",
                    isActive ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400" : ""
                  )}
                >
                  <Icon className={cn("h-5 w-5 text-gray-500 dark:text-gray-400 transition duration-75 group-hover:text-gray-900 dark:group-hover:text-gray-100", isActive ? "text-blue-600 dark:text-blue-400" : "")} />
                  <span className="ms-3">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      
      {/* Admin Profile at bottom */}
      <div className="border-t border-gray-100 dark:border-gray-800 p-4 mt-auto">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0d4734] text-sm font-medium text-white">
            AD
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">Admin User</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Admin@healthcare.com</p>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
