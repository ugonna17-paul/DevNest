import { AuthLayout } from '../components/auth/AuthLayout';
import { 
  ChevronDown,
  ChevronRight,
  CheckCircle2,
  Circle,
  Lock,
  Clock,
  PlayCircle,
  Terminal,
  Book
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL } from '../config/api';

export function CoursePage() {
  const { courseId } = useParams();
  const [expandedModules, setExpandedModules] = useState([]);
  const [showInstallation, setShowInstallation] = useState(true);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState('free');

  useEffect(() => {
    fetchCourseData();
    fetchProgress();
    fetchSubscriptionStatus();
  }, [courseId]);

  const fetchSubscriptionStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`${API_URL}/api/payment/my-status`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();
      if (result.subscription) {
        setSubscriptionStatus(result.subscription.status);
      }
    } catch (error) {
      console.error('Subscription status fetch error:', error);
    }
  };

  const fetchCourseData = async () => {
    try {
      const response = await fetch(`${API_URL}/api/courses/${courseId}`);
      
      // Log response for debugging
      console.log('Course fetch response status:', response.status);
      
      if (!response.ok) {
        if (response.status === 401) {
          toast.error('Please login to access this course');
        } else if (response.status === 404) {
          toast.error('Course not found');
        } else {
          toast.error(`Error: ${response.status} ${response.statusText}`);
        }
        return;
      }
      
      const result = await response.json();
      
      if (result.success) {
        setCourse(result.data);
        // Expand all modules by default
        setExpandedModules(result.data.modules.map((_, idx) => idx));
      } else {
        toast.error(result.message || 'Course not found');
      }
    } catch (error) {
      console.error('Course fetch error:', error);
      toast.error('Failed to load course: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchProgress = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await fetch(`${API_URL}/api/progress/course/${courseId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const result = await response.json();
      if (result.success) {
        setProgress(result.data);
      }
    } catch (error) {
      console.error('Progress fetch error:', error);
    }
  };

  const toggleModule = (moduleId) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const handleLessonClick = (e, lesson) => {
    if (subscriptionStatus !== 'active') {
      e.preventDefault();
      toast.warning('🔒 Premium subscription required! Pay ₦3,000 for lifetime access to all courses.', {
        autoClose: 5000
      });
    }
  };

  if (loading) {
    return (
      <AuthLayout>
        <div className="max-w-5xl flex items-center justify-center h-64">
          <div className="text-[#8B949E] text-lg">Loading course...</div>
        </div>
      </AuthLayout>
    );
  }

  if (!course) {
    return (
      <AuthLayout>
        <div className="max-w-5xl flex items-center justify-center h-64">
          <div className="text-[#C9D1D9] text-lg">Course not found</div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="max-w-5xl">
        {/* Subscription Status Banner */}
        {subscriptionStatus !== 'active' && (
          <div className="mb-6 p-4 bg-gradient-to-r from-[#1F6FEB]/20 to-[#388BFD]/20 border border-[#1F6FEB] rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Lock className="text-[#58A6FF]" size={20} />
                <div>
                  <p className="text-[#C9D1D9] font-semibold">
                    {subscriptionStatus === 'pending' 
                      ? '⏳ Payment Pending Approval' 
                      : '🔒 Premium Content Locked'}
                  </p>
                  <p className="text-[#8B949E] text-sm mt-1">
                    {subscriptionStatus === 'pending'
                      ? 'Your payment is being reviewed. You\'ll get access once approved.'
                      : 'Pay ₦3,000 one-time for lifetime access to all courses'}
                  </p>
                </div>
              </div>
              {subscriptionStatus === 'free' && (
                <Link 
                  to="/settings"
                  className="px-4 py-2 bg-[#238636] hover:bg-[#2EA043] text-white rounded-md text-sm font-medium transition-colors"
                >
                  Upgrade Now
                </Link>
              )}
            </div>
          </div>
        )}

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-bold mb-3 text-[#C9D1D9] text-[36px]">
            {course.title}
          </h1>
          <p className="text-[#8B949E] text-[16px] mb-6 leading-relaxed">
            {course.description}
          </p>
          
          <div className="flex items-center gap-6 mb-6">
            <span className="text-[#8B949E] text-[15px]">
              📊 {course.level}
            </span>
            <span className="text-[#8B949E] text-[15px]">
              ⏱️ {course.duration}
            </span>
            <span className="text-[#8B949E] text-[15px]">
              📚 {progress ? `${progress.completedLessons}/${progress.totalLessons}` : `0/${course.totalLessons}`} lessons completed
            </span>
          </div>

          {course.prerequisites && course.prerequisites.length > 0 && (
            <div className="mb-6">
              <span className="text-[#8B949E] text-[14px]">Prerequisites: </span>
              <span className="text-[#1F6FEB] text-[14px]">
                {course.prerequisites.join(', ')}
              </span>
            </div>
          )}

          {/* Progress Bar */}
          {progress && (
            <div className="flex items-center gap-4 mb-6">
              <div className="bg-[#161B22] flex-1 h-3 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all ${
                    progress.percentage === 100 ? 'bg-[#238636]' : 'bg-[#1F6FEB]'
                  }`}
                  style={{ width: `${progress.percentage}%` }}
                ></div>
              </div>
              <span className="text-[#C9D1D9] text-[16px] font-semibold min-w-[50px]">
                {progress.percentage}%
              </span>
            </div>
          )}

          {progress && progress.percentage === 100 && (
            <div className="bg-[#161B22] border-2 border-[#238636] rounded-lg p-4 flex items-center gap-3">
              <CheckCircle2 size={24} className="text-[#238636]" />
              <span className="text-[#C9D1D9] font-semibold">
                Course Completed! 🎉
              </span>
            </div>
          )}
        </div>

        {/* Installation Guide - Removed since backend doesn't have this field yet */}

        {/* Modules List */}
        <div className="space-y-4">
          <h2 className="text-[#C9D1D9] text-[24px] font-bold mb-6">
            Course Content
          </h2>
          
          {course.modules.length === 0 ? (
            <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-12 text-center">
              <p className="text-[#8B949E]">
                Course content coming soon...
              </p>
            </div>
          ) : (
            course.modules.map((module, moduleIdx) => (
              <div
                key={module._id}
                className="bg-[#161B22] border border-[#30363D] rounded-lg overflow-hidden"
              >
                {/* Module Header */}
                <button
                  onClick={() => toggleModule(moduleIdx)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-[#0D1117] transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <ChevronRight 
                      size={20} 
                      className={`text-[#8B949E] transition-transform ${
                        expandedModules.includes(moduleIdx) ? 'rotate-90' : ''
                      }`}
                    />
                    <div className="text-left">
                      <span className="text-[#C9D1D9] text-[16px] font-semibold">
                        {module.title}
                      </span>
                      <p className="text-[#8B949E] text-[13px] mt-1">
                        {module.description}
                      </p>
                    </div>
                  </div>
                  <span className="text-[#8B949E] text-[14px]">
                    {module.lessons?.length || 0} lessons
                  </span>
                </button>

                {/* Lessons List */}
                {expandedModules.includes(moduleIdx) && module.lessons && (
                  <div className="border-t border-[#30363D] px-6 py-2">
                    {module.lessons.map((lesson) => (
                      <Link
                        key={lesson._id}
                        to={subscriptionStatus === 'active' ? `/lesson/${lesson._id}` : '#'}
                        onClick={(e) => handleLessonClick(e, lesson)}
                      >
                        <div
                          className={`py-4 px-4 flex items-center justify-between rounded-md hover:bg-[#0D1117] transition-colors cursor-pointer ${
                            subscriptionStatus !== 'active' ? 'opacity-60' : ''
                          }`}
                        >
                          <div className="flex items-center gap-4">
                            {subscriptionStatus !== 'active' ? (
                              <Lock size={20} className="text-[#F85149]" />
                            ) : (
                              <Circle size={20} className="text-[#8B949E]" />
                            )}
                            <span className="text-[15px] text-[#C9D1D9]">
                              {lesson.title}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock size={14} className="text-[#8B949E]" />
                            <span className="text-[#8B949E] text-[13px]">
                              {lesson.duration} min
                            </span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </AuthLayout>
  );
}
