import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { personalInfo } from '../data/data';
import { useTheme } from '../contexts/ThemeContext';
import Clock from './Clock';
import {
    User,
    Briefcase,
    FolderOpen,
    Award,
    Mail,
    Github,
    Linkedin,
    Instagram,
    Facebook,
    Twitter,
    MapPin,
    Phone,
    ExternalLink,
    Menu,
    X,
    Sun,
    Moon
} from 'lucide-react';

const Sidebar = () => {
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { path: '/', label: 'About', icon: User },
        { path: '/experience', label: 'Experience', icon: Briefcase },
        { path: '/projects', label: 'Projects', icon: FolderOpen },
        { path: '/skills', label: 'Skills & Certs', icon: Award },
        { path: '/contact', label: 'Contact', icon: Mail },
    ];

    const socialIcons = {
        github: Github,
        linkedin: Linkedin,
        instagram: Instagram,
        facebook: Facebook,
        twitter: Twitter,
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            {/* Mobile Menu Button */}
            <div className="flex items-center justify-between p-4 border-b lg:hidden bg-canvas border-default">
                <h1 className="text-xl font-bold text-default">
                    &lt; <span className='text-primary'>dev</span>folio /&gt;
                </h1>
                <div className="flex items-center gap-2">
                    {/* Clock - Mobile Only */}
                    <Clock showIcon={false} className="mr-1" />
                    
                    <button
                        onClick={toggleTheme}
                        className="p-2 transition-colors duration-200 rounded-lg bg-canvas-subtle hover:bg-canvas-muted"
                        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                    >
                        {theme === 'light' ? (
                            <Moon size={20} className="text-default" />
                        ) : (
                            <Sun size={20} className="text-default" />
                        )}
                    </button>
                    <button
                        onClick={toggleMobileMenu}
                        className="p-2 transition-colors rounded-lg hover:bg-canvas-subtle"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Sidebar */}
            <aside className={`
        fixed inset-y-0 left-0 z-50 lg:relative lg:z-auto w-[65%] lg:w-full transform transition-transform duration-300 ease-in-out lg:transform-none ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} bg-canvas-overlay lg:bg-transparent lg:sticky lg:top-0 lg:h-screen overflow-y-auto border-r border-default lg:border-r-0
        `}>
                <div className="p-6 lg:p-8">
                    {/* Profile Section */}
                    <div className="mb-8 text-center lg:mb-8">
                        <div className="w-28 h-28 mx-auto mb-4 overflow-hidden border-4 rounded-full lg:w-32 lg:h-32 lg:mb-4 border-default bg-canvas-subtle">
                            <img
                                src="https://avatars.githubusercontent.com/u/116360739?v=4"
                                alt={personalInfo.name}
                                className="object-cover w-full h-full"
                            />
                        </div>
                        <h1 className="mb-2 text-xl font-bold lg:text-2xl text-default lg:mb-2">
                            {personalInfo.name}
                        </h1>
                        <p className="text-sm text-muted lg:text-sm">
                            CS Undergrad | Learner | Tech Enthusiast
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div className="mb-8 space-y-3 lg:mb-8 lg:space-y-3">
                        <div className="flex items-center text-sm lg:text-sm text-muted">
                            <MapPin size={18} className="flex-shrink-0 mr-3 lg:mr-3 text-primary" />
                            <span className="truncate">{personalInfo.location}</span>
                        </div>
                        <div className="flex items-center text-sm lg:text-sm text-muted">
                            <Phone size={18} className="flex-shrink-0 mr-3 lg:mr-3 text-primary" />
                            <span>{personalInfo.phone}</span>
                        </div>
                        <div className="flex items-center text-sm lg:text-sm text-muted">
                            <ExternalLink size={18} className="flex-shrink-0 mr-3 lg:mr-3 text-primary" />
                            <a
                                href={personalInfo.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="truncate transition-colors hover:text-primary"
                            >
                                Visit My Portfolio
                            </a>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="mb-8 lg:mb-8">
                        <ul className="space-y-2 lg:space-y-2">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = location.pathname === item.path;

                                return (
                                    <li key={item.path}>
                                        <NavLink
                                            to={item.path}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`
                        flex items-center px-4 lg:px-4 py-3 lg:py-3 rounded-lg transition-colors text-sm
                        ${isActive
                                                    ? 'bg-primary-emphasis text-white'
                                                    : 'text-default hover:bg-canvas-subtle hover:text-primary'
                                                }
                                            `}
                                        >
                                            <Icon size={20} className="flex-shrink-0 mr-3 lg:mr-3" />
                                            <span className="text-sm font-medium lg:text-sm">{item.label}</span>
                                        </NavLink>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* Social Links */}
                    <div className="pt-4 border-t lg:pt-4 border-default">
                        <p className="mb-4 text-sm font-medium lg:text-sm text-default lg:mb-4">Connect with me</p>
                        <div className="grid grid-cols-3 gap-3 lg:flex lg:flex-wrap lg:gap-3">
                            {Object.entries(personalInfo.socialLinks).map(([platform, url]) => {
                                const Icon = socialIcons[platform];
                                return (
                                    <a
                                        key={platform}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex flex-col items-center p-3 transition-all duration-200 transform border rounded-lg lg:p-2 bg-canvas-subtle hover:bg-primary-emphasis hover:text-white hover:scale-105 border-default"
                                        title={platform}
                                    >
                                        <Icon size={20} className="mb-1" />
                                        <span className="text-xs capitalize lg:hidden">{platform.slice(0, 3)}</span>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </aside>

            {/* Mobile Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 z-40 transition-opacity duration-300 bg-black/60 backdrop-blur-sm lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </>
    );
};

export default Sidebar;