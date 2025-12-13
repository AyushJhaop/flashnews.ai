import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import LiveTicker from './components/LiveTicker';
import SentimentGauge from './components/SentimentGauge';
import StockWatchlist from './components/StockWatchlist';
import { Zap, LayoutDashboard, Settings, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from './lib/utils';

// Connect to backend
const socket = io('http://localhost:5001');

function App() {
  const [newsFeed, setNewsFeed] = useState([]);
  const [stockData, setStockData] = useState({});
  const [globalSentiment, setGlobalSentiment] = useState(50);
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
      console.log('Received News:', newsItem);

      // Update News Feed (Keep last 20)
      setNewsFeed(prev => [newsItem, ...prev].slice(0, 20));

      // Update Stock Data
      setStockData(prev => ({
        ...prev,
        [newsItem.stockSymbol]: {
          score: newsItem.sentimentScore,
          label: newsItem.sentimentLabel,
          lastHeadline: newsItem.headline
        }
      }));

      // Update Global Sentiment (Simple Average of recent news)
      // In a real app, this would be a weighted market average
      setGlobalSentiment(prev => {
        const newAvg = (prev + newsItem.sentimentScore) / 2;
        return Math.round(newAvg);
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
            <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
              <Zap className="w-5 h-5 fill-current" />
            </div>
            <span className="text-xl font-bold tracking-tight">NewsFlash<span className="text-accent-foreground">.ai</span></span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4" /> Dashboard
            </a>
            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-2">
              <Settings className="w-4 h-4" /> Settings
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={handleLogout} className="text-sm font-medium text-muted-foreground hover:text-destructive transition-colors flex items-center gap-2">
              <LogOut className="w-4 h-4" /> Logout
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500"></div>
          </div>
        </div>
      </header>

      {/* Live Ticker */}
      <LiveTicker news={newsFeed} />

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Column: Market Overview */}
          <div className="lg:col-span-8 space-y-8">
            <div className="bg-card border border-border rounded-xl p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Zap className="w-64 h-64" />
              </div>

              <h1 className="text-3xl font-bold mb-2">Market Pulse</h1>
              <p className="text-muted-foreground max-w-xl mb-8">
                Real-time AI analysis of breaking financial news. We process thousands of data points to give you the latency advantage.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-secondary/20 rounded-xl p-6 flex flex-col items-center justify-center border border-border/50">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">Global Market Sentiment</h3>
                  <SentimentGauge score={globalSentiment} />
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Latest Alerts</h3>
                  <div className="space-y-3">
                    {newsFeed.length === 0 && (
                      <div className="text-center py-10 text-muted-foreground italic">Waiting for market data...</div>
                    )}
                    {newsFeed.slice(0, 4).map((item, i) => (
                      <div key={i} className="flex gap-4 p-3 rounded-lg bg-background border border-border/50 hover:border-accent transition-colors">
                        <div className={cn(
                          "w-1 h-full rounded-full shrink-0 self-stretch",
                          item.sentimentLabel === 'Positive' ? "bg-green-500" :
                            item.sentimentLabel === 'Negative' ? "bg-red-500" : "bg-blue-500"
                        )}></div>
                        <div className="overflow-hidden">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xs font-bold bg-secondary px-1.5 py-0.5 rounded">{item.stockSymbol}</span>
                            <span className="text-xs text-muted-foreground">{new Date(item.timestamp).toLocaleTimeString()}</span>
                          </div>
                          <p className="text-sm font-medium truncate">{item.headline}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Watchlist */}
          <div className="lg:col-span-4">
            <StockWatchlist watchlist={watchlist} stockData={stockData} />

            <div className="mt-8 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 border border-indigo-500/30 rounded-xl p-6 text-center">
              <h3 className="font-bold text-indigo-100 mb-2">Upgrade to Pro</h3>
              <p className="text-xs text-indigo-200/70 mb-4">Get millisecond-latency socket access and API keys for your algorithms.</p>
              <button className="w-full py-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-bold rounded-lg transition-colors shadow-lg shadow-indigo-500/20">
                Unlock Premium
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default App;
