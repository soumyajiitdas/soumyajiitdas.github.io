import React, { useState, useEffect } from 'react';
import { aboutMe, typewriterTexts } from '../data/data';
import { ChevronRight, Download, ExternalLink, Coffee, GitBranch, Brain, FileJson } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const About = () => {
    const navigate = useNavigate();
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentFullText = typewriterTexts[currentTextIndex];

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                // Typing effect
                if (displayText.length < currentFullText.length) {
                    setDisplayText(currentFullText.substring(0, displayText.length + 1));
                } else {
                    // Start deleting after a pause
                    setTimeout(() => setIsDeleting(true), 1500);
                }
            } else {
                // Deleting effect
                if (displayText.length > 0) {
                    setDisplayText(currentFullText.substring(0, displayText.length - 1));
                } else {
                    // Move to next text
                    setIsDeleting(false);
                    setCurrentTextIndex((prev) => (prev + 1) % typewriterTexts.length);
                }
            }
        }, isDeleting ? 50 : 100);

        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, currentTextIndex]);

    const handleDownloadResume = () => {
        const link = document.createElement('a');
        link.href = '/assets/files/Sample_Resume.pdf';
        link.download = 'Sample_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleViewProjects = () => {
        navigate('/projects');
    };

    return (
        <div className="space-y-12">
            {/* Hero Section */}
            <section>
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-12">

                    <div className="flex-1 text-center lg:text-left">
                        <h1 className="text-4xl lg:text-5xl font-bold text-github-fg-default mb-4">
                            Hi, I'm <span className="text-github-accent-fg">Soumyajit</span>
                        </h1>
                        <div className="text-xl lg:text-2xl text-github-fg-muted mb-6 h-8">
                            I'm a <span className="text-github-accent-fg font-medium">{displayText}</span>
                            <span className="animate-pulse">|</span>
                        </div>
                        <p className="text-github-fg-muted leading-relaxed max-w-2xl mb-8">
                            Passionate Computer Science & Engineering student curious about AI, web development, and problem-solving. I love building real-world solutions and growing one project at a time. 🚀
                        </p>
                        
                        {/* Action Buttons */}
                        <div className="flex-row justify-center lg:justify-start space-x-4">
                            <button
                                onClick={handleDownloadResume}
                                className="inline-flex items-center px-6 py-3 bg-github-accent-emphasis text-white rounded-lg hover:bg-github-accent-emphasis/90 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-github-accent-muted/20"
                            >
                                <Download size={20} className="mr-2" />
                                Download CV
                            </button>
                            <button
                                onClick={handleViewProjects}
                                className="inline-flex items-center px-6 py-3 border-2 border-github-accent-muted text-github-accent-fg rounded-lg hover:bg-github-accent-emphasis hover:text-white hover:border-github-accent-emphasis transition-all duration-300 transform hover:scale-105"
                            >
                                <ExternalLink size={20} className="mr-2" />
                                View Projects
                            </button>
                        </div>
                    </div>
                    
                    {/* Dev-style dynamic frame */}
                    <div className="relative w-64 h-56 group">
                        {/* Animated corner brackets */}
                        <div className="absolute -top-2 -left-2 w-6 h-6 border-l-2 border-t-2 border-accent opacity-70 group-hover:opacity-100 animate-pulse"></div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 border-r-2 border-t-2 border-accent opacity-70 group-hover:opacity-100 animate-pulse"></div>
                        <div className="absolute -bottom-2 -left-2 w-6 h-6 border-l-2 border-b-2 border-accent opacity-70 group-hover:opacity-100 animate-pulse"></div>
                        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-r-2 border-b-2 border-accent opacity-70 group-hover:opacity-100 animate-pulse"></div>

                        {/* Dynamic border animation */}
                        <div className="absolute inset-0 border-2 border-dashed border-github-border animate-spin rounded-lg" style={{ animationDuration: '20s' }}></div>

                        {/* Code-style labels */}
                        <div className="absolute -top-8 -left-5 text-xs font-mono text-accent bg-background px-2 py-1 opacity-70 group-hover:opacity-100 rounded border border-accent/20">
                            &lt;dev/&gt;
                        </div>
                        <div className="absolute -bottom-8 -right-5 text-xs font-mono text-foreground bg-background-subtle px-2 py-1 rounded border border-accent/20 opacity-70 group-hover:opacity-100">
                            ✨ <span className="text-github-accent-fg">Asp. SDE</span>
                        </div>

                        {/* Terminal-style indicator */}
                        <div className="absolute top-2 right-2 flex space-x-1">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                        </div>

                        {/* Main image container */}
                        <div className="w-full h-full rounded-lg overflow-hidden border-4 border-background-subtle shadow-2xl bg-gradient-to-br from-accent/5 to-background-subtle opacity-85 hover:opacity-100 group-hover:shadow-accent/20 dark:border-black dark:hover:border-background-subtle group-hover:border-accent/30 transition-all duration-500">
                            <img
                                src='/assets/files/profileImg.jpg'
                                alt="<profileImg.src=Null>"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        {/* Floating code snippets */}
                        <div className="absolute -left-14 top-1/4 text-xs font-mono text-accent/60 bg-background/80 px-2 py-1 rounded backdrop-blur-sm border border-accent/10 opacity-70 group-hover:opacity-100 rotate-12 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3s' }}>
                            console.log()
                        </div>
                        <div className="absolute -right-8 bottom-1/3 text-xs font-mono text-accent/60 bg-background/80 px-2 py-1 rounded backdrop-blur-sm border border-accent/10 opacity-70 group-hover:opacity-100 -rotate-12 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}>
                            {`{ }`}
                        </div>
                    </div>
                </div>
            </section>

            {/* What I Do Section */}
            <section className="space-y-8">
                <h2 className="text-3xl font-bold text-github-fg-default">What I Do</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                        {
                            title: "Full Stack Development",
                            description: "Building end-to-end web applications with React, Node.js, and modern technologies.",
                            icon: "💻"
                        },
                        {
                            title: "AI/ML Projects",
                            description: "Exploring artificial intelligence and machine learning to create innovative solutions.",
                            icon: "🤖"
                        },
                        {
                            title: "Open Source",
                            description: "Contributing to open source projects and building tools for the developer community.",
                            icon: "🌟"
                        },
                        {
                            title: "Problem Solving",
                            description: "Passionate about algorithms, data structures, and solving complex technical challenges.",
                            icon: "🧩"
                        },
                        {
                            title: "Learning & Growth",
                            description: "Continuously learning new technologies and sharing knowledge with others.",
                            icon: "📚"
                        },
                        {
                            title: "Team Collaboration",
                            description: "Working effectively in teams and contributing to successful project outcomes.",
                            icon: "🤝"
                        }
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="bg-github-canvas-subtle rounded-lg p-6 border border-github-border hover:border-github-accent-muted transition-all duration-300 hover:shadow-md hover:shadow-github-accent-muted/10"
                        >
                            <div className="text-3xl mb-4">{item.icon}</div>
                            <h2 className="text-lg font-semibold text-github-fg-default mb-2">
                                {item.title}
                            </h2>
                            <p className="text-github-fg-muted text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Quick Stats Section - Redesigned and Repositioned */}
            <section className="space-y-6">
                <h2 className="text-3xl font-bold text-github-fg-default">Quick Stats</h2>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                        {
                            label: "Projects Completed",
                            value: "5+",
                            icon: <FileJson className="text-github-accent-fg" size={24} />,
                            color: "from-blue-500/10 to-blue-600/10 border-blue-500/20"
                        },
                        {
                            label: "Technologies Used",
                            value: "10+",
                            icon: <Brain className="text-github-accent-fg" size={24} />,
                            color: "from-green-500/10 to-green-600/10 border-green-500/20"
                        },
                        {
                            label: "Github Commits",
                            value: "340+",
                            icon: <GitBranch className="text-github-accent-fg" size={24} />,
                            color: "from-purple-500/10 to-purple-600/10 border-purple-500/20"
                        },
                        {
                            label: "Coffee Cups ☕",
                            value: "∞",
                            icon: <Coffee className="text-github-accent-fg" size={24} />,
                            color: "from-orange-500/10 to-orange-600/10 border-orange-500/20"
                        }
                    ].map((stat, index) => (
                        <div
                            key={index}
                            className={`bg-gradient-to-br ${stat.color} rounded-lg p-6 border border-github-border hover:border-github-accent-muted transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                {stat.icon}
                                <span className="text-2xl font-bold text-github-accent-fg">{stat.value}</span>
                            </div>
                            <p className="text-github-fg-muted text-sm font-medium">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Current Focus */}
            <section className="bg-github-canvas-subtle rounded-lg p-8 border border-github-border">
                <h2 className="text-2xl font-bold text-github-fg-default mb-6">Current Focus</h2>

                <div className="space-y-4">
                    {[
                        "🎯 Completing my CSE degree with hands-on project experience",
                        "💼 Interning as a MERN Stack Developer at Ardent CompuTech",
                        "🚀 Building innovative web applications and AI-powered tools",
                        "📈 Contributing to open source projects and learning new technologies",
                        "🔍 Exploring advanced topics in machine learning and system design"
                    ].map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <ChevronRight size={16} className="text-github-accent-fg mt-1 flex-shrink-0" />
                            <span className="text-github-fg-muted">{item}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Enhanced "About me" Section */}
            <section className="relative overflow-hidden">
                <div className="bg-gradient-to-r from-github-canvas-subtle to-github-canvas-inset rounded-lg p-8 border border-github-border relative">
                    {/* Background decorative elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-github-accent-muted rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-github-accent-muted rounded-full blur-2xl"></div>
                    <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-github-fg-default mb-6 flex items-center font-handwritten-bold">
                            <span className="mr-3">✨</span>
                            <span>A little more about me...</span>
                        </h3>
                        <div className="prose prose-lg max-w-none">
                            <p className="text-github-fg-muted leading-relaxed text-lg">
                                {aboutMe.description}
                            </p>
                        </div>
                        {/* Decorative quote */}
                        <div className="mt-6 pl-4 border-l-4 border-github-accent-muted">
                            <p className="text-github-accent-fg font-medium italic">
                                ~ "Code compiles dreams into reality, one commit at a time."
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;