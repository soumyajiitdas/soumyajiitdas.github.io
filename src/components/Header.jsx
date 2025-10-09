import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';
import Clock from './Clock';

const Header = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="flex items-center justify-between p-4 lg:p-6">
            {/* Clock - Desktop Only */}
            <div className="hidden lg:block">
                <Clock showIcon={true} />
            </div>

            {/* Heading - Desktop Only */}
            <div className='hidden lg:block text-md font-medium text-default'>
            &lt; <span className='text-primary'>dev</span>folio /&gt;

            </div>

            {/* Theme Toggle - Desktop Only */}
            <button
                onClick={toggleTheme}
                className="hidden p-2 transition-colors duration-200 rounded-lg bg-canvas-subtle hover:bg-canvas-muted lg:block"
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
                {theme === 'light' ? (
                    <Moon size={20} className="text-default" />
                ) : (
                    <Sun size={20} className="text-default" />
                )}
            </button>
        </header>
    );
};

export default Header;