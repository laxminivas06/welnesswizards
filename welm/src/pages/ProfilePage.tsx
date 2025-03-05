import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  Weight, 
  Ruler, 
  Activity, 
  Heart, 
  Shield, 
  Edit, 
  Save, 
  X, 
  Camera 
} from 'lucide-react';
import { motion } from 'framer-motion';

interface ProfilePageProps {
  userName: string;
  setUserName: (name: string) => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ userName, setUserName }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80');
  
  // Form state
  const [formData, setFormData] = useState({
    firstName: 'Alex',
    lastName: 'Johnson',
    email: 'alex.johnson@example.com',
    phone: '+1 (555) 123-4567',
    birthdate: '1990-05-15',
    address: '123 Health Street, Wellness City, WC 12345',
    height: 175,
    weight: 68,
    bloodType: 'A+',
    allergies: 'None',
    conditions: 'None',
    medications: 'None',
    emergencyContact: 'Sarah Johnson',
    emergencyPhone: '+1 (555) 987-6543',
    fitnessGoal: 'Improve overall fitness and maintain healthy weight',
    activityLevel: 'Moderate',
    dietPreference: 'Balanced',
  });
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Update userName in parent component if first name is changed
    if (name === 'firstName') {
      setUserName(value);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // In a real app, this would save to a database
    alert('Profile updated successfully!');
  };
  
  const cancelEdit = () => {
    setIsEditing(false);
    // Reset form data to original values
    setFormData({
      firstName: 'Alex',
      lastName: 'Johnson',
      email: 'alex.johnson@example.com',
      phone: '+1 (555) 123-4567',
      birthdate: '1990-05-15',
      address: '123 Health Street, Wellness City, WC 12345',
      height: 175,
      weight: 68,
      bloodType: 'A+',
      allergies: 'None',
      conditions: 'None',
      medications: 'None',
      emergencyContact: 'Sarah Johnson',
      emergencyPhone: '+1 (555) 987-6543',
      fitnessGoal: 'Improve overall fitness and maintain healthy weight',
      activityLevel: 'Moderate',
      dietPreference: 'Balanced',
    });
  };
  
  // Calculate BMI
  const calculateBMI = () => {
    const heightInMeters = formData.height / 100;
    const bmi = formData.weight / (heightInMeters * heightInMeters);
    return bmi.toFixed(1);
  };
  
  // Get BMI category
  const getBMICategory = () => {
    const bmi = parseFloat(calculateBMI());
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-blue-500' };
    if (bmi < 25) return { category: 'Normal weight', color: 'text-green-500' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-yellow-500' };
    return { category: 'Obese', color: 'text-red-500' };
  };
  
  // Handle profile image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setProfileImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Profile</h1>
        
        {!isEditing ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-primary text-white px-4 py-2 rounded-lg flex items-center"
            onClick={() => setIsEditing(true)}
          >
            <Edit size={18} className="mr-2" />
            Edit Profile
          </motion.button>
        ) : (
          <div className="flex space-x-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center"
              onClick={cancelEdit}
            >
              <X size={18} className="mr-2" />
              Cancel
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-primary text-white px-4 py-2 rounded-lg flex items-center"
              onClick={handleSubmit}
            >
              <Save size={18} className="mr-2" />
              Save Changes
            </motion.button>
          </div>
        )}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 flex flex-col items-center">
              <div className="relative mb-4">
                <div className="w-32 h-32 rounded-full overflow-hidden">
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {isEditing && (
                  <label className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer">
                    <Camera size={18} />
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                )}
              </div>
              
              <h2 className="text-xl font-semibold">{formData.firstName} {formData.lastName}</h2>
              <p className="text-gray-500">{formData.email}</p>
              
              <div className="w-full mt-6">
                <div className="flex justify-between text-sm mb-1">
                  <span>Profile Completion</span>
                  <span>85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full" 
                    style={{ width: '85%' }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="border-t">
              <button 
                className={`w-full text-left p-4 ${activeTab === 'personal' ? 'bg-blue-50 text-primary' : 'text-gray-700'}`}
                onClick={() => setActiveTab('personal')}
              >
                Personal Information
              </button>
              <button 
                className={`w-full text-left p-4 ${activeTab === 'health' ? 'bg-blue-50 text-primary' : 'text-gray-700'}`}
                onClick={() => setActiveTab('health')}
              >
                Health Information
              </button>
              <button 
                className={`w-full text-left p-4 ${activeTab === 'preferences' ? 'bg-blue-50 text-primary' : 'text-gray-700'}`}
                onClick={() => setActiveTab('preferences')}
              >
                Preferences
              </button>
            </div>
          </div>
          
          {/* Health Summary Card */}
          <div className="bg-white rounded-xl shadow-md p-6 mt-6">
            <h3 className="font-semibold mb-4">Health Summary</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>BMI</span>
                  <span className={getBMICategory().color}>{calculateBMI()} ({getBMICategory().category})</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      getBMICategory().category === 'Normal weight' ? 'bg-green-500' :
                      getBMICategory().category === 'Underweight' ? 'bg-blue-500' :
                      getBMICategory().category === 'Overweight' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`} 
                    style={{ width: `${Math.min(parseFloat(calculateBMI()) / 40 * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-blue-100 mr-2">
                    <Activity size={16} className="text-blue-500" />
                  </div>
                  <span className="text-sm">Activity Level</span>
                </div>
                <span className="text-sm font-medium">{formData.activityLevel}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-green-100 mr-2">
                    <Heart size={16} className="text-green-500" />
                  </div>
                  <span className="text-sm">Blood Type</span>
                </div>
                <span className="text-sm font-medium">{formData.bloodType}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="p-2 rounded-full bg-purple-100 mr-2">
                    <Shield size={16} className="text-purple-500" />
                  </div>
                  <span className="text-sm">Allergies</span>
                </div>
                <span className="text-sm font-medium">{formData.allergies}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Profile Content */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl shadow-md p-6">
            {activeTab === 'personal' && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Personal Information</h2>
                
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <User size={18} className="text-gray-400" />
                        </div>
                        <input 
                          type="text" 
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input 
                        type="text" 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Mail size={18} className="text-gray-400" />
                        </div>
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Phone size={18} className="text-gray-400" />
                        </div>
                        <input 
                          type="tel" 
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date of Birth
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Calendar size={18} className="text-gray-400" />
                        </div>
                        <input 
                          type="date" 
                          name="birthdate"
                          value={formData.birthdate}
                          onChange={handleChange}
                          className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin size={18} className="text-gray-400" />
                      </div>
                      <input 
                        type="text" 
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Emergency Contact
                    </label>
                    <input 
                      type="text" 
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Emergency Contact Phone
                    </label>
                    <input 
                      type="tel" 
                      name="emergencyPhone"
                      value={formData.emergencyPhone}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      disabled={!isEditing}
                    />
                  </div>
                </form>
              </div>
            )}
            
            {activeTab === 'health' && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Health Information</h2>
                
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Height (cm)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Ruler size={18} className="text-gray-400" />
                        </div>
                        <input 
                          type="number" 
                          name="height"
                          value={formData.height}
                          onChange={handleChange}
                          className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Weight (kg)
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Weight size={18} className="text-gray-400" />
                        </div>
                        <input 
                          type="number" 
                          name="weight"
                          value={formData.weight}
                          onChange={handleChange}
                          className="pl-10 w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Blood Type
                      </label>
                      <select 
                        name="bloodType"
                        value={formData.bloodType}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                        disabled={!isEditing}
                      >
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Allergies
                    </label>
                    <textarea 
                      name="allergies"
                      value={formData.allergies}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      rows={2}
                      disabled={!isEditing}
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Medical Conditions
                    </label>
                    <textarea 
                      name="conditions"
                      value={formData.conditions}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      rows={2}
                      disabled={!isEditing}
                    ></textarea>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Medications
                    </label>
                    <textarea 
                      name="medications"
                      value={formData.medications}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      rows={2}
                      disabled={!isEditing}
                    ></textarea>
                  </div>
                </form>
              </div>
            )}
            
            {activeTab === 'preferences' && (
              <div>
                <h2 className="text-lg font-semibold mb-4">Preferences</h2>
                
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fitness Goal
                    </label>
                    <select 
                      name="fitnessGoal"
                      value={formData.fitnessGoal}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      disabled={!isEditing}
                    >
                      <option value="Lose weight">Lose weight</option>
                      <option value="Gain muscle">Gain muscle</option>
                      <option value="Improve overall fitness and maintain healthy weight">Improve overall fitness and maintain healthy weight</option>
                      <option value="Improve endurance">Improve endurance</option>
                      <option value="Increase flexibility">Increase flexibility</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Activity Level
                    </label>
                    <select 
                      name="activityLevel"
                      value={formData.activityLevel}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      disabled={!isEditing}
                    >
                      <option value="Sedentary">Sedentary (little or no exercise)</option>
                      <option value="Light">Light (light exercise 1-3 days/week)</option>
                      <option value="Moderate">Moderate (moderate exercise 3-5 days/week)</option>
                      <option value="Active">Active (hard exercise 6-7 days/week)</option>
                      <option value="Very Active">Very Active (very hard exercise & physical job)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Diet Preference
                    </label>
                    <select 
                      name="dietPreference"
                      value={formData.dietPreference}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      disabled={!isEditing}
                    >
                      <option value="Balanced">Balanced</option>
                      <option value="Vegetarian">Vegetarian</option>
                      <option value="Vegan">Vegan</option>
                      <option value="Keto">Keto</option>
                      <option value="Paleo">Paleo</option>
                      <option value="Mediterranean">Mediterranean</option>
                      <option value="Low Carb">Low Carb</option>
                      <option value="High Protein">High Protein</option>
                    </select>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;