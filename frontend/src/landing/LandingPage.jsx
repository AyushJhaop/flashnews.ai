import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, TrendingUp, Cpu, Globe, ArrowRight, Shield, Activity, BarChart2 } from 'lucide-react';
import { cn } from '../lib/utils';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-lg border-b border-border">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary p-2 rounded-xl">
                            <Zap className="w-6 h-6 text-primary-foreground fill-current" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight">NewsFlash<span className="text-primary">.ai</span></span>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/login" className="px-6 py-2.5 text-sm font-semibold hover:text-primary transition-colors">
                            Log In
                        </Link>
                        <Link to="/signup" className="px-6 py-2.5 bg-primary text-primary-foreground text-sm font-bold rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-40 pb-32 overflow-hidden">
                {/* Abstract Background Blobs */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>

                <div className="container mx-auto px-6 text-center z-10 relative">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/30 border border-white/10 mb-8">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-sm font-medium text-primary-foreground/80">Live Market Data Active</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-8 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
                            Trade at the <br /> Speed of Light
                        </h1>
                        <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
                            Stop Reacting. Start Anticipating. <br />
                            The only AI-powered news aggregator that delivers sentiment analysis with millisecond latency.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link to="/signup" className="h-14 px-8 rounded-full bg-primary text-white font-bold text-lg flex items-center gap-2 hover:scale-105 transition-transform shadow-xl shadow-primary/20">
                                Get Started Free <ArrowRight className="w-5 h-5" />
                            </Link>
                            <a href="#features" className="h-14 px-8 rounded-full bg-secondary text-white font-semibold text-lg flex items-center gap-2 hover:bg-secondary/80 transition-colors">
                                Explore Features
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Stats/Problem Section */}
            <section className="py-24 bg-card/30 border-y border-border">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div className="p-8 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/5">
                            <div className="text-5xl font-black text-primary mb-2">15m</div>
                            <div className="text-lg font-bold mb-4">Latency Removed</div>
                            <p className="text-muted-foreground text-sm">Traditional news takes minutes. We take milliseconds. Don't be the last to know.</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/5">
                            <div className="text-5xl font-black text-primary mb-2">24/7</div>
                            <div className="text-lg font-bold mb-4">AI Sentiment</div>
                            <p className="text-muted-foreground text-sm">Our Neural Networks read the subtext so you don't have to guess if news is Bullish or Bearish.</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-gradient-to-b from-white/5 to-transparent border border-white/5">
                            <div className="text-5xl font-black text-primary mb-2">10k+</div>
                            <div className="text-lg font-bold mb-4">Sources Scanned</div>
                            <p className="text-muted-foreground text-sm">From major outlets to niche blogs, we filter the noise and deliver the signal.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Feature Showcase */}
            <section id="features" className="py-32 relative">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">Why NewsFlash?</h2>
                        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Complex problems require elegant solutions. We broke down the barriers to institutional-grade data.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center mb-32">
                        <div>
                            <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6">
                                <Cpu className="w-8 h-8 text-blue-500" />
                            </div>
                            <h3 className="text-3xl font-bold mb-4">Cognitive Offloading</h3>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                Information overload causes "Analysis Paralysis". Our system reads millions of words so you can focus on a single number: The Sentiment Score.
                            </p>
                            <ul className="space-y-4">
                                {['Natural Language Processing', 'Contextual Understanding', 'Instant Classification'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                                            <ArrowRight className="w-3 h-3 text-green-500" />
                                        </div>
                                        <span className="font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="h-[400px] bg-gradient-to-tr from-blue-500/10 to-purple-500/10 rounded-3xl border border-white/10 relative overflow-hidden group">
                            <div className="absolute inset-0 flex items-center justify-center">
                                {/* Abstract Visualization of Processing */}
                                <div className="w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                                <div className="relative z-10 bg-card border border-border p-6 rounded-xl shadow-2xl transform group-hover:-translate-y-2 transition-transform duration-500">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-secondary"></div>
                                        <div className="h-2 w-32 bg-secondary rounded"></div>
                                    </div>
                                    <div className="h-2 w-48 bg-secondary/50 rounded mb-2"></div>
                                    <div className="h-2 w-40 bg-secondary/50 rounded"></div>
                                    <div className="mt-4 flex gap-2">
                                        <span className="px-2 py-1 bg-green-500/20 text-green-500 text-xs rounded font-bold">POSITIVE</span>
                                        <span className="px-2 py-1 bg-secondary text-xs rounded font-bold">98% CONFIDENCE</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                        <div className="order-2 md:order-1 h-[400px] bg-gradient-to-tr from-green-500/10 to-emerald-500/10 rounded-3xl border border-white/10 relative overflow-hidden group">
                            {/* Abstract Chart */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <Activity className="w-48 h-48 text-green-500/20 group-hover:scale-110 transition-transform duration-700" />
                            </div>
                        </div>
                        <div className="order-1 md:order-2">
                            <div className="w-16 h-16 bg-green-500/10 rounded-2xl flex items-center justify-center mb-6">
                                <Globe className="w-8 h-8 text-green-500" />
                            </div>
                            <h3 className="text-3xl font-bold mb-4">The Latency Solution</h3>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                                By the time you see it on a website, it's too late. Our WebSocket infrastructure pushes updates directly to your dashboard the moment they happen.
                            </p>
                            <ul className="space-y-4">
                                {['Zero-Poll Architecture', 'Global CDN Edge', '<50ms Delivery Time'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3">
                                        <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                                            <ArrowRight className="w-3 h-3 text-green-500" />
                                        </div>
                                        <span className="font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-24 bg-card/50">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-16">Trusted by Quants</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: "Alex T.", role: "Day Trader", text: "I used to refresh cnbc every 5 minutes. Now I just watch the NewsFlash gauge. It pays for itself." },
                            { name: "Sarah Jenkins", role: "Hedge Fund Analyst", text: "The sentiment analysis is surprisingly accurate. It catches nuances that simple keyword scrapers miss." },
                            { name: "Michael Chen", role: "Crypto Investor", text: "Latency is everything in my field. This is the fastest aggregator I've found." }
                        ].map((t, i) => (
                            <div key={i} className="p-8 rounded-xl bg-background border border-border hover:border-primary/50 transition-colors">
                                <p className="text-lg mb-6 italic text-muted-foreground">"{t.text}"</p>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-gray-700 to-gray-600"></div>
                                    <div>
                                        <div className="font-bold">{t.name}</div>
                                        <div className="text-xs text-primary">{t.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-24">
                <div className="container mx-auto px-6 max-w-3xl">
                    <h2 className="text-4xl font-bold text-center mb-12">Common Questions</h2>
                    <div className="space-y-4">
                        {[
                            { q: "Is the data real-time?", a: "Yes. We use WebSockets to push data instantly. No refreshing required." },
                            { q: "How is sentiment calculated?", a: "We use a proprietary Transformer-based NLP model tuned specifically for financial markets." },
                            { q: "Can I customize the watchlist?", a: "Absolutely. You can add any stock ticker to your personal dashboard." }
                        ].map((faq, i) => (
                            <div key={i} className="p-6 rounded-xl bg-secondary/20 border border-white/5">
                                <h3 className="text-xl font-bold mb-2">{faq.q}</h3>
                                <p className="text-muted-foreground">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-border bg-background">
                <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
                    <div className="flex items-center gap-2 mb-4 md:mb-0">
                        <div className="bg-primary p-1.5 rounded-lg">
                            <Zap className="w-5 h-5 text-primary-foreground fill-current" />
                        </div>
                        <span className="text-xl font-bold tracking-tight">NewsFlash<span className="text-primary">.ai</span></span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                        &copy; 2025 NewsFlash AI. All rights reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
