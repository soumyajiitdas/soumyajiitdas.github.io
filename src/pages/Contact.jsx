import React, { useState } from 'react'; 
import { personalInfo } from '../data/data';
import { useToast } from '../hooks/use-toast';
import {
    Mail,
    Phone,
    MapPin,
    Send,
    Github,
    Linkedin,
    Instagram,
    Facebook,
    Twitter,
    ExternalLink,
    MessageCircle,
    Clock,
    CheckCircle,
    Heart,
    Code,
} from 'lucide-react';

const Contact = () => {
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!formData.name || !formData.email || !formData.message) {
            toast({
                title: "Validation Error",
                description: "Please fill in all required fields.",
                variant: "destructive"
            });
            setIsSubmitting(false);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast({
                title: "Invalid Email",
                description: "Please enter a valid email address.",
                variant: "destructive"
            });
            setIsSubmitting(false);
            return;
        }

        setTimeout(() => {
            const submissions = JSON.parse(localStorage.getItem('contact-submissions') || '[]');
            const newSubmission = {
                ...formData,
                timestamp: new Date().toISOString(),
                id: Date.now()
            };
            submissions.push(newSubmission);
            localStorage.setItem('contact-submissions', JSON.stringify(submissions));

            toast({
                title: "Message Sent Successfully!",
                description: "Thank you for reaching out. I'll get back to you soon.",
            });

            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            });
            setIsSubmitting(false);
        }, 2000);
    };

    const socialIcons = {
        github: Github,
        linkedin: Linkedin,
        instagram: Instagram,
        facebook: Facebook,
        twitter: Twitter,
    };

    const contactMethods = [
        {
            icon: Mail,
            title: "Email",
            value: personalInfo.email,
            href: `mailto:${personalInfo.email}`,
            description: "Best way to reach me",
            color: "from-blue-500/10 to-blue-600/10 border-blue-500/20"
        },
        {
            icon: Phone,
            title: "Phone",
            value: personalInfo.phone,
            href: `tel:${personalInfo.phone}`,
            description: "For urgent matters",
            color: "from-green-500/10 to-green-600/10 border-green-500/20"
        },
        {
            icon: MapPin,
            title: "Location",
            value: personalInfo.location,
            href: null,
            description: "Where I'm based",
            color: "from-purple-500/10 to-purple-600/10 border-purple-500/20"
        },
        {
            icon: ExternalLink,
            title: "Website",
            value: "My Portfolio Website",
            href: personalInfo.website,
            description: "Visit my portfolio",
            color: "from-orange-500/10 to-orange-600/10 border-orange-500/20"
        }
    ];

    const responseInfo = [
        {
            icon: Clock,
            title: "Response Time",
            description: "Usually within 24 hours"
        },
        {
            icon: CheckCircle,
            title: "Availability",
            description: "Open to new opportunities"
        },
        {
            icon: Heart,
            title: "Interests",
            description: "AI, Web Dev, Open Source"
        }
    ];

    return (
        <main className="space-y-12 mt-14 lg:mt-0" aria-label="Contact Page Main Content">
            {/* Page Header */}
            <header className="space-y-6 text-center lg:text-left">
                <div className="space-y-4">
                    <h1 className="text-4xl font-bold text-default">
                        Let's <span className="text-primary">Connect...</span>
                    </h1>
                    <p className="max-w-3xl text-muted">
                        I'm always excited to discuss new opportunities, collaborate on interesting projects, or just have a conversation about technology and innovation.
                    </p>
                </div>

                {/* Response Info Cards */}
                <section className="grid gap-4 mt-8 sm:grid-cols-3" aria-label="Response Information">
                    {responseInfo.map((info, index) => (
                        <article
                            key={index}
                            className="flex items-center gap-3 p-4 transition-all duration-300 border rounded-lg bg-canvas-subtle border-default hover:border-primary-muted"
                            aria-label={`${info.title}: ${info.description}`}
                        >
                            <info.icon className="flex-shrink-0 text-primary" size={20} aria-hidden="true" />
                            <div className="text-left">
                                <p className="text-sm font-medium text-default">{info.title}</p>
                                <p className="text-xs text-muted">{info.description}</p>
                            </div>
                        </article>
                    ))}
                </section>
            </header>

            <div className="grid gap-8 lg:grid-cols-5">
                {/* Sidebar */}
                <aside className="space-y-6 lg:col-span-2" aria-label="Contact Sidebar">
                    {/* Contact Methods */}
                    <section className="space-y-4" aria-label="Contact Methods">
                        <h2 className="mb-6 text-2xl font-bold text-default">Get in touch <span className='text-primary'>:</span></h2>
                        {contactMethods.map((method, index) => (
                            <article
                                key={index}
                                className={`bg-gradient-to-br ${method.color} rounded-lg p-6 border border-default hover:border-primary-muted transition-all duration-300 transform scale-[.98] hover:scale-[1.02]`}
                                aria-label={`${method.title} contact method`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="p-2 rounded-lg bg-canvas" aria-hidden="true">
                                        <method.icon className="text-primary" size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="mb-1 font-semibold text-default">{method.title}</h3>
                                        <p className="mb-2 text-xs text-muted">{method.description}</p>
                                        {method.href ? (
                                            <a
                                                href={method.href}
                                                {...(method.href.startsWith('http') ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                                className="text-sm font-medium break-all transition-colors text-primary hover:text-primary-emphasis"
                                                aria-label={`Open ${method.title} link`}
                                            >
                                                {method.value}
                                            </a>
                                        ) : (
                                            <p className="text-sm text-muted">{method.value}</p>
                                        )}
                                    </div>
                                </div>
                            </article>
                        ))}
                    </section>

                    {/* Social Links */}
                    <nav className="p-6 border rounded-lg bg-canvas-subtle border-default" aria-label="Social Media Links">
                        <h3 className="flex items-center gap-2 mb-6 text-xl font-bold text-default">
                            <Code className="text-primary" size={20} aria-hidden="true" />
                            Follow my journey
                        </h3>
                        <ul className="grid grid-cols-2 gap-3">
                            {Object.entries(personalInfo.socialLinks).map(([platform, url]) => {
                                const Icon = socialIcons[platform];
                                return (
                                    <li key={platform}>
                                        <a
                                            href={url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`Visit my ${platform} profile`}
                                            className="flex items-center gap-3 p-3 transition-all duration-300 transform border rounded-lg scale-98 bg-canvas hover:bg-primary-emphasis hover:text-white hover:scale-105 border-default group"
                                        >
                                            <Icon size={18} className="flex-shrink-0" aria-hidden="true" />
                                            <span className="text-sm font-medium capitalize truncate group-hover:text-white">
                                                {platform}
                                            </span>
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </aside>

                {/* Contact Form */}
                <section className="lg:col-span-3" aria-label="Contact Form Section">
                    <article className="p-8 border rounded-lg bg-canvas-subtle border-default">
                        <header className="flex items-center gap-3 mb-8">
                            <MessageCircle className="text-primary" size={28} aria-hidden="true" />
                            <div>
                                <h2 className="text-2xl font-bold text-default">Send me a message</h2>
                                <p className="text-sm text-muted">I'll get back to you as soon as possible</p>
                            </div>
                        </header>

                        <form onSubmit={handleSubmit} className="space-y-6" role="form" aria-label="Contact Form">
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="block text-sm font-semibold text-default">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        aria-required="true"
                                        aria-label="Enter your full name"
                                        className="w-full px-4 py-3 transition-all duration-200 border-2 rounded-lg bg-canvas border-default focus:outline-none focus:ring-2 focus:ring-primary-emphasis focus:border-primary-emphasis text-default placeholder-muted"
                                        placeholder="your name"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-sm font-semibold text-default">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        aria-required="true"
                                        aria-label="Enter your email address"
                                        className="w-full px-4 py-3 transition-all duration-200 border-2 rounded-lg bg-canvas border-default focus:outline-none focus:ring-2 focus:ring-primary-emphasis focus:border-primary-emphasis text-default placeholder-muted"
                                        placeholder="your.name@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className="block text-sm font-semibold text-default">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    aria-label="Enter the subject of your message"
                                    className="w-full px-4 py-3 transition-all duration-200 border-2 rounded-lg bg-canvas border-default focus:outline-none focus:ring-2 focus:ring-primary-emphasis focus:border-primary-emphasis text-default placeholder-muted"
                                    placeholder="What would you like to discuss?"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="block text-sm font-semibold text-default">
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    aria-required="true"
                                    aria-label="Enter your message"
                                    rows={6}
                                    className="w-full px-4 py-2 transition-all duration-200 border-2 rounded-lg resize-none bg-canvas border-default focus:outline-none focus:ring-2 focus:ring-primary-emphasis focus:border-primary-emphasis text-default placeholder-muted"
                                    placeholder="Tell me about your project, ask a question, or just say hello!"
                                />
                            </div>

                            <div className="flex items-center justify-center">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    aria-label="Submit contact form"
                                    className="flex items-center justify-center gap-2 px-12 py-4 font-semibold text-white transition-all duration-300 transform rounded-lg shadow-lg scale-98 bg-primary-emphasis hover:bg-primary-emphasis/90 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-primary-muted/20 hover:scale-105"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white rounded-full animate-spin border-t-transparent" aria-hidden="true"></div>
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send size={20} aria-hidden="true" />
                                            <span>Send Message</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </article>

                    {/* Additional Info */}
                    <footer className="p-6 mt-6 border rounded-lg bg-gradient-to-r from-canvas-subtle to-canvas-muted border-default" role="contentinfo" aria-label="Discussion Topics and Contact Options">
                        <h3 className="mb-3 font-semibold text-default">What can we discuss❓</h3>
                        <ul className="grid gap-3 text-sm sm:grid-cols-2">
                            <li className="flex items-center gap-2"><span className="text-primary">●</span><span className="text-muted">Full-stack development projects</span></li>
                            <li className="flex items-center gap-2"><span className="text-primary">●</span><span className="text-muted">AI/ML collaboration opportunities</span></li>
                            <li className="flex items-center gap-2"><span className="text-primary">●</span><span className="text-muted">Open source contributions</span></li>
                            <li className="flex items-center gap-2"><span className="text-primary">●</span><span className="text-muted">Tech mentorship & guidance</span></li>
                            <li className="flex items-center gap-2"><span className="text-primary">●</span><span className="text-muted">Freelance & internship opportunities</span></li>
                            <li className="flex items-center gap-2"><span className="text-primary">●</span><span className="text-muted">Just saying hello! 👋</span></li>
                        </ul>
                        <div className="flex items-center justify-center gap-8 mt-4">
                            <a href={`mailto:${personalInfo.email}`} aria-label="Send an email directly" className="flex items-center space-x-2">
                                <Mail size={20} className='text-primary' aria-hidden="true" />
                                <span>Email Me Directly</span>
                            </a>
                            <a
                                href={personalInfo.socialLinks.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Connect with me on LinkedIn"
                                className="flex items-center space-x-2"
                            >
                                <Linkedin size={20} className='text-primary' aria-hidden="true" />
                                <span>Connect on LinkedIn</span>
                            </a>
                        </div>
                    </footer>
                </section>
            </div>
        </main>
    );
};

export default Contact;
