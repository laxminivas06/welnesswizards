import React from 'react';
import { 
  Activity, 
  Heart, 
  Footprints, 
  Flame, 
  Moon, 
  Apple, 
  Droplets 
} from 'lucide-react';
import { motion } from 'framer-motion';

// Components
import MetricCard from '../components/MetricCard';
import ActivityChart from '../components/ActivityChart';
import GoalProgress from '../components/GoalProgress';
import Badge from '../components/Badge';
import HealthInsight from '../components/HealthInsight';
import RecommendationCard from '../components/RecommendationCard';

// Mock Data
import { 
  activityData, 
  healthMetrics, 
  dailyGoals, 
  badges, 
  healthInsights,
  recommendations
} from '../data/mockData';

interface DashboardProps {
  userName: string;
}

const Dashboard: React.FC<DashboardProps> = ({ userName }) => {
  return (
    <div className="max-w-7xl mx-auto">
      {/* Health Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {healthMetrics.map((metric, index) => (
          <MetricCard 
            key={index}
            title={metric.title}
            value={metric.value}
            icon={metric.icon}
            color={metric.color}
            bgColor={metric.bgColor}
            trend={metric.trend}
          />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Activity Chart */}
        <div className="lg:col-span-2">
          <ActivityChart data={activityData} />
        </div>
        
        {/* Health Insights */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Health Insights</h2>
          <div className="space-y-4">
            {healthInsights.map((insight, index) => (
              <HealthInsight 
                key={index}
                title={insight.title}
                description={insight.description}
                actionText={insight.actionText}
                icon={insight.icon}
                color={insight.color}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* Daily Goals */}
      <h2 className="text-xl font-semibold mb-4">Daily Goals</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {dailyGoals.map((goal, index) => (
          <GoalProgress 
            key={index}
            title={goal.title}
            current={goal.current}
            target={goal.target}
            unit={goal.unit}
            color={goal.color}
            icon={goal.icon}
          />
        ))}
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Badges */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Achievements</h2>
          <div className="grid grid-cols-2 gap-2">
            {badges.map((badge, index) => (
              <Badge 
                key={index}
                name={badge.name}
                icon={badge.icon}
                isEarned={badge.isEarned}
                description={badge.description}
              />
            ))}
          </div>
        </div>
        
        {/* Recommendations */}
        <div className="lg:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Personalized Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendations.map((recommendation, index) => (
              <RecommendationCard 
                key={index}
                title={recommendation.title}
                description={recommendation.description}
                image={recommendation.image}
                category={recommendation.category}
                categoryColor={recommendation.categoryColor}
              />
            ))}
          </div>
        </div>
      </div>
      
      {/* AI Health Assistant Teaser */}
      <div className="bg-gradient-to-r from-primary to-accent p-6 rounded-xl shadow-md text-white mb-8">
        <div className="flex items-start">
          <div className="bg-white bg-opacity-20 p-3 rounded-full mr-4">
            <Heart size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">AI Health Assistant</h2>
            <p className="mb-4 opacity-90">
              Based on your recent activity patterns and sleep data, I recommend focusing on hydration and taking short walks during your work breaks today.
            </p>
            <div className="flex space-x-3">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-primary font-medium px-4 py-2 rounded-lg"
              >
                Ask a question
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white bg-opacity-20 font-medium px-4 py-2 rounded-lg"
              >
                View insights
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;