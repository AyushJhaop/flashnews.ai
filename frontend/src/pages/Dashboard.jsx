import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { useNavigate, Link } from 'react-router-dom';
import { Zap, LayoutDashboard, LogOut, PieChart } from 'lucide-react';
import { LineChart as ReLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

import LiveTicker from '../components/LiveTicker';
import SentimentGauge from '../components/SentimentGauge';
import StockWatchlist from '../components/StockWatchlist';
import { cn } from '../lib/utils';

// Connect to backend (Move socket outside to avoid reconnects on re-render, though inside useEffect is safer for auth in real apps)
// For this demo, we can keep it global or manage connection state
const socket = io('http://localhost:5001'); // connection will happen, auth middleware usually handles security

const Dashboard = () => {
    const [newsFeed, setNewsFeed] = useState([]);
    const [stockData, setStockData] = useState({});
    const [globalSentiment, setGlobalSentiment] = useState(50);
    const [sentimentHistory, setSentimentHistory] = useState([]);
    const navigate = useNavigate();

    // Hardcoded for prototype
    const watchlist = ["AAPL", "TSLA", "NVDA", "AMZN"];

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
            // Update News Feed
            setNewsFeed(prev => [newsItem, ...prev].slice(0, 50)); // Keep last 50

            // Update Stock Data
            setStockData(prev => ({
                ...prev,
                [newsItem.stockSymbol]: {
                    score: newsItem.sentimentScore,
                    label: newsItem.sentimentLabel,
                    lastHeadline: newsItem.headline
                }
            }));

            // Update Global Sentiment
            setGlobalSentiment(prev => {
                const newAvg = (prev + newsItem.sentimentScore) / 2;
                return Math.round(newAvg);
            });

            // Update Sentiment History for Chart
            setSentimentHistory(prev => {
                const newData = [...prev, { time: new Date().toLocaleTimeString(), score: newsItem.sentimentScore }];
                return newData.slice(-20); // Keep last 20 points for chart
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
        <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-accent selection:text-white">
            {/* Header */}
            <header className="border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-40">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Link to="/" className="flex items-center gap-2">
                            <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
                                <Zap className="w-5 h-5 fill-current" />
                            </div>
                            <span className="text-xl font-bold tracking-tight">NewsFlash<span className="text-primary">.ai</span></span>
                        </Link>
                    </div>
                    <nav className="hidden md:flex items-center gap-6">
                        <button className="text-sm font-medium text-primary flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full">
                            <LayoutDashboard className="w-4 h-4" /> Dashboard
                        </button>
                    </nav>
                    <div className="flex items-center gap-3">
                        <div className="hidden md:block text-right mr-2">
                            <div className="text-sm font-bold">Ayush Jha</div>
                            <div className="text-xs text-muted-foreground">Pro Trader</div>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-primary"></div>
                        <button onClick={handleLogout} className="ml-2 p-2 hover:bg-destructive/10 hover:text-destructive rounded-full transition-colors">
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Live Ticker */}
            <LiveTicker news={newsFeed} />

            {/* Main Content */}
            <main className="flex-1 container mx-auto px-4 py-8">

                {/* Top Section: Charts & Gauge */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Global Sentiment */}
                    <div className="p-6 bg-card border border-border rounded-2xl flex flex-col items-center justify-center relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-5">
                            <PieChart className="w-32 h-32" />
                        </div>
                        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                            <PieChart className="w-5 h-5 text-primary" /> Market Mood
                        </h3>
                        <SentimentGauge score={globalSentiment} />
                    </div>

                    {/* Sentiment History Chart */}
                    <div className="md:col-span-2 p-6 bg-card border border-border rounded-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-bold flex items-center gap-2">
                                <LineChart className="w-5 h-5 text-primary" /> Sentiment Trend
                            </h3>
                            <div className="flex gap-2">
                                <span className="text-xs bg-secondary px-2 py-1 rounded">1H</span>
                                <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">Live</span>
                            </div>
                        </div>
                        <div className="h-[200px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <ReLineChart data={sentimentHistory}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" opacity={0.5} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
                                        itemStyle={{ color: 'var(--color-foreground)' }}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="score"
                                        stroke="var(--color-primary)"
                                        strokeWidth={2}
                                        dot={false}
                                        activeDot={{ r: 4, fill: 'var(--color-primary)' }}
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
                            <h2 className="text-2xl font-bold">Live Feed</h2>
                            <div className="text-sm text-muted-foreground">Streaming from 10k sources...</div>
                        </div>

                        <div className="space-y-3">
                            {newsFeed.map((item, i) => (
                                <div key={i} className="group flex flex-col md:flex-row gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5">
                                    <div className={cn(
                                        "w-1.5 rounded-full shrink-0 self-stretch",
                                        item.sentimentLabel === 'Positive' ? "bg-green-500" :
                                            item.sentimentLabel === 'Negative' ? "bg-red-500" : "bg-blue-500"
                                    )}></div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-bold bg-secondary px-2 py-1 rounded text-primary-foreground">{item.stockSymbol}</span>
                                                <span className={cn(
                                                    "text-xs font-semibold px-2 py-0.5 rounded-full",
                                                    item.sentimentLabel === 'Positive' ? "bg-green-500/20 text-green-500" :
                                                        item.sentimentLabel === 'Negative' ? "bg-red-500/20 text-red-500" : "bg-blue-500/20 text-blue-500"
                                                )}>{item.sentimentLabel}</span>
                                            </div>
                                            <span className="text-xs text-muted-foreground font-mono">{new Date(item.timestamp).toLocaleTimeString()}</span>
                                        </div>
                                        <h4 className="text-lg font-medium leading-tight mb-1 group-hover:text-primary transition-colors">{item.headline}</h4>
                                        <p className="text-sm text-muted-foreground line-clamp-2">{item.summary || "AI Summary not available for this breaking news item."}</p>
                                    </div>
                                    <div className="flex flex-col items-end justify-center min-w-[60px]">
                                        <div className="text-2xl font-bold">{item.sentimentScore}</div>
                                        <div className="text-[10px] uppercase text-muted-foreground">Score</div>
                                    </div>
                                </div>
                            ))}
                            {newsFeed.length === 0 && (
                                <div className="text-center py-20 text-muted-foreground animate-pulse">Waiting for market open...</div>
                            )}
                        </div>
                    </div>

                    {/* Right Column: Watchlist */}
                    <div className="lg:col-span-4 space-y-6">
                        <StockWatchlist watchlist={watchlist} stockData={stockData} />

                        {/* Top Movers (Simulated for UI) */}
                        <div className="bg-card border border-border rounded-xl p-6">
                            <h3 className="font-bold mb-4">Top Movers</h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-green-500/20 flex items-center justify-center text-green-500 font-bold text-xs">NVDA</div>
                                        <div>
                                            <div className="font-bold text-sm">NVIDIA</div>
                                            <div className="text-xs text-muted-foreground">Tech</div>
                                        </div>
                                    </div>
                                    <div className="text-green-500 font-bold">+4.2%</div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded bg-red-500/20 flex items-center justify-center text-red-500 font-bold text-xs">TSLA</div>
                                        <div>
                                            <div className="font-bold text-sm">Tesla</div>
                                            <div className="text-xs text-muted-foreground">Auto</div>
                                        </div>
                                    </div>
                                    <div className="text-red-500 font-bold">-1.8%</div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
}

// Simple link component needed since we aren't borrowing from App.jsx's scope
import { Link } from 'react-router-dom';

export default Dashboard;
