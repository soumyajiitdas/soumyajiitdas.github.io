import React, { useState, useEffect } from 'react';
import { aboutMe, typewriterTexts } from '../data/data';
import { ChevronRight, Download, ExternalLink, Coffee, GitBranch, Brain, FileJson, Pencil, Trash2, Plus, Save, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import profileImg from '/assets/profileImg.webp';
import myResume from "/assets/Sample_Resume.pdf";

const About = () => {
    const navigate = useNavigate();
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    const defaultFocusList = [
        "🎯 Completing my CSE degree with hands-on project experience",
        "💼 Interning as a MERN Stack Developer at Ardent CompuTech",
        "🚀 Building innovative web applications and AI-powered tools",
        "📈 Contributing to open source projects and learning new technologies",
        "🔍 Exploring advanced topics in machine learning and system design"
    ];

    const [focusList, setFocusList] = useState(() => {
        const savedList = localStorage.getItem('focusList');
        const parsedList = savedList ? JSON.parse(savedList) : null;
        return parsedList && parsedList.length > 0 ? parsedList : defaultFocusList;
    });
    const [newItem, setNewItem] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedItem, setEditedItem] = useState('');

    useEffect(() => {
        localStorage.setItem('focusList', JSON.stringify(focusList));
    }, [focusList]);

    useEffect(() => {
        const currentFullText = typewriterTexts[currentTextIndex];
        const timeout = setTimeout(() => {
            if (!isDeleting) {
                if (displayText.length < currentFullText.length) {
                    setDisplayText(currentFullText.substring(0, displayText.length + 1));
                } else {
                    setTimeout(() => setIsDeleting(true), 1500);
                }
            } else {
                if (displayText.length > 0) {
                    setDisplayText(currentFullText.substring(0, displayText.length - 1));
                } else {
                    setIsDeleting(false);
                    setCurrentTextIndex((prev) => (prev + 1) % typewriterTexts.length);
                }
            }
        }, isDeleting ? 50 : 100);
        return () => clearTimeout(timeout);
    }, [displayText, isDeleting, currentTextIndex]);

    const handleDownloadResume = () => {
        const link = document.createElement('a');
        link.href = myResume;
        link.download = 'Sample_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleViewProjects = () => {
        navigate('/projects');
    };

    const handleAddItem = () => {
        if (newItem.trim() !== '') {
            setFocusList([...focusList, newItem.trim()]);
            setNewItem('');
        }
    };

    const handleDeleteItem = (index) => {
        const updatedList = focusList.filter((_, i) => i !== index);
        setFocusList(updatedList);
    };

    const handleEditItem = (index) => {
        setEditingIndex(index);
        setEditedItem(focusList[index]);
    };

    const handleSaveItem = (index) => {
        const updatedList = [...focusList];
        updatedList[index] = editedItem.trim();
        setFocusList(updatedList);
        setEditingIndex(null);
    };

    const handleCancelEdit = () => {
        setEditingIndex(null);
    };

    return (
        <main className="space-y-12 mt-14 lg:mt-0" aria-label="About Soumyajit Das">
            
            {/* Hero Section */}
            <section aria-labelledby="hero-heading">
                <header className="flex flex-col items-center gap-16 lg:flex-row lg:gap-12">
                    <div className="flex-1 text-center lg:text-left">
                        <h1 id="hero-heading" className="mb-4 text-4xl font-bold lg:text-5xl text-default">
                            Hi, I'm <span className="text-primary">Soumyajit</span> 👋
                        </h1>
                        <p className="h-8 mb-6 text-xl lg:text-2xl text-muted" aria-live="polite">
                            I'm a <span className="font-medium text-primary">{displayText}</span>
                            <span aria-hidden="true" className="animate-pulse">|</span>
                        </p>
                        <p className="max-w-2xl mb-8 leading-relaxed text-muted">
                            Passionate Computer Science & Engineering student curious about AI, web development, and problem-solving. I love building real-world solutions and growing one project at a time. 🚀
                        </p>

                        <nav className="flex-row justify-center space-x-4 lg:justify-start" aria-label="Action buttons">
                            <button
                                onClick={handleDownloadResume}
                                aria-label="Download resume as PDF"
                                className="inline-flex items-center px-6 py-3 text-white transition-all duration-300 transform rounded-lg shadow-lg bg-primary-emphasis hover:bg-primary-emphasis/90 hover:scale-105 hover:shadow-primary-muted/20"
                            >
                                <Download size={20} aria-hidden="true" className="mr-2" />
                                Download CV
                            </button>
                            <button
                                onClick={handleViewProjects}
                                aria-label="View all projects"
                                className="inline-flex items-center px-6 py-3 transition-all duration-300 transform border-2 rounded-lg border-primary-muted text-primary hover:bg-primary-emphasis hover:text-white hover:border-primary-emphasis hover:scale-105"
                            >
                                <ExternalLink size={20} aria-hidden="true" className="mr-2" />
                                View Projects
                            </button>
                        </nav>
                    </div>

                    {/* Profile Image */}
                    <figure className="relative w-64 h-56 group" aria-label="Profile Image with developer-themed frame">
                        <img
                            src={profileImg}
                            alt="Portrait of Soumyajit Das"
                            loading="lazy"
                            decoding="async"
                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105 rounded-lg"
                        />
                    </figure>
                </header>
            </section>

            {/* What I Do Section */}
            <section aria-labelledby="what-i-do">
                <h2 id="what-i-do" className="text-3xl font-bold text-default">What I Do❓</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3" role="list">
                    {[
                        { title: "Full Stack Development", description: "Building end-to-end web applications with React, Node.js, and modern technologies.", icon: "💻" },
                        { title: "AI/ML Projects", description: "Exploring artificial intelligence and machine learning to create innovative solutions.", icon: "🤖" },
                        { title: "Open Source", description: "Contributing to open source projects and building tools for the developer community.", icon: "🌟" },
                        { title: "Problem Solving", description: "Passionate about algorithms, data structures, and solving complex technical challenges.", icon: "🧩" },
                        { title: "Learning & Growth", description: "Continuously learning new technologies and sharing knowledge with others.", icon: "📚" },
                        { title: "Team Collaboration", description: "Working effectively in teams and contributing to successful project outcomes.", icon: "🤝" }
                    ].map((item, index) => (
                        <article
                            key={index}
                            role="listitem"
                            className="p-6 transition-all duration-300 border rounded-lg bg-canvas-subtle border-default hover:border-primary-muted hover:shadow-md hover:shadow-primary-muted/10"
                            aria-label={item.title}
                        >
                            <div className="mb-4 text-3xl" aria-hidden="true">{item.icon}</div>
                            <h3 className="mb-2 text-lg font-semibold text-default">{item.title}</h3>
                            <p className="text-sm leading-relaxed text-muted">{item.description}</p>
                        </article>
                    ))}
                </div>
            </section>

            {/* Quick Stats Section */}
            <section aria-labelledby="quick-stats">
                <h2 id="quick-stats" className="text-3xl font-bold text-default">Quick Stats 🗓️</h2>
                <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
                    {[
                        { label: "Projects Completed", value: "5+", icon: <FileJson size={24} />, color: "from-blue-500/10 to-blue-600/10 border-blue-500/20" },
                        { label: "Technologies Used", value: "10+", icon: <Brain size={24} />, color: "from-green-500/10 to-green-600/10 border-green-500/20" },
                        { label: "Github Commits", value: "350+", icon: <GitBranch size={24} />, color: "from-purple-500/10 to-purple-600/10 border-purple-500/20" },
                        { label: "Coffee Cups ☕", value: "∞", icon: <Coffee size={24} />, color: "from-orange-500/10 to-orange-600/10 border-orange-500/20" }
                    ].map((stat, index) => (
                        <div
                            key={index}
                            role="region"
                            aria-label={stat.label}
                            className={`bg-gradient-to-br ${stat.color} rounded-lg p-6 border border-default hover:border-primary-muted transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span aria-hidden="true" className="text-primary">{stat.icon}</span>
                                <span className="text-2xl font-bold text-primary">{stat.value}</span>
                            </div>
                            <p className="text-sm font-medium text-muted">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* About Me Section */}
            <section aria-labelledby="about-me">
                <div className="relative p-8 border rounded-lg bg-gradient-to-r from-canvas-subtle to-background-muted border-default">
                    <h2 id="about-me" className="flex items-center mb-6 text-2xl font-bold text-default font-handwritten-bold">
                        <span aria-hidden="true" className="mr-3">👨🏻‍💻</span> About me...
                    </h2>
                    <article>
                        <p className="text-lg leading-relaxed text-muted">{aboutMe.description}</p>
                        <blockquote className="pl-4 mt-6 border-l-4 border-primary-muted">
                            <p className="italic font-medium text-primary">
                                “Code compiles dreams into reality, one commit at a time.”
                            </p>
                        </blockquote>
                    </article>
                </div>
            </section>

            {/* Current Focus */}
            <section aria-labelledby="current-focus" className="p-8 border rounded-lg bg-canvas-subtle border-default">
                <h2 id="current-focus" className="mb-6 text-2xl font-bold text-default">
                    ✨ Current Focus <span className='text-primary'>–</span>
                </h2>

                <ul className="space-y-4" aria-label="Current focus list">
                    {focusList.map((item, index) => (
                        <li key={index} className="group flex items-center gap-3" role="listitem">
                            <ChevronRight size={16} aria-hidden="true" className="flex-shrink-0 mt-1 text-primary" />
                            {editingIndex === index ? (
                                <input
                                    type="text"
                                    value={editedItem}
                                    onChange={(e) => setEditedItem(e.target.value)}
                                    aria-label={`Edit focus item ${index + 1}`}
                                    className="flex-grow px-2 py-1 rounded bg-transparent text-default"
                                />
                            ) : (
                                <span className="text-muted">{item}</span>
                            )}
                            <div className="group flex gap-4 ml-auto" role="group" aria-label="Edit controls">
                                {editingIndex === index ? (
                                    <>
                                        <button
                                            onClick={() => handleSaveItem(index)}
                                            aria-label="Save item"
                                            className="text-green-500 hover:text-green-400 opacity-0 group-hover:opacity-80"
                                        >
                                            <Save size={15} aria-hidden="true" />
                                        </button>
                                        <button
                                            onClick={handleCancelEdit}
                                            aria-label="Cancel edit"
                                            className="text-red-500 hover:text-red-400 opacity-0 group-hover:opacity-80"
                                        >
                                            <X size={16} aria-hidden="true" />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={() => handleEditItem(index)}
                                            aria-label="Edit item"
                                            className="text-blue-500 hover:text-blue-400 opacity-0 group-hover:opacity-80"
                                        >
                                            <Pencil size={15} aria-hidden="true" />
                                        </button>
                                        <button
                                            onClick={() => handleDeleteItem(index)}
                                            aria-label="Delete item"
                                            className="text-red-500 hover:text-red-400 opacity-0 group-hover:opacity-80"
                                        >
                                            <Trash2 size={15} aria-hidden="true" />
                                        </button>
                                    </>
                                )}
                            </div>
                        </li>
                    ))}
                </ul>

                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleAddItem();
                    }}
                    className="flex items-center gap-3 mt-4"
                    aria-label="Add new focus item"
                >
                    <ChevronRight size={16} aria-hidden="true" className="flex-shrink-0 mt-1 text-primary" />
                    <input
                        type="text"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        placeholder="🐜 Add a new list item here..."
                        aria-label="New focus item input"
                        className="flex-grow px-2 py-1 rounded bg-transparent text-md placeholder-grey"
                    />
                    <button
                        type="submit"
                        aria-label="Add new item"
                        className="p-2 text-white rounded-full bg-primary-emphasis opacity-80"
                    >
                        <Plus size={16} aria-hidden="true" />
                    </button>
                </form>
            </section>
        </main>
    );
};

export default About;
