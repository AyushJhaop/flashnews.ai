import React from 'react';
import { cn } from '../lib/utils';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const LiveTicker = ({ news }) => {
    return (
        <div className="w-full bg-card border-y border-border overflow-hidden h-12 flex items-center relative z-50">
            <div className="flex whitespace-nowrap animate-[scroll-left_40s_linear_infinite] hover:[animation-play-state:paused]">
                {news.map((item, idx) => (
                    <div key={idx} className="flex items-center mx-8 space-x-3">
                        <span className="text-xs text-muted-foreground font-mono">
                            {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span className={cn(
                            "font-bold uppercase text-sm px-2 py-0.5 rounded",
                            item.sentimentLabel === 'Positive' ? "bg-green-500/10 text-green-500" :
                                item.sentimentLabel === 'Negative' ? "bg-red-500/10 text-red-500" :
                                    "bg-blue-500/10 text-blue-500"
                        )}>
                            {item.stockSymbol}
                        </span>
                        <span className="text-sm font-medium text-foreground max-w-md truncate">
                            {item.headline}
                        </span>
                        {item.sentimentLabel === 'Positive' ? <TrendingUp className="w-4 h-4 text-green-500" /> :
                            item.sentimentLabel === 'Negative' ? <TrendingDown className="w-4 h-4 text-red-500" /> :
                                <Minus className="w-4 h-4 text-blue-500" />
                        }
                    </div>
                ))}
                {/* Duplicate for seamless infinite scroll if list is short (logic handled by parent usually, but simple duplication here works for now) */}
                {news.map((item, idx) => (
                    <div key={`dup-${idx}`} className="flex items-center mx-8 space-x-3">
                        <span className="text-xs text-muted-foreground font-mono">
                            {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <span className={cn(
                            "font-bold uppercase text-sm px-2 py-0.5 rounded",
                            item.sentimentLabel === 'Positive' ? "bg-green-500/10 text-green-500" :
                                item.sentimentLabel === 'Negative' ? "bg-red-500/10 text-red-500" :
                                    "bg-blue-500/10 text-blue-500"
                        )}>
                            {item.stockSymbol}
                        </span>
                        <span className="text-sm font-medium text-foreground max-w-md truncate">
                            {item.headline}
                        </span>
                        {item.sentimentLabel === 'Positive' ? <TrendingUp className="w-4 h-4 text-green-500" /> :
                            item.sentimentLabel === 'Negative' ? <TrendingDown className="w-4 h-4 text-red-500" /> :
                                <Minus className="w-4 h-4 text-blue-500" />
                        }
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LiveTicker;
