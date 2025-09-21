import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from './contexts/ThemeContext';
import { Toaster } from './components/ui/toaster';
import Layout from './components/Layout';
import About from './pages/About';
import Experience from './pages/Experience';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Contact from './pages/Contact';

function App() {
    return (
        <ThemeProvider>
            <div className="App">
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<About />} />
                            <Route path="experience" element={<Experience />} />
                            <Route path="projects" element={<Projects />} />
                            <Route path="skills" element={<Skills />} />
                            <Route path="contact" element={<Contact />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
                <Toaster />
            </div>
        </ThemeProvider>
    );
}

export default App;
