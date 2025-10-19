import React, { useState, useEffect } from 'react';
import { aboutMe, typewriterTexts } from '../data/data';
import { ChevronRight, Download, ExternalLink, Coffee, GitBranch, Brain, FileJson, Pencil, Trash2, Plus, Save, X, GripVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { DndContext, MouseSensor, TouchSensor, useSensor, useSensors, closestCenter, useDraggable, useDroppable } from '@dnd-kit/core';
import profileImg from '/assets/profileImg.webp';
import myResume from "/assets/SoumyajitDas_Resume.pdf";

// Simple helper to move array elements
const arrayMove = (array, from, to) => {
    const arr = [...array];
    const [item] = arr.splice(from, 1);
    arr.splice(to, 0, item);
    return arr;
};

// Generate a reasonably unique id without extra deps
const genId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

// Normalize any persisted value to [{id, text}] shape
const normalizeFocusList = (value, fallbackStrings) => {
    const toObjects = (list) => list.map((text) => ({ id: genId(), text }));

    if (!value) return toObjects(fallbackStrings);
    try {
        const parsed = typeof value === 'string' ? JSON.parse(value) : value;
        if (Array.isArray(parsed)) {
            if (parsed.length === 0) return toObjects(fallbackStrings);
            if (typeof parsed[0] === 'string') return toObjects(parsed);
            if (parsed[0] && typeof parsed[0] === 'object' && 'text' in parsed[0]) return parsed;
        }
        return toObjects(fallbackStrings);
    } catch (e) {
        return toObjects(fallbackStrings);
    }
};

const FocusItem = ({ item, index, children, isEditing }) => {
    // Make each item both draggable and a drop target
    const { attributes, listeners, setNodeRef: setDragRef, transform, isDragging } = useDraggable({ id: item.id });
    // Limit dragging to the handle only by attaching listeners to a handle element later
    const handleProps = { ...attributes, ...listeners };
    const { setNodeRef: setDropRef } = useDroppable({ id: item.id });

    const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`, zIndex: 5 } : undefined;

    return (
        <li
            key={item.id}
            ref={(node) => {
                setDragRef(node);
                setDropRef(node);
            }}
            style={style}
            className={`group flex items-center gap-3 rounded-md ${isDragging ? 'ring-1 ring-primary/40 bg-background-subtle' : ''} ${isEditing ? 'bg-background-subtle' : ''}`}
        >
            <button
                type="button"
                aria-label="Drag item"
                className="p-1 text-muted hover:text-default rounded cursor-grab active:cursor-grabbing focus:outline-none focus:ring-1 focus:ring-primary/40"
                {...handleProps}
            >
                <GripVertical size={16} className='text-primary' />
            </button>
            {children}
        </li>
    );
};

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

    // Load from localStorage and normalize
    const [focusList, setFocusList] = useState(() => {
        const savedList = localStorage.getItem('focusList');
        return normalizeFocusList(savedList ? JSON.parse(savedList) : null, defaultFocusList);
    });

    const [newItem, setNewItem] = useState('');
    const [editingIndex, setEditingIndex] = useState(null);
    const [editedItem, setEditedItem] = useState('');

    // Persist to localStorage on changes
    useEffect(() => {
        localStorage.setItem('focusList', JSON.stringify(focusList));
    }, [focusList]);

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
        link.href = myResume;
        link.download = 'SoumyajitDas_Resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleViewProjects = () => {
        navigate('/projects');
    };

    const handleAddItem = () => {
        if (newItem.trim() !== '') {
            setFocusList([...focusList, { id: genId(), text: newItem.trim() }]);
            setNewItem('');
        }
    };

    const handleDeleteItem = (index) => {
        const updatedList = focusList.filter((_, i) => i !== index);
        setFocusList(updatedList);
        if (editingIndex === index) setEditingIndex(null);
    };

    const handleEditItem = (index) => {
        setEditingIndex(index);
        setEditedItem(focusList[index].text);
    };

    const handleSaveItem = (index) => {
        const updatedList = [...focusList];
        updatedList[index] = { ...updatedList[index], text: editedItem.trim() };
        setFocusList(updatedList);
        setEditingIndex(null);
    };

    const handleCancelEdit = () => {
        setEditingIndex(null);
    };

    // DnD-kit sensors
    const sensors = useSensors(
        useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
        useSensor(TouchSensor, { activationConstraint: { delay: 150, tolerance: 5 } })
    );

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        const oldIndex = focusList.findIndex((i) => i.id === active.id);
        const newIndex = focusList.findIndex((i) => i.id === over.id);
        if (oldIndex === -1 || newIndex === -1) return;
        const newList = arrayMove(focusList, oldIndex, newIndex);
        setFocusList(newList);

        // Keep editingIndex pointing to the same item after reorder
        if (editingIndex !== null) {
            const editingId = focusList[editingIndex]?.id;
            if (editingId) {
                const idx = newList.findIndex((i) => i.id === editingId);
                setEditingIndex(idx === -1 ? null : idx);
            }
        }
    };

    return (
        <main className="space-y-12 mt-14 lg:mt-0">
            {/* Hero Section */}
            <section aria-labelledby="hero-heading">
                <div className="flex flex-col items-center gap-16 lg:flex-row lg:gap-12">

                    <div className="flex-1 text-center lg:text-left">
                        <h1 id="hero-heading" aria-level="1" className="mb-4 text-4xl font-bold lg:text-5xl text-default">
                            Hi, I'm <span className="text-primary">Soumyajit</span> 👋
                        </h1>
                        <p className="h-8 mb-6 text-xl lg:text-2xl text-muted" aria-live="polite">
                            I'm a <span className="font-medium text-primary">{displayText}</span>
                            <span className="animate-pulse">|</span>
                        </p>
                        <p className="max-w-2xl mb-8 leading-relaxed text-muted">
                            Passionate Computer Science & Engineering student curious about AI, web development, and problem-solving. I love building real-world solutions and growing one project at a time. 🚀
                        </p>
                        
                        {/* Action Buttons */}
                        <div className="flex flex-row justify-center space-x-4 lg:justify-start">
                            <button
                                onClick={handleDownloadResume}
                                aria-label="Download my Curriculum Vitae"
                                className="inline-flex items-center px-6 py-3 text-white transition-all duration-300 transform rounded-lg shadow-lg bg-primary-emphasis hover:bg-primary-emphasis/90 hover:scale-105 hover:shadow-primary-muted/20"
                            >
                                <Download size={20} className="mr-2" aria-hidden="true" />
                                <span className='hidden sm:block'>Download CV</span>
                                <span className='block sm:hidden'>My Resume</span>
                            </button>
                            <button
                                onClick={handleViewProjects}
                                aria-label="View my projects"
                                className="inline-flex items-center px-6 py-3 transition-all duration-300 transform border-2 rounded-lg border-primary-muted text-primary hover:bg-primary-emphasis hover:text-white hover:border-primary-emphasis hover:scale-105"
                            >
                                <ExternalLink size={20} className="mr-2" aria-hidden="true" />
                                <span className='hidden sm:block'>View Projects</span>
                                <span className='block sm:hidden'>Projects</span>
                            </button>
                        </div>
                    </div>
                    
                    {/* Dev-style dynamic frame */}
                    <div className="relative w-64 h-56 group">
                        {/* Decorative elements, hidden from screen readers */}
                        <div className="absolute w-6 h-6 border-t-2 border-l-2 -top-2 -left-2 border-accent opacity-70 group-hover:opacity-100 animate-pulse" aria-hidden="true"></div>
                        <div className="absolute w-6 h-6 border-t-2 border-r-2 -top-2 -right-2 border-accent opacity-70 group-hover:opacity-100 animate-pulse" aria-hidden="true"></div>
                        <div className="absolute w-6 h-6 border-b-2 border-l-2 -bottom-2 -left-2 border-accent opacity-70 group-hover:opacity-100 animate-pulse" aria-hidden="true"></div>
                        <div className="absolute w-6 h-6 border-b-2 border-r-2 -bottom-2 -right-2 border-accent opacity-70 group-hover:opacity-100 animate-pulse" aria-hidden="true"></div>
                        <div className="absolute inset-0 border-2 border-dashed rounded-lg opacity-25 border-border animate-spin" style={{ animationDuration: '20s' }} aria-hidden="true"></div>
                        <div className="absolute px-2 py-1 font-mono text-xs border rounded -top-8 -left-5 text-accent bg-background opacity-70 group-hover:opacity-100 border-accent/20" aria-hidden="true">
                            {"<dev/>"}
                        </div>
                        <div className="absolute px-2 py-1 font-mono text-xs border rounded -bottom-8 -right-5 text-foreground bg-background-subtle border-accent/20 opacity-70 group-hover:opacity-100" aria-hidden="true">
                            ✨ <span className="text-primary">Asp. SDE</span>
                        </div>
                        <div className="absolute flex space-x-1 top-2 right-2" aria-hidden="true">
                            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                        </div>

                        {/* Main image container */}
                        <div className="w-full h-full overflow-hidden transition-all duration-500 border-4 rounded-lg shadow-2xl border-background-subtle bg-gradient-to-br from-accent/5 to-background-subtle opacity-85 hover:opacity-100 group-hover:shadow-accent/20 dark:border-black dark:hover:border-background-subtle group-hover:border-accent/30">
                            <img
                                src={profileImg}
                                alt="A professional headshot of Soumyajit"
                                loading="lazy"
                                decoding="async"
                                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                            />
                        </div>
                        
                        {/* Decorative floating code snippets */}
                        <div className="absolute px-2 py-1 font-mono text-xs border rounded -left-14 top-1/4 text-accent/60 bg-background/80 backdrop-blur-sm border-accent/10 opacity-70 group-hover:opacity-100 rotate-12 animate-bounce" style={{ animationDelay: '2s', animationDuration: '3s' }} aria-hidden="true">
                            console.log()
                        </div>
                        <div className="absolute px-2 py-1 font-mono text-xs border rounded -right-8 bottom-1/3 text-accent/60 bg-background/80 backdrop-blur-sm border-accent/10 opacity-70 group-hover:opacity-100 -rotate-12 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }} aria-hidden="true">
                            {`{ }`}
                        </div>
                    </div>
                </div>
            </section>

            {/* What I Do Section */}
            <section className="space-y-8" aria-labelledby="what-i-do-heading">
                <h2 id="what-i-do-heading" aria-level="2" className="text-3xl font-bold text-default">What I Do❓</h2>
                <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {[
                        { title: "Full Stack Development", description: "Building end-to-end web applications with React, Node.js, and modern technologies.", icon: "💻" },
                        { title: "AI/ML Projects", description: "Exploring artificial intelligence and machine learning to create innovative solutions.", icon: "🤖" },
                        { title: "Open Source", description: "Contributing to open source projects and building tools for the developer community.", icon: "🌟" },
                        { title: "Problem Solving", description: "Passionate about algorithms, data structures, and solving complex technical challenges.", icon: "🧩" },
                        { title: "Learning & Growth", description: "Continuously learning new technologies and sharing knowledge with others.", icon: "📚" },
                        { title: "Team Collaboration", description: "Working effectively in teams and contributing to successful project outcomes.", icon: "🤝" }
                    ].map((item) => (
                        <li key={item.title} className="p-6 transition-all duration-300 border rounded-lg bg-canvas-subtle border-default hover:border-primary-muted hover:shadow-md hover:shadow-primary-muted/10">
                            <div className="mb-4 text-3xl" aria-hidden="true">{item.icon}</div>
                            <h3 aria-level="3" className="mb-2 text-lg font-semibold text-default">
                                {item.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-muted">
                                {item.description}
                            </p>
                        </li>
                    ))}
                </ul>
            </section>

            {/* Quick Stats Section */}
            <section className="space-y-6" aria-labelledby="quick-stats-heading">
                <h2 id="quick-stats-heading" aria-level="2" className="text-3xl font-bold text-default">Quick Stats 🗓️</h2>
                <ul className="grid grid-cols-2 gap-6 lg:grid-cols-4">
                    {[
                        { label: "Projects Completed", value: "5+", icon: <FileJson className="text-primary" size={24} />, color: "from-blue-500/10 to-blue-600/10 border-blue-500/20" },
                        { label: "Technologies Used", value: "10+", icon: <Brain className="text-primary" size={24} />, color: "from-green-500/10 to-green-600/10 border-green-500/20" },
                        { label: "Github Commits", value: "350+", icon: <GitBranch className="text-primary" size={24} />, color: "from-purple-500/10 to-purple-600/10 border-purple-500/20" },
                        { label: "Coffee Cups ☕", value: "∞", icon: <Coffee className="text-primary" size={24} />, color: "from-orange-500/10 to-orange-600/10 border-orange-500/20" }
                    ].map((stat) => (
                        <li key={stat.label} className={`bg-gradient-to-br ${stat.color} rounded-lg p-6 border border-default hover:border-primary-muted transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}>
                            <div className="flex items-center justify-between mb-4">
                                {stat.icon}
                                <span className="text-2xl font-bold text-primary">{stat.value}</span>
                            </div>
                            <p className="text-sm font-medium text-muted">{stat.label}</p>
                        </li>
                    ))}
                </ul>
            </section>

            {/* About me Section */}
            <section className="relative overflow-hidden" aria-labelledby="about-me-heading">
                <div className="relative p-8 border rounded-lg bg-gradient-to-r from-canvas-subtle to-background-muted border-default">
                    <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-primary-muted blur-3xl" aria-hidden="true"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-primary-muted blur-2xl" aria-hidden="true"></div>
                    <div className="relative z-10">
                        <h2 id="about-me-heading" aria-level="2" className="flex items-center mb-6 text-2xl font-bold text-default font-handwritten-bold">
                            <span className="mr-3" aria-hidden="true">👨🏻‍💻</span>
                            <span>About me...</span>
                        </h2>
                        <div className="prose prose-lg max-w-none">
                            <p className="text-lg leading-relaxed text-muted">
                                {aboutMe.description}
                            </p>
                        </div>
                        <blockquote className="pl-4 mt-6 border-l-4 border-primary-muted">
                            <p className="italic font-medium text-primary">
                                ~ "Code compiles dreams into reality, one commit at a time."
                            </p>
                        </blockquote>
                    </div>
                </div>
            </section>
            
            {/* Current Focus */}
            <section className="p-6 sm:p-8 border rounded-lg bg-canvas-subtle border-default" aria-labelledby="current-focus-heading">
                <h2 id="current-focus-heading" aria-level="2" className="mb-6 text-2xl font-bold text-default">✨ Current Focus <span className='text-primary'>–</span></h2>

                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                    <ul className="space-y-4">
                        {focusList.map((item, index) => (
                            <FocusItem key={item.id} item={item} index={index} isEditing={editingIndex === index}>
                                <div className="flex items-center flex-grow gap-3">
                                    {editingIndex === index ? (
                                        <>
                                            <input
                                                type="text"
                                                value={editedItem}
                                                onChange={(e) => setEditedItem(e.target.value)}
                                                aria-label={`Edit focus item: ${item.text}`}
                                                className="flex-grow px-2 py-1 rounded bg-transparent text-default"
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <span className="text-muted">{item.text}</span>
                                        </>
                                    )}
                                </div>
                                <div className="group flex  gap-3 sm:gap-4 ml-auto">
                                    {editingIndex === index ? (
                                        <>
                                            <button onClick={() => handleSaveItem(index)} aria-label={`Save changes for item: ${item.text}`} className="text-green-500 hover:text-green-400 opacity-0 group-hover:opacity-80 group-hover:dark:opacity-50">
                                                <Save size={15} />
                                            </button>
                                            <button onClick={() => handleCancelEdit()} aria-label={`Cancel editing item: ${item.text}`} className="text-red-500 hover:text-red-400 opacity-0 group-hover:opacity-80 group-hover:dark:opacity-50">
                                                <X size={16} />
                                            </button>
                                        </>
                                    ) : (
                                        <>
                                            <button onClick={() => handleEditItem(index)} aria-label={`Edit item: ${item.text}`} className="text-blue-500 hover:text-blue-400 opacity-0 group-hover:opacity-80 group-hover:dark:opacity-50">
                                                <Pencil size={15} />
                                            </button>
                                            <button onClick={() => handleDeleteItem(index)} aria-label={`Delete item: ${item.text}`} className="text-red-500 hover:text-red-400 opacity-0 group-hover:opacity-80 group-hover:dark:opacity-50">
                                                <Trash2 size={15} />
                                            </button>
                                        </>
                                    )}
                                </div>
                            </FocusItem>
                        ))}
                    </ul>
                </DndContext>

                <div className="flex items-center gap-2 mt-4">
                    <ChevronRight size={16} className="flex-shrink-0 mt-1 text-primary" aria-hidden="true" />
                    <input
                        type="text"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        placeholder="🐜 Add a new list item here..."
                        aria-label="Add a new focus item"
                        className="flex-grow px-2 py-1 rounded bg-transparent text-md placeholder-grey"
                    />
                    <button onClick={handleAddItem} aria-label="Add new focus item to the list" className="p-2 text-white rounded-full bg-primary-emphasis opacity-80">
                        <Plus size={16} />
                    </button>
                </div>
            </section>
        </main>
    );
};

export default About;
