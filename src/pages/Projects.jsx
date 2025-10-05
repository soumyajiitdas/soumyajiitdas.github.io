import React, { useState } from 'react';
import { projects } from '../data/data';
import { Github, ExternalLink, Calendar, Star, Filter } from 'lucide-react';

const Projects = () => {
    const [activeFilter, setActiveFilter] = useState('all');

    const filters = [
        { id: 'all', label: 'All Projects' },
        { id: 'webapps', label: 'Web Apps' },
        { id: 'mobileapps', label: 'Mobile Apps' },
        { id: 'aiml', label: 'AI/ML' },
        { id: 'others', label: 'Others' }
    ];

    const filteredProjects = activeFilter === 'all'
        ? projects
        : projects.filter(project => project.categories.includes(activeFilter));

    const getStatusColor = (status) => {
        switch (status) {
            case 'Live':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'In Development':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            case 'Alpha Testing':
                return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case 'Prototype':
                return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        }
    };

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="text-center lg:text-left">
                <h1 className="mb-4 text-4xl font-bold text-default">My Projects <span className='text-primary'>:</span></h1>
                <p className="max-w-2xl text-muted">
                    A collection of projects I've built while learning and exploring different technologies.
                    Each project represents a step in my journey as a developer.
                </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 p-2 border rounded-lg bg-canvas-subtle border-default">
                <Filter size={20} className="mt-2 mr-2 text-muted" />
                {filters.map((filter) => (
                    <button
                        key={filter.id}
                        onClick={() => setActiveFilter(filter.id)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${activeFilter === filter.id
                                ? 'bg-primary-emphasis text-white shadow-sm'
                                : 'text-muted hover:text-default hover:bg-canvas-muted'
                            }`}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>

            {/* Projects Count */}
            <div className="text-sm text-muted">
                Showing {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
                {activeFilter !== 'all' && ` in ${filters.find(f => f.id === activeFilter)?.label}`}
            </div>

            {/* Projects Grid */}
            <div className="grid gap-6 md:grid-cols-2">
                {filteredProjects.map((project) => (
                    <div
                        key={project.id}
                        className={`
              bg-canvas-subtle rounded-lg border border-default 
              hover:border-primary-muted transition-all duration-300 hover:shadow-lg
              ${project.featured ? 'ring-2 ring-primary-muted' : ''}
            `}
                    >
                        {/* Project Image */}
                        <div className="relative">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="object-cover w-full h-48 rounded-t-lg"
                            />
                            {project.featured && (
                                <div className="absolute top-3 left-3">
                                    <div className="flex items-center gap-1 px-2 py-1 text-xs font-medium text-white rounded-full bg-primary-emphasis">
                                        <Star size={12} />
                                        Featured
                                    </div>
                                </div>
                            )}
                            <div className="absolute top-3 right-3">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.deploymentStatus)}`}>
                                    {project.deploymentStatus}
                                </span>
                            </div>
                        </div>

                        {/* Project Content */}
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-3">
                                <h3 className="text-xl font-semibold text-default">
                                    {project.title}
                                </h3>
                            </div>

                            <p className="mb-4 text-sm leading-relaxed text-muted">
                                {project.description}
                            </p>

                            {/* Technologies */}
                            <div className="mb-4">
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech, techIndex) => (
                                        <span
                                            key={techIndex}
                                            className="px-2 py-1 text-xs rounded bg-primary-subtle text-primary"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Project Meta */}
                            <div className="flex items-center justify-between mb-4 text-xs text-muted">
                                <div className="flex items-center gap-1">
                                    <Calendar size={12} />
                                    <span>Updated {project.lastUpdated}</span>
                                </div>
                                {project.isDeployed && (
                                    <span className="px-2 py-1 text-green-700 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-300">
                                        Live
                                    </span>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors border rounded-lg bg-canvas border-default hover:bg-canvas-muted text-default"
                                >
                                    <Github size={16} />
                                    <span>Code</span>
                                </a>

                                {project.demo && project.demo !== '#' && (
                                    <a
                                        href={project.demo}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg bg-primary-emphasis hover:bg-primary-emphasis/90"
                                    >
                                        <ExternalLink size={16} />
                                        <span>Live Demo</span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredProjects.length === 0 && (
                <div className="py-12 text-center">
                    <div className="mb-4 text-6xl">🔍</div>
                    <h3 className="mb-2 text-xl font-semibold text-default">
                        No projects found
                    </h3>
                    <p className="text-muted">
                        Try selecting a different filter or check back later for new projects.
                    </p>
                </div>
            )}

            {/* Project Stats */}
            <div className="p-6 border rounded-lg bg-canvas-subtle border-default">
                <h3 className="mb-4 text-lg font-semibold text-default">Project Statistics</h3>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <div className="text-center">
                        <div className="text-2xl font-bold text-primary">{projects.length}</div>
                        <div className="text-sm text-muted">Total Projects</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                            {projects.filter(p => p.featured).length}
                        </div>
                        <div className="text-sm text-muted">Featured</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                            {projects.filter(p => p.isDeployed).length}
                        </div>
                        <div className="text-sm text-muted">Live Projects</div>
                    </div>
                    <div className="text-center">
                        <div className="text-2xl font-bold text-primary">
                            {[...new Set(projects.flatMap(p => p.technologies))].length}
                        </div>
                        <div className="text-sm text-muted">Technologies</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Projects;