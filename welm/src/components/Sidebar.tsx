import React from 'react';

import { 
  Home, 
  Activity, 
  Calendar, 
  BarChart2, 
  Settings, 
  User, 
  LogOut,
  Heart
} from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarProps {
  activeItem: string;
  setActiveItem: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeItem, setActiveItem }) => {
  const menuItems = [
    { id: 'dashboard', icon: <Home size={20} />, label: 'Dashboard' },
    { id: 'activity', icon: <Activity size={20} />, label: 'Activity' },
    { id: 'nutrition', icon: <BarChart2 size={20} />, label: 'Nutrition' },
    { id: 'calendar', icon: <Calendar size={20} />, label: 'Calendar' },
    { id: 'profile', icon: <User size={20} />, label: 'Profile' },
    { id: 'settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  const handleLogout = () => {
    // In a real app, this would handle authentication logout
    alert('Logout functionality would be implemented here');
    // For demo purposes, we'll just go back to dashboard
    setActiveItem('dashboard');
  };

  return (
    <div className="bg-white h-screen w-64 shadow-md flex flex-col">
      <div className="p-6">
        <div className="flex items-center">
          <div className="bg-primary rounded-full p-2 mr-3">
            <Heart size={20} className="text-white" />
          </div>
          <h1 className="text-xl font-bold gradient-text">Wellness Wizard</h1>
        </div>
      </div>
      
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <motion.button
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveItem(item.id)}
                className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${
                  activeItem === item.id
                    ? 'bg-primary text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {item.icon}
                <span className="ml-3 font-medium">{item.label}</span>
              </motion.button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t">
        <button 
          className="flex items-center w-full px-4 py-3 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          onClick={handleLogout}
        >
          <LogOut size={20} />
          <span className="ml-3 font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;