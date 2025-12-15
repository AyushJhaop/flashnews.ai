import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Zap, LayoutDashboard, LogOut, PieChart, LineChart, BarChart2, Radio, TrendingUp, TrendingDown, Bell, Search, Activity, ArrowUpRight, ArrowDownRight, Briefcase } from 'lucide-react';
import { LineChart as ReLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import LiveTicker from '../components/LiveTicker';
import SentimentGauge from '../components/SentimentGauge';
import StockWatchlist from '../components/StockWatchlist';
import { cn } from '../lib/utils';

// Connect to backend
const socket = io('http://localhost:5001');

const Dashboard = () => {
    const [newsFeed, setNewsFeed] = useState([]);
    const [stockData, setStockData] = useState({});
    const [globalSentiment, setGlobalSentiment] = useState(50);
    const [sentimentHistory, setSentimentHistory] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

    // Hardcoded for prototype
    const watchlist = ["AAPL", "TSLA", "NVDA", "AMZN", "MSFT"];

    useEffect(() => {
        // Auth Check
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
            return;
        }

        socket.on('connect', () => {
            console.log('Connected to socket server');
        });

        socket.on('news-update', (newsItem) => {
            setNewsFeed(prev => [newsItem, ...prev].slice(0, 50));

            setStockData(prev => ({
                ...prev,
                [newsItem.stockSymbol]: {
                    score: newsItem.sentimentScore,
                    label: newsItem.sentimentLabel,
                    lastHeadline: newsItem.headline
                }
            }));

            setGlobalSentiment(prev => {
                const newAvg = (prev + newsItem.sentimentScore) / 2;
                return Math.round(newAvg);
            });

            setSentimentHistory(prev => {
                const newData = [...prev, { time: new Date().toLocaleTimeString(), score: newsItem.sentimentScore }];
                return newData.slice(-50); // Keep last 50 points
            });
        });

        return () => {
            socket.off('connect');
            socket.off('news-update');
        };
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/30">
            {/* Header */}
            <header className="border-b border-white/5 bg-background/50 backdrop-blur-md sticky top-0 z-40">
                <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="bg-primary/10 p-1.5 rounded-lg border border-primary/20">
                                <Zap className="w-5 h-5 text-primary fill-current" />
                            </div>
                            <span className="text-xl font-bold tracking-tight">NewsFlash<span className="text-primary">.ai</span></span>
                        </Link>
                    </div>
                    <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/5">
                        {[
                            { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
                            { name: 'Analytics', path: '/analytics', icon: BarChart2 },
                            { name: 'Portfolio', path: '/portfolio', icon: Briefcase }, // Replaced Sources
                        ].map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={cn(
                                    "px-4 py-2 text-sm font-medium rounded-lg flex items-center gap-2 transition-all",
                                    location.pathname === item.path
                                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                                        : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                                )}
                            >
                                <item.icon className="w-4 h-4" /> {item.name}
                            </Link>
                        ))}
                    </nav>
                    <div className="flex items-center gap-4">
                        {/* Market Status Widget (Replaced Search) */}
                        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-xs font-bold text-green-500 uppercase tracking-wide">Market Open</span>
                        </div>
                        <div className="hidden md:flex items-center gap-1 text-xs font-mono text-muted-foreground border border-white/5 px-2 py-1 rounded-md">
                            <Activity className="w-3 h-3" />
                            <span>Gas: 12 Gwei</span>
                        </div>

                        <button className="relative text-muted-foreground hover:text-foreground transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
                            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
                        </button>
                        <div className="h-6 w-px bg-white/10 mx-2"></div>
                        <div className="flex items-center gap-3">
                            <div className="hidden md:block text-right mr-1">
                                <div className="text-sm font-bold leading-none">Ayush Jha</div>
                                <div className="text-[10px] text-muted-foreground font-medium mt-1">PRO TRADER</div>
                            </div>
                            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 border border-white/10 ring-2 ring-transparent hover:ring-primary/50 transition-all cursor-pointer"></div>
                            <button onClick={handleLogout} className="p-2 text-muted-foreground hover:bg-red-500/10 hover:text-red-500 rounded-full transition-colors ml-1">
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Live Ticker */}
            <LiveTicker news={newsFeed} />

            {/* Main Content */}
            <main className="flex-1 container mx-auto px-6 py-8">

                {/* Top Section: Charts & Gauge */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Global Sentiment */}
                    <div className="glass-card rounded-2xl p-6 flex flex-col items-center justify-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none transition-opacity group-hover:opacity-10">
                            <PieChart className="w-32 h-32" />
                        </div>
                        <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground mb-6 flex items-center gap-2 w-full">
                            <Activity className="w-4 h-4 text-primary" /> Market Sentiment
                        </h3>
                        <div className="transform scale-110">
                            <SentimentGauge score={globalSentiment} />
                        </div>
                    </div>

                    {/* Sentiment History Chart */}
                    <div className="md:col-span-2 glass-card rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-sm font-medium uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                                <LineChart className="w-4 h-4 text-primary" /> Sentiment Trend (Real-time)
                            </h3>
                            <div className="flex gap-2 bg-secondary/50 p-1 rounded-lg">
                                {['1m', '5m', '15m', '1h'].map(t => (
                                    <button key={t} className={cn("text-xs px-2 py-1 rounded transition-colors", t === '1m' ? "bg-primary text-white" : "text-muted-foreground hover:text-white")}>{t}</button>
                                ))}
                            </div>
                        </div>
                        <div className="h-[220px] w-full min-w-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <ReLineChart data={sentimentHistory}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1e293b', borderColor: 'rgba(255,255,255,0.1)', borderRadius: '12px' }}
                                        itemStyle={{ color: '#e2e8f0' }}
                                    />
                                    <defs>
                                        <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <Line
                                        type="monotone"
                                        dataKey="score"
                                        stroke="var(--color-primary)"
                                        strokeWidth={3}
                                        dot={false}
                                        fill="url(#colorScore)"
                                    />
                                </ReLineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

                    {/* Recent News Feed */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-2xl font-bold flex items-center gap-2">
                                <div className="w-2 h-8 bg-primary rounded-full"></div>
                                Live Intelligence
                            </h2>
                            <div className="text-sm text-muted-foreground font-mono flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                CONNECTED
                            </div>
                        </div>

                        <div className="space-y-3">
                            {newsFeed.map((item, i) => (
                                <div key={i} className="group relative flex flex-col md:flex-row gap-5 p-5 rounded-2xl bg-card border border-white/5 hover:border-primary/50 transition-all hover:bg-white/[0.02]">
                                    <div className="absolute left-0 top-6 bottom-6 w-1 rounded-r-full bg-gradient-to-b from-transparent via-white/10 to-transparent group-hover:via-primary/50 transition-colors"></div>

                                    <div className="flex-1 pl-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs font-bold bg-white/10 px-2 py-1 rounded text-primary-foreground border border-white/5">{item.stockSymbol}</span>
                                                <span className={cn(
                                                    "text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide border",
                                                    item.sentimentLabel === 'Positive' ? "bg-green-500/10 text-green-500 border-green-500/20" :
                                                        item.sentimentLabel === 'Negative' ? "bg-red-500/10 text-red-500 border-red-500/20" : "bg-blue-500/10 text-blue-500 border-blue-500/20"
                                                )}>{item.sentimentLabel}</span>
                                            </div>
                                            <span className="text-xs text-muted-foreground font-mono">{new Date(item.timestamp).toLocaleTimeString()}</span>
                                        </div>
                                        <h4 className="text-lg font-semibold leading-snug mb-2 group-hover:text-primary transition-colors">{item.headline}</h4>
                                        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed opacity-80 group-hover:opacity-100">{item.summary || "AI Summary not available for this breaking news item."}</p>
                                    </div>

                                    <div className="flex flex-col items-center justify-center min-w-[80px] border-l border-white/5 pl-4 ml-2">
                                        <div className={cn(
                                            "text-3xl font-black mb-1",
                                            item.sentimentLabel === 'Positive' ? "text-green-500" :
                                                item.sentimentLabel === 'Negative' ? "text-red-500" : "text-blue-500"
                                        )}>{item.sentimentScore}</div>
                                        <div className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest">Score</div>
                                    </div>
                                </div>
                            ))}
                            {newsFeed.length === 0 && (
                                <div className="text-center py-32 rounded-2xl border border-dashed border-white/10 bg-white/[0.01]">
                                    <div className="w-16 h-16 rounded-full bg-secondary/30 mx-auto flex items-center justify-center mb-4">
                                        <Radio className="w-8 h-8 text-muted-foreground animate-pulse" />
                                    </div>
                                    <div className="text-muted-foreground">Waiting for market signals...</div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Watchlist */}
                    <div className="lg:col-span-4 space-y-6">
                        <StockWatchlist watchlist={watchlist} stockData={stockData} />

                        {/* Top Movers (Simulated for UI) */}
                        <div className="glass-card border border-white/5 rounded-2xl p-6">
                            <h3 className="font-bold mb-6 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-green-500" /> Top Movers
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center p-3 hover:bg-white/5 rounded-xl transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500 font-bold text-xs border border-green-500/20 group-hover:border-green-500/50 transition-colors">NVDA</div>
                                        <div>
                                            <div className="font-bold text-sm">NVIDIA</div>
                                            <div className="text-xs text-muted-foreground">Tech</div>
                                        </div>
                                    </div>
                                    <div className="text-green-500 font-bold flex items-center gap-1">
                                        <ArrowUpRight className="w-4 h-4" /> +4.2%
                                    </div>
                                </div>
                                <div className="flex justify-between items-center p-3 hover:bg-white/5 rounded-xl transition-colors cursor-pointer group">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 font-bold text-xs border border-red-500/20 group-hover:border-red-500/50 transition-colors">TSLA</div>
                                        <div>
                                            <div className="font-bold text-sm">Tesla</div>
                                            <div className="text-xs text-muted-foreground">Auto</div>
                                        </div>
                                    </div>
                                    <div className="text-red-500 font-bold flex items-center gap-1">
                                        <ArrowDownRight className="w-4 h-4" /> -1.8%
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Promo Card */}
                        <div className="relative rounded-2xl p-6 overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-violet-600 opacity-90"></div>
                            <div className="relative z-10 text-white">
                                <h3 className="font-bold text-lg mb-2">Pro Analytics</h3>
                                <p className="text-sm text-blue-100 mb-4">Unlock Level 2 data and proprietary signal flows.</p>
                                <button className="w-full py-2.5 bg-white text-blue-600 font-bold rounded-lg text-sm hover:bg-blue-50 transition-colors shadow-lg">
                                    Upgrade Now
                                </button>
                            </div>
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                        </div>

                    </div>

                </div>
            </main>
        </div>
    );
}

export default Dashboard;
