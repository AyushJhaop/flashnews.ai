import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, LayoutDashboard, BarChart2, Briefcase, ArrowLeft, TrendingUp, TrendingDown, DollarSign, PieChart } from 'lucide-react';
import { cn } from '../lib/utils';
import { PieChart as RePieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const Portfolio = () => {
    // Mock Data
    const portfolioData = [
        { name: 'AAPL', value: 45000, color: '#3b82f6' },
        { name: 'NVDA', value: 32000, color: '#10b981' },
        { name: 'TSLA', value: 28000, color: '#ef4444' },
        { name: 'AMZN', value: 15000, color: '#f59e0b' },
        { name: 'Cash', value: 12000, color: '#64748b' },
    ];

    const holdings = [
        { symbol: 'AAPL', name: 'Apple Inc.', quantity: 250, price: 180.25, change: 1.2, value: 45062.50 },
        { symbol: 'NVDA', name: 'NVIDIA Corp.', quantity: 70, price: 450.10, change: 3.5, value: 31507.00 },
        { symbol: 'TSLA', name: 'Tesla Inc.', quantity: 120, price: 235.50, change: -2.1, value: 28260.00 },
        { symbol: 'AMZN', name: 'Amazon.com', quantity: 100, price: 145.30, change: 0.8, value: 14530.00 },
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
                        <Link to="/analytics" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-white/5 flex items-center gap-2">
                            <BarChart2 className="w-4 h-4" /> Analytics
                        </Link>
                        <Link to="/portfolio" className="px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-lg flex items-center gap-2">
                            <Briefcase className="w-4 h-4" /> Portfolio
                        </Link>
                    </nav>
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 border border-white/10"></div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-6 py-8">
                <div className="mb-8 flex flex-col md:flex-row justify-between items-end gap-4">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">My Portfolio</h1>
                        <p className="text-muted-foreground">Live tracking of your connected brokerage accounts.</p>
                    </div>
                    <div className="text-right">
                        <div className="text-lg text-muted-foreground mb-1">Total Balance</div>
                        <div className="text-4xl font-bold text-white flex items-center justify-end gap-2">
                            $131,359.50 <span className="text-lg font-medium text-green-500 bg-green-500/10 px-2 py-0.5 rounded">+2.4%</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Allocation Chart */}
                    <div className="glass-card rounded-2xl p-6">
                        <h3 className="font-bold mb-6 flex items-center gap-2">
                            <PieChart className="w-5 h-5 text-primary" /> Asset Allocation
                        </h3>
                        <div className="h-[250px] w-full relative min-w-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <RePieChart>
                                    <Pie
                                        data={portfolioData}
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {portfolioData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1e293b', borderColor: 'rgba(255,255,255,0.1)' }}
                                        itemStyle={{ color: '#e2e8f0' }}
                                    />
                                </RePieChart>
                            </ResponsiveContainer>
                            {/* Center Text */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="text-center">
                                    <div className="text-xs text-muted-foreground uppercase">Positions</div>
                                    <div className="text-2xl font-bold">5</div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 space-y-2">
                            {portfolioData.map((item) => (
                                <div key={item.name} className="flex items-center justify-between text-sm">
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                        <span>{item.name}</span>
                                    </div>
                                    <span className="font-mono">${item.value.toLocaleString()}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Holdings List */}
                    <div className="lg:col-span-2 glass-card rounded-2xl p-6">
                        <h3 className="font-bold mb-6 flex items-center gap-2">
                            <Briefcase className="w-5 h-5 text-primary" /> Current Holdings
                        </h3>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="text-xs text-muted-foreground uppercase tracking-wider border-b border-white/5">
                                        <th className="pb-3 pl-2">Asset</th>
                                        <th className="pb-3 text-right">Price</th>
                                        <th className="pb-3 text-right">Balance</th>
                                        <th className="pb-3 text-right">Today</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm">
                                    {holdings.map((stock) => (
                                        <tr key={stock.symbol} className="group hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                                            <td className="py-4 pl-2">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center font-bold text-xs">{stock.symbol[0]}</div>
                                                    <div>
                                                        <div className="font-bold">{stock.symbol}</div>
                                                        <div className="text-xs text-muted-foreground">{stock.name}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="py-4 text-right font-mono">${stock.price.toFixed(2)}</td>
                                            <td className="py-4 text-right">
                                                <div className="font-bold">${stock.value.toLocaleString()}</div>
                                                <div className="text-xs text-muted-foreground">{stock.quantity} shares</div>
                                            </td>
                                            <td className="py-4 text-right">
                                                <div className={cn("font-bold flex items-center justify-end gap-1", stock.change > 0 ? "text-green-500" : "text-red-500")}>
                                                    {stock.change > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                                                    {Math.abs(stock.change)}%
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Portfolio;
