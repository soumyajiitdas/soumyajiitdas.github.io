import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { Toaster } from "./components/ui/toaster";
import Layout from "./components/Layout";
import About from "./pages/About";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import ScrollToTop from "./components/ScrollToTop";

function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <div className="App">
                    <ScrollToTop />
                    <Routes>
                        <Route path="/" element={<Layout />}>
                            <Route index element={<About />} />
                            <Route path="experience" element={<Experience />} />
                            <Route path="projects" element={<Projects />} />
                            <Route path="skills" element={<Skills />} />
                            <Route path="blog" element={<Blog />} />
                            <Route path="contact" element={<Contact />} />
                            {/* Optional fallback route (404 inside SPA) */}
                            <Route path="*" element={<About />} />
                        </Route>
                    </Routes>
                    <Toaster />
                </div>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
