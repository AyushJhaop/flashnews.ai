import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { cn } from '../lib/utils';
import { Zap } from 'lucide-react';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5001/api/auth/login', formData);
            localStorage.setItem('token', res.data.token);
            // Simple full reload to reset state or navigate inside App if context was set up
            window.location.href = '/dashboard';
        } catch (err) {
            alert(err.response?.data?.msg || 'Login Failed');
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md bg-card border border-border p-8 rounded-xl shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>

                <div className="flex items-center justify-center gap-2 mb-8">
                    <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                        <Zap className="w-6 h-6 fill-current" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight">NewsFlash<span className="text-accent-foreground">.ai</span></span>
                </div>

                <h2 className="text-xl font-bold mb-6 text-center">Welcome Back</h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="text-sm font-medium text-muted-foreground">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full mt-1 bg-secondary border border-transparent focus:border-accent outline-none px-4 py-2 rounded-lg transition-colors"
                            placeholder="trader@wallstreet.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-muted-foreground">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full mt-1 bg-secondary border border-transparent focus:border-accent outline-none px-4 py-2 rounded-lg transition-colors"
                            required
                        />
                    </div>
                    <button className="w-full py-3 bg-primary text-primary-foreground font-bold rounded-lg hover:bg-primary/90 transition-colors">
                        Sign In
                    </button>
                </form>

                <div className="mt-6 text-center text-sm text-muted-foreground">
                    Don't have an account? <Link to="/signup" className="text-accent-foreground hover:underline">Sign up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
