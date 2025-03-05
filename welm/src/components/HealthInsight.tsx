import React from 'react';
import { motion } from 'framer-motion';

interface HealthInsightProps {
  title: string;
  description: string;
  actionText: string;
  icon: React.ReactNode;
  color: string;
}

const HealthInsight: React.FC<HealthInsightProps> = ({ 
  title, 
  description, 
  actionText, 
  icon,
  color
}) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`p-5 border-l-4 ${color} bg-white rounded-r-lg shadow-md mb-4`}
    >
      <div className="flex items-start">
        <div className={`p-2 rounded-full ${color} bg-opacity-20 mr-4`}>
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-lg mb-1">{title}</h3>
          <p className="text-gray-600 text-sm mb-3">{description}</p>
          <button className={`text-sm font-medium ${color} hover:underline focus:outline-none`}>
            {actionText}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default HealthInsight;