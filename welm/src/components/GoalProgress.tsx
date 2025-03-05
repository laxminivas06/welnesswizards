import React from 'react';
import ProgressRing from './ProgressRing';
import { motion } from 'framer-motion';

interface GoalProgressProps {
  title: string;
  current: number;
  target: number;
  unit: string;
  color: string;
  icon: React.ReactNode;
}

const GoalProgress: React.FC<GoalProgressProps> = ({ 
  title, 
  current, 
  target, 
  unit, 
  color,
  icon
}) => {
  const progress = Math.min(Math.round((current / target) * 100), 100);
  
  return (
    <motion.div 
      whileHover={{ scale: 1.03 }}
      className="bg-white p-5 rounded-xl shadow-md flex items-center"
    >
      <div className="relative mr-4">
        <ProgressRing 
          radius={40} 
          stroke={8} 
          progress={progress} 
          color={color} 
        />
        <div className="absolute inset-0 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div>
        <h3 className="font-medium text-gray-700">{title}</h3>
        <div className="flex items-baseline">
          <span className="text-2xl font-bold">{current}</span>
          <span className="text-gray-500 ml-1">/ {target} {unit}</span>
        </div>
        <div className="mt-1">
          <span 
            className={`text-sm font-medium ${progress >= 100 ? 'text-green-500' : 'text-gray-500'}`}
          >
            {progress}% {progress >= 100 ? 'Completed!' : 'of daily goal'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default GoalProgress;