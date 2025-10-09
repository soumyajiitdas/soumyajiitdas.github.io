import React from 'react';
import { skills, certifications } from '../data/data';
import {
    Award,
    ExternalLink,
    Calendar,
    CheckCircle
} from 'lucide-react';
import {
    // Programming Languages
    SiPython,
    SiJavascript,
    SiHtml5,
    SiCss3,
    SiC,
    // Libraries
    SiReact,
    SiNumpy,
    SiPandas,
    // Frameworks
    SiFramework,
    SiTailwindcss,
    SiNextdotjs,
    SiExpress,
    SiFastapi,
    // Tools
    SiGit,
    SiGithub,
    SiVite,
    SiJupyter,
    SiDocker,
    // Databases
    SiMysql,
    SiMongodb,
    SiPostgresql
} from 'react-icons/si';
import { BiLogoVisualStudio } from "react-icons/bi";
import { FaJava, FaTools, FaDatabase, FaLightbulb, FaUsers, FaComments, FaSync, FaHandshake, FaHeart } from 'react-icons/fa';
import { GrLanguage } from "react-icons/gr";
import { IoLibraryOutline } from "react-icons/io5";

const Skills = () => {
    const skillCategories = [
        { key: 'languages', title: 'Programming Languages', icon: GrLanguage, color: 'text-blue-500' },
        { key: 'frameworks', title: 'Frameworks', icon: SiFramework, color: 'text-green-500' },
        { key: 'libraries', title: 'Libraries', icon: IoLibraryOutline, color: 'text-purple-500' },
        { key: 'tools', title: 'Tools & Technologies', icon: FaTools, color: 'text-orange-500' },
        { key: 'databases', title: 'Databases', icon: FaDatabase, color: 'text-red-500' },
        { key: 'softSkills', title: 'Soft Skills', icon: FaHeart, color: 'text-pink-500' }
    ];

    const getSkillIcon = (skillName) => {
        const iconMap = {
            'Python': SiPython,
            'JavaScript': SiJavascript,
            'HTML': SiHtml5,
            'CSS': SiCss3,
            'C': SiC,
            'Java': FaJava,
            'TailwindCSS': SiTailwindcss,
            'Next.js': SiNextdotjs,
            'Express.js': SiExpress,
            'FastAPI': SiFastapi,
            'React': SiReact,
            'Matplotlib': SiPython,
            'NumPy': SiNumpy,
            'Pandas': SiPandas,
            'Git': SiGit,
            'GitHub': SiGithub,
            'Vite.js': SiVite,
            'VS Code': BiLogoVisualStudio,
            'Jupyter Notebook': SiJupyter,
            'Docker': SiDocker,
            'MySQL': SiMysql,
            'MongoDB': SiMongodb,
            'PostgreSQL': SiPostgresql,
            'Curiosity': FaLightbulb,
            'Adaptability': FaSync,
            'Consistency': FaHandshake,
            'TeamWork': FaUsers,
            'Communication': FaComments
        };
        return iconMap[skillName] || SiPython;
    };

    const getSkillColor = (skillName) => {
        const colorMap = {
            'Python': 'text-blue-600',
            'JavaScript': 'text-yellow-500',
            'HTML': 'text-orange-600',
            'CSS': 'text-blue-500',
            'C': 'text-blue-700',
            'Java': 'text-red-600',
            'TailwindCSS': 'text-cyan-500',
            'Next.js': 'text-black dark:text-white',
            'Express.js': 'text-green-600',
            'FastAPI': 'text-green-500',
            'React': 'text-cyan-400',
            'Matplotlib': 'text-blue-600',
            'NumPy': 'text-blue-500',
            'Pandas': 'text-purple-600',
            'Git': 'text-red-500',
            'GitHub': 'text-gray-800 dark:text-white',
            'Vite.js': 'text-purple-500',
            'VS Code': 'text-blue-500',
            'Jupyter Notebook': 'text-orange-500',
            'Docker': 'text-blue-600',
            'MySQL': 'text-blue-600',
            'MongoDB': 'text-green-500',
            'PostgreSQL': 'text-blue-700',
            'Curiosity': 'text-yellow-500',
            'Adaptability': 'text-blue-500',
            'Consistency': 'text-green-500',
            'TeamWork': 'text-purple-500',
            'Communication': 'text-pink-500'
        };
        return colorMap[skillName] || 'text-gray-500';
    };

    const getCertificationStatusColor = (status) => {
        switch (status) {
            case 'completed':
                return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'in-progress':
                return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            case 'expired':
                return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
            default:
                return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
        }
    };

    return (
        <div className="space-y-8 mt-14 lg:mt-0">
            {/* Page Header */}
            <div className="text-center lg:text-left">
                <h1 className="mb-4 text-4xl font-bold text-default">
                    Skills & <span className="text-primary">Certifications</span>
                </h1>
                <p className="max-w-2xl text-muted">
                    My technical skills, tools I work with, and certifications I've earned throughout my learning journey.
                </p>
            </div>

            {/* Skills Section */}
            <section className="space-y-8">
                <div className="flex items-center gap-3">
                    <SiPython className="text-primary" size={24} />
                    <h2 className="text-3xl font-bold text-default">
                        Technical Skills <span className="text-primary">:</span>
                    </h2>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    {skillCategories.map((category) => {
                        const Icon = category.icon;
                        const categorySkills = skills[category.key];

                        return (
                            <section
                                key={category.key}
                                className="p-6 transition-all duration-300 border rounded-lg bg-canvas-subtle border-default hover:border-primary-muted"
                                aria-label={`${category.title} skills`}
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <Icon className={`${category.color}`} size={20} />
                                    <h3 className="text-lg font-semibold text-default">
                                        {category.title}
                                    </h3>
                                </div>

                                <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                                    {categorySkills.map((skill, index) => {
                                        const SkillIcon = getSkillIcon(skill.name);
                                        const skillColor = getSkillColor(skill.name);

                                        return (
                                            <li
                                                key={index}
                                                className="flex flex-col items-center p-4 transition-all duration-200 border bg-canvas rounded-xl border-default hover:border-primary-muted hover:shadow-md group"
                                                aria-label={skill.name}
                                            >
                                                <SkillIcon size={28} className={`${skillColor} mb-3 group-hover:scale-110 transition-transform duration-200`} />
                                                <div className="text-center">
                                                    <span className="block text-sm font-medium break-all text-default">
                                                        {skill.name}
                                                    </span>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </section>
                        );
                    })}
                </div>
            </section>

            {/* Certifications Section */}
            <section className="space-y-6">
                <div className="flex items-center gap-3">
                    <Award className="text-primary" size={24} />
                    <h2 className="text-3xl font-bold text-default">
                        Certifications <span className="text-primary">:</span>
                    </h2>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                    {certifications.map((cert) => (
                        <article
                            key={cert.id}
                            className="overflow-hidden transition-all duration-300 border rounded-lg bg-canvas-subtle border-default hover:border-primary-muted"
                        >
                            {/* Certificate Image */}
                            <div className="relative">
                                <img
                                    src={cert.image}
                                    alt={cert.title}
                                    className="object-cover w-full h-40"
                                />
                                <div className="absolute top-3 right-3">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCertificationStatusColor(cert.status)}`}>
                                        {cert.statusText || 'Completed'}
                                    </span>
                                </div>
                            </div>

                            {/* Certificate Details */}
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-3">
                                    <h3 className="text-lg font-semibold leading-tight text-default">
                                        {cert.title}
                                    </h3>
                                </div>

                                <p className="mb-2 font-medium text-primary">{cert.issuer}</p>

                                <div className="flex items-center justify-between gap-4 mb-4 text-sm text-muted">
                                    <div className="flex items-center gap-1">
                                        <Calendar size={14} />
                                        <span>{cert.date}</span>
                                    </div>
                                    {cert.credentialId !== 'Null' && (
                                        <div className="flex items-center gap-1">
                                            <CheckCircle size={14} />
                                            <span className="break-word">ID: {cert.credentialId}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex items-center justify-between mb-4 text-xs text-muted">
                                    <span className="px-2 py-1 rounded bg-primary-subtle text-primary">
                                        {cert.category}
                                    </span>
                                    <span>Expires: {cert.expiryDate}</span>
                                </div>

                                {/* Verification Link */}
                                {cert.verificationUrl && (
                                    <a
                                        href={cert.verificationUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg bg-primary-emphasis hover:bg-primary-emphasis/90"
                                        aria-label={`Verify ${cert.title} certificate`}
                                    >
                                        <ExternalLink size={14} />
                                        <span>Verify Certificate</span>
                                    </a>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            </section>

            {/* Skills Summary */}
            <section className="p-6 border rounded-lg bg-canvas-subtle border-default">
                <h3 className="mb-4 text-lg font-semibold text-default">Skills Summary</h3>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    <article className="text-center" aria-label="Total Skills">
                        <div className="text-2xl font-bold text-primary">
                            {Object.values(skills).flat().length}
                        </div>
                        <div className="text-sm text-muted">Total Skills</div>
                    </article>
                    <article className="text-center" aria-label="Number of Programming Languages">
                        <div className="text-2xl font-bold text-primary">
                            {skills.languages.length}
                        </div>
                        <div className="text-sm text-muted">Languages</div>
                    </article>
                    <article className="text-center" aria-label="Number of Frameworks and Libraries">
                        <div className="text-2xl font-bold text-primary">
                            {skills.frameworks.length + skills.libraries.length}
                        </div>
                        <div className="text-sm text-muted">Frameworks</div>
                    </article>
                    <article className="text-center" aria-label="Number of Certifications">
                        <div className="text-2xl font-bold text-primary">
                            {certifications.length}
                        </div>
                        <div className="text-sm text-muted">Certifications</div>
                    </article>
                </div>
            </section>
        </div>
    );
};

export default Skills;
