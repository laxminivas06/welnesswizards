import { 
  Activity, 
  Heart, 
  Footprints, 
  Flame, 
  Moon, 
  Apple, 
  Droplets, 
  Award, 
  Dumbbell, 
  Utensils, 
  Zap, 
  Clock, 
  Smile, 
  AlertTriangle 
} from 'lucide-react';
import React from 'react';

export const activityData = [
  { name: 'Mon', steps: 7500, calories: 2100, sleep: 7.2 },
  { name: 'Tue', steps: 9200, calories: 2300, sleep: 6.8 },
  { name: 'Wed', steps: 8100, calories: 2200, sleep: 7.5 },
  { name: 'Thu', steps: 10500, calories: 2400, sleep: 8.1 },
  { name: 'Fri', steps: 9800, calories: 2350, sleep: 7.8 },
  { name: 'Sat', steps: 6500, calories: 2150, sleep: 8.5 },
  { name: 'Sun', steps: 7200, calories: 2050, sleep: 7.9 },
];

export const healthMetrics = [
  { 
    title: 'Heart Rate', 
    value: '72 bpm', 
    icon: React.createElement(Heart, { size: 24, className: 'text-red-500' }),
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    trend: { value: 3, isPositive: false }
  },
  { 
    title: 'Steps', 
    value: '9,248', 
    icon: React.createElement(Footprints, { size: 24, className: 'text-blue-500' }),
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    trend: { value: 12, isPositive: true }
  },
  { 
    title: 'Calories', 
    value: '1,840', 
    icon: React.createElement(Flame, { size: 24, className: 'text-orange-500' }),
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
    trend: { value: 5, isPositive: true }
  },
  { 
    title: 'Sleep', 
    value: '7.5 hrs', 
    icon: React.createElement(Moon, { size: 24, className: 'text-purple-500' }),
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    trend: { value: 8, isPositive: true }
  },
];

export const dailyGoals = [
  { 
    title: 'Steps', 
    current: 9248, 
    target: 10000, 
    unit: 'steps',
    color: '#3b82f6',
    icon: React.createElement(Footprints, { size: 20, className: 'text-blue-500' })
  },
  { 
    title: 'Water', 
    current: 1.8, 
    target: 2.5, 
    unit: 'L',
    color: '#0ea5e9',
    icon: React.createElement(Droplets, { size: 20, className: 'text-sky-500' })
  },
  { 
    title: 'Calories', 
    current: 1840, 
    target: 2200, 
    unit: 'kcal',
    color: '#f97316',
    icon: React.createElement(Flame, { size: 20, className: 'text-orange-500' })
  },
  { 
    title: 'Activity', 
    current: 45, 
    target: 60, 
    unit: 'min',
    color: '#10b981',
    icon: React.createElement(Activity, { size: 20, className: 'text-green-500' })
  },
];

export const badges = [
  { 
    name: 'Step Master', 
    icon: React.createElement(Footprints, { size: 24, className: 'text-white' }),
    isEarned: true,
    description: '10,000 steps for 7 days in a row'
  },
  { 
    name: 'Early Bird', 
    icon: React.createElement(Clock, { size: 24, className: 'text-white' }),
    isEarned: true,
    description: 'Wake up before 6 AM for 5 days'
  },
  { 
    name: 'Workout Warrior', 
    icon: React.createElement(Dumbbell, { size: 24, className: 'text-white' }),
    isEarned: false,
    description: 'Complete 10 workouts in a month'
  },
  { 
    name: 'Nutrition Pro', 
    icon: React.createElement(Apple, { size: 24, className: 'text-white' }),
    isEarned: false,
    description: 'Log all meals for 14 days straight'
  },
];

export const healthInsights = [
  { 
    title: 'Sleep pattern improving', 
    description: 'Your sleep consistency has improved by 15% this week. Keep maintaining a regular sleep schedule.',
    actionText: 'View sleep details',
    icon: React.createElement(Moon, { size: 20, className: 'text-purple-500' }),
    color: 'border-purple-500'
  },
  { 
    title: 'Hydration needs attention', 
    description: 'You\'ve been below your water intake goal for 3 days. Try to drink at least 2.5L today.',
    actionText: 'Set reminders',
    icon: React.createElement(Droplets, { size: 20, className: 'text-blue-500' }),
    color: 'border-blue-500'
  },
  { 
    title: 'Stress levels elevated', 
    description: 'Your heart rate variability indicates higher stress. Consider taking short breaks during work.',
    actionText: 'Try breathing exercise',
    icon: React.createElement(AlertTriangle, { size: 20, className: 'text-amber-500' }),
    color: 'border-amber-500'
  },
];

export const recommendations = [
  {
    title: 'Morning Yoga Routine',
    description: 'A 15-minute yoga sequence to boost your energy and flexibility.',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Exercise',
    categoryColor: 'bg-green-100 text-green-800'
  },
  {
    title: 'Balanced Breakfast Ideas',
    description: 'Quick and nutritious breakfast recipes to start your day right.',
    image: 'https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Nutrition',
    categoryColor: 'bg-orange-100 text-orange-800'
  },
  {
    title: 'Mindful Meditation',
    description: 'A guided 10-minute meditation to reduce stress and improve focus.',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    category: 'Mental Health',
    categoryColor: 'bg-purple-100 text-purple-800'
  },
];