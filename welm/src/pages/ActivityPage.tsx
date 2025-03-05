import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Footprints, 
  Heart, 
  Clock, 
  Flame, 
  TrendingUp 
} from 'lucide-react';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface ActivityPageProps {
  userName: string;
}

const ActivityPage: React.FC<ActivityPageProps> = ({ userName }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [dateRange, setDateRange] = useState('week');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [currentSteps, setCurrentSteps] = useState(9248);
  const [currentHeartRate, setCurrentHeartRate] = useState(128);
  const [currentCalories, setCurrentCalories] = useState(1840);
  const [currentActiveTime, setCurrentActiveTime] = useState(345); // in minutes
  
  // Format date range string
  const formatDateRange = () => {
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
    
    if (dateRange === 'day') {
      return currentDate.toLocaleDateString('en-US', options);
    } else if (dateRange === 'week') {
      const startOfWeek = new Date(currentDate);
      startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
      
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);
      
      return `${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', options)}`;
    } else {
      return currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    }
  };
  
  // Navigate dates
  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentDate);
    
    if (dateRange === 'day') {
      newDate.setDate(currentDate.getDate() + (direction === 'next' ? 1 : -1));
    } else if (dateRange === 'week') {
      newDate.setDate(currentDate.getDate() + (direction === 'next' ? 7 : -7));
    } else {
      newDate.setMonth(currentDate.getMonth() + (direction === 'next' ? 1 : -1));
    }
    
    setCurrentDate(newDate);
    
    // Simulate changing data when date changes
    simulateDataChange();
  };
  
  // Simulate data changes
  const simulateDataChange = () => {
    // Random variations to simulate real data
    setCurrentSteps(Math.floor(8000 + Math.random() * 4000));
    setCurrentHeartRate(Math.floor(110 + Math.random() * 40));
    setCurrentCalories(Math.floor(1600 + Math.random() * 800));
    setCurrentActiveTime(Math.floor(300 + Math.random() * 120));
    
    // Update weekly data
    const newWeeklyData = weeklyData.map(day => ({
      ...day,
      steps: Math.floor(6000 + Math.random() * 7000),
      calories: Math.floor(300 + Math.random() * 400),
      distance: parseFloat((3 + Math.random() * 5).toFixed(1)),
      duration: Math.floor(30 + Math.random() * 60),
      heartRate: Math.floor(110 + Math.random() * 40)
    }));
    
    setWeeklyData(newWeeklyData);
  };
  
  // Format active time
  const formatActiveTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  // Mock data
  const [weeklyData, setWeeklyData] = useState([
    { day: 'Mon', steps: 8245, calories: 420, distance: 5.2, duration: 45, heartRate: 125 },
    { day: 'Tue', steps: 10123, calories: 520, distance: 6.8, duration: 60, heartRate: 132 },
    { day: 'Wed', steps: 7890, calories: 380, distance: 4.9, duration: 40, heartRate: 128 },
    { day: 'Thu', steps: 12456, calories: 610, distance: 7.8, duration: 75, heartRate: 140 },
    { day: 'Fri', steps: 9870, calories: 490, distance: 6.1, duration: 55, heartRate: 130 },
    { day: 'Sat', steps: 6540, calories: 320, distance: 4.1, duration: 35, heartRate: 122 },
    { day: 'Sun', steps: 8760, calories: 430, distance: 5.5, duration: 50, heartRate: 127 },
  ]);
  
  const activityTypes = [
    { type: 'Walking', duration: 180, calories: 450, icon: <Footprints size={20} className="text-blue-500" /> },
    { type: 'Running', duration: 60, calories: 520, icon: <TrendingUp size={20} className="text-green-500" /> },
    { type: 'Cycling', duration: 45, calories: 380, icon: <TrendingUp size={20} className="text-purple-500" /> },
    { type: 'Gym', duration: 90, calories: 410, icon: <TrendingUp size={20} className="text-orange-500" /> },
  ];
  
  const heartRateZones = [
    { name: 'Rest (60-70 bpm)', value: 15 },
    { name: 'Fat Burn (70-120 bpm)', value: 45 },
    { name: 'Cardio (120-150 bpm)', value: 30 },
    { name: 'Peak (150+ bpm)', value: 10 },
  ];
  
  // Simulate real-time data updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Small random variations to simulate real-time data
      setCurrentSteps(prev => Math.min(prev + Math.floor(Math.random() * 20), 15000));
      setCurrentHeartRate(prev => {
        const variation = Math.floor(Math.random() * 5) - 2; // -2 to +2
        return Math.max(60, Math.min(prev + variation, 180));
      });
      setCurrentCalories(prev => Math.min(prev + Math.floor(Math.random() * 10), 3000));
      setCurrentActiveTime(prev => Math.min(prev + Math.floor(Math.random() * 2), 720));
    }, 10000); // Update every 10 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Activity Tracking</h1>
        
        <div className="flex items-center space-x-2">
          <button 
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100"
            onClick={() => navigateDate('prev')}
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm">
            <CalendarIcon size={18} className="text-gray-500" />
            <span className="font-medium">{formatDateRange()}</span>
          </div>
          
          <button 
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100"
            onClick={() => navigateDate('next')}
          >
            <ChevronRight size={20} />
          </button>
        </div>
        
        <div className="flex bg-gray-100 p-1 rounded-lg">
          <button 
            className={`px-4 py-1 rounded-md ${dateRange === 'day' ? 'bg-white shadow-sm' : ''}`}
            onClick={() => setDateRange('day')}
          >
            Day
          </button>
          <button 
            className={`px-4 py-1 rounded-md ${dateRange === 'week' ? 'bg-white shadow-sm' : ''}`}
            onClick={() => setDateRange('week')}
          >
            Week
          </button>
          <button 
            className={`px-4 py-1 rounded-md ${dateRange === 'month' ? 'bg-white shadow-sm' : ''}`}
            onClick={() => setDateRange('month')}
          >
            Month
          </button>
        </div>
      </div>
      
      {/* Rest of your component */}
    </div>
  );
};

export default ActivityPage;