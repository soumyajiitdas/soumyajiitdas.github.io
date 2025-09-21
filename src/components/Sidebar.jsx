import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { personalInfo } from '../data/data';
import { useTheme } from '../contexts/ThemeContext';
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
    Globe,
    Menu,
    X
} from 'lucide-react';

const Sidebar = () => {
    const location = useLocation();
    const { theme } = useTheme();
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
            <div className="lg:hidden flex justify-between items-center p-4 bg-github-canvas border-b border-github-border">
                <h1 className="text-xl font-bold text-github-fg-default">
                    &lt; Somjit.03 /&gt;
                </h1>
                <button
                    onClick={toggleMobileMenu}
                    className="p-2 rounded-lg hover:bg-github-canvas-subtle transition-colors"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Sidebar */}
            <aside className={`
        fixed inset-y-0 left-0 z-50 lg:relative lg:z-auto w-[55%] lg:w-full transform transition-transform duration-300 ease-in-out lg:transform-none ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} bg-github-canvas-overlay lg:bg-transparent lg:sticky lg:top-0 lg:h-screen overflow-y-auto border-r border-github-border lg:border-r-0
        `}>
                <div className="p-4 lg:p-8">
                    {/* Profile Section */}
                    <div className="text-center mb-6 lg:mb-8">
                        <div className="w-20 h-20 lg:w-32 lg:h-32 mx-auto mb-3 lg:mb-4 rounded-full overflow-hidden border-4 border-github-border bg-github-canvas-subtle">
                            <img
                                src="https://avatars.githubusercontent.com/u/116360739?v=4"
                                alt={personalInfo.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h1 className="text-lg lg:text-2xl font-bold text-github-fg-default mb-1 lg:mb-2">
                            {personalInfo.name}
                        </h1>
                        <p className="text-github-fg-muted text-xs lg:text-sm">
                            CS Undergrad | Learner | Tech Enthusiast
                        </p>
                    </div>

                    {/* Contact Info */}
                    <div className="mb-6 lg:mb-8 space-y-2 lg:space-y-3">
                        <div className="flex items-center text-xs lg:text-sm text-github-fg-muted">
                            <MapPin size={14} className="mr-2 lg:mr-3 text-github-accent-fg flex-shrink-0" />
                            <span className="truncate">{personalInfo.location}</span>
                        </div>
                        <div className="flex items-center text-xs lg:text-sm text-github-fg-muted">
                            <Phone size={14} className="mr-2 lg:mr-3 text-github-accent-fg flex-shrink-0" />
                            <span>{personalInfo.phone}</span>
                        </div>
                        <div className="flex items-center text-xs lg:text-sm text-github-fg-muted">
                            <Globe size={14} className="mr-2 lg:mr-3 text-github-accent-fg flex-shrink-0" />
                            <a
                                href={personalInfo.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-github-accent-fg transition-colors truncate"
                            >
                                Portfolio Website
                            </a>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className="mb-6 lg:mb-8">
                        <ul className="space-y-1 lg:space-y-2">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = location.pathname === item.path;

                                return (
                                    <li key={item.path}>
                                        <NavLink
                                            to={item.path}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={`
                        flex items-center px-3 lg:px-4 py-2 lg:py-3 rounded-lg transition-colors text-sm
                        ${isActive
                                                    ? 'bg-github-accent-emphasis text-white'
                                                    : 'text-github-fg-default hover:bg-github-canvas-subtle hover:text-github-accent-fg'
                                                }
                                            `}
                                        >
                                            <Icon size={16} className="mr-2 lg:mr-3 flex-shrink-0" />
                                            <span className="font-medium text-xs lg:text-sm">{item.label}</span>
                                        </NavLink>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>

                    {/* Social Links */}
                    <div className="pt-3 lg:pt-4 border-t border-github-border">
                        <p className="text-xs lg:text-sm font-medium text-github-fg-default mb-3 lg:mb-4">Connect with me</p>
                        <div className="grid grid-cols-3 lg:flex lg:flex-wrap gap-2 lg:gap-3">
                            {Object.entries(personalInfo.socialLinks).map(([platform, url]) => {
                                const Icon = socialIcons[platform];
                                return (
                                    <a
                                        key={platform}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex flex-col items-center p-2 lg:p-2 rounded-lg bg-github-canvas-subtle hover:bg-github-accent-emphasis hover:text-white transition-all duration-200 transform hover:scale-105 border border-github-border"
                                        title={platform}
                                    >
                                        <Icon size={16} className="mb-1" />
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
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    style={{ left: '55%' }}
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}
        </>
    );
};

export default Sidebar;