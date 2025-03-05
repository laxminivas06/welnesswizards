import React, { useState } from 'react';
// Import useTranslation hook
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
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import ActivityPage from './pages/ActivityPage';
import NutritionPage from './pages/NutritionPage';
import CalendarPage from './pages/CalendarPage';
import ProfilePage from './pages/ProfilePage';
import SettingsPage from './pages/SettingsPage';
import AIAssistant from './components/AIAssistant';

function App() {
  const { t } = useTranslation(); // Use the useTranslation hook
  const [activeItem, setActiveItem] = useState('dashboard');
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [userName, setUserName] = useState('Alex');

  // Render the active page based on sidebar selection
  const renderActivePage = () => {
    switch (activeItem) {
      case 'dashboard':
        return <Dashboard userName={userName} />;
      case 'activity':
        return <ActivityPage userName={userName} />;
      case 'nutrition':
        return <NutritionPage userName={userName} />;
      case 'calendar':
        return <CalendarPage userName={userName} />;
      case 'profile':
        return <ProfilePage userName={userName} setUserName={setUserName} />;
      case 'settings':
        return <SettingsPage userName={userName} />;
      default:
        return <Dashboard userName={userName} />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          pageTitle={t(activeItem)} // Use translated text for the page title
          userName={userName}
        />
        
        <main className="flex-1 overflow-y-auto scroll-container p-6 relative">
          {renderActivePage()}
          
          {/* Floating AI Assistant Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-6 right-6 bg-gradient-to-r from-primary to-accent p-4 rounded-full shadow-lg text-white z-10"
            onClick={() => setShowAIAssistant(true)}
          >
            <Heart size={24} />
          </motion.button>
          
          {/* AI Assistant Modal */}
          {showAIAssistant && (
            <AIAssistant onClose={() => setShowAIAssistant(false)} />
          )}
        </main>
      </div>
    </div>
  );
}

export default App;