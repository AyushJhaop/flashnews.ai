import React from 'react';
import { cn } from '../lib/utils';
import { TrendingUp, TrendingDown, Minus, Activity } from 'lucide-react';

const StockWatchlist = ({ watchlist, stockData }) => {
    return (
        <div className="w-full bg-card rounded-xl border border-border p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <Activity className="w-5 h-5 text-accent-foreground" />
                    Watchlist
                </h2>
                <button className="text-xs bg-secondary hover:bg-secondary/80 text-secondary-foreground px-3 py-1 rounded-full transition-colors">
                    Manage
                </button>
            </div>

            <div className="space-y-3">
                {watchlist.map(symbol => {
                    // Find latest data for this stock
                    const data = stockData[symbol] || {
                        score: 50,
                        label: 'Neutral',
                        lastHeadline: 'Waiting for updates...'
                    };

                    return (
                        <div key={symbol} className="group relative overflow-hidden rounded-lg bg-secondary/30 hover:bg-secondary/50 border border-transparent hover:border-border transition-all p-4 cursor-pointer">
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="text-xl font-bold tracking-tight">{symbol}</div>
                                    <div className="text-xs text-muted-foreground mt-1 truncate max-w-[200px]">
                                        {data.lastHeadline}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className={cn(
                                        "text-lg font-bold flex items-center justify-end gap-1",
                                        data.label === 'Positive' ? "text-green-500" :
                                            data.label === 'Negative' ? "text-red-500" :
                                                "text-blue-500"
                                    )}>
                                        {data.score}
                                        {data.label === 'Positive' ? <TrendingUp className="w-4 h-4" /> :
                                            data.label === 'Negative' ? <TrendingDown className="w-4 h-4" /> :
                                                <Minus className="w-4 h-4" />
                                        }
                                    </div>
                                    <div className={cn(
                                        "text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full inline-block mt-1",
                                        data.label === 'Positive' ? "bg-green-500/10 text-green-500" :
                                            data.label === 'Negative' ? "bg-red-500/10 text-red-500" :
                                                "bg-blue-500/10 text-blue-500"
                                    )}>
                                        {data.label}
                                    </div>
                                </div>
                            </div>

                            {/* Sentiment Bar */}
                            <div className="absolute bottom-0 left-0 w-full h-1 bg-secondary">
                                <div
                                    className={cn(
                                        "h-full transition-all duration-500",
                                        data.label === 'Positive' ? "bg-green-500" :
                                            data.label === 'Negative' ? "bg-red-500" :
                                                "bg-blue-500"
                                    )}
                                    style={{ width: `${data.score}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default StockWatchlist;
