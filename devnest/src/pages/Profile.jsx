import { AuthLayout } from '../components/auth/AuthLayout';
import { User, Mail, Calendar, Award, Edit2, Save, X } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { API_URL } from '../config/api';

export function Profile() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user') || '{}'));
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
  });

  const stats = {
    lessonsCompleted: 48,
    currentStreak: 7,
    totalPoints: 1250,
    coursesInProgress: 4,
    coursesCompleted: 2,
    joinDate: new Date(2025, 0, 15).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel editing
      setFormData({
        name: user.name || '',
        email: user.email || '',
      });
    }
    setIsEditing(!isEditing);
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_URL}/api/auth/update-profile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile');
      }

      // Update localStorage
      const updatedUser = {
        ...user,
        name: formData.name,
        email: formData.email,
      };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditing(false);

      toast.success('Profile updated successfully!', {
        position: "top-center",
        autoClose: 2000,
        style: {
          background: '#161B22',
          color: '#C9D1D9',
          border: '1px solid #30363D',
        }
      });

      // Reload to update navbar
      setTimeout(() => window.location.reload(), 1000);
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message || 'Failed to update profile', {
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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <AuthLayout>
      <div className="max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-[#C9D1D9] text-[32px] font-bold mb-2">
            Profile
          </h1>
          <p className="text-[#8B949E]">
            Manage your personal information and track your progress
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Info Card */}
          <div className="lg:col-span-2">
            <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-[#C9D1D9] text-[20px] font-semibold">
                  Personal Information
                </h2>
                <button
                  onClick={handleEditToggle}
                  className="flex items-center gap-2 px-4 py-2 border border-[#30363D] text-[#C9D1D9] rounded-md hover:border-[#58A6FF] transition-all cursor-pointer"
                >
                  {isEditing ? (
                    <>
                      <X size={16} />
                      Cancel
                    </>
                  ) : (
                    <>
                      <Edit2 size={16} />
                      Edit
                    </>
                  )}
                </button>
              </div>

              {/* Profile Picture */}
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 rounded-full bg-[#0D1117] border-2 border-[#30363D] flex items-center justify-center">
                  <User size={40} className="text-[#8B949E]" />
                </div>
                <div>
                  <h3 className="text-[#C9D1D9] text-[18px] font-semibold mb-1">
                    {user.name || 'User'}
                  </h3>
                  <p className="text-[#8B949E] text-[14px]">
                    DevNest Learner
                  </p>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-6">
                {/* Name */}
                <div>
                  <label className="block text-[#C9D1D9] text-sm font-medium mb-2">
                    Full Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#0D1117] border border-[#30363D] text-[#C9D1D9] rounded-md focus:outline-none focus:border-[#58A6FF] transition-colors"
                      placeholder="Enter your name"
                    />
                  ) : (
                    <div className="flex items-center gap-3 px-4 py-3 bg-[#0D1117] border border-[#30363D] rounded-md">
                      <User size={18} className="text-[#8B949E]" />
                      <span className="text-[#C9D1D9]">{user.name || 'Not set'}</span>
                    </div>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-[#C9D1D9] text-sm font-medium mb-2">
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#0D1117] border border-[#30363D] text-[#C9D1D9] rounded-md focus:outline-none focus:border-[#58A6FF] transition-colors"
                      placeholder="Enter your email"
                    />
                  ) : (
                    <div className="flex items-center gap-3 px-4 py-3 bg-[#0D1117] border border-[#30363D] rounded-md">
                      <Mail size={18} className="text-[#8B949E]" />
                      <span className="text-[#C9D1D9]">{user.email || 'Not set'}</span>
                    </div>
                  )}
                </div>

                {/* Member Since */}
                <div>
                  <label className="block text-[#C9D1D9] text-sm font-medium mb-2">
                    Member Since
                  </label>
                  <div className="flex items-center gap-3 px-4 py-3 bg-[#0D1117] border border-[#30363D] rounded-md">
                    <Calendar size={18} className="text-[#8B949E]" />
                    <span className="text-[#C9D1D9]">{stats.joinDate}</span>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              {isEditing && (
                <div className="mt-6">
                  <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="w-full bg-[#1F6FEB] text-white px-6 py-3 rounded-md hover:bg-[#58A6FF] transition-all flex items-center justify-center gap-2 cursor-pointer font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Save size={18} />
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Stats Card */}
          <div className="space-y-6">
            {/* Learning Stats */}
            <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-6">
              <h3 className="text-[#C9D1D9] text-[16px] font-semibold mb-4 flex items-center gap-2">
                <Award size={18} />
                Learning Stats
              </h3>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[#8B949E] text-[13px]">Lessons Completed</span>
                    <span className="text-[#C9D1D9] text-[14px] font-semibold">{stats.lessonsCompleted}</span>
                  </div>
                  <div className="h-2 bg-[#0D1117] rounded-full overflow-hidden">
                    <div className="h-full bg-[#1F6FEB] rounded-full" style={{ width: '48%' }}></div>
                  </div>
                </div>

                <div className="flex justify-between items-center py-3 border-t border-[#30363D]">
                  <span className="text-[#8B949E] text-[13px]">Current Streak</span>
                  <span className="text-[#C9D1D9] text-[14px] font-semibold">{stats.currentStreak} days</span>
                </div>

                <div className="flex justify-between items-center py-3 border-t border-[#30363D]">
                  <span className="text-[#8B949E] text-[13px]">Total Points</span>
                  <span className="text-[#C9D1D9] text-[14px] font-semibold">{stats.totalPoints}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-t border-[#30363D]">
                  <span className="text-[#8B949E] text-[13px]">Courses In Progress</span>
                  <span className="text-[#C9D1D9] text-[14px] font-semibold">{stats.coursesInProgress}</span>
                </div>

                <div className="flex justify-between items-center py-3 border-t border-[#30363D]">
                  <span className="text-[#8B949E] text-[13px]">Courses Completed</span>
                  <span className="text-[#C9D1D9] text-[14px] font-semibold">{stats.coursesCompleted}</span>
                </div>
              </div>
            </div>

            {/* Achievements Preview */}
            <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-6">
              <h3 className="text-[#C9D1D9] text-[16px] font-semibold mb-4">
                Recent Achievements
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-[#0D1117] rounded-md">
                  <div className="w-10 h-10 rounded-full bg-[#238636] flex items-center justify-center">
                    <Award size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[#C9D1D9] text-[13px] font-medium">HTML Master</p>
                    <p className="text-[#8B949E] text-[11px]">Completed HTML course</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#0D1117] rounded-md">
                  <div className="w-10 h-10 rounded-full bg-[#1F6FEB] flex items-center justify-center">
                    <Award size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[#C9D1D9] text-[13px] font-medium">Week Warrior</p>
                    <p className="text-[#8B949E] text-[11px]">7 day streak</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
