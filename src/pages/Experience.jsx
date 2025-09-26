import React from 'react';
import { experience, education } from '../data/data';
import { Calendar, MapPin, Building, GraduationCap, Award, ExternalLink } from 'lucide-react';

const Experience = () => {
    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="text-center lg:text-left">
                <h1 className="text-4xl font-bold text-default mb-4">Education & Experience <span className='text-primary'>:</span></h1>
                <p className="text-muted max-w-2xl">
                    My professional journey and educational background in technology and software development.
                </p>
            </div>

            {/* Education Section */}
            <section className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                    <GraduationCap className="text-primary" size={24} />
                    <h2 className="text-3xl font-bold text-default">Education</h2>
                </div>

                <div className="space-y-6">
                    {education.map((edu, index) => (
                        <div
                            key={edu.id}
                            className="bg-canvas-subtle rounded-lg p-6 border border-default hover:border-primary-muted transition-all duration-300"
                        >
                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-default mb-1">
                                        {edu.degree}
                                    </h3>
                                    <p className="text-primary font-medium mb-2">{edu.institution}</p>

                                    <div className="flex flex-wrap gap-4 text-sm text-muted mb-4">
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
                                            <span className="text-sm text-muted">GPA: </span>
                                            <span className="font-semibold text-primary">{edu.gpa}</span>
                                        </div>
                                    )}
                                    {edu.percentage && (
                                        <div className="text-right">
                                            <span className="text-sm text-muted">Score: </span>
                                            <span className="font-semibold text-primary">{edu.percentage}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Relevant Courses */}
                            {edu.relevantCourses && (
                                <div className="mb-4">
                                    <h4 className="text-sm font-medium text-default mb-2">Relevant Courses:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {edu.relevantCourses.map((course, courseIndex) => (
                                            <span
                                                key={courseIndex}
                                                className="bg-primary-subtle text-primary text-xs px-3 py-1 rounded-full"
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
                                    <h4 className="text-sm font-medium text-default mb-2">Subjects:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {edu.subjects.map((subject, subjectIndex) => (
                                            <span
                                                key={subjectIndex}
                                                className="bg-primary-subtle text-primary text-xs px-3 py-1 rounded-full"
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
                                    <h4 className="text-sm font-medium text-default mb-2">Achievements:</h4>
                                    <ul className="text-sm text-muted space-y-1">
                                        {edu.achievements.map((achievement, achievementIndex) => (
                                            <li key={achievementIndex} className="flex items-start gap-2">
                                                <Award size={14} className="text-primary mt-1 flex-shrink-0" />
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
                    <Building className="text-primary" size={24} />
                    <h2 className="text-3xl font-bold text-default">Professional Experience</h2>
                </div>

                <div className="space-y-6">
                    {experience.map((exp, index) => (
                        <div
                            key={exp.id}
                            className="bg-canvas-subtle rounded-lg p-6 border border-default hover:border-primary-muted transition-all duration-300"
                        >
                            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-4">
                                <div className="flex-1">
                                    <h3 className="text-xl font-semibold text-default mb-1">
                                        {exp.title}
                                    </h3>
                                    <p className="text-primary font-medium mb-2">{exp.company}</p>

                                    <div className="flex flex-wrap gap-4 text-sm text-muted mb-4">
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

                            <p className="text-muted mb-4 leading-relaxed">
                                {exp.detailedDescription}
                            </p>

                            {/* Technologies */}
                            <div className="mb-4">
                                <h4 className="text-sm font-medium text-default mb-2">Technologies Used:</h4>
                                <div className="flex flex-wrap gap-2">
                                    {exp.technologies.map((tech, techIndex) => (
                                        <span
                                            key={techIndex}
                                            className="bg-primary-subtle text-primary text-xs px-3 py-1 rounded-full"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Projects */}
                            {exp.projects && (
                                <div className="mb-4">
                                    <h4 className="text-sm font-medium text-default mb-2">Key Projects:</h4>
                                    <ul className="text-sm text-muted space-y-1">
                                        {exp.projects.map((project, projectIndex) => (
                                            <li key={projectIndex} className="flex items-start gap-2">
                                                <span className="text-primary mt-1">•</span>
                                                <span>{project}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Skills Gained */}
                            {exp.skills_gained && (
                                <div>
                                    <h4 className="text-sm font-medium text-default mb-2">Skills Gained:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {exp.skills_gained.map((skill, skillIndex) => (
                                            <span
                                                key={skillIndex}
                                                className="bg-canvas border border-default text-muted text-xs px-2 py-1 rounded"
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