import React from 'react';
import { Clock, Copyright, Heart } from 'lucide-react';
import { personalInfo } from '../data/data';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const lastUpdated = new Date(__BUILD_DATE__).toLocaleDateString('en-US', {
        dateStyle: 'medium',
    });

    return (
        <footer className="py-5 mt-4 border-t bg-canvas border-default">
            <div className="px-4 mx-auto max-w-7xl lg:px-6">
                <div className="flex flex-col items-center justify-between space-y-3 lg:flex-row lg:space-y-0">
                    {/* Copyright */}
                    <div className="flex items-center space-x-1 text-sm text-center text-muted lg:text-left">
                        <Copyright size={14} className="text-primary rotate-180" />
                        <span>{currentYear} {personalInfo.name}. All rights reserved.</span>
                    </div>

                    {/* Made with love */}
                    <div className="flex items-center space-x-2 text-sm text-muted">
                        <span>Crafted with</span>
                        <Heart
                            size={16}
                            className="text-red-500 animate-pulse"
                            style={{
                                animation: 'pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                            }}
                        />
                        <span>and lots of</span><span>☕</span><span>in</span><span>🇮🇳</span>
                    </div>

                    {/* Last updated */}
                    <div className="flex items-center space-x-2 text-sm text-center text-muted lg:text-right">
                        <Clock size={14} className="text-primary" />
                        <span>Updated: {lastUpdated}</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
