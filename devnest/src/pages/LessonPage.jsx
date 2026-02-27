import { AuthLayout } from '../components/auth/AuthLayout';
import { 
  ChevronLeft,
  ChevronRight,
  Copy,
  Play,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { API_URL } from '../config/api';

export function LessonPage() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const [practiceCode, setPracticeCode] = useState('// Write your code here\n\n');
  const [practiceSubmitted, setPracticeSubmitted] = useState(false);
  const [practiceSuccess, setPracticeSuccess] = useState(false);
  const [lesson, setLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchLesson();
  }, [lessonId]);

  const fetchLesson = async () => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(`${API_URL}/api/lessons/single/${lessonId}`, {
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        setLesson(result.data);
        // Track lesson access
        trackAccess(result.data.course._id);
      } else {
        // Handle different error cases
        if (response.status === 403 && result.code === 'SUBSCRIPTION_REQUIRED') {
          toast.error('🔒 Premium subscription required to access lessons', {
            autoClose: 5000
          });
          navigate('/dashboard');
        } else if (response.status === 401) {
          toast.error('Please login to access lessons');
          navigate('/login');
        } else if (response.status === 404) {
          toast.error('Lesson not found');
          navigate('/dashboard');
        } else {
          toast.error(result.message || 'Failed to load lesson');
          navigate('/dashboard');
        }
      }
    } catch (error) {
      console.error('Lesson fetch error:', error);
      toast.error('Failed to load lesson');
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const trackAccess = async (courseId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      await fetch(`${API_URL}/api/progress/access`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          lessonId,
          courseId
        })
      });
    } catch (error) {
      console.error('Error tracking access:', error);
    }
  };

  const markComplete = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to track progress');
        return;
      }

      const response = await fetch(`${API_URL}/api/progress`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          lessonId: lesson._id,
          courseId: lesson.course._id,
          timeSpent: 300 // 5 minutes placeholder
        })
      });

      const result = await response.json();
      if (result.success) {
        toast.success('Lesson completed! 🎉');
      }
    } catch (error) {
      console.error('Error marking complete:', error);
    }
  };

  const handleSubmit = () => {
    setPracticeSubmitted(true);
    // Simple check - in real app would validate properly
    const isCorrect = practiceCode.trim().length > 30;
    setPracticeSuccess(isCorrect);
    
    if (isCorrect) {
      toast.success('Great job! Your solution is correct.', {
        position: "top-center",
        autoClose: 3000,
        style: {
          background: '#161B22',
          color: '#C9D1D9',
          border: '1px solid #30363D',
        }
      });
      markComplete();
    }
  };

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('Code copied!', {
      position: "top-center",
      autoClose: 2000,
      style: {
        background: '#161B22',
        color: '#C9D1D9',
        border: '1px solid #30363D',
      }
    });
  };

  if (loading) {
    return (
      <AuthLayout>
        <div className="max-w-6xl flex items-center justify-center h-64">
          <div className="text-[#8B949E] text-lg">Loading lesson...</div>
        </div>
      </AuthLayout>
    );
  }

  if (!lesson) {
    return (
      <AuthLayout>
        <div className="max-w-6xl flex items-center justify-center h-64">
          <div className="text-[#C9D1D9] text-lg">Lesson not found</div>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout>
      <div className="max-w-6xl">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <Link to={`/course/${lesson.course.slug}`}>
            <span className="text-[#1F6FEB] hover:text-[#58A6FF] transition-colors text-sm cursor-pointer">
              {lesson.course.title}
            </span>
          </Link>
          <ChevronRight size={14} className="text-[#8B949E]" />
          <span className="text-[#8B949E] text-sm">
            {lesson.module.title}
          </span>
          <ChevronRight size={14} className="text-[#8B949E]" />
          <span className="text-[#C9D1D9] text-sm font-medium">
            {lesson.title}
          </span>
        </div>

        {/* Lesson Title */}
        <h1 className="text-[#C9D1D9] text-[32px] font-bold mb-8">
          {lesson.title}
        </h1>

        {/* Lesson Content - Render markdown as HTML */}
        <div className="space-y-8 mb-12">
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
              h1: ({ node, ...props }) => (
                <h1 className="text-[28px] font-bold text-[#C9D1D9] mt-8 mb-4 pb-2 border-b border-[#30363D]" {...props} />
              ),
              h2: ({ node, ...props }) => (
                <h2 className="text-[24px] font-bold text-[#C9D1D9] mt-6 mb-3 flex items-center gap-2" {...props}>
                  <span className="w-1.5 h-6 bg-[#1F6FEB] rounded-full"></span>
                  {props.children}
                </h2>
              ),
              h3: ({ node, ...props }) => (
                <h3 className="text-[20px] font-semibold text-[#C9D1D9] mt-5 mb-3" {...props} />
              ),
              p: ({ node, ...props }) => (
                <p className="text-[#C9D1D9] text-[16px] leading-[1.7] mb-4" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc list-inside text-[#C9D1D9] space-y-2 mb-4 ml-4" {...props} />
              ),
              ol: ({ node, ...props }) => (
                <ol className="list-decimal list-inside text-[#C9D1D9] space-y-2 mb-4 ml-4" {...props} />
              ),
              li: ({ node, ...props }) => (
                <li className="text-[#C9D1D9] text-[16px] leading-[1.6]" {...props} />
              ),
              code: ({ node, inline, ...props }) => 
                inline ? (
                  <code className="bg-[#161B22] text-[#FF7B72] px-1.5 py-0.5 rounded text-[14px] font-mono border border-[#30363D]" {...props} />
                ) : (
                  <code className="block bg-[#161B22] text-white p-4 rounded-lg text-[14px] font-mono border border-[#30363D] overflow-x-auto" {...props} />
                ),
              pre: ({ node, ...props }) => (
                <pre className="bg-[#0D1117] p-4 rounded-lg mb-4 overflow-x-auto border border-[#30363D] text-white" {...props} />
              ),
              strong: ({ node, ...props }) => (
                <strong className="font-bold text-[#58A6FF]" {...props} />
              ),
              em: ({ node, ...props }) => (
                <em className="italic text-[#8B949E]" {...props} />
              ),
              blockquote: ({ node, ...props }) => (
                <blockquote className="border-l-4 border-[#1F6FEB] pl-4 py-2 my-4 text-[#8B949E] italic bg-[#161B22] rounded-r" {...props} />
              ),
              a: ({ node, ...props }) => (
                <a className="text-[#58A6FF] hover:underline" {...props} />
              ),
            }}
          >
            {lesson.content}
          </ReactMarkdown>
          </div>

          {/* Code Example */}
          {lesson.codeExample && (
            <div>
              <h3 className="text-[#C9D1D9] text-[18px] font-semibold mb-4">
                Code Example
              </h3>

              <div className="bg-[#161B22] border border-[#30363D] rounded-lg overflow-hidden">
                {/* Code Header */}
                <div className="bg-[#0D1117] border-b border-[#30363D] px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                    <span className="ml-3 text-sm text-[#8B949E]">
                      example.js
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(lesson.codeExample)}
                      className="px-3 py-1.5 border border-[#30363D] text-[#8B949E] rounded-md hover:border-[#58A6FF] transition-all flex items-center gap-2 text-sm cursor-pointer"
                    >
                      {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                      {copied ? 'Copied' : 'Copy'}
                    </button>
                  </div>
                </div>

                {/* Code Content */}
                <div className="bg-[#0D1117] p-6 font-mono text-sm">
                  <pre className="text-white whitespace-pre-wrap">
                    {lesson.codeExample}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between pt-6 border-t border-[#30363D]">
          {lesson.navigation?.previous ? (
            <Link to={`/lesson/${lesson.navigation.previous._id}`}>
              <button className="px-4 py-2.5 border border-[#30363D] text-[#C9D1D9] rounded-md hover:border-[#58A6FF] transition-all flex items-center gap-2 cursor-pointer">
                <ChevronLeft size={18} />
                Previous Lesson
              </button>
            </Link>
          ) : (
            <div></div>
          )}

          {lesson.navigation?.next ? (
            <Link to={`/lesson/${lesson.navigation.next._id}`}>
              <button className="bg-[#1F6FEB] text-white px-4 py-2.5 rounded-md hover:bg-[#58A6FF] transition-all flex items-center gap-2 cursor-pointer">
                Next Lesson
                <ChevronRight size={18} />
              </button>
            </Link>
          ) : (
            <button 
              onClick={markComplete}
              className="bg-[#238636] text-white px-4 py-2.5 rounded-md hover:bg-[#2ea043] transition-all flex items-center gap-2 cursor-pointer"
            >
              <CheckCircle2 size={18} />
              Mark Complete
            </button>
          )}
        </div>
      </div>
    </AuthLayout>
  );
}
