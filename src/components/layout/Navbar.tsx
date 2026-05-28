import { Bell, Search, Menu, Moon, Sun } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useThemeStore } from '../../store/themeStore';
import { useUIStore } from '../../store/uiStore';

export function Navbar() {
  const { theme, toggleTheme } = useThemeStore();
  const { toggleSidebar } = useUIStore();
  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-white dark:bg-gray-900 dark:border-gray-800 transition-colors">
      <div className="px-3 py-3 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end">
            <button
              type="button"
              className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden"
              onClick={toggleSidebar}
            >
              <span className="sr-only">Open sidebar</span>
              <Menu className="h-6 w-6" />
            </button>
            <a href="/" className="ms-2 md:me-24 flex items-center gap-2">
              <span className="self-center whitespace-nowrap text-2xl font-bold text-green-600">Jiva</span>
              <span className="text-sm font-semibold text-red-500 mt-1">HEALTH</span>
            </a>
          </div>
          
          {/* Search */}
          <div className="hidden flex-1 items-center px-4 md:flex justify-center">
            <div className="relative w-full max-w-xl">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search"
                className="w-full bg-gray-50/50 dark:bg-gray-800 dark:border-gray-700 pl-10 border-gray-200 h-10 rounded-full"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400"
              onClick={toggleTheme}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" className="relative text-gray-500 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 dark:text-gray-400">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1.5 right-2 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>
            
            {/* User Profile */}
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0d4734] text-sm font-medium text-white">
                AD
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
