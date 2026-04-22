import { AuthLayout } from '../components/auth/AuthLayout';
import { 
  Lock, 
  Bell, 
  Moon, 
  Save, 
  Eye, 
  EyeOff, 
  CreditCard, 
  CheckCircle, 
  Clock, 
  XCircle
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { API_URL } from '../config/api';

export function Settings() {
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isSavingSettings, setIsSavingSettings] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [settings, setSettings] = useState({
    emailNotifications: true,
    lessonReminders: true,
    achievementAlerts: true,
    weeklyReport: false,
    darkMode: true,
    language: 'en',
  });

  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [loadingSubscription, setLoadingSubscription] = useState(true);
  const [isInitializingPayment, setIsInitializingPayment] = useState(false);
  const [isVerifyingPayment, setIsVerifyingPayment] = useState(false);

  const readApiResponse = async (response) => {
    const contentType = response.headers.get('content-type') || '';
    const text = await response.text();

    if (!text) {
      return null;
    }

    if (!contentType.includes('application/json')) {
      return { raw: text };
    }

    try {
      return JSON.parse(text);
    } catch (error) {
      return { raw: text };
    }
  };

  useEffect(() => {
    fetchSubscriptionStatus();
    verifyPaymentFromUrl();
  }, []);

  const fetchSubscriptionStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoadingSubscription(false);
        return;
      }

      const response = await fetch(`${API_URL}/api/payment/my-status`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await readApiResponse(response);
      if (result.subscription) {
        setSubscriptionStatus(result.subscription);
        setPaymentHistory(result.payments || []);
      }
    } catch (error) {
      console.error('Subscription status fetch error:', error);
    } finally {
      setLoadingSubscription(false);
    }
  };

  const verifyPaymentFromUrl = async () => {
    const params = new URLSearchParams(window.location.search);
    const reference = params.get('paymentReference') || params.get('reference');
    if (!reference) {
      return;
    }

    setIsVerifyingPayment(true);
    try {
      const response = await fetch(`${API_URL}/api/payment/verify/${encodeURIComponent(reference)}`, {
        method: 'GET',
      });

      const result = await readApiResponse(response);

      if (!response.ok) {
        throw new Error(
          result?.error ||
          result?.message ||
          result?.raw?.slice?.(0, 160) ||
          'Payment verification failed'
        );
      }

      toast.success('Payment verified successfully. Courses unlocked.');
      await fetchSubscriptionStatus();
      window.history.replaceState({}, document.title, window.location.pathname);
      window.location.href = '/dashboard';

    } catch (error) {
      toast.error(error.message || 'Failed to verify payment');
    } finally {
      setIsVerifyingPayment(false);
    }
  };

  const handleInitializePayment = async () => {
    setIsInitializingPayment(true);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Please login to continue');
      }

      const response = await fetch(`${API_URL}/api/payment/initialize`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await readApiResponse(response);
      if (!response.ok) {
        throw new Error(
          result?.error ||
          result?.message ||
          result?.raw?.slice?.(0, 160) ||
          'Could not initialize payment'
        );
      }

      const authorizationUrl = result?.data?.authorizationUrl;
      if (!authorizationUrl) {
        throw new Error('Missing Paystack authorization link');
      }

      window.location.href = authorizationUrl;
    } catch (error) {
      toast.error(error.message || 'Failed to start payment');
      setIsInitializingPayment(false);
    }
  };

  const handlePasswordChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const handleSettingChange = (setting) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting],
    });
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords({
      ...showPasswords,
      [field]: !showPasswords[field],
    });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error('New passwords do not match', {
        position: "top-center",
        autoClose: 3000,
        style: {
          background: '#161B22',
          color: '#C9D1D9',
          border: '1px solid #30363D',
        }
      });
      return;
    }

    if (passwords.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters', {
        position: "top-center",
        autoClose: 3000,
        style: {
          background: '#161B22',
          color: '#C9D1D9',
          border: '1px solid #30363D',
        }
      });
      return;
    }

    setIsChangingPassword(true);
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_URL}/api/auth/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword: passwords.currentPassword,
          newPassword: passwords.newPassword,
        }),
      });

      const data = await readApiResponse(response);

      if (!response.ok) {
        throw new Error(data?.message || data?.raw?.slice?.(0, 120) || 'Failed to change password');
      }

      toast.success('Password changed successfully!', {
        position: "top-center",
        autoClose: 2000,
        style: {
          background: '#161B22',
          color: '#C9D1D9',
          border: '1px solid #30363D',
        }
      });

      setPasswords({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setIsChangingPassword(false);
    } catch (error) {
      setIsChangingPassword(false);
      toast.error(error.message || 'Failed to change password', {
        position: "top-center",
        autoClose: 3000,
        style: {
          background: '#161B22',
          color: '#C9D1D9',
          border: '1px solid #30363D',
        }
      });
    }
  };

  const handleSaveSettings = () => {
    setIsSavingSettings(true);
    // Save settings to localStorage or backend
    localStorage.setItem('userSettings', JSON.stringify(settings));
    
    toast.success('Settings saved successfully!', {
      position: "top-center",
      autoClose: 2000,
      style: {
        background: '#161B22',
        color: '#C9D1D9',
        border: '1px solid #30363D',
      }
    });
    
    setTimeout(() => setIsSavingSettings(false), 500);
  };

  return (
    <AuthLayout>
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-[#C9D1D9] text-[24px] md:text-[32px] font-bold mb-2">
            Settings
          </h1>
          <p className="text-[#8B949E] text-sm md:text-base">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="space-y-4 md:space-y-6">
          <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4 md:p-6">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <CreditCard size={18} className="md:hidden text-[#1F6FEB]" />
              <CreditCard size={20} className="hidden md:block text-[#1F6FEB]" />
              <h2 className="text-[#C9D1D9] text-[18px] md:text-[20px] font-semibold">
                Subscription & Payment
              </h2>
            </div>

            {loadingSubscription ? (
              <p className="text-[#8B949E] text-sm">Loading subscription status...</p>
            ) : (
              <>
                <div className={`p-4 rounded-lg border mb-4 ${
                  subscriptionStatus?.status === 'active'
                    ? 'bg-[#238636]/10 border-[#238636]'
                    : subscriptionStatus?.status === 'pending'
                      ? 'bg-[#d29922]/10 border-[#d29922]'
                      : 'bg-[#1F6FEB]/10 border-[#1F6FEB]'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    {subscriptionStatus?.status === 'active' && <CheckCircle size={18} className="text-[#3FB950]" />}
                    {subscriptionStatus?.status === 'pending' && <Clock size={18} className="text-[#d29922]" />}
                    {(!subscriptionStatus || subscriptionStatus?.status === 'free') && <XCircle size={18} className="text-[#58A6FF]" />}
                    <p className="text-[#C9D1D9] font-medium">
                      {subscriptionStatus?.status === 'active' && 'Access Active'}
                      {subscriptionStatus?.status === 'pending' && 'Payment Pending Verification'}
                      {(!subscriptionStatus || subscriptionStatus?.status === 'free') && 'No Active Subscription'}
                    </p>
                  </div>
                  <p className="text-[#8B949E] text-sm">
                    {subscriptionStatus?.status === 'active'
                      ? 'Your premium courses are unlocked.'
                      : 'Pay once in Paystack test mode to unlock all courses.'}
                  </p>
                </div>

                {subscriptionStatus?.status !== 'active' && (
                  <button
                    type="button"
                    onClick={handleInitializePayment}
                    disabled={isInitializingPayment || isVerifyingPayment}
                    className="bg-[#238636] hover:bg-[#2EA043] text-white px-5 py-2.5 rounded-md font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isInitializingPayment ? 'Redirecting to Paystack...' : 'Pay NGN 3,000 to Unlock Courses'}
                  </button>
                )}

                {paymentHistory.length > 0 && (
                  <div className="mt-5">
                    <h3 className="text-[#C9D1D9] text-sm font-semibold mb-2">Recent Payments</h3>
                    <div className="space-y-2">
                      {paymentHistory.slice(0, 3).map((payment) => (
                        <div key={payment.id} className="bg-[#0D1117] border border-[#30363D] rounded-md px-3 py-2 flex items-center justify-between">
                          <div>
                            <p className="text-[#C9D1D9] text-sm font-medium">{payment.reference}</p>
                            <p className="text-[#8B949E] text-xs">NGN {payment.amount}</p>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            payment.status === 'approved'
                              ? 'bg-[#238636]/20 text-[#3FB950]'
                              : payment.status === 'pending'
                                ? 'bg-[#d29922]/20 text-[#d29922]'
                                : 'bg-[#f85149]/20 text-[#f85149]'
                          }`}>
                            {payment.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Security Section */}
          <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Lock size={20} className="text-[#1F6FEB]" />
              <h2 className="text-[#C9D1D9] text-[20px] font-semibold">
                Security
              </h2>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-[#C9D1D9] text-sm font-medium mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.currentPassword ? "text" : "password"}
                    name="currentPassword"
                    value={passwords.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 pr-12 bg-[#0D1117] border border-[#30363D] text-[#C9D1D9] rounded-md focus:outline-none focus:border-[#58A6FF] transition-colors"
                    placeholder="Enter current password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('currentPassword')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B949E] hover:text-[#C9D1D9] transition-colors"
                  >
                    {showPasswords.currentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[#C9D1D9] text-sm font-medium mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.newPassword ? "text" : "password"}
                    name="newPassword"
                    value={passwords.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 pr-12 bg-[#0D1117] border border-[#30363D] text-[#C9D1D9] rounded-md focus:outline-none focus:border-[#58A6FF] transition-colors"
                    placeholder="Enter new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('newPassword')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B949E] hover:text-[#C9D1D9] transition-colors"
                  >
                    {showPasswords.newPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[#C9D1D9] text-sm font-medium mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.confirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={passwords.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full px-4 py-3 pr-12 bg-[#0D1117] border border-[#30363D] text-[#C9D1D9] rounded-md focus:outline-none focus:border-[#58A6FF] transition-colors"
                    placeholder="Confirm new password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirmPassword')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B949E] hover:text-[#C9D1D9] transition-colors"
                  >
                    {showPasswords.confirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isChangingPassword}
                className="bg-[#1F6FEB] text-white px-6 py-3 rounded-md hover:bg-[#58A6FF] transition-all cursor-pointer font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isChangingPassword ? 'Changing...' : 'Change Password'}
              </button>
            </form>
          </div>

          {/* Notifications Section */}
          <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Bell size={20} className="text-[#1F6FEB]" />
              <h2 className="text-[#C9D1D9] text-[20px] font-semibold">
                Notifications
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-[#30363D]">
                <div>
                  <p className="text-[#C9D1D9] text-[15px] font-medium">Email Notifications</p>
                  <p className="text-[#8B949E] text-[13px]">Receive email updates about your progress</p>
                </div>
                <button
                  onClick={() => handleSettingChange('emailNotifications')}
                  className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
                    settings.emailNotifications ? 'bg-[#1F6FEB]' : 'bg-[#30363D]'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      settings.emailNotifications ? 'translate-x-6' : ''
                    }`}
                  ></div>
                </button>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-[#30363D]">
                <div>
                  <p className="text-[#C9D1D9] text-[15px] font-medium">Lesson Reminders</p>
                  <p className="text-[#8B949E] text-[13px]">Get reminded to complete your daily lessons</p>
                </div>
                <button
                  onClick={() => handleSettingChange('lessonReminders')}
                  className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
                    settings.lessonReminders ? 'bg-[#1F6FEB]' : 'bg-[#30363D]'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      settings.lessonReminders ? 'translate-x-6' : ''
                    }`}
                  ></div>
                </button>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-[#30363D]">
                <div>
                  <p className="text-[#C9D1D9] text-[15px] font-medium">Achievement Alerts</p>
                  <p className="text-[#8B949E] text-[13px]">Notifications when you earn achievements</p>
                </div>
                <button
                  onClick={() => handleSettingChange('achievementAlerts')}
                  className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
                    settings.achievementAlerts ? 'bg-[#1F6FEB]' : 'bg-[#30363D]'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      settings.achievementAlerts ? 'translate-x-6' : ''
                    }`}
                  ></div>
                </button>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="text-[#C9D1D9] text-[15px] font-medium">Weekly Report</p>
                  <p className="text-[#8B949E] text-[13px]">Get a summary of your weekly learning</p>
                </div>
                <button
                  onClick={() => handleSettingChange('weeklyReport')}
                  className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
                    settings.weeklyReport ? 'bg-[#1F6FEB]' : 'bg-[#30363D]'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      settings.weeklyReport ? 'translate-x-6' : ''
                    }`}
                  ></div>
                </button>
              </div>
            </div>
          </div>

          {/* Appearance Section */}
          <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-6">
            <div className="flex items-center gap-3 mb-6">
              <Moon size={20} className="text-[#1F6FEB]" />
              <h2 className="text-[#C9D1D9] text-[20px] font-semibold">
                Appearance
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-[#30363D]">
                <div>
                  <p className="text-[#C9D1D9] text-[15px] font-medium">Dark Mode</p>
                  <p className="text-[#8B949E] text-[13px]">Use dark theme (currently active)</p>
                </div>
                <button
                  onClick={() => handleSettingChange('darkMode')}
                  className={`relative w-12 h-6 rounded-full transition-colors cursor-pointer ${
                    settings.darkMode ? 'bg-[#1F6FEB]' : 'bg-[#30363D]'
                  }`}
                >
                  <div
                    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${
                      settings.darkMode ? 'translate-x-6' : ''
                    }`}
                  ></div>
                </button>
              </div>

              <div className="py-3">
                <label className="block text-[#C9D1D9] text-[15px] font-medium mb-2">
                  Language
                </label>
                <select
                  value={settings.language}
                  onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                  className="w-full px-4 py-3 bg-[#0D1117] border border-[#30363D] text-[#C9D1D9] rounded-md focus:outline-none focus:border-[#58A6FF] transition-colors cursor-pointer"
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSaveSettings}
            disabled={isSavingSettings}
            className="w-full bg-[#1F6FEB] text-white px-6 py-3 rounded-md hover:bg-[#58A6FF] transition-all flex items-center justify-center gap-2 cursor-pointer font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save size={18} />
            {isSavingSettings ? 'Saving...' : 'Save All Settings'}
          </button>
        </div>
      </div>
    </AuthLayout>
  );
}
