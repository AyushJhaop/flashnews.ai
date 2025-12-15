import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Zap, ArrowRight, Lock, Mail, User, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Signup = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const res = await axios.post('http://localhost:5001/api/auth/register', formData);
            localStorage.setItem('token', res.data.token);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.msg || 'Signup Failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-primary/30">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:50px_50px]"></div>
            <div className="absolute top-3/4 left-1/3 w-96 h-96 bg-primary/20 rounded-full blur-[128px] animate-pulse"></div>
            <div className="absolute bottom-1/4 right-3/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[128px] animate-pulse delay-1000"></div>

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
                    <h2 className="text-2xl font-bold text-center mb-2 text-white">Create Account</h2>
                    <p className="text-gray-300 text-center mb-8 text-sm">Join the future of algorithmic trading.</p>

                    {error && (
                        <div className="mb-6 bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div> {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-sm font-bold text-gray-200 ml-1">Username</label>
                            <div className="relative">
                                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-white/20 text-white px-4 py-3 pl-10 rounded-xl focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-gray-500 font-medium"
                                    placeholder="TraderJoe"
                                    required
                                />
                            </div>
                        </div>

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
                            <label className="text-sm font-bold text-gray-200 ml-1">Password</label>
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

                        <div className="flex items-start gap-2 pt-2 mb-2">
                            <div className="mt-0.5">
                                <input type="checkbox" id="terms" className="rounded border-white/10 bg-secondary/50 text-primary focus:ring-primary/50 scheme-dark" required />
                            </div>
                            <label htmlFor="terms" className="text-xs text-gray-300 leading-snug cursor-pointer select-none">
                                I agree to the <a href="#" className="underline hover:text-white font-bold">Terms</a> and <a href="#" className="underline hover:text-white font-bold">Privacy Policy</a>.
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-xl shadow-lg border border-primary/50 transition-all flex items-center justify-center gap-2 mt-2"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            ) : (
                                <>Create Account <ArrowRight className="w-4 h-4 ml-1" /></>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-400">
                        Already have an account?{' '}
                        <Link to="/login" className="text-primary hover:text-primary/80 font-bold underline-offset-4 hover:underline transition-all">
                            Sign in
                        </Link>
                    </div>
                </div>
                <div className="mt-6 flex justify-center gap-4 text-xs text-muted-foreground/50">
                    <div className="flex items-center gap-1"><ShieldCheck className="w-3 h-3" /> SSL Encrypted</div>
                    <div>•</div>
                    <div>256-bit Security</div>
                </div>
            </motion.div>
        </div>
    );
};

export default Signup;
