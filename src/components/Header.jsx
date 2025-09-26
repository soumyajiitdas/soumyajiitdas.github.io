import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const Header = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <header className="flex justify-end items-center p-4 lg:p-6">
            <button
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-canvas-subtle hover:bg-canvas-muted transition-colors duration-200"
                title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
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