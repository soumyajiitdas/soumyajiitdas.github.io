import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const Layout = () => {
    return (
        <div className="min-h-screen transition-colors duration-300 bg-canvas">
            <div className="flex flex-col mx-auto lg:flex-row max-w-7xl">
                {/* Sidebar */}
                <div className="lg:w-80 lg:min-h-screen">
                    <Sidebar />
                </div>

                {/* Main Content */}
                <div className="flex-1 lg:ml-6">
                    <Header />
                    <main className="px-4 pb-8 lg:px-6">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Layout;