import React from 'react';
import { motion } from 'framer-motion';

interface BadgeProps {
  name: string;
  icon: React.ReactNode;
  isEarned: boolean;
  description: string;
}

const Badge: React.FC<BadgeProps> = ({ name, icon, isEarned, description }) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className={`flex flex-col items-center p-4 ${isEarned ? 'badge' : 'opacity-50'}`}
    >
      <div 
        className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 ${
          isEarned 
            ? 'bg-gradient-to-br from-yellow-300 to-yellow-500 shadow-lg' 
            : 'bg-gray-200'
        }`}
      >
        {icon}
      </div>
      <h3 className="font-medium text-sm text-center">{name}</h3>
      <p className="text-xs text-gray-500 text-center mt-1">{description}</p>
    </motion.div>
  );
};

export default Badge;