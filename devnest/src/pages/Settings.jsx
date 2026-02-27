import { AuthLayout } from '../components/auth/AuthLayout';
import { 
  Lock, 
  Bell, 
  Moon, 
  Globe, 
  Save, 
  Eye, 
  EyeOff, 
  CreditCard, 
  Upload, 
  CheckCircle, 
  Clock, 
  XCircle,
  AlertCircle
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

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

  // Payment state
  const [subscriptionStatus, setSubscriptionStatus] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [paymentForm, setPaymentForm] = useState({
    reference: '',
    proofImage: null
  });
  const [isSubmittingPayment, setIsSubmittingPayment] = useState(false);
  const [loadingSubscription, setLoadingSubscription] = useState(true);

  useEffect(() => {
    fetchSubscriptionStatus();
  }, []);

  // Real-time polling - check subscription status every 15 seconds
  useEffect(() => {
    const pollInterval = setInterval(() => {
      fetchSubscriptionStatus();
    }, 15000); // Poll every 15 seconds

    // Cleanup on unmount
    return () => clearInterval(pollInterval);
  }, []);

  const fetchSubscriptionStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoadingSubscription(false);
        return;
      }

      const response = await fetch('http://localhost:5008/api/payment/my-status', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();
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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      setPaymentForm({ ...paymentForm, proofImage: file });
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    if (!paymentForm.reference.trim()) {
      toast.error('Transaction reference is required');
      return;
    }

    if (!paymentForm.proofImage) {
      toast.error('Payment proof screenshot is required');
      return;
    }

    setIsSubmittingPayment(true);

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('reference', paymentForm.reference.trim());
      formData.append('proofImage', paymentForm.proofImage);

      const response = await fetch('http://localhost:5008/api/payment/submit-proof', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit payment proof');
      }

      toast.success('✅ Payment proof submitted! Awaiting admin approval.', {
        autoClose: 5000
      });

      // Reset form
      setPaymentForm({ reference: '', proofImage: null });
      document.getElementById('proofImage').value = '';

      // Refresh subscription status
      await fetchSubscriptionStatus();

    } catch (error) {
      toast.error(error.message || 'Failed to submit payment proof');
    } finally {
      setIsSubmittingPayment(false);
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
      
      const response = await fetch('http://localhost:5008/api/auth/change-password', {
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to change password');
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
          {/* Subscription & Payment Section */}
          <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4 md:p-6">
            <div className="flex items-center gap-3 mb-4 md:mb-6">
              <CreditCard size={18} className="md:hidden text-[#1F6FEB]" />
              <CreditCard size={20} className="hidden md:block text-[#1F6FEB]" />
              <h2 className="text-[#C9D1D9] text-[18px] md:text-[20px] font-semibold">
                Subscription & Payment
              </h2>
            </div>

            {loadingSubscription ? (
              <div className="text-center py-8">
                <div className="text-[#8B949E]">Loading subscription status...</div>
              </div>
            ) : (
              <>
                {/* Current Status */}
                <div className="mb-4 md:mb-6 p-3 md:p-4 bg-[#0D1117] border border-[#30363D] rounded-lg">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div>
                      <p className="text-[#8B949E] text-xs md:text-sm mb-1">Current Status</p>
                      <div className="flex items-center gap-2">
                        {subscriptionStatus?.status === 'active' ? (
                          <>
                            <CheckCircle size={18} className="md:hidden text-[#3FB950]" />
                            <CheckCircle size={20} className="hidden md:block text-[#3FB950]" />
                            <span className="text-[#3FB950] font-semibold text-base md:text-lg">Premium Active</span>
                          </>
                        ) : subscriptionStatus?.status === 'pending' ? (
                          <>
                            <Clock size={18} className="md:hidden text-[#E3B341]" />
                            <Clock size={20} className="hidden md:block text-[#E3B341]" />
                            <span className="text-[#E3B341] font-semibold text-base md:text-lg">Payment Pending</span>
                          </>
                        ) : (
                          <>
                            <XCircle size={18} className="md:hidden text-[#8B949E]" />
                            <XCircle size={20} className="hidden md:block text-[#8B949E]" />
                            <span className="text-[#8B949E] font-semibold text-base md:text-lg">Free Plan</span>
                          </>
                        )}
                      </div>
                      {subscriptionStatus?.paidAt && (
                        <p className="text-[#8B949E] text-xs md:text-sm mt-1">
                          Activated on {new Date(subscriptionStatus.paidAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    {subscriptionStatus?.hasAccess && (
                      <div className="text-left sm:text-right">
                        <p className="text-[#3FB950] font-medium text-sm md:text-base">Lifetime Access</p>
                        <p className="text-[#8B949E] text-xs md:text-sm">All courses unlocked</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Show payment form only for free users */}
                {subscriptionStatus?.status === 'free' && (
                  <>
                    {/* Payment Instructions */}
                    <div className="mb-6 p-4 bg-[#1F6FEB]/10 border border-[#1F6FEB] rounded-lg">
                      <h3 className="text-[#C9D1D9] font-semibold mb-3 flex items-center gap-2">
                        <AlertCircle size={18} className="text-[#1F6FEB]" />
                        How to Upgrade to Premium
                      </h3>
                      <div className="space-y-3 text-[#8B949E] text-sm">
                        <div>
                          <p className="font-medium text-[#C9D1D9] mb-1">Step 1: Make Payment</p>
                          <p>Transfer exactly <span className="text-[#3FB950] font-semibold">₦3,000</span> to:</p>
                          <div className="mt-2 p-3 bg-[#0D1117] rounded-md">
                            <p>Bank: <span className="text-[#C9D1D9]">Opay</span></p>
                            <p>Account Number: <span className="text-[#C9D1D9]">7072326934</span></p>
                            <p>Account Name: <span className="text-[#C9D1D9]">UGONNA PAUL ANINWODO</span></p>
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-[#C9D1D9] mb-1">Step 2: Upload Proof</p>
                          <p>Take a screenshot of your transaction receipt and fill the form below</p>
                        </div>
                        <div>
                          <p className="font-medium text-[#C9D1D9] mb-1">Step 3: Wait for Approval</p>
                          <p>Our team will verify your payment within 24 hours</p>
                        </div>
                      </div>
                    </div>

                    {/* Payment Upload Form */}
                    <form onSubmit={handlePaymentSubmit} className="space-y-4">
                      <div>
                        <label className="block text-[#C9D1D9] text-sm font-medium mb-2">
                          Transaction Reference <span className="text-[#F85149]">*</span>
                        </label>
                        <input
                          type="text"
                          value={paymentForm.reference}
                          onChange={(e) => setPaymentForm({ ...paymentForm, reference: e.target.value })}
                          className="w-full px-4 py-3 bg-[#0D1117] border border-[#30363D] text-[#C9D1D9] rounded-md focus:outline-none focus:border-[#58A6FF] transition-colors"
                          placeholder="e.g., TRX123456789"
                          required
                        />
                        <p className="text-[#8B949E] text-xs mt-1">
                          Enter the transaction reference from your bank receipt
                        </p>
                      </div>

                      <div>
                        <label className="block text-[#C9D1D9] text-sm font-medium mb-2">
                          Payment Proof Screenshot <span className="text-[#F85149]">*</span>
                        </label>
                        <div className="relative">
                          <input
                            type="file"
                            id="proofImage"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="hidden"
                            required
                          />
                          <label
                            htmlFor="proofImage"
                            className="flex items-center justify-center w-full px-4 py-8 bg-[#0D1117] border-2 border-dashed border-[#30363D] text-[#8B949E] rounded-md hover:border-[#58A6FF] hover:text-[#58A6FF] transition-colors cursor-pointer"
                          >
                            <div className="text-center">
                              <Upload size={32} className="mx-auto mb-2" />
                              <p className="font-medium">
                                {paymentForm.proofImage ? paymentForm.proofImage.name : 'Click to upload screenshot'}
                              </p>
                              <p className="text-xs mt-1">PNG, JPG, GIF up to 5MB</p>
                            </div>
                          </label>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmittingPayment}
                        className="w-full bg-[#238636] text-white px-6 py-3 rounded-md hover:bg-[#2EA043] transition-all cursor-pointer font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmittingPayment ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            Submitting...
                          </>
                        ) : (
                          <>
                            <Upload size={18} />
                            Submit Payment Proof
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}

                {/* Pending Payment Notice */}
                {subscriptionStatus?.status === 'pending' && (
                  <div className="p-4 bg-[#E3B341]/10 border border-[#E3B341] rounded-lg">
                    <div className="flex items-start gap-3">
                      <Clock size={20} className="text-[#E3B341] mt-0.5" />
                      <div>
                        <p className="text-[#C9D1D9] font-medium mb-1">Payment Under Review</p>
                        <p className="text-[#8B949E] text-sm">
                          Your payment is being verified by our team. You'll receive an email once approved.
                          This usually takes less than 24 hours.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment History */}
                {paymentHistory.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-[#C9D1D9] font-semibold mb-3">Payment History</h3>
                    <div className="space-y-2">
                      {paymentHistory.map((payment) => (
                        <div
                          key={payment.id}
                          className="p-3 bg-[#0D1117] border border-[#30363D] rounded-lg flex items-center justify-between"
                        >
                          <div>
                            <p className="text-[#C9D1D9] font-medium">₦{payment.amount.toLocaleString()}</p>
                            <p className="text-[#8B949E] text-sm">Ref: {payment.reference}</p>
                            <p className="text-[#8B949E] text-xs">
                              {new Date(payment.submittedAt).toLocaleString()}
                            </p>
                          </div>
                          <div className="text-right">
                            {payment.status === 'approved' && (
                              <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#3FB950]/20 text-[#3FB950] rounded-full text-sm">
                                <CheckCircle size={14} />
                                Approved
                              </span>
                            )}
                            {payment.status === 'pending' && (
                              <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#E3B341]/20 text-[#E3B341] rounded-full text-sm">
                                <Clock size={14} />
                                Pending
                              </span>
                            )}
                            {payment.status === 'rejected' && (
                              <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#F85149]/20 text-[#F85149] rounded-full text-sm">
                                <XCircle size={14} />
                                Rejected
                              </span>
                            )}
                            {payment.adminNote && (
                              <p className="text-[#8B949E] text-xs mt-1">{payment.adminNote}</p>
                            )}
                          </div>
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
