import React from 'react';
import { experience, education } from '../data/data';
import { Calendar, MapPin, Building, GraduationCap, Award, ExternalLink } from 'lucide-react';

const Experience = () => {
    return (
        <div className="space-y-8 mt-14 lg:mt-0">
            {/* Page Header */}
            <div className="text-center lg:text-left">
                <h1 className="mb-4 text-4xl font-bold text-default">Education & <span className='text-primary'>Experience</span></h1>
                <p className="max-w-2xl text-muted">
                    A glimpse into my academic foundation and professional journey. Showcasing the education that shaped my technical thinking and the experiences that refined it through real-world application.
                </p>
            </div>

            {/* Education Section */}
            <section className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                    <GraduationCap className="text-primary" size={24} />
                    <h2 className="text-3xl font-bold text-default">Education <span className="text-primary">:</span></h2>
                </div>

                <div className="space-y-6">
                    {education.map((edu, index) => (
                        <article
                            key={edu.id}
                            className="p-6 transition-all duration-300 border rounded-lg bg-canvas-subtle border-default hover:border-primary-muted"
                            aria-label={`Education: ${edu.degree} at ${edu.institution}`}
                        >                            <div className="flex flex-col mb-4 lg:flex-row lg:items-start lg:justify-between">
                                <div className="flex-1">
                                    <h3 className="mb-1 text-xl font-semibold text-default">
                                        {edu.degree}
                                    </h3>
                                    <p className="mb-2 font-medium text-primary">{edu.institution}</p>

                                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted">
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

                                <div className="flex flex-row items-end justify-between gap-2 lg:flex-col lg:justify-between">
                                    {edu.status === 'pursuing' && (
                                        <span className="px-2 py-1 text-xs text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                                            In Progress
                                        </span>
                                    )}
                                    {edu.gpa && (
                                        <div className="text-right underline underline-offset-4 decoration-blue-400 dark:decoration-blue-800">
                                            <span className="text-sm text-muted">YGPA: </span>
                                            <span className="font-semibold text-primary">{edu.gpa}</span>
                                        </div>
                                    )}
                                    {edu.percentage && (
                                        <div className="text-right underline underline-offset-4 decoration-blue-400 dark:decoration-blue-800">
                                            <span className="text-sm text-muted">Score: </span>
                                            <span className="font-semibold text-primary">{edu.percentage}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Relevant Courses */}
                            {edu.relevantCourses && (
                                <div className="mb-4">
                                    <h4 className="mb-2 text-sm font-medium text-default">Relevant Courses:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {edu.relevantCourses.map((course, courseIndex) => (
                                            <span
                                                key={courseIndex}
                                                className="px-3 py-1 text-xs rounded-full bg-primary-subtle text-primary"
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
                                    <h4 className="mb-2 text-sm font-medium text-default">Subjects:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {edu.subjects.map((subject, subjectIndex) => (
                                            <span
                                                key={subjectIndex}
                                                className="px-3 py-1 text-xs rounded-full bg-primary-subtle text-primary"
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
                                    <h4 className="mb-2 text-sm font-medium text-default">Achievements:</h4>
                                    <ul className="space-y-1 text-sm text-muted">
                                        {edu.achievements.map((achievement, achievementIndex) => (
                                            <li key={achievementIndex} className="flex items-start gap-2">
                                                <Award size={14} className="flex-shrink-0 mt-1 text-primary" />
                                                <span>{achievement}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </article>
                    ))}
                </div>
            </section>

            {/* Experience Section */}
            <section className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                    <Building className="text-primary" size={24} />
                    <h2 className="text-3xl font-bold text-default">Professional Experience <span className="text-primary">:</span></h2>
                </div>

                <div className="space-y-6">
                    {experience.map((exp, index) => (
                        <article
                            key={exp.id}
                            className="p-6 transition-all duration-300 border rounded-lg bg-canvas-subtle border-default hover:border-primary-muted"
                            aria-label={`Experience: ${exp.title} at ${exp.company}`}
                        >                            <div className="flex flex-col mb-4 lg:flex-row lg:items-start lg:justify-between">
                                <div className="flex-1">
                                    <h3 className="mb-1 text-xl font-semibold text-default">
                                        {exp.title}
                                    </h3>
                                    <p className="mb-2 font-medium text-primary">{exp.company}</p>
                                    <div className="flex flex-wrap gap-4 mb-4 text-sm text-muted">
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
                                    <span className="px-2 py-1 text-xs text-center text-green-800 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-300">
                                        Current
                                    </span>
                                )}
                            </div>

                            <p className="mb-4 leading-relaxed text-muted">
                                {exp.detailedDescription}
                            </p>

                            {/* Technologies */}
                            {exp.technologies?.length > 0 && (
                                <div className="mb-4">
                                    <h4 className="mb-2 text-sm font-medium text-default">Technologies Used:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {exp.technologies.map((tech, techIndex) => (
                                            <span
                                                key={techIndex}
                                                className="px-3 py-1 text-xs rounded-full bg-primary-subtle text-primary"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Projects */}
                            {exp.projects?.length > 0 && (
                                <div className="mb-4">
                                    <h4 className="mb-2 text-sm font-medium text-default">Key Projects:</h4>
                                    <ul className="space-y-1 text-sm text-muted">
                                        {exp.projects.map((project, projectIndex) => (
                                            <li key={projectIndex} className="flex items-start gap-2">
                                                <span className="mt-1 text-primary">•</span>
                                                <span>{project}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Skills Gained */}
                            {exp.skills_gained?.length > 0 && (
                                <div>
                                    <h4 className="mb-2 text-sm font-medium text-default">Skills Gained:</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {exp.skills_gained.map((skill, skillIndex) => (
                                            <span
                                                key={skillIndex}
                                                className="px-2 py-1 text-xs border rounded bg-canvas border-default text-muted"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Experience;