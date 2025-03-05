import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Heart, Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface AIAssistantProps {
  onClose: () => void;
}

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  time: string;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your Wellness Wizard assistant. Based on your recent activity, I notice you've been meeting your step goals but your sleep has been inconsistent. How can I help you today?",
      sender: 'ai',
      time: formatTime(new Date())
    }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  function formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  const handleSendMessage = () => {
    if (inputText.trim() === '') return;

    // Add user message
    const newUserMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      sender: 'user',
      time: formatTime(new Date())
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInputText('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputText);
      const newAIMessage: Message = {
        id: messages.length + 2,
        text: aiResponse,
        sender: 'ai',
        time: formatTime(new Date())
      };
      
      setMessages(prev => [...prev, newAIMessage]);
    }, 1000);
  };

  const generateAIResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('sleep') || lowerQuestion.includes('insomnia') || lowerQuestion.includes('tired')) {
      return "Based on your sleep data, I notice you're often active on your devices right before bed. Research suggests blue light from screens can disrupt melatonin production. Try these tips: 1) Avoid screens 1 hour before bedtime, 2) Create a consistent sleep schedule, 3) Keep your bedroom cool (around 65°F/18°C), 4) Try a 10-minute meditation before sleep. Would you like me to create a personalized sleep improvement plan?";
    } 
    else if (lowerQuestion.includes('diet') || lowerQuestion.includes('food') || lowerQuestion.includes('eat') || lowerQuestion.includes('nutrition')) {
      return "Looking at your nutrition logs, I see you're getting adequate protein but could increase your fiber intake. Consider adding more whole grains, fruits, and vegetables to your meals. Your calorie intake is within the recommended range for your activity level. Would you like some healthy recipe suggestions that match your dietary preferences?";
    }
    else if (lowerQuestion.includes('exercise') || lowerQuestion.includes('workout') || lowerQuestion.includes('training') || lowerQuestion.includes('run')) {
      return "Your activity data shows you've been consistent with cardio workouts but might benefit from adding more strength training. Research shows that a balanced approach to fitness yields the best results for overall health. Based on your goals, I recommend 3 days of cardio and 2 days of strength training per week. Would you like a customized workout plan?";
    }
    else if (lowerQuestion.includes('stress') || lowerQuestion.includes('anxiety') || lowerQuestion.includes('mental health')) {
      return "I've noticed patterns in your heart rate variability that might indicate elevated stress levels, particularly in the afternoons. Mindfulness practices have been shown to effectively reduce stress. I recommend trying the 4-7-8 breathing technique: inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds. Would you like me to suggest a 5-minute guided meditation you can do at your desk?";
    }
    else if (lowerQuestion.includes('water') || lowerQuestion.includes('hydration') || lowerQuestion.includes('drink')) {
      return "Your hydration tracking shows you're averaging about 1.5 liters of water daily, which is below the recommended 2.5 liters for someone with your activity level. Proper hydration improves energy levels, cognitive function, and helps with recovery after exercise. I suggest setting reminders throughout the day and keeping a water bottle visible at your workspace. Would you like me to set up hydration reminders?";
    }
    else if (lowerQuestion.includes('goal') || lowerQuestion.includes('target') || lowerQuestion.includes('aim')) {
      return "Based on your current fitness level and historical data, I recommend setting these goals for the next month: 1) Increase daily step count to 11,000 (currently averaging 9,248), 2) Add one more strength training session per week, 3) Improve sleep consistency by maintaining the same bedtime (±30 minutes) at least 6 nights per week. These goals are challenging but achievable based on your progress so far. Would you like to adjust any of these targets?";
    }
    else if (lowerQuestion.includes('weight') || lowerQuestion.includes('lose') || lowerQuestion.includes('gain')) {
      return "Your weight has been stable at 68kg for the past month, which is within the healthy range for your height. If you're looking to modify your body composition, I'd recommend focusing on strength training to build lean muscle rather than focusing solely on weight. Remember that muscle is denser than fat, so the scale might not change much even as your body composition improves. Would you like some body composition improvement strategies?";
    }
    else if (lowerQuestion.includes('vitamin') || lowerQuestion.includes('supplement') || lowerQuestion.includes('nutrient')) {
      return "Based on your food logs, you might benefit from increasing your vitamin D and magnesium intake. These nutrients are important for energy production, muscle recovery, and overall health. Good food sources include fatty fish, eggs, and sunlight exposure for vitamin D; and nuts, seeds, and leafy greens for magnesium. Would you like me to analyze your diet more thoroughly for potential nutrient gaps?";
    }
    else if (lowerQuestion.includes('heart') || lowerQuestion.includes('cardiovascular') || lowerQuestion.includes('blood pressure')) {
      return "Your resting heart rate has averaged 68 bpm over the past month, which is in the healthy range. Your heart rate variability shows good recovery patterns after exercise. To maintain cardiovascular health, continue with your regular cardio activities and consider adding interval training once a week for additional heart benefits. Would you like more detailed analysis of your cardiovascular metrics?";
    }
    else if (lowerQuestion.includes('recipe') || lowerQuestion.includes('cook') || lowerQuestion.includes('meal')) {
      return "Based on your nutritional preferences and health goals, here's a quick recipe you might enjoy: Mediterranean Quinoa Bowl with grilled chicken, cucumber, tomatoes, feta cheese, and olive oil dressing. It provides a good balance of protein, complex carbs, and healthy fats. This meal takes about 20 minutes to prepare and aligns with your goal of increasing fiber intake. Would you like more recipe suggestions for the week?";
    }
    else {
      return "Thank you for your question. Based on your health data and activity patterns, I can provide personalized insights to help you optimize your wellness journey. Your recent metrics show improvements in daily activity but opportunities for better sleep quality and hydration. Is there a specific aspect of your health you'd like me to analyze in more detail?";
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const clearConversation = () => {
    setMessages([
      {
        id: 1,
        text: "Hello! I'm your Wellness Wizard assistant. How can I help you today?",
        sender: 'ai',
        time: formatTime(new Date())
      }
    ]);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-accent p-4 text-white flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-white bg-opacity-20 p-2 rounded-full mr-3">
              <Heart size={20} className="text-white" />
            </div>
            <h2 className="font-semibold text-lg">Wellness Wizard Assistant</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-white hover:bg-white hover:bg-opacity-20 p-1 rounded-full"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Chat Area */}
        <div className="h-80 overflow-y-auto p-4 bg-gray-50">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`flex mb-4 ${message.sender === 'user' ? 'justify-end' : ''}`}
            >
              {message.sender === 'ai' && (
                <div className="bg-primary p-2 rounded-full mr-3 self-start">
                  <Heart size={16} className="text-white" />
                </div>
              )}
              
              <div 
                className={`p-3 rounded-lg shadow-sm max-w-[80%] ${
                  message.sender === 'user' ? 'bg-blue-100' : 'bg-white'
                }`}
              >
                <p className="text-gray-800 whitespace-pre-line">{message.text}</p>
                <span className="text-xs text-gray-500 mt-1 block">{message.time}</span>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Input Area */}
        <div className="p-4 border-t">
          <div className="flex">
            <input 
              type="text" 
              placeholder="Ask me anything about your health..." 
              className="flex-1 border border-gray-300 rounded-l-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
            />
            <button 
              className="bg-primary text-white px-4 py-2 rounded-r-lg hover:bg-primary-dark"
              onClick={handleSendMessage}
            >
              <Send size={20} />
            </button>
          </div>
          <div className="mt-2 flex justify-between text-xs text-gray-500">
            <span>Powered by AI health insights</span>
            <button 
              className="text-primary hover:underline flex items-center"
              onClick={clearConversation}
            >
              <Trash2 size={12} className="mr-1" />
              Clear conversation
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AIAssistant;