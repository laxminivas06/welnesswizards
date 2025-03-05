import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface ActivityData {
  name: string;
  steps: number;
  calories: number;
  sleep: number;
}

interface ActivityChartProps {
  data: ActivityData[];
}

const ActivityChart: React.FC<ActivityChartProps> = ({ data }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-semibold mb-4">Weekly Activity</h2>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <YAxis 
              tick={{ fontSize: 12 }} 
              tickLine={false}
              axisLine={{ stroke: '#e5e7eb' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: 'none', 
                borderRadius: '8px', 
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' 
              }}
            />
            <Area 
              type="monotone" 
              dataKey="steps" 
              stackId="1"
              stroke="#3b82f6" 
              fill="#93c5fd" 
              fillOpacity={0.6}
            />
            <Area 
              type="monotone" 
              dataKey="calories" 
              stackId="2"
              stroke="#10b981" 
              fill="#6ee7b7" 
              fillOpacity={0.6}
            />
            <Area 
              type="monotone" 
              dataKey="sleep" 
              stackId="3"
              stroke="#8b5cf6" 
              fill="#c4b5fd" 
              fillOpacity={0.6}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center mt-4 space-x-6">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-primary mr-2"></div>
          <span className="text-sm text-gray-600">Steps</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-secondary mr-2"></div>
          <span className="text-sm text-gray-600">Calories</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-accent mr-2"></div>
          <span className="text-sm text-gray-600">Sleep</span>
        </div>
      </div>
    </div>
  );
};

export default ActivityChart;