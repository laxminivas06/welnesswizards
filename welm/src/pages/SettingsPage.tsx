import React, { useState } from 'react';
import { useTranslation } from 'react-i18next'; // Import useTranslation hook
import { Moon, Sun, Droplets, Bell, Mail, Lock, Smartphone, LogOut } from 'lucide-react';

interface SettingsPageProps {
  userName: string;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ userName }) => {
  const { t, i18n } = useTranslation(); // Use the useTranslation hook
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [waterReminderEnabled, setWaterReminderEnabled] = useState(true);
  const [email, setEmail] = useState('user@example.com');
  const [password, setPassword] = useState('********');
  const [connectedDevices, setConnectedDevices] = useState(['iPhone 13', 'MacBook Pro']);

  // Handle theme change
  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(newTheme);
  };

  // Handle language change
  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    i18n.changeLanguage(newLanguage); // Update the language using i18n
  };

  // Handle password change
  const handlePasswordChange = () => {
    const newPassword = prompt('Enter your new password:');
    if (newPassword) {
      setPassword(newPassword);
      alert(t('passwordUpdated')); // Use translated text
    }
  };

  // Handle device disconnection
  const handleDisconnectDevice = (device: string) => {
    setConnectedDevices(connectedDevices.filter((d) => d !== device));
    alert(t('deviceDisconnected', { device })); // Use translated text with dynamic value
  };

  // Handle account deletion
  const handleDeleteAccount = () => {
    if (confirm(t('confirmDeleteAccount'))) {
      alert(t('accountDeleted')); // Use translated text
      // Add logic to delete the account
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">{t('settings')}</h1>

      {/* Appearance Settings */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Moon size={20} className="mr-2" />
          {t('appearance')}
        </h2>
        <div className="flex space-x-4">
          <button
            className={`px-6 py-3 rounded-lg flex items-center space-x-2 ${
              theme === 'light' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => handleThemeChange('light')}
          >
            <Sun size={20} />
            <span>{t('light')}</span>
          </button>
          <button
            className={`px-6 py-3 rounded-lg flex items-center space-x-2 ${
              theme === 'dark' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => handleThemeChange('dark')}
          >
            <Moon size={20} />
            <span>{t('dark')}</span>
          </button>
        </div>
      </div>

      {/* Language Settings */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{t('language')}</h2>
        <select
          value={language}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg"
        >
          <option value="en">{t('english')}</option>
          <option value="te">{t('telugu')}</option>
          <option value="hi">{t('hindi')}</option>
          <option value="ur">{t('urdu')}</option>
          <option value="kn">{t('kannada')}</option>
          <option value="ta">{t('tamil')}</option>
          <option value="ml">{t('malayalam')}</option>
        </select>
      </div>

      {/* Notifications Settings */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Bell size={20} className="mr-2" />
          {t('notifications')}
        </h2>
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={(e) => setNotificationsEnabled(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-500"
            />
            <span>{t('enableNotifications')}</span>
          </label>
        </div>
      </div>

      {/* Water Reminder Settings */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Droplets size={20} className="mr-2" />
          {t('waterReminder')}
        </h2>
        <div className="flex items-center space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={waterReminderEnabled}
              onChange={(e) => setWaterReminderEnabled(e.target.checked)}
              className="form-checkbox h-5 w-5 text-blue-500"
            />
            <span>{t('enableWaterReminder')}</span>
          </label>
        </div>
      </div>

      {/* Account Settings */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Mail size={20} className="mr-2" />
          {t('accountSettings')}
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span>{t('email')}: {email}</span>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={() => setEmail(prompt(t('enterNewEmail')) || email)}
            >
              {t('changeEmail')}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <span>{t('password')}: {password}</span>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              onClick={handlePasswordChange}
            >
              {t('changePassword')}
            </button>
          </div>
        </div>
      </div>

      {/* Connected Devices */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Smartphone size={20} className="mr-2" />
          {t('connectedDevices')}
        </h2>
        <ul className="space-y-2">
          {connectedDevices.map((device) => (
            <li key={device} className="flex items-center justify-between">
              <span>{device}</span>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                onClick={() => handleDisconnectDevice(device)}
              >
                {t('disconnect')}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Data Management */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{t('dataManagement')}</h2>
        <div className="space-y-4">
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={() => alert(t('dataExported'))}
          >
            {t('exportData')}
          </button>
          <button
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            onClick={handleDeleteAccount}
          >
            {t('deleteAccount')}
          </button>
        </div>
      </div>

      {/* Help and Support */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">{t('helpAndSupport')}</h2>
        <p>{t('contactMessage')}: <strong>7993976247</strong>.</p>
      </div>

      {/* Logout */}
      <div className="flex justify-end">
        <button
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 flex items-center space-x-2"
          onClick={() => alert(t('loggedOut'))}
        >
          <LogOut size={20} />
          <span>{t('logout')}</span>
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;