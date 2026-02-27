import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, AlertCircle, Loader2, Eye, EyeOff } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Signup() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation checks
    if (!fullName.trim()) {
      setError('Full name is required');
      return;
    }

    if (fullName.trim().length < 2) {
      setError('Full name must be at least 2 characters');
      return;
    }

    if (!email.trim()) {
      setError('Email is required');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!password) {
      setError('Password is required');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch('http://localhost:5008/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: fullName,
          email,
          password,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      // Store token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify({
        _id: data._id,
        name: data.name,
        email: data.email,
        role: data.role,
      }));

      // Redirect to login page
      toast.success('Account created successfully! Please login.', {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } catch (err) {
      toast.error(err.message || 'Something went wrong. Please try again.', {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0D1117] min-h-screen flex items-center justify-center px-6 py-12">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        style={{ width: '400px', maxWidth: '90vw' }}
        toastStyle={{
          backgroundColor: '#161B22',
          color: '#C9D1D9',
          border: '1px solid #30363D',
          borderRadius: '8px',
          fontSize: '14px',
          padding: '16px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
        }}
        progressStyle={{
          background: '#1F6FEB',
        }}
      />
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8" data-aos="fade-down">
          <Link to="/">
            <h1 className="text-[32px] text-[#C9D1D9] font-bold mb-2">
              DevNest
            </h1>
          </Link>
          <p className="text-[#8B949E]">
            Create your account to start learning
          </p>
        </div>

        {/* Auth Card */}
        <div
          data-aos="fade-up"
          data-aos-delay="100"
          className="bg-[#161B22] border border-[#30363D] rounded-lg p-8"
        >
          {/* Error Message */}
          {error && (
            <div className="bg-[#1F2937] border border-[#FCA5A5] text-[#FCA5A5] rounded-md p-3 mb-5 flex items-start gap-2">
              <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5" autoComplete="off">
            {/* Full Name Input */}
            <div>
              <label 
                htmlFor="fullName"
                className="block mb-2 font-medium text-[#C9D1D9] text-[14px]"
              >
                Full name
              </label>
              <div className="relative">
                <User 
                  size={18} 
                  className="text-[#8B949E] absolute left-3 top-1/2 transform -translate-y-1/2"
                />
                <input
                  id="fullName"
                  name="full-name-field"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  disabled={loading}
                  autoComplete="off"
                  data-form-type="other"
                  className="w-full pl-10 pr-4 py-3 bg-[#0D1117] border border-[#30363D] text-[#C9D1D9] rounded-md focus:outline-none focus:border-[#1F6FEB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label 
                htmlFor="email"
                className="block mb-2 font-medium text-[#C9D1D9] text-[14px]"
              >
                Email address
              </label>
              <div className="relative">
                <Mail 
                  size={18} 
                  className="text-[#8B949E] absolute left-3 top-1/2 transform -translate-y-1/2"
                />
                <input
                  id="email"
                  name="email-field"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  autoComplete="off"
                  data-form-type="other"
                  className="w-full pl-10 pr-4 py-3 bg-[#0D1117] border border-[#30363D] text-[#C9D1D9] rounded-md focus:outline-none focus:border-[#1F6FEB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label 
                htmlFor="password"
                className="block mb-2 font-medium text-[#C9D1D9] text-[14px]"
              >
                Password
              </label>
              <div className="relative">
                <Lock 
                  size={18} 
                  className="text-[#8B949E] absolute left-3 top-1/2 transform -translate-y-1/2"
                />
                <input
                  id="password"
                  name="password-field"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                  autoComplete="new-password"
                  data-form-type="other"
                  className="w-full pl-10 pr-12 py-3 bg-[#0D1117] border border-[#30363D] text-[#C9D1D9] rounded-md focus:outline-none focus:border-[#1F6FEB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8B949E] hover:text-[#C9D1D9] transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label 
                htmlFor="confirmPassword"
                className="block mb-2 font-medium text-[#C9D1D9] text-[14px]"
              >
                Confirm password
              </label>
              <div className="relative">
                <Lock 
                  size={18} 
                  className="text-[#8B949E] absolute left-3 top-1/2 transform -translate-y-1/2"
                />
                <input
                  id="confirmPassword"
                  name="confirm-password-field"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                  autoComplete="new-password"
                  data-form-type="other"
                  className="w-full pl-10 pr-12 py-3 bg-[#0D1117] border border-[#30363D] text-[#C9D1D9] rounded-md focus:outline-none focus:border-[#1F6FEB] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={loading}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#8B949E] hover:text-[#C9D1D9] transition-colors disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Create Account Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#1F6FEB] text-white rounded-md hover:bg-[#58A6FF] transition-all flex items-center justify-center gap-2 font-medium mt-6 disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span className="animate-pulse">Creating account...</span>
                </>
              ) : (
                <>
                  <span className="group-hover:translate-x-0.5 transition-transform">Create account</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Terms */}
          <p className="text-[#8B949E] text-[13px] text-center mt-6">
            By creating an account, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>

        {/* Login Link */}
        <div 
          className="text-center mt-6"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <p className="text-[#8B949E]">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-[#1F6FEB] hover:text-[#58A6FF] transition-colors font-medium"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
