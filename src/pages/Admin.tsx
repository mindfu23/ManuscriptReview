import { useState, useEffect } from 'react';
import api, { AdminSettings } from '../services/api';

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [settings, setSettings] = useState<AdminSettings | null>(null);
  const [selectedTone, setSelectedTone] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');

  // Check if already logged in (token in memory)
  useEffect(() => {
    // Could check localStorage for persistent login, but keeping simple for now
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);

    try {
      await api.adminLogin(password);
      setIsLoggedIn(true);
      loadSettings();
    } catch {
      setLoginError('Invalid password');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const loadSettings = async () => {
    try {
      const data = await api.getAdminSettings();
      setSettings(data);
      setSelectedTone(data.tone);
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  };

  const handleSaveTone = async () => {
    setIsSaving(true);
    setSaveMessage('');

    try {
      await api.updateTone(selectedTone);
      setSaveMessage('Settings saved successfully');
      setTimeout(() => setSaveMessage(''), 3000);
    } catch (error) {
      setSaveMessage('Failed to save settings');
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    api.clearAdminToken();
    setIsLoggedIn(false);
    setSettings(null);
    setPassword('');
  };

  // Login form
  if (!isLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h1 className="text-xl font-semibold text-gray-900 text-center mb-6">
              Admin Login
            </h1>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none"
                  placeholder="Enter admin password"
                />
              </div>

              {loginError && (
                <p className="text-sm text-red-600">{loginError}</p>
              )}

              <button
                type="submit"
                disabled={isLoggingIn || !password}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                  isLoggingIn || !password
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-primary-600 text-white hover:bg-primary-700'
                }`}
              >
                {isLoggingIn ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // Admin panel
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Admin Settings</h1>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          Logout
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
        {/* Tone settings */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Feedback Tone
          </label>
          <p className="text-sm text-gray-500 mb-4">
            Controls how feedback is presented to users. "Gentlest" provides encouraging,
            supportive feedback while "Harsh" is more direct and critical.
          </p>

          {settings && (
            <div className="space-y-2">
              {settings.available_tones.map((tone) => (
                <label
                  key={tone}
                  className={`flex items-center p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedTone === tone
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="tone"
                    value={tone}
                    checked={selectedTone === tone}
                    onChange={() => setSelectedTone(tone)}
                    className="sr-only"
                  />
                  <div className="flex-1">
                    <span className="font-medium text-gray-900 capitalize">{tone}</span>
                    {tone === settings.tone && (
                      <span className="ml-2 text-xs text-primary-600">(current)</span>
                    )}
                  </div>
                  {selectedTone === tone && (
                    <svg className="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  )}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Save button */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          {saveMessage && (
            <p className={`text-sm ${saveMessage.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
              {saveMessage}
            </p>
          )}
          <button
            onClick={handleSaveTone}
            disabled={isSaving || selectedTone === settings?.tone}
            className={`ml-auto px-4 py-2 rounded-lg font-medium transition-colors ${
              isSaving || selectedTone === settings?.tone
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-primary-600 text-white hover:bg-primary-700'
            }`}
          >
            {isSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
}
