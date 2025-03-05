import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Clock, 
  Calendar as CalendarIcon,
  Activity,
  Utensils,
  Moon,
  Heart,
  X,
  Save
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CalendarPageProps {
  userName: string;
}

interface Event {
  id: number;
  title: string;
  time: string;
  duration: string;
  type: 'activity' | 'nutrition' | 'health' | 'sleep';
  icon: React.ReactNode;
  details: string;
  date: Date;
}

const CalendarPage: React.FC<CalendarPageProps> = ({ userName }) => {
  const [currentMonth, setCurrentMonth] = useState('');
  const [currentMonthIndex, setCurrentMonthIndex] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [calendarDays, setCalendarDays] = useState<{day: number, date: Date, events: Event[]}[]>([]);
  const [firstDayOfMonth, setFirstDayOfMonth] = useState(0);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showEventDetails, setShowEventDetails] = useState<Event | null>(null);
  
  // New event form state
  const [newEvent, setNewEvent] = useState<{
    title: string;
    time: string;
    duration: string;
    type: 'activity' | 'nutrition' | 'health' | 'sleep';
    details: string;
  }>({
    title: '',
    time: '08:00',
    duration: '30 min',
    type: 'activity',
    details: ''
  });
  
  // Mock events
  const [events, setEvents] = useState<Event[]>([
    { 
      id: 1, 
      title: 'Morning Run', 
      time: '6:30 AM', 
      duration: '45 min', 
      type: 'activity',
      icon: <Activity size={16} className="text-green-500" />,
      details: 'Planned 5k run at moderate pace',
      date: new Date(currentYear, currentMonthIndex, 21)
    },
    { 
      id: 2, 
      title: 'Breakfast', 
      time: '8:00 AM', 
      duration: '30 min', 
      type: 'nutrition',
      icon: <Utensils size={16} className="text-orange-500" />,
      details: 'Oatmeal with berries and Greek yogurt',
      date: new Date(currentYear, currentMonthIndex, 21)
    },
    { 
      id: 3, 
      title: 'Yoga Session', 
      time: '12:30 PM', 
      duration: '60 min', 
      type: 'activity',
      icon: <Activity size={16} className="text-green-500" />,
      details: 'Flexibility and balance focused yoga',
      date: new Date(currentYear, currentMonthIndex, 21)
    },
    { 
      id: 4, 
      title: 'Lunch', 
      time: '1:45 PM', 
      duration: '45 min', 
      type: 'nutrition',
      icon: <Utensils size={16} className="text-orange-500" />,
      details: 'Grilled chicken salad with olive oil dressing',
      date: new Date(currentYear, currentMonthIndex, 21)
    },
    { 
      id: 5, 
      title: 'Health Check', 
      time: '4:00 PM', 
      duration: '30 min', 
      type: 'health',
      icon: <Heart size={16} className="text-red-500" />,
      details: 'Blood pressure and heart rate monitoring',
      date: new Date(currentYear, currentMonthIndex, 21)
    },
    { 
      id: 6, 
      title: 'Dinner', 
      time: '7:00 PM', 
      duration: '60 min', 
      type: 'nutrition',
      icon: <Utensils size={16} className="text-orange-500" />,
      details: 'Salmon with brown rice and vegetables',
      date: new Date(currentYear, currentMonthIndex, 21)
    },
    { 
      id: 7, 
      title: 'Sleep', 
      time: '10:30 PM', 
      duration: '8 hours', 
      type: 'sleep',
      icon: <Moon size={16} className="text-purple-500" />,
      details: 'Target 8 hours of sleep with 30 min wind-down routine',
      date: new Date(currentYear, currentMonthIndex, 21)
    },
    { 
      id: 8, 
      title: 'Yoga Class', 
      time: '9:00 AM', 
      duration: '60 min', 
      type: 'activity',
      icon: <Activity size={16} className="text-green-500" />,
      details: 'Group yoga class at the fitness center',
      date: new Date(currentYear, currentMonthIndex, 15)
    },
    { 
      id: 9, 
      title: 'Annual Health Check', 
      time: '2:00 PM', 
      duration: '90 min', 
      type: 'health',
      icon: <Heart size={16} className="text-red-500" />,
      details: 'Complete physical examination and blood work',
      date: new Date(currentYear, currentMonthIndex, 28)
    },
  ]);
  
  // Initialize calendar
  useEffect(() => {
    updateCalendar();
  }, [currentMonthIndex, currentYear, events]);
  
  // Update calendar when month/year changes
  const updateCalendar = () => {
    const date = new Date(currentYear, currentMonthIndex, 1);
    const month = date.toLocaleString('default', { month: 'long' });
    setCurrentMonth(`${month} ${currentYear}`);
    
    const firstDay = new Date(currentYear, currentMonthIndex, 1).getDay();
    setFirstDayOfMonth(firstDay);
    
    const daysInMonth = new Date(currentYear, currentMonthIndex + 1, 0).getDate();
    
    const days = [];
    for (let i = 1; i <= daysInMonth; i++) {
      const dayDate = new Date(currentYear, currentMonthIndex, i);
      const dayEvents = events.filter(event => 
        event.date.getDate() === i && 
        event.date.getMonth() === currentMonthIndex && 
        event.date.getFullYear() === currentYear
      );
      days.push({ day: i, date: dayDate, events: dayEvents });
    }
    
    setCalendarDays(days);
  };
  
  // Navigate to previous month
  const prevMonth = () => {
    if (currentMonthIndex === 0) {
      setCurrentMonthIndex(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonthIndex(currentMonthIndex - 1);
    }
  };
  
  // Navigate to next month
  const nextMonth = () => {
    if (currentMonthIndex === 11) {
      setCurrentMonthIndex(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonthIndex(currentMonthIndex + 1);
    }
  };
  
  // Get day of week for selected date
  const getDayOfWeek = () => {
    const date = new Date(currentYear, currentMonthIndex, selectedDate);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };
  
  // Get events for the selected date
  const getSelectedDateEvents = () => {
    return events.filter(event => 
      event.date.getDate() === selectedDate && 
      event.date.getMonth() === currentMonthIndex && 
      event.date.getFullYear() === currentYear
    );
  };
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({ ...prev, [name]: value }));
  };
  
  // Add new event
  const addEvent = () => {
    const newEventObj: Event = {
      id: events.length + 1,
      title: newEvent.title,
      time: newEvent.time,
      duration: newEvent.duration,
      type: newEvent.type,
      details: newEvent.details,
      date: new Date(currentYear, currentMonthIndex, selectedDate),
      icon: 
        newEvent.type === 'activity' ? <Activity size={16} className="text-green-500" /> :
        newEvent.type === 'nutrition' ? <Utensils size={16} className="text-orange-500" /> :
        newEvent.type === 'health' ? <Heart size={16} className="text-red-500" /> :
        <Moon size={16} className="text-purple-500" />
    };
    
    setEvents([...events, newEventObj]);
    setShowAddEvent(false);
    
    // Reset form
    setNewEvent({
      title: '',
      time: '08:00',
      duration: '30 min',
      type: 'activity',
      details: ''
    });
  };
  
  // Format time for display
  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    return `${hour > 12 ? hour - 12 : hour}:${minutes} ${hour >= 12 ? 'PM' : 'AM'}`;
  };
  
  // View event details
  const viewEventDetails = (event: Event) => {
    setShowEventDetails(event);
  };
  
  // Close event details
  const closeEventDetails = () => {
    setShowEventDetails(null);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Calendar Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Health Calendar</h1>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <button 
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              onClick={prevMonth}
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="mx-4 font-medium text-lg">{currentMonth}</div>
            
            <button 
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100"
              onClick={nextMonth}
            >
              <ChevronRight size={20} />
            </button>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-white px-4 py-2 rounded-lg flex items-center"
            onClick={() => setShowAddEvent(true)}
          >
            <Plus size={18} className="mr-1" />
            Add Event
          </motion.button>
        </div>
      </div>
      
      {/* Calendar Grid */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="grid grid-cols-7 gap-1 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
            <div key={index} className="text-center font-medium text-gray-500 py-2">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {/* Empty cells for days before the 1st of the month */}
          {Array(firstDayOfMonth).fill(null).map((_, index) => (
            <div key={`empty-${index}`} className="h-24 p-1 bg-gray-50 rounded-lg"></div>
          ))}
          
          {calendarDays.map(({ day, date, events }) => (
            <motion.div
              key={day}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedDate(day)}
              className={`h-24 p-1 rounded-lg border cursor-pointer ${
                selectedDate === day 
                  ? 'border-primary bg-blue-50' 
                  : 'border-gray-200 hover:border-primary hover:bg-blue-50'
              }`}
            >
              <div className="flex justify-between items-start p-1">
                <span className={`text-sm font-medium ${selectedDate === day ? 'text-primary' : ''}`}>
                  {day}
                </span>
                {events.length > 0 && (
                  <span className={`w-2 h-2 rounded-full ${
                    events.some(e => e.type === 'activity') ? 'bg-green-500' :
                    events.some(e => e.type === 'health') ? 'bg-red-500' :
                    events.some(e => e.type === 'nutrition') ? 'bg-orange-500' :
                    'bg-purple-500'
                  }`}></span>
                )}
              </div>
              
              {/* Event indicators */}
              {events.length > 0 && (
                <div className="mt-1 space-y-1">
                  {events.slice(0, 2).map((event, idx) => (
                    <div 
                      key={idx} 
                      className={`text-xs px-1 py-0.5 rounded truncate ${
                        event.type === 'activity' ? 'bg-green-100 text-green-800' :
                        event.type === 'nutrition' ? 'bg-orange-100 text-orange-800' :
                        event.type === 'health' ? 'bg-red-100 text-red-800' :
                        'bg-purple-100 text-purple-800'
                      }`}
                    >
                      {event.title}
                    </div>
                  ))}
                  {events.length > 2 && (
                    <div className="text-xs text-gray-500 px-1">+{events.length - 2} more</div>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Selected Day Events */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">
              {new Date(currentYear, currentMonthIndex, selectedDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </h2>
            <p className="text-gray-500">{getDayOfWeek()}</p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-white px-4 py-2 rounded-lg flex items-center"
            onClick={() => setShowAddEvent(true)}
          >
            <Plus size={18} className="mr-1" />
            Add Event
          </motion.button>
        </div>
        
        {getSelectedDateEvents().length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <CalendarIcon size={48} className="mx-auto mb-4 text-gray-300" />
            <p>No events scheduled for this day</p>
            <button 
              className="mt-4 text-primary font-medium hover:underline"
              onClick={() => setShowAddEvent(true)}
            >
              Add your first event
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {getSelectedDateEvents().map(event => (
              <motion.div 
                key={event.id}
                whileHover={{ x: 5 }}
                className={`p-4 border-l-4 rounded-r-lg shadow-sm ${
                  event.type === 'activity' 
                    ? 'border-green-500 bg-green-50' 
                    : event.type === 'nutrition'
                      ? 'border-orange-500 bg-orange-50'
                      : event.type === 'health'
                        ? 'border-red-500 bg-red-50'
                        : 'border-purple-500 bg-purple-50'
                }`}
                onClick={() => viewEventDetails(event)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      {event.icon}
                      <h3 className="font-medium ml-2">{event.title}</h3>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{event.details}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock size={14} className="mr-1" />
                      {event.time}
                    </div>
                    <p className="text-sm text-gray-500">{event.duration}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      {/* Add Event Modal */}
      <AnimatePresence>
        {showAddEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-md"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Add New Event</h2>
                  <button 
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => setShowAddEvent(false)}
                  >
                    <X size={24} />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Event Title
                    </label>
                    <input 
                      type="text" 
                      name="title"
                      value={newEvent.title}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="e.g., Morning Run"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Event Type
                    </label>
                    <select 
                      name="type"
                      value={newEvent.type}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="activity">Activity</option>
                      <option value="nutrition">Nutrition</option>
                      <option value="health">Health</option>
                      <option value="sleep">Sleep</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Time
                      </label>
                      <input 
                        type="time" 
                        name="time"
                        value={newEvent.time}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Duration
                      </label>
                      <input 
                        type="text" 
                        name="duration"
                        value={newEvent.duration}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="e.g., 30 min"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Details
                    </label>
                    <textarea 
                      name="details"
                      value={newEvent.details}
                      onChange={handleInputChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      rows={3}
                      placeholder="Add any additional details here..."
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-4">
                    <button 
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                      onClick={() => setShowAddEvent(false)}
                    >
                      Cancel
                    </button>
                    <button 
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark flex items-center"
                      onClick={addEvent}
                      disabled={!newEvent.title}
                    >
                      <Save size={18} className="mr-1" />
                      Save Event
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* Event Details Modal */}
      <AnimatePresence>
        {showEventDetails && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-md"
            >
              <div className={`p-6 border-t-4 ${
                showEventDetails.type === 'activity' ? 'border-green-500' :
                showEventDetails.type === 'nutrition' ? 'border-orange-500' :
                showEventDetails.type === 'health' ? 'border-red-500' :
                'border-purple-500'
              }`}>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center">
                    {showEventDetails.icon}
                    <h2 className="text-xl font-semibold ml-2">{showEventDetails.title}</h2>
                  </div>
                  <button 
                    className="text-gray-400 hover:text-gray-600"
                    onClick={closeEventDetails}
                  >
                    <X size={24} />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Date</p>
                      <p className="font-medium">
                        {showEventDetails.date.toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          month: 'long', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Time</p>
                      <p className="font-medium">{showEventDetails.time}</p>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-medium">{showEventDetails.duration}</p>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-500">Details</p>
                    <p className="font-medium">{showEventDetails.details}</p>
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-4">
                    <button 
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                      onClick={closeEventDetails}
                    >
                      Close
                    </button>
                    <button 
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
                    >
                      Edit Event
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CalendarPage;