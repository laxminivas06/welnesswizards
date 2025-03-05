import React from 'react';
import { motion } from 'framer-motion';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: string;
  bgColor: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const MetricCard: React.FC<MetricCardProps> = ({ 
  title, 
  value, 
  icon, 
  color, 
  bgColor,
  trend 
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className={`p-6 rounded-xl card-hover ${bgColor} shadow-md`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
          
          {trend && (
            <div className="flex items-center mt-2">
              <span className={trend.isPositive ? 'text-green-500' : 'text-red-500'}>
                {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
              </span>
              <span className="text-gray-500 text-xs ml-1">vs last week</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full ${color} bg-opacity-20`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default MetricCard;