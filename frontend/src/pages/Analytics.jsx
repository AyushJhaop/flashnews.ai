import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, LayoutDashboard, BarChart2, Briefcase, LogOut, ArrowLeft } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const Analytics = () => {
    // Mock Data
    const sentimentTrend = Array.from({ length: 24 }, (_, i) => ({
        time: `${i}:00`,
        score: Math.floor(Math.random() * 40) + 40, // 40-80 range
        volume: Math.floor(Math.random() * 1000)
    }));

    const sectorPerformance = [
        { name: 'Tech', value: 85, color: '#3b82f6' },
        { name: 'Finance', value: 65, color: '#10b981' },
        { name: 'Health', value: 45, color: '#f59e0b' },
        { name: 'Energy', value: -12, color: '#ef4444' },
        { name: 'Consumer', value: 34, color: '#8b5cf6' },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
            {/* Header */}
            <header className="border-b border-white/5 bg-background/50 backdrop-blur-md sticky top-0 z-40">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link to="/dashboard" className="p-2 -ml-2 hover:bg-white/5 rounded-lg transition-colors mr-2">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <div className="bg-primary/10 p-1.5 rounded-lg border border-primary/20">
                            <Zap className="w-5 h-5 text-primary fill-current" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">NewsFlash<span className="text-primary">.ai</span></span>
                    </div>
                    <nav className="hidden md:flex items-center gap-1">
                        <Link to="/dashboard" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-white/5 flex items-center gap-2">
                            <LayoutDashboard className="w-4 h-4" /> Dashboard
                        </Link>
                        <Link to="/analytics" className="px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg flex items-center gap-2">
                            <BarChart2 className="w-4 h-4" /> Analytics
                        </Link>
                        <Link to="/portfolio" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-white/5 flex items-center gap-2">
                            <Briefcase className="w-4 h-4" /> Portfolio
                        </Link>
                    </nav>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 border border-white/10"></div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-8">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold mb-2">Market Analytics</h1>
                    <p className="text-muted-foreground">Deep dive into sentiment trends and sector performance.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Sentiment Volume Trend */}
                    <div className="p-6 rounded-2xl bg-card border border-white/5 shadow-xl">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <BarChart2 className="w-5 h-5 text-primary" /> Sentiment vs Volume
                        </h3>
                        <div className="h-[300px] w-full min-w-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={sentimentTrend}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                                    <XAxis dataKey="time" stroke="#64748b" tick={{ fontSize: 12 }} />
                                    <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1e293b', borderColor: 'rgba(255,255,255,0.1)' }}
                                    />
                                    <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} dot={false} />
                                    <Line type="monotone" dataKey="volume" stroke="#10b981" strokeWidth={2} dot={false} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Sector Performance */}
                    <div className="p-6 rounded-2xl bg-card border border-white/5 shadow-xl">
                        <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                            <PieChart className="w-5 h-5 text-purple-500" /> Sector Heatmap
                        </h3>
                        <div className="h-[300px] w-full min-w-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={sectorPerformance} layout="vertical">
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                                    <XAxis type="number" stroke="#64748b" hide />
                                    <YAxis dataKey="name" type="category" stroke="#94a3b8" width={80} />
                                    <Tooltip
                                        cursor={{ fill: 'transparent' }}
                                        contentStyle={{ backgroundColor: '#1e293b', borderColor: 'rgba(255,255,255,0.1)' }}
                                    />
                                    <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={30}>
                                        {sectorPerformance.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.value > 0 ? '#10b981' : '#ef4444'} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* AI Insights */}
                <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent border border-primary/10">
                    <h3 className="text-lg font-bold mb-4 text-primary">AI Market Insights</h3>
                    <div className="space-y-4">
                        {[
                            "Tech sector showing abnormal bullish divergence despite volume drop.",
                            "Energy sources reporting negative supply chain constraints (Confidence: 92%).",
                            "Retail sentiment flipping positive ahead of earnings season."
                        ].map((insight, i) => (
                            <div key={i} className="flex gap-4 items-start p-4 rounded-xl bg-background/50 border border-white/5">
                                <div className="mt-1 w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                                <p className="text-sm text-foreground/80">{insight}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Analytics;
