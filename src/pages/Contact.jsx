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
    Globe,
    MessageCircle,
    Clock,
    CheckCircle,
    Heart,
    Code,
    Coffee
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

        // Frontend validation
        if (!formData.name || !formData.email || !formData.message) {
            toast({
                title: "Validation Error",
                description: "Please fill in all required fields.",
                variant: "destructive"
            });
            setIsSubmitting(false);
            return;
        }

        // Email validation
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

        // Simulate form submission
        setTimeout(() => {
            // Store in localStorage for demo purposes
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

            // Reset form
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
            icon: Globe,
            title: "Website",
            value: "Portfolio Website",
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
        <div className="space-y-12">
            {/* Enhanced Page Header */}
            <section className="text-center lg:text-left space-y-6">
                <div className="space-y-4">
                    <h1 className="text-4xl lg:text-5xl font-bold text-github-fg-default">
                        Let's <span className="text-github-accent-fg">Connect</span>
                    </h1>
                    <p className="text-xl text-github-fg-muted max-w-3xl">
                        I'm always excited to discuss new opportunities, collaborate on interesting projects, or just have a conversation about technology and innovation.
                    </p>
                </div>

                {/* Response Info Cards */}
                <div className="grid sm:grid-cols-3 gap-4 mt-8">
                    {responseInfo.map((info, index) => (
                        <div
                            key={index}
                            className="flex items-center gap-3 p-4 bg-github-canvas-subtle rounded-lg border border-github-border hover:border-github-accent-muted transition-all duration-300"
                        >
                            <info.icon className="text-github-accent-fg flex-shrink-0" size={20} />
                            <div className="text-left">
                                <p className="font-medium text-github-fg-default text-sm">{info.title}</p>
                                <p className="text-xs text-github-fg-muted">{info.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <div className="grid lg:grid-cols-5 gap-8">
                {/* Enhanced Contact Information Sidebar */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Contact Methods */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-github-fg-default mb-6">Get in touch</h2>
                        {contactMethods.map((method, index) => (
                            <div
                                key={index}
                                className={`bg-gradient-to-br ${method.color} rounded-lg p-6 border border-github-border hover:border-github-accent-muted transition-all duration-300 transform hover:scale-[1.02]`}
                            >
                                <div className="flex items-start gap-4">
                                    <div className="p-2 bg-github-canvas-default rounded-lg">
                                        <method.icon className="text-github-accent-fg" size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-github-fg-default mb-1">
                                            {method.title}
                                        </h3>
                                        <p className="text-xs text-github-fg-muted mb-2">
                                            {method.description}
                                        </p>
                                        {method.href ? (
                                            <a
                                                href={method.href}
                                                {...(method.href.startsWith('http') ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                                                className="text-github-accent-fg hover:text-github-accent-emphasis transition-colors text-sm font-medium break-all"
                                            >
                                                {method.value}
                                            </a>
                                        ) : (
                                            <p className="text-github-fg-muted text-sm">{method.value}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Enhanced Social Links */}
                    <div className="bg-github-canvas-subtle rounded-lg p-6 border border-github-border">
                        <h3 className="text-xl font-bold text-github-fg-default mb-6 flex items-center gap-2">
                            <Code className="text-github-accent-fg" size={20} />
                            Follow my journey
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                            {Object.entries(personalInfo.socialLinks).map(([platform, url]) => {
                                const Icon = socialIcons[platform];
                                return (
                                    <a
                                        key={platform}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 p-3 rounded-lg bg-github-canvas-default hover:bg-github-accent-emphasis hover:text-white transition-all duration-300 transform hover:scale-105 border border-github-border group"
                                    >
                                        <Icon size={18} className="flex-shrink-0" />
                                        <span className="text-sm font-medium capitalize group-hover:text-white">
                                            {platform}
                                        </span>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Enhanced Contact Form */}
                <div className="lg:col-span-3">
                    <div className="bg-github-canvas-subtle rounded-lg p-8 border border-github-border">
                        <div className="flex items-center gap-3 mb-8">
                            <MessageCircle className="text-github-accent-fg" size={28} />
                            <div>
                                <h2 className="text-2xl font-bold text-github-fg-default">Send me a message</h2>
                                <p className="text-github-fg-muted text-sm">I'll get back to you as soon as possible</p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="block text-sm font-semibold text-github-fg-default">
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-github-canvas-default border-2 border-github-border rounded-lg focus:outline-none focus:ring-2 focus:ring-github-accent-emphasis focus:border-github-accent-emphasis text-github-fg-default placeholder-github-fg-muted transition-all duration-200"
                                        placeholder="your name"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="block text-sm font-semibold text-github-fg-default">
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-github-canvas-default border-2 border-github-border rounded-lg focus:outline-none focus:ring-2 focus:ring-github-accent-emphasis focus:border-github-accent-emphasis text-github-fg-default placeholder-github-fg-muted transition-all duration-200"
                                        placeholder="your.name@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className="block text-sm font-semibold text-github-fg-default">
                                    Subject
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-github-canvas-default border-2 border-github-border rounded-lg focus:outline-none focus:ring-2 focus:ring-github-accent-emphasis focus:border-github-accent-emphasis text-github-fg-default placeholder-github-fg-muted transition-all duration-200"
                                    placeholder="What would you like to discuss?"
                                />
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="block text-sm font-semibold text-github-fg-default">
                                    Message *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    required
                                    rows={6}
                                    className="w-full px-4 py-3 bg-github-canvas-default border-2 border-github-border rounded-lg focus:outline-none focus:ring-2 focus:ring-github-accent-emphasis focus:border-github-accent-emphasis text-github-fg-default placeholder-github-fg-muted resize-none transition-all duration-200"
                                    placeholder="Tell me about your project, ask a question, or just say hello! I'm always excited to hear from fellow developers and potential collaborators."
                                />
                            </div>

                            <div className="flex items-center justify-center">
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="flex items-center justify-center gap-2 px-12 py-4 bg-github-accent-emphasis text-white rounded-lg hover:bg-github-accent-emphasis/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg hover:shadow-github-accent-muted/20 transform hover:scale-105"
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                                            <span>Sending...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Send size={20} />
                                            <span>Send Message</span>
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Additional Info */}
                    <div className="mt-6 p-6 bg-gradient-to-r from-github-canvas-subtle to-github-canvas-inset rounded-lg border border-github-border">
                        <h3 className="font-semibold text-github-fg-default mb-3">What can we discuss?</h3>
                        <div className="grid sm:grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center gap-2">
                                <span className="text-github-accent-fg">●</span>
                                <span className="text-github-fg-muted">Full-stack development projects</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-github-accent-fg">●</span>
                                <span className="text-github-fg-muted">AI/ML collaboration opportunities</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-github-accent-fg">●</span>
                                <span className="text-github-fg-muted">Open source contributions</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-github-accent-fg">●</span>
                                <span className="text-github-fg-muted">Tech mentorship & guidance</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-github-accent-fg">●</span>
                                <span className="text-github-fg-muted">Freelance & internship opportunities</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-github-accent-fg">●</span>
                                <span className="text-github-fg-muted">Just saying hello! 👋</span>
                            </div>
                        </div>
                        <div className="flex items-center justify-center gap-8 mt-4">
                            <a href={`mailto:${personalInfo.email}`} className="flex items-center space-x-2">
                                <Mail size={20} className='text-github-accent-fg' />
                                <span>Email Me Directly</span>
                            </a>
                            <a
                                href={personalInfo.socialLinks.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center space-x-2"
                            >
                                <Linkedin size={20} className='text-github-accent-fg' />
                                <span>Connect on LinkedIn</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;