import React, { useState, useEffect } from 'react';
import { Bell, Search, MessageCircle, X, UserPlus, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  pageTitle: string;
  userName: string;
}

const Header: React.FC<HeaderProps> = ({ pageTitle, userName }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [hasNewNotification, setHasNewNotification] = useState(true);
  const [hasNewMessage, setHasNewMessage] = useState(true);
  const [addedFriends, setAddedFriends] = useState<number[]>([]);
  
  // Mock data
  const notifications = [
    { id: 1, text: 'You reached your step goal today!', time: '2 hours ago', isNew: true },
    { id: 2, text: 'New health insight available', time: '5 hours ago', isNew: true },
    { id: 3, text: 'Your friend Sarah started following you', time: 'Yesterday', isNew: false },
  ];
  
  const messages = [
    { id: 1, sender: 'Sarah', text: 'How was your workout today?', time: '30 min ago', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', isNew: true },
    { id: 2, sender: 'Mike', text: 'Want to join my running challenge?', time: '2 hours ago', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', isNew: true },
    { id: 3, sender: 'Emma', text: 'Check out this new healthy recipe!', time: 'Yesterday', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80', isNew: false },
  ];
  
  const allUsers = [
    { id: 1, name: 'John Smith', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' },
    { id: 2, name: 'Emily Johnson', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' },
    { id: 3, name: 'Michael Brown', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' },
    { id: 4, name: 'Jessica Williams', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' },
    { id: 5, name: 'David Miller', avatar: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' },
    { id: 6, name: 'Sarah Davis', avatar: 'https://images.unsplash.com/photo-1491349174775-aaafddd81942?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80' },
  ];
  
  const searchResults = allUsers.filter(user => 
    searchQuery.length > 0 && user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Simulate new notifications/messages periodically
  useEffect(() => {
    const notificationInterval = setInterval(() => {
      if (!showNotifications) {
        setHasNewNotification(true);
      }
    }, 30000); // 30 seconds
    
    const messageInterval = setInterval(() => {
      if (!showMessages) {
        setHasNewMessage(true);
      }
    }, 45000); // 45 seconds
    
    return () => {
      clearInterval(notificationInterval);
      clearInterval(messageInterval);
    };
  }, [showNotifications, showMessages]);
  
  const handleAddFriend = (userId: number) => {
    if (!addedFriends.includes(userId)) {
      setAddedFriends([...addedFriends, userId]);
    }
  };
  
  const markNotificationsAsRead = () => {
    setHasNewNotification(false);
  };
  
  const markMessagesAsRead = () => {
    setHasNewMessage(false);
  };

  return (
    <header className="bg-white shadow-sm py-4 px-6 relative">
      <div className="flex justify-between items-center">
        <div className="flex-1">
          <h1 className="text-2xl font-bold">{pageTitle}</h1>
          <p className="text-gray-500">Welcome back, {userName}! Here's your health summary.</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {!showSearch ? (
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
              onClick={() => setShowSearch(true)}
            >
              <Search size={20} />
            </motion.button>
          ) : (
            <div className="relative flex items-center">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search friends..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                autoFocus
              />
              <button 
                className="absolute right-2 text-gray-400 hover:text-gray-600"
                onClick={() => {
                  setShowSearch(false);
                  setSearchQuery('');
                }}
              >
                <X size={18} />
              </button>
              
              {/* Search Results Dropdown */}
              {searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto">
                  {searchResults.map(user => (
                    <div key={user.id} className="flex items-center p-3 hover:bg-gray-50 cursor-pointer">
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="w-10 h-10 rounded-full object-cover mr-3"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{user.name}</p>
                      </div>
                      {addedFriends.includes(user.id) ? (
                        <button className="text-green-500 bg-green-50 p-2 rounded-full">
                          <Check size={18} />
                        </button>
                      ) : (
                        <button 
                          className="text-primary hover:bg-primary hover:bg-opacity-10 p-2 rounded-full"
                          onClick={() => handleAddFriend(user.id)}
                        >
                          <UserPlus size={18} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          
          <div className="relative">
            <motion.button 
              whileTap={{ scale: 0.95 }}
              className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full"
              onClick={() => {
                setShowNotifications(!showNotifications);
                if (showNotifications) {
                  markNotificationsAsRead();
                }
                setShowMessages(false);
              }}
            >
              <Bell size={20} />
              {hasNewNotification && (
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              )}
            </motion.button>
            
            {/* Notifications Dropdown */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-10"
                >
                  <div className="p-3 border-b flex justify-between items-center">
                    <h3 className="font-semibold">Notifications</h3>
                    <button 
                      className="text-xs text-primary hover:underline"
                      onClick={markNotificationsAsRead}
                    >
                      Mark all as read
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map(notification => (
                      <div 
                        key={notification.id} 
                        className={`p-3 border-b hover:bg-gray-50 cursor-pointer ${notification.isNew && hasNewNotification ? 'bg-blue-50' : ''}`}
                      >
                        <p className="text-sm">{notification.text}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 text-center">
                    <button className="text-primary text-sm font-medium hover:underline">
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="relative">
            <motion.button 
              whileTap={{ scale: 0.95 }}
              className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-full"
              onClick={() => {
                setShowMessages(!showMessages);
                if (showMessages) {
                  markMessagesAsRead();
                }
                setShowNotifications(false);
              }}
            >
              <MessageCircle size={20} />
              {hasNewMessage && (
                <span className="absolute top-0 right-0 h-2 w-2 bg-primary rounded-full"></span>
              )}
            </motion.button>
            
            {/* Messages Dropdown */}
            <AnimatePresence>
              {showMessages && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-10"
                >
                  <div className="p-3 border-b flex justify-between items-center">
                    <h3 className="font-semibold">Messages</h3>
                    <button 
                      className="text-xs text-primary hover:underline"
                      onClick={markMessagesAsRead}
                    >
                      Mark all as read
                    </button>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {messages.map(message => (
                      <div 
                        key={message.id} 
                        className={`p-3 border-b hover:bg-gray-50 cursor-pointer ${message.isNew && hasNewMessage ? 'bg-blue-50' : ''}`}
                      >
                        <div className="flex items-start">
                          <img 
                            src={message.avatar} 
                            alt={message.sender} 
                            className="w-10 h-10 rounded-full object-cover mr-3"
                          />
                          <div>
                            <p className="font-medium">{message.sender}</p>
                            <p className="text-sm text-gray-600">{message.text}</p>
                            <p className="text-xs text-gray-500 mt-1">{message.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 text-center">
                    <button className="text-primary text-sm font-medium hover:underline">
                      View all messages
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          <div className="flex items-center">
            <img
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
              alt="Profile"
              className="h-10 w-10 rounded-full object-cover border-2 border-primary"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;