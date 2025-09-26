import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
    return (
        <div className="min-h-screen bg-canvas transition-colors duration-300">
            <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
                {/* Sidebar */}
                <div className="lg:w-80 lg:min-h-screen">
                    <Sidebar />
                </div>

                {/* Main Content */}
                <div className="flex-1 lg:ml-6">
                    <Header />
                    <main className="px-4 lg:px-6 pb-8">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Layout;