import React from 'react';
import { experience, education } from '../data/data';
import { Calendar, MapPin, Building, GraduationCap, Award, ExternalLink } from 'lucide-react';

const Experience = () => {
    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="text-center lg:text-left">
                <h1 className="text-4xl font-bold text-github-fg-default mb-4">Education & Experience</h1>
                <p className="text-github-fg-muted max-w-2xl">
                    My professional journey and educational background in technology and software development.
                </p>
            </div>

            {/* Education Section */}
            <section className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                    <GraduationCap className="text-github-accent-fg" size={24} />
                    <h2 className="text-3xl font-bold text-github-fg-default">Education</h2>
                </div>

                <div className="space-y-6">
                    {education.map((edu, index) => (
                        <div
                            key={edu.id}
                            className="bg-github-canvas-subtle rounded-lg p-6 border border-github-border hover:border-github-accent-muted transition-all duration-300"
                        >
                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-github-fg-default mb-1">
                                        {edu.degree}
                                    </h3>
                                    <p className="text-github-accent-fg font-medium mb-2">{edu.institution}</p>

                                    <div className="flex flex-wrap gap-4 text-sm text-github-fg-muted mb-4">
                                        <div className="flex items-center gap-1">
                                            <Calendar size={16} />
                                            <span>{edu.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MapPin size={16} />
                                            <span>{edu.location}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-2">
                                    {edu.status === 'pursuing' && (
                                        <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs px-2 py-1 rounded-full">
                                            In Progress
                                        </span>
                                    )}
                                    {edu.gpa && (
                                        <div className="text-right">
                                            <span className="text-sm text-github-fg-muted">GPA: </span>
                                            <span className="font-semibold text-github-accent-fg">{edu.gpa}</span>
                                        </div>
                                    )}
                                    {edu.percentage && (
                                        <div className="text-right">
                                            <span className="text-sm text-github-fg-muted">Score: </span>
                                            <span className="font-semibold text-github-accent-fg">{edu.percentage}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Relevant Courses */}
                            {edu.relevantCourses && (
                                <div className="mb-4">
                                    <h4 className="text-sm font-medium text-github-fg-default mb-2">Relevant Courses:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {edu.relevantCourses.map((course, courseIndex) => (
                                            <span
                                                key={courseIndex}
                                                className="bg-github-accent-subtle text-github-accent-fg text-xs px-3 py-1 rounded-full"
                                            >
                                                {course}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Subjects */}
                            {edu.subjects && (
                                <div className="mb-4">
                                    <h4 className="text-sm font-medium text-github-fg-default mb-2">Subjects:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {edu.subjects.map((subject, subjectIndex) => (
                                            <span
                                                key={subjectIndex}
                                                className="bg-github-accent-subtle text-github-accent-fg text-xs px-3 py-1 rounded-full"
                                            >
                                                {subject}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Achievements */}
                            {edu.achievements && (
                                <div>
                                    <h4 className="text-sm font-medium text-github-fg-default mb-2">Achievements:</h4>
                                    <ul className="text-sm text-github-fg-muted space-y-1">
                                        {edu.achievements.map((achievement, achievementIndex) => (
                                            <li key={achievementIndex} className="flex items-start gap-2">
                                                <Award size={14} className="text-github-accent-fg mt-1 flex-shrink-0" />
                                                <span>{achievement}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* Experience Section */}
            <section className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                    <Building className="text-github-accent-fg" size={24} />
                    <h2 className="text-3xl font-bold text-github-fg-default">Professional Experience</h2>
                </div>

                <div className="space-y-6">
                    {experience.map((exp, index) => (
                        <div
                            key={exp.id}
                            className="bg-github-canvas-subtle rounded-lg p-6 border border-github-border hover:border-github-accent-muted transition-all duration-300"
                        >
                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-github-fg-default mb-1">
                                        {exp.title}
                                    </h3>
                                    <p className="text-github-accent-fg font-medium mb-2">{exp.company}</p>

                                    <div className="flex flex-wrap gap-4 text-sm text-github-fg-muted mb-4">
                                        <div className="flex items-center gap-1">
                                            <Calendar size={16} />
                                            <span>{exp.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MapPin size={16} />
                                            <span>{exp.location}</span>
                                        </div>
                                    </div>
                                </div>

                                {exp.endDate === 'present' && (
                                    <span className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 text-xs px-2 py-1 rounded-full">
                                        Current
                                    </span>
                                )}
                            </div>

                            <p className="text-github-fg-muted mb-4 leading-relaxed">
                                {exp.detailedDescription}
                            </p>

                            {/* Technologies */}
                            <div className="mb-4">
                                <h4 className="text-sm font-medium text-github-fg-default mb-2">Technologies Used:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {exp.technologies.map((tech, techIndex) => (
                                        <span
                                            key={techIndex}
                                            className="bg-github-accent-subtle text-github-accent-fg text-xs px-3 py-1 rounded-full"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Projects */}
                            {exp.projects && (
                                <div className="mb-4">
                                    <h4 className="text-sm font-medium text-github-fg-default mb-2">Key Projects:</h4>
                                    <ul className="text-sm text-github-fg-muted space-y-1">
                                        {exp.projects.map((project, projectIndex) => (
                                            <li key={projectIndex} className="flex items-start gap-2">
                                                <span className="text-github-accent-fg mt-1">•</span>
                                                <span>{project}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Skills Gained */}
                            {exp.skills_gained && (
                                <div>
                                    <h4 className="text-sm font-medium text-github-fg-default mb-2">Skills Gained:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {exp.skills_gained.map((skill, skillIndex) => (
                                            <span
                                                key={skillIndex}
                                                className="bg-github-canvas-default border border-github-border text-github-fg-muted text-xs px-2 py-1 rounded"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Experience;