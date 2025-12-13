import React from 'react';
import { cn } from '../lib/utils'; // Assuming you have a utility for merging classes

const SentimentGauge = ({ score }) => {
    // Score is 0-100
    // 0-33: Negative (Red), 34-66: Neutral (Blue/Yellow), 67-100: Positive (Green)

    const rotation = (score / 100) * 180; // 0 to 180 degrees

    let colorClass = "text-blue-500";
    let bgClass = "bg-blue-500";
    let label = "Neutral";

    if (score >= 60) {
        colorClass = "text-green-500";
        bgClass = "bg-green-500";
        label = "Bullish";
    } else if (score <= 40) {
        colorClass = "text-red-500";
        bgClass = "bg-red-500";
        label = "Bearish";
    }

    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className="relative w-48 h-24 overflow-hidden">
                {/* Background Arc */}
                <div className="absolute top-0 left-0 w-full h-full rounded-t-full bg-secondary border-t-[20px] border-l-[20px] border-r-[20px] border-secondary box-border"></div>

                {/* Needle */}
                <div
                    className="absolute bottom-0 left-1/2 w-full h-full origin-bottom-left"
                    style={{ transform: `rotate(${rotation - 180}deg) translateX(50%)` }} // This math might be tricky with standard CSS, let's use a simpler SVG approach for reliability
                >
                </div>

                {/* SVG Approach for precision */}
                <svg viewBox="0 0 100 50" className="w-full h-full block">
                    <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="currentColor" strokeWidth="8" className="text-secondary opacity-20" />
                    <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="currentColor" strokeWidth="8"
                        strokeDasharray="126" // approx length of arc
                        strokeDashoffset={126 - (126 * (score / 100))}
                        className={cn("transition-all duration-1000 ease-out", colorClass)}
                    />
                </svg>

                {/* Value Overlay */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 text-center">
                    <div className={cn("text-3xl font-bold font-mono tracking-tighter", colorClass)}>
                        {score}
                    </div>
                </div>
            </div>
            <div className="mt-4 text-center">
                <div className="text-sm text-muted-foreground uppercase tracking-widest text-[10px]">Market Mood</div>
                <div className={cn("text-lg font-bold uppercase", colorClass)}>{label}</div>
            </div>
        </div>
    );
};

export default SentimentGauge;
