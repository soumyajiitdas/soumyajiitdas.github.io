import React, { useState, useEffect } from 'react';
import { aboutMe, typewriterTexts } from '../data/data';
import { ChevronRight, Download, ExternalLink, Coffee, GitBranch, Brain, FileJson } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import profileImg from '/assets/profileImg.jpg';
import myResume from "/assets/Sample_Resume.pdf";

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
        link.href = {myResume};
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
                <div className="flex flex-col items-center gap-16 lg:flex-row lg:gap-12">

                    <div className="flex-1 text-center lg:text-left">
                        <h1 className="mb-4 text-4xl font-bold lg:text-5xl text-default">
                            Hi, I'm <span className="text-primary">Soumyajit</span> 👋
                        </h1>
                        <div className="h-8 mb-6 text-xl lg:text-2xl text-muted">
                            I'm a <span className="font-medium text-primary">{displayText}</span>
                            <span className="animate-pulse">|</span>
                        </div>
                        <p className="max-w-2xl mb-8 leading-relaxed text-muted">
                            Passionate Computer Science & Engineering student curious about AI, web development, and problem-solving. I love building real-world solutions and growing one project at a time. 🚀
                        </p>
                        
                        {/* Action Buttons */}
                        <div className="flex-row justify-center space-x-4 lg:justify-start">
                            <button
                                onClick={handleDownloadResume}
                                className="inline-flex items-center px-6 py-3 text-white transition-all duration-300 transform rounded-lg shadow-lg bg-primary-emphasis hover:bg-primary-emphasis/90 hover:scale-105 hover:shadow-primary-muted/20"
                            >
                                <Download size={20} className="mr-2" />
                                Download CV
                            </button>
                            <button
                                onClick={handleViewProjects}
                                className="inline-flex items-center px-6 py-3 transition-all duration-300 transform border-2 rounded-lg border-primary-muted text-primary hover:bg-primary-emphasis hover:text-white hover:border-primary-emphasis hover:scale-105"
                            >
                                <ExternalLink size={20} className="mr-2" />
                                View Projects
                            </button>
                        </div>
                    </div>
                    
                    {/* Dev-style dynamic frame */}
                    <div className="relative w-64 h-56 group">
                        {/* Animated corner brackets */}
                        <div className="absolute w-6 h-6 border-t-2 border-l-2 -top-2 -left-2 border-accent opacity-70 group-hover:opacity-100 animate-pulse"></div>
                        <div className="absolute w-6 h-6 border-t-2 border-r-2 -top-2 -right-2 border-accent opacity-70 group-hover:opacity-100 animate-pulse"></div>
                        <div className="absolute w-6 h-6 border-b-2 border-l-2 -bottom-2 -left-2 border-accent opacity-70 group-hover:opacity-100 animate-pulse"></div>
                        <div className="absolute w-6 h-6 border-b-2 border-r-2 -bottom-2 -right-2 border-accent opacity-70 group-hover:opacity-100 animate-pulse"></div>

                        {/* Dynamic border animation */}
                        <div className="absolute inset-0 border-2 border-dashed rounded-lg opacity-25 border-border animate-spin" style={{ animationDuration: '20s' }}></div>

                        {/* Code-style labels */}
                        <div className="absolute px-2 py-1 font-mono text-xs border rounded -top-8 -left-5 text-accent bg-background opacity-70 group-hover:opacity-100 border-accent/20">
                            &lt;dev/&gt;
                        </div>
                        <div className="absolute px-2 py-1 font-mono text-xs border rounded -bottom-8 -right-5 text-foreground bg-background-subtle border-accent/20 opacity-70 group-hover:opacity-100">
                            ✨ <span className="text-primary">Asp. SDE</span>
                        </div>

                        {/* Terminal-style indicator */}
                        <div className="absolute flex space-x-1 top-2 right-2">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                        </div>

                        {/* Main image container */}
                        <div className="w-full h-full overflow-hidden transition-all duration-500 border-4 rounded-lg shadow-2xl border-background-subtle bg-gradient-to-br from-accent/5 to-background-subtle opacity-85 hover:opacity-100 group-hover:shadow-accent/20 dark:border-black dark:hover:border-background-subtle group-hover:border-accent/30">
                            <img
                                src={profileImg}
                                alt="<profileImg.src=Null>"
                                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>

                        {/* Floating code snippets */}
                        <div className="absolute px-2 py-1 font-mono text-xs border rounded -left-14 top-1/4 text-accent/60 bg-background/80 backdrop-blur-sm border-accent/10 opacity-70 group-hover:opacity-100 rotate-12 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3s' }}>
                            console.log()
                        </div>
                        <div className="absolute px-2 py-1 font-mono text-xs border rounded -right-8 bottom-1/3 text-accent/60 bg-background/80 backdrop-blur-sm border-accent/10 opacity-70 group-hover:opacity-100 -rotate-12 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}>
                            {`{ }`}
                        </div>
                    </div>
                </div>
            </section>

            {/* What I Do Section */}
            <section className="space-y-8">
                <h2 className="text-3xl font-bold text-default">What I Do❓</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                            className="p-6 transition-all duration-300 border rounded-lg bg-canvas-subtle border-default hover:border-primary-muted hover:shadow-md hover:shadow-primary-muted/10"
                        >
                            <div className="mb-4 text-3xl">{item.icon}</div>
                            <h2 className="mb-2 text-lg font-semibold text-default">
                                {item.title}
                            </h2>
                            <p className="text-sm leading-relaxed text-muted">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Quick Stats Section - Redesigned and Repositioned */}
            <section className="space-y-6">
                <h2 className="text-3xl font-bold text-default">Quick Stats 🗓️</h2>
                <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
                    {[
                        {
                            label: "Projects Completed",
                            value: "5+",
                            icon: <FileJson className="text-primary" size={24} />,
                            color: "from-blue-500/10 to-blue-600/10 border-blue-500/20"
                        },
                        {
                            label: "Technologies Used",
                            value: "10+",
                            icon: <Brain className="text-primary" size={24} />,
                            color: "from-green-500/10 to-green-600/10 border-green-500/20"
                        },
                        {
                            label: "Github Commits",
                            value: "340+",
                            icon: <GitBranch className="text-primary" size={24} />,
                            color: "from-purple-500/10 to-purple-600/10 border-purple-500/20"
                        },
                        {
                            label: "Coffee Cups ☕",
                            value: "∞",
                            icon: <Coffee className="text-primary" size={24} />,
                            color: "from-orange-500/10 to-orange-600/10 border-orange-500/20"
                        }
                    ].map((stat, index) => (
                        <div
                            key={index}
                            className={`bg-gradient-to-br ${stat.color} rounded-lg p-6 border border-default hover:border-primary-muted transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                {stat.icon}
                                <span className="text-2xl font-bold text-primary">{stat.value}</span>
                            </div>
                            <p className="text-sm font-medium text-muted">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Enhanced "About me" Section */}
            <section className="relative overflow-hidden">
                <div className="relative p-8 border rounded-lg bg-gradient-to-r from-canvas-subtle to-background-muted border-default">
                    {/* Background decorative elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-primary-muted blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-primary-muted blur-2xl"></div>
                    <div className="relative z-10">
                    <h3 className="flex items-center mb-6 text-2xl font-bold text-default font-handwritten-bold">
                            <span className="mr-3">👨🏻‍💻</span>
                            <span>About me...</span>
                        </h3>
                        <div className="prose prose-lg max-w-none">
                            <p className="text-lg leading-relaxed text-muted">
                                {aboutMe.description}
                            </p>
                        </div>
                        {/* Decorative quote */}
                        <div className="pl-4 mt-6 border-l-4 border-primary-muted">
                            <p className="italic font-medium text-primary">
                                ~ "Code compiles dreams into reality, one commit at a time."
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Current Focus */}
            <section className="p-8 border rounded-lg bg-canvas-subtle border-default">
                <h2 className="mb-6 text-2xl font-bold text-default">✨ Current Focus <span className='text-primary'>–</span></h2>

                <div className="space-y-4">
                    {[
                        "🎯 Completing my CSE degree with hands-on project experience",
                        "💼 Interning as a MERN Stack Developer at Ardent CompuTech",
                        "🚀 Building innovative web applications and AI-powered tools",
                        "📈 Contributing to open source projects and learning new technologies",
                        "🔍 Exploring advanced topics in machine learning and system design"
                    ].map((item, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <ChevronRight size={16} className="flex-shrink-0 mt-1 text-primary" />
                            <span className="text-muted">{item}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default About;