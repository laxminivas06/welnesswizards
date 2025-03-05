import React, { useState } from 'react';
import { 
  Apple, 
  Coffee, 
  Utensils, 
  Plus, 
  X, 
  Save, 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon,
  Search,
  Filter,
  BarChart2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface NutritionPageProps {
  userName: string;
}

interface FoodItem {
  id: number;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  time: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
}

interface NutrientData {
  name: string;
  value: number;
  color: string;
}

const NutritionPage: React.FC<NutritionPageProps> = ({ userName }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showAddFood, setShowAddFood] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'meals' | 'stats'>('meals');
  
  // New food form state
  const [newFood, setNewFood] = useState<{
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    time: string;
    mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  }>({
    name: '',
    calories: 0,
    protein: 0,
    carbs: 0,
    fat: 0,
    time: '08:00',
    mealType: 'breakfast'
  });
  
  // Mock food data
  const [foodItems, setFoodItems] = useState<FoodItem[]>([
    {
      id: 1,
      name: 'Greek Yogurt with Berries',
      calories: 220,
      protein: 15,
      carbs: 25,
      fat: 8,
      time: '07:30',
      mealType: 'breakfast'
    },
    {
      id: 2,
      name: 'Grilled Chicken Salad',
      calories: 350,
      protein: 30,
      carbs: 15,
      fat: 18,
      time: '12:30',
      mealType: 'lunch'
    },
    {
      id: 3,
      name: 'Protein Smoothie',
      calories: 180,
      protein: 20,
      carbs: 15,
      fat: 3,
      time: '15:00',
      mealType: 'snack'
    },
    {
      id: 4,
      name: 'Salmon with Quinoa and Vegetables',
      calories: 420,
      protein: 35,
      carbs: 30,
      fat: 15,
      time: '19:00',
      mealType: 'dinner'
    }
  ]);
  
  // Common food suggestions
  const commonFoods = [
    { name: 'Oatmeal', calories: 150, protein: 5, carbs: 27, fat: 3 },
    { name: 'Banana', calories: 105, protein: 1, carbs: 27, fat: 0 },
    { name: 'Chicken Breast', calories: 165, protein: 31, carbs: 0, fat: 3.6 },
    { name: 'Brown Rice', calories: 215, protein: 5, carbs: 45, fat: 1.8 },
    { name: 'Avocado', calories: 240, protein: 3, carbs: 12, fat: 22 },
    { name: 'Egg', calories: 70, protein: 6, carbs: 0, fat: 5 },
    { name: 'Spinach', calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4 },
    { name: 'Salmon', calories: 206, protein: 22, carbs: 0, fat: 13 }
  ];
  
  // Filter food suggestions based on search query
  const filteredFoods = commonFoods.filter(food => 
    searchQuery.length > 0 && food.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Format date
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };
  
  // Navigate to previous day
  const prevDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 1);
    setCurrentDate(newDate);
  };
  
  // Navigate to next day
  const nextDay = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 1);
    setCurrentDate(newDate);
  };
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewFood(prev => ({ 
      ...prev, 
      [name]: name === 'name' ? value : Number(value) 
    }));
  };
  
  // Select a food suggestion
  const selectFoodSuggestion = (food: typeof commonFoods[0]) => {
    setNewFood(prev => ({
      ...prev,
      name: food.name,
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat
    }));
    setSearchQuery('');
  };
  
  // Add new food
  const addFood = () => {
    if (!newFood.name) return;
    
    const newFoodItem: FoodItem = {
      id: foodItems.length + 1,
      ...newFood
    };
    
    setFoodItems([...foodItems, newFoodItem]);
    setShowAddFood(false);
    
    // Reset form
    setNewFood({
      name: '',
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0,
      time: '08:00',
      mealType: 'breakfast'
    });
  };
  
  // Calculate total nutrients
  const calculateTotalNutrients = () => {
    return foodItems.reduce(
      (acc, item) => {
        acc.calories += item.calories;
        acc.protein += item.protein;
        acc.carbs += item.carbs;
        acc.fat += item.fat;
        return acc;
      },
      { calories: 0, protein: 0, carbs: 0, fat: 0 }
    );
  };
  
  const totals = calculateTotalNutrients();
  
  // Prepare data for pie chart
  const nutrientData: NutrientData[] = [
    { name: 'Protein', value: totals.protein * 4, color: '#10b981' }, // 4 calories per gram
    { name: 'Carbs', value: totals.carbs * 4, color: '#3b82f6' },     // 4 calories per gram
    { name: 'Fat', value: totals.fat * 9, color: '#f97316' }          // 9 calories per gram
  ];
  
  // Get meal icon
  const getMealIcon = (mealType: string) => {
    switch (mealType) {
      case 'breakfast':
        return <Coffee size={20} className="text-amber-500" />;
      case 'lunch':
        return <Utensils size={20} className="text-green-500" />;
      case 'dinner':
        return <Utensils size={20} className="text-blue-500" />;
      case 'snack':
        return <Apple size={20} className="text-red-500" />;
      default:
        return <Utensils size={20} className="text-gray-500" />;
    }
  };
  
  // Get meal title
  const getMealTitle = (mealType: string) => {
    return mealType.charAt(0).toUpperCase() + mealType.slice(1);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Nutrition Tracking</h1>
        
        <div className="flex items-center space-x-2">
          <button 
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100"
            onClick={prevDay}
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow-sm">
            <CalendarIcon size={18} className="text-gray-500" />
            <span className="font-medium">{formatDate(currentDate)}</span>
          </div>
          
          <button 
            className="p-2 rounded-lg border border-gray-300 hover:bg-gray-100"
            onClick={nextDay}
          >
            <ChevronRight size={20} />
          </button>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center"
          onClick={() => setShowAddFood(true)}
        >
          <Plus size={18} className="mr-1" />
          Add Food
        </motion.button>
      </div>
      
      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-md mb-8">
        <div className="border-b">
          <div className="flex">
            <button 
              className={`px-6 py-4 font-medium ${activeTab === 'meals' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
              onClick={() => setActiveTab('meals')}
            >
              Meals
            </button>
            <button 
              className={`px-6 py-4 font-medium ${activeTab === 'stats' ? 'text-primary border-b-2 border-primary' : 'text-gray-500'}`}
              onClick={() => setActiveTab('stats')}
            >
              Nutrition Stats
            </button>
          </div>
        </div>
        
        <div className="p-6">
          {activeTab === 'meals' ? (
            <div>
              {/* Daily Summary */}
              <div className="grid grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h3 className="text-sm text-gray-500 mb-1">Total Calories</h3>
                  <p className="text-2xl font-bold">{totals.calories}</p>
                  <p className="text-xs text-gray-500">Goal: 2,200</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${Math.min((totals.calories / 2200) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h3 className="text-sm text-gray-500 mb-1">Protein</h3>
                  <p className="text-2xl font-bold">{totals.protein}g</p>
                  <p className="text-xs text-gray-500">Goal: 120g</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full" 
                      style={{ width: `${Math.min((totals.protein / 120) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h3 className="text-sm text-gray-500 mb-1">Carbs</h3>
                  <p className="text-2xl font-bold">{totals.carbs}g</p>
                  <p className="text-xs text-gray-500">Goal: 250g</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${Math.min((totals.carbs / 250) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h3 className="text-sm text-gray-500 mb-1">Fat</h3>
                  <p className="text-2xl font-bold">{totals.fat}g</p>
                  <p className="text-xs text-gray-500">Goal: 70g</p>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-orange-500 h-2 rounded-full" 
                      style={{ width: `${Math.min((totals.fat / 70) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              {/* Meals */}
              <div className="space-y-6">
                {['breakfast', 'lunch', 'dinner', 'snack'].map((mealType) => (
                  <div key={mealType} className="bg-white p-5 rounded-lg border border-gray-200">
                    <div className="flex items-center mb-4">
                      <div className="p-2 rounded-full bg-gray-100 mr-3">
                        {getMealIcon(mealType)}
                      </div>
                      <h3 className="font-medium">{getMealTitle(mealType)}</h3>
                    </div>
                    
                    {foodItems.filter(item => item.mealType === mealType).length > 0 ? (
                      <div className="space-y-3">
                        {foodItems
                          .filter(item => item.mealType === mealType)
                          .map(item => (
                            <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                              <div>
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-gray-500">{item.time}</p>
                              </div>
                              <div className="flex space-x-4 text-sm">
                                <div>
                                  <p className="text-gray-500">Calories</p>
                                  <p className="font-medium text-right">{item.calories}</p>
                                </div>
                                <div>
                                  <p className="text-gray-500">Protein</p>
                                  <p className="font-medium text-right">{item.protein}g</p>
                                </div>
                                <div>
                                  <p className="text-gray-500">Carbs</p>
                                  <p className="font-medium text-right">{item.carbs}g</p>
                                </div>
                                <div>
                                  <p className="text-gray-500">Fat</p>
                                  <p className="font-medium text-right">{item.fat}g</p>
                                </div>
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    ) : (
                      <div className="text-center py-6 text-gray-500">
                        <p>No foods logged for {mealType}</p>
                        <button 
                          className="mt-2 text-primary font-medium hover:underline"
                          onClick={() => {
                            setNewFood(prev => ({ ...prev, mealType: mealType as any }));
                            setShowAddFood(true);
                          }}
                        >
                          Add food to {mealType}
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-6">Nutrition Analysis</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Macronutrient Distribution */}
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <h3 className="font-medium mb-4">Macronutrient Distribution</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={nutrientData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {nutrientData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                {/* Nutrition Insights */}
                <div className="bg-white p-5 rounded-lg border border-gray-200">
                  <h3 className="font-medium mb-4">Nutrition Insights</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
                      <h4 className="font-medium text-blue-700">Protein Intake</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Your protein intake is {totals.protein < 100 ? 'below' : 'meeting'} your daily target. 
                        Protein is essential for muscle recovery and growth.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                      <h4 className="font-medium text-green-700">Carbohydrate Balance</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Your carb intake is balanced for your activity level. 
                        Focus on complex carbs like whole grains for sustained energy.
                      </p>
                    </div>
                    
                    <div className="p-4 bg-orange-50 rounded-lg border-l-4 border-orange-500">
                      <h4 className="font-medium text-orange-700">Healthy Fats</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Your fat intake is within the recommended range. 
                        Include sources of omega-3 fatty acids for heart health.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 bg-white p-5 rounded-lg border border-gray-200">
                <h3 className="font-medium mb-4">Recommendations</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li className="text-gray-700">
                    Consider adding more protein-rich foods to reach your daily goal of 120g.
                  </li>
                  <li className="text-gray-700">
                    Your current calorie intake is appropriate for your activity level and goals.
                  </li>
                  <li className="text-gray-700">
                    Try to include more fiber-rich foods like fruits, vegetables, and whole grains.
                  </li>
                  <li className="text-gray-700">
                    Stay hydrated by drinking at least 2.5 liters of water daily.
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Add Food Modal */}
      <AnimatePresence>
        {showAddFood && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-md"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Add Food</h2>
                  <button 
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => setShowAddFood(false)}
                  >
                    <X size={24} />
                  </button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Food Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search size={18} className="text-gray-400" />
                      </div>
                      <input 
                        type="text" 
                        name="name"
                        value={newFood.name || searchQuery}
                        onChange={(e) => {
                          setNewFood(prev => ({ ...prev, name: e.target.value }));
                          setSearchQuery(e.target.value);
                        }}
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Search or enter food name"
                      />
                    </div>
                    
                    {/* Food Suggestions */}
                    {filteredFoods.length > 0 && (
                      <div className="mt-1 bg-white border border-gray-200 rounded-lg shadow-sm max-h-40 overflow-y-auto">
                        {filteredFoods.map((food, index) => (
                          <div 
                            key={index}
                            className="p-2 hover:bg-gray-50 cursor-pointer"
                            onClick={() => selectFoodSuggestion(food)}
                          >
                            <p className="font-medium">{food.name}</p>
                            <p className="text-xs text-gray-500">
                              {food.calories} cal | P: {food.protein}g | C: {food.carbs}g | F: {food.fat}g
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Calories
                      </label>
                      <input 
                        type="number" 
                        name="calories"
                        value={newFood.calories}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Protein (g)
                      </label>
                      <input 
                        type="number" 
                        name="protein"
                        value={newFood.protein}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Carbs (g)
                      </label>
                      <input 
                        type="number" 
                        name="carbs"
                        value={newFood.carbs}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Fat (g)
                      </label>
                      <input 
                        type="number" 
                        name="fat"
                        value={newFood.fat}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Time
                      </label>
                      <input 
                        type="time" 
                        name="time"
                        value={newFood.time}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Meal Type
                      </label>
                      <select 
                        name="mealType"
                        value={newFood.mealType}
                        onChange={handleInputChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="breakfast">Breakfast</option>
                        <option value="lunch">Lunch</option>
                        <option value="dinner">Dinner</option>
                        <option value="snack">Snack</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3 pt-4">
                    <button 
                      className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                      onClick={() => setShowAddFood(false)}
                    >
                      Cancel
                    </button>
                    <button 
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark flex items-center"
                      onClick={addFood}
                      disabled={!newFood.name}
                    >
                      <Save size={18} className="mr-1" />
                      Add Food
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

export default NutritionPage;