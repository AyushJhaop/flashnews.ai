import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle2, Zap, Globe, Cpu, Activity, Search } from 'lucide-react';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30 overflow-x-hidden">

            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-white/5">
                <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20">
                            <Zap className="w-6 h-6 text-primary fill-current" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight">NewsFlash<span className="text-primary">.ai</span></span>
                    </div>
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">Features</a>
                        <a href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">Testimonials</a>
                        <a href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-white transition-colors">Pricing</a>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link to="/login" className="text-sm font-bold hover:text-primary transition-colors">Log In</Link>
                        <Link to="/signup" className="px-5 py-2.5 bg-white text-black font-bold rounded-lg hover:bg-gray-200 transition-colors">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-40 pb-20 md:pt-48 md:pb-32 overflow-hidden">
                {/* Background Blobs */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 rounded-full blur-[120px] opacity-30 pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-purple-500/10 rounded-full blur-[120px] opacity-20 pointer-events-none"></div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="text-center max-w-4xl mx-auto mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm"
                        >
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            <span className="text-sm font-medium text-green-400">v2.0 Now Live: Real-time Sentiment Engine</span>
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 leading-tight">
                            Trade at the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white/50">Speed of Light</span>
                        </h1>

                        <p className="text-xl text-muted-foreground/80 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
                            Stop reacting to old news. Expect the unexpected with the only AI-powered aggregator that delivers sentiment analysis in <span className="text-foreground font-medium">milliseconds</span>.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                            <Link to="/signup" className="btn-primary flex items-center gap-2 justify-center">
                                Start Free Trial <ArrowRight className="w-4 h-4" />
                            </Link>
                            <Link to="/login" className="btn-secondary justify-center">
                                Live Demo
                            </Link>
                        </div>

                    </div>
                </div>
            </section>

            {/* Stats Section with Animation */}
            <section className="py-20 border-y border-white/5 bg-white/[0.02]">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/5">
                        {[
                            { value: '15ms', label: 'Ultra-Low Latency' },
                            { value: '99.9%', label: 'Sentiment Accuracy' },
                            { value: '10k+', label: 'Global Sources' }
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="px-8 py-4"
                            >
                                <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary to-primary/50 mb-2">{stat.value}</div>
                                <div className="text-sm font-bold uppercase tracking-wider text-muted-foreground">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-32 relative">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-24"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">How It Works</h2>
                        <p className="text-muted-foreground max-w-xl mx-auto">From raw data to actionable insight in three steps.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-transparent via-primary/50 to-transparent -z-10"></div>

                        {[
                            { icon: Search, title: "Scan", desc: "We monitor 10,000+ sources globally in real-time." },
                            { icon: Cpu, title: "Analyze", desc: "Our Neural Network processes context & sentiment instantly." },
                            { icon: Zap, title: "Deliver", desc: "Actionable data pushed to your dashboard via WebSockets." }
                        ].map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.2 }}
                                viewport={{ once: true }}
                                className="relative flex flex-col items-center text-center group"
                            >
                                <div className="w-24 h-24 rounded-2xl bg-card border border-white/5 flex items-center justify-center mb-8 shadow-2xl shadow-black/50 group-hover:border-primary/50 transition-colors z-10 glass-card">
                                    <step.icon className="w-10 h-10 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-4">{step.title}</h3>
                                <p className="text-muted-foreground text-sm max-w-[250px]">{step.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Feature Showcase */}
            <section id="features" className="py-32 relative bg-card/20">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mb-24"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 max-w-2xl">Why NewsFlash is Different</h2>
                        <p className="text-xl text-muted-foreground max-w-2xl">Complex problems require elegant solutions. We broke down the barriers to institutional-grade data.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
                        <motion.div
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                        >
                            <div className="w-14 h-14 bg-blue-500/10 rounded-lg flex items-center justify-center mb-8 border border-blue-500/20">
                                <Cpu className="w-7 h-7 text-blue-500" />
                            </div>
                            <h3 className="text-3xl font-bold mb-6">Cognitive Offloading</h3>
                            <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                                Information overload causes "Analysis Paralysis". Our system reads millions of words so you can focus on a single number: The Sentiment Score.
                            </p>
                            <ul className="space-y-5">
                                {['Natural Language Processing', 'Contextual Understanding', 'Instant Classification'].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4">
                                        <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-blue-500" />
                                        </div>
                                        <span className="font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                        <motion.div
                            initial={{ x: 50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full opacity-30"></div>
                            <div className="glass-card rounded-2xl p-8 border border-white/10 relative">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30">
                                            <Zap className="w-5 h-5 text-blue-500" />
                                        </div>
                                        <div>
                                            <div className="font-bold">Latest Signal</div>
                                            <div className="text-xs text-muted-foreground">Just now</div>
                                        </div>
                                    </div>
                                    <div className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-bold border border-green-500/20">
                                        STRONG BUY
                                    </div>
                                </div>
                                <p className="text-lg font-medium mb-4">"Tesla extends partnership with major battery supplier, securing production for Q4."</p>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full w-[85%] bg-green-500"></div>
                                </div>
                                <div className="flex justify-between mt-2 text-xs font-mono text-muted-foreground">
                                    <span>Sentiment Score</span>
                                    <span>85/100</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Testimonials Section */}
            <section id="testimonials" className="py-32 relative">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-24"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Trusted by Pros</h2>
                        <p className="text-muted-foreground max-w-xl mx-auto">See what elite traders are saying.</p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: "Sarah K.", role: "Forex Trader", quote: "NewsFlash completely changed how I trade news events. The speed is unmatched." },
                            { name: "Michael Check", role: "Crypto Analyst", quote: "The sentiment analysis is scarily accurate. It caught the last dip before it happened." },
                            { name: "Jinan B.", role: "Day Trader", quote: "Finally, a tool that cuts through the noise. I can't imagine trading without it now." }
                        ].map((t, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="glass-card p-8 rounded-2xl border border-white/10 hover:border-primary/30 transition-colors"
                            >
                                <div className="flex items-center gap-1 mb-4 text-yellow-500">
                                    {[1, 2, 3, 4, 5].map(n => <svg key={n} className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>)}
                                </div>
                                <p className="text-lg font-medium mb-6 leading-relaxed">"{t.quote}"</p>
                                <div>
                                    <div className="font-bold">{t.name}</div>
                                    <div className="text-sm text-muted-foreground">{t.role}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 border-t border-white/5 bg-background">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex items-center gap-2">
                            <div className="bg-primary/10 p-2 rounded-lg border border-primary/20">
                                <Zap className="w-5 h-5 text-primary fill-current" />
                            </div>
                            <span className="text-xl font-bold tracking-tight">NewsFlash<span className="text-primary">.ai</span></span>
                        </div>
                        <div className="text-muted-foreground text-sm">
                            &copy; 2024 NewsFlash AI Inc. All rights reserved.
                        </div>
                        <div className="flex gap-8 text-sm font-medium text-muted-foreground">
                            <a href="#" className="hover:text-white transition-colors">Privacy</a>
                            <a href="#" className="hover:text-white transition-colors">Terms</a>
                            <a href="#" className="hover:text-white transition-colors">Contact</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
