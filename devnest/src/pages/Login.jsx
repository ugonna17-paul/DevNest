import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    Mail,
    Lock,
    ArrowRight,
    AlertCircle,
    Loader2,
    Eye,
    EyeOff,
} from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API_URL } from '../config/api';

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    // 🔥 Force clear inputs when page loads
    useEffect(() => {
        setEmail('');
        setPassword('');
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

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

        try {
            setLoading(true);

            const response = await fetch(
                `${API_URL}/api/auth/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email, password }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Store token
            localStorage.setItem('token', data.token);

            localStorage.setItem(
                'user',
                JSON.stringify({
                    _id: data._id,
                    name: data.name,
                    email: data.email,
                    role: data.role,
                })
            );

            toast.success('Login successful! Welcome back.', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

            setTimeout(() => {
                // Redirect based on role
                if (data.role === 'admin') {
                    navigate('/admin/payments');
                } else {
                    navigate('/dashboard');
                }
            }, 1000);
        } catch (err) {
            toast.error(err.message || 'Something went wrong.', {
                position: "top-center",
                autoClose: 4000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            setError(err.message || 'Something went wrong.');
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
                {/* Brand */}
                <div className="text-center mb-8">
                    <Link to="/">
                        <h1 className="text-[32px] text-[#C9D1D9] font-bold mb-2">
                            DevNest
                        </h1>
                    </Link>
                    <p className="text-[#8B949E]">
                        Sign in to continue learning
                    </p>
                </div>

                <div className="bg-[#161B22] border border-[#30363D] rounded-lg p-8">

                    {error && (
                        <div className="bg-[#1F2937] border border-[#FCA5A5] text-[#FCA5A5] rounded-md p-3 mb-5 flex items-start gap-2">
                            <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{error}</span>
                        </div>
                    )}

                    <form
                        onSubmit={handleSubmit}
                        autoComplete="off"
                        className="space-y-6"
                    >

                        {/* Email */}
                        <div>
                            <label className="block mb-2 text-[#C9D1D9] text-sm font-medium">
                                Email address
                            </label>

                            <div className="relative">
                                <Mail
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B949E]"
                                />

                                <input
                                    type="email"
                                    name="devnest-login-email"
                                    autoComplete="new-email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={loading}
                                    placeholder="you@example.com"
                                    className="w-full pl-10 pr-4 py-3 bg-[#0D1117] border border-[#30363D] text-[#C9D1D9] rounded-md focus:outline-none focus:border-[#1F6FEB] transition-colors"
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block mb-2 text-[#C9D1D9] text-sm font-medium">
                                Password
                            </label>

                            <div className="relative">
                                <Lock
                                    size={18}
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8B949E]"
                                />

                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="devnest-login-password"
                                    autoComplete="new-password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={loading}
                                    placeholder="Enter your password"
                                    className="w-full pl-10 pr-12 py-3 bg-[#0D1117] border border-[#30363D] text-[#C9D1D9] rounded-md focus:outline-none focus:border-[#1F6FEB] transition-colors"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B949E] hover:text-[#C9D1D9] cursor-pointer"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Remember */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 text-[#8B949E] text-sm">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 accent-[#1F6FEB]"
                                />
                                Remember me
                            </label>

                            <span className="text-[#1F6FEB] text-sm cursor-pointer hover:text-[#58A6FF]">
                                Forgot password?
                            </span>
                        </div>

                        {/* Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-[#1F6FEB] text-white rounded-md hover:bg-[#58A6FF] transition-all flex items-center justify-center gap-2 font-medium cursor-pointer disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <Loader2 size={18} className="animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign in
                                    <ArrowRight size={18} />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Signup */}
                <div className="text-center mt-6">
                    <p className="text-[#8B949E] text-sm">
                        Don't have an account?{' '}
                        <Link
                            to="/signup"
                            className="text-[#1F6FEB] hover:text-[#58A6FF]"
                        >
                            Create one now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
