import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Zap, ArrowRight, Lock, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const res = await axios.post('http://localhost:5001/api/auth/login', formData);
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.msg || 'Invalid credentials');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-primary/30">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px]"></div>
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px] animate-pulse delay-1000"></div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Logo */}
                <div className="flex justify-center mb-8">
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="bg-primary/10 p-2 rounded-xl border border-primary/20 group-hover:bg-primary/20 transition-colors">
                            <Zap className="w-6 h-6 text-primary fill-current" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight text-white">NewsFlash<span className="text-primary">.ai</span></span>
                    </Link>
                </div>

                <div className="bg-[#0f172a] border border-white/20 p-8 rounded-2xl shadow-2xl relative z-20">
                    <h2 className="text-2xl font-bold text-center mb-2 text-white">Welcome Back</h2>
                    <p className="text-gray-300 text-center mb-8 text-sm">Enter your credentials to access the terminal.</p>

                    {error && (
                        <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-1">
                            <label className="text-sm font-bold text-gray-200 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/20 text-white px-4 py-3 pl-10 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-500 font-medium"
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-sm font-bold text-gray-200">Password</label>
                                <a href="#" className="text-xs text-primary hover:text-primary/80 transition-colors font-semibold">Forgot password?</a>
                            </div>
                            <div className="relative">
                                <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/20 text-white px-4 py-3 pl-10 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-500 font-medium"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl shadow-lg border border-primary/50 transition-all flex items-center justify-center gap-2 mt-4"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>Sign In <ArrowRight className="w-4 h-4 ml-1" /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-400">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-primary hover:text-primary/80 font-bold underline-offset-4 hover:underline transition-all">
                            Create an account
                        </Link>
                    </div>
                </div>

                <div className="mt-6 text-center text-xs text-muted-foreground/50">
                    &copy; 2024 NewsFlash AI Inc. Secure Terminal.
                </div>
            </motion.div>
        </div>
    );
};

export default Login;
