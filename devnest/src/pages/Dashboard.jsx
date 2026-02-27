import { AuthLayout } from '../components/auth/AuthLayout';
import { 
  BookOpen, 
  Flame, 
  Trophy, 
  ArrowRight,
  CheckCircle2,
  Clock,
  MessageSquare
} from 'lucide-react';
import { API_URL } from '../config/api';
import { Link } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FeedbackModal } from '../components/FeedbackModal';

export function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/dashboard`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();
      
      if (result.success) {
        setDashboardData(result.data);
      } else {
        toast.error('Failed to load dashboard data');
      }
    } catch (error) {
      console.error('Dashboard fetch error:', error);
      toast.error('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  // Generate weekly data (placeholder until backend tracks daily activity)
  const weeklyData = [
    { day: 'Mon', lessons: 0 },
    { day: 'Tue', lessons: 0 },
    { day: 'Wed', lessons: 0 },
    { day: 'Thu', lessons: 0 },
    { day: 'Fri', lessons: 0 },
    { day: 'Sat', lessons: 0 },
    { day: 'Sun', lessons: dashboardData?.stats.weeklyCompletedLessons || 0 },
  ];

  if (loading) {
    return (
      <AuthLayout>
        <div className="max-w-7xl flex items-center justify-center h-64">
          <div className="text-[#8B949E] text-lg">Loading dashboard...</div>
        </div>
      </AuthLayout>
    );
  }

  if (!dashboardData) {
    return (
      <AuthLayout>
        <div className="max-w-7xl flex items-center justify-center h-64">
          <div className="text-[#8B949E] text-lg">Failed to load dashboard</div>
        </div>
      </AuthLayout>
    );
  }
  return (
    <AuthLayout>
      <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />
      
      {/* Floating Feedback Button */}
      <button
        onClick={() => setIsFeedbackOpen(true)}
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 bg-[#1F6FEB] text-white p-3 md:p-4 rounded-full shadow-lg hover:bg-[#58A6FF] transition-all z-40 flex items-center gap-2 group"
      >
        <MessageSquare size={20} className="md:hidden" />
        <MessageSquare size={24} className="hidden md:block" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 whitespace-nowrap text-sm">
          Feedback
        </span>
      </button>

      <div className="max-w-7xl">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="font-bold mb-2 text-[#C9D1D9] text-[24px] md:text-[32px]">
            Dashboard
          </h1>
          <p className="text-[#8B949E] text-sm md:text-base">
            Track your learning progress and continue where you left off
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Total Lessons */}
          <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-[#0D1117] w-12 h-12 rounded-lg flex items-center justify-center">
                <BookOpen size={24} className="text-[#1F6FEB]" />
              </div>
              {dashboardData.stats.weeklyCompletedLessons > 0 && (
                <span className="text-[#238636] text-[14px] font-medium">
                  +{dashboardData.stats.weeklyCompletedLessons} this week
                </span>
              )}
            </div>
            <h3 className="text-[#C9D1D9] text-[28px] font-bold mb-1">
              {dashboardData.stats.totalCompletedLessons}
            </h3>
            <p className="text-[#8B949E] text-[14px]">
              Lessons Completed
            </p>
          </div>

          {/* Current Streak */}
          <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-[#0D1117] w-12 h-12 rounded-lg flex items-center justify-center">
                <Flame size={24} className="text-[#ff7b72]" />
              </div>
            </div>
            <h3 className="text-[#C9D1D9] text-[28px] font-bold mb-1">
              {dashboardData.stats.currentStreak} {dashboardData.stats.currentStreak === 1 ? 'day' : 'days'}
            </h3>
            <p className="text-[#8B949E] text-[14px]">
              Current Streak
            </p>
          </div>

          {/* Enrolled Courses */}
          <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-[#0D1117] w-12 h-12 rounded-lg flex items-center justify-center">
                <Trophy size={24} className="text-[#ffa657]" />
              </div>
            </div>
            <h3 className="text-[#C9D1D9] text-[28px] font-bold mb-1">
              {dashboardData.stats.enrolledCoursesCount}
            </h3>
            <p className="text-[#8B949E] text-[14px]">
              Courses Enrolled
            </p>
          </div>
        </div>

        {/* Resume Learning */}
        {dashboardData.lastAccessedLesson ? (
          <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4 md:p-6 mb-6 md:mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-[#C9D1D9] text-[18px] md:text-[20px] font-semibold">
                Continue Learning
              </h2>
            </div>

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-[#8B949E] text-[12px] md:text-[13px] mb-1">
                  {dashboardData.lastAccessedLesson.courseTitle}
                </p>
                <h3 className="text-[#C9D1D9] text-[16px] md:text-[18px] font-semibold mb-3 md:mb-4">
                  {dashboardData.lastAccessedLesson.lessonTitle}
                </h3>

                <Link to={`/lesson/${dashboardData.lastAccessedLesson.lessonId}`}>
                  <button className="bg-[#1F6FEB] text-white px-4 md:px-6 py-2 md:py-2.5 rounded-md hover:bg-[#58A6FF] transition-all flex items-center gap-2 cursor-pointer text-sm md:text-base">
                    Resume Lesson
                    <ArrowRight size={16} />
                  </button>
                </Link>
              </div>

              <div className="hidden lg:block bg-[#0D1117] border border-[#30363D] rounded-lg p-6 ml-8">
                <div className="w-48 h-32 flex items-center justify-center">
                  <Clock size={48} className="text-[#8B949E]" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-4 md:p-6 mb-6 md:mb-8">
            <div className="flex flex-col items-center justify-center py-6 md:py-8">
              <BookOpen size={40} className="md:hidden text-[#8B949E] mb-3" />
              <BookOpen size={48} className="hidden md:block text-[#8B949E] mb-4" />
              <h3 className="text-[#C9D1D9] text-[16px] md:text-[18px] font-semibold mb-2">
                Start Your Learning Journey
              </h3>
              <p className="text-[#8B949E] text-[13px] md:text-[14px] mb-4 text-center">
                Choose a course from the sidebar to begin
              </p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Weekly Activity */}
          <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-6">
            <h2 className="text-[#C9D1D9] text-[18px] font-semibold mb-6">
              Weekly Activity
            </h2>

            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={weeklyData}>
                <defs>
                  <linearGradient id="colorLessons" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1F6FEB" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#1F6FEB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="day" 
                  stroke="#8B949E"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#8B949E"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1C2128',
                    border: '1px solid #30363D',
                    borderRadius: '6px',
                    color: '#C9D1D9',
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="lessons" 
                  stroke="#1F6FEB" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorLessons)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Course Progress */}
          <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-6">
            <h2 className="text-[#C9D1D9] text-[18px] font-semibold mb-6">
              Course Progress
            </h2>

            {dashboardData.enrolledCourses.length > 0 ? (
              <div className="space-y-4">
                {dashboardData.enrolledCourses.map((course) => (
                  <div key={course.courseId}>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[20px]">{course.icon}</span>
                        <span className="text-[#C9D1D9] text-[14px] font-medium">
                          {course.title}
                        </span>
                        {course.percentage === 100 && (
                          <CheckCircle2 size={16} className="text-[#238636]" />
                        )}
                      </div>
                      <span className="text-[#8B949E] text-[13px]">
                        {course.completedLessons}/{course.totalLessons}
                      </span>
                    </div>
                    <div className="bg-[#0D1117] h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all ${
                          course.percentage === 100 ? 'bg-[#238636]' : 'bg-[#1F6FEB]'
                        }`}
                        style={{ width: `${course.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-[#8B949E] text-[14px]">
                  No courses started yet. Start learning to see your progress!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
