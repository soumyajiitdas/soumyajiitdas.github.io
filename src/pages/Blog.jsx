import React, { useState, useEffect } from 'react';
import { ExternalLink, Calendar, Clock, BookOpen, Loader2 } from 'lucide-react';
import Giscus from '../components/Giscus';
import './Blog.css';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedBlog, setSelectedBlog] = useState(null);

    useEffect(() => {
        fetchMediumBlogs();
    }, []);

    const fetchMediumBlogs = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // Using rss2json API to fetch Medium RSS feed
            const response = await fetch(
                `https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@soumyajit_`
            );
            
            if (!response.ok) {
                throw new Error('Failed to fetch blogs');
            }

            const data = await response.json();
            
            if (data.status === 'ok') {
                setBlogs(data.items);
            } else {
                throw new Error('Invalid response from RSS feed');
            }
        } catch (err) {
            setError(err.message);
            console.error('Error fetching Medium blogs:', err);
        } finally {
            setLoading(false);
        }
    };

    const extractImageFromContent = (content) => {
        const imgMatch = content.match(/<img[^>]+src="([^">]+)"/);
        return imgMatch ? imgMatch[1] : null;
    };

    const stripHtml = (html) => {
        const tmp = document.createElement('DIV');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getReadingTime = (content) => {
        const text = stripHtml(content);
        const wordsPerMinute = 200;
        const words = text.split(/\s+/).length;
        const minutes = Math.ceil(words / wordsPerMinute);
        return `${minutes} min read`;
    };

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <Loader2 className="w-12 h-12 mb-4 animate-spin text-primary" />
                <p className="text-lg text-muted">Loading blogs from Medium...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <div className="p-6 text-center rounded-lg bg-canvas-subtle border border-default">
                    <p className="mb-4 text-lg font-medium text-default">Unable to load blogs</p>
                    <p className="mb-4 text-sm text-muted">{error}</p>
                    <button
                        onClick={fetchMediumBlogs}
                        className="px-4 py-2 text-sm font-medium text-white transition-colors rounded-lg bg-primary-emphasis hover:bg-primary-emphasis/90"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (selectedBlog) {
        return (
            <div className="max-w-4xl mx-auto mt-14 lg:mt-0">
                <button
                    onClick={() => setSelectedBlog(null)}
                    className="mb-6 text-sm font-medium transition-colors text-primary hover:text-primary-emphasis"
                >
                    ← Back to all blogs
                </button>

                <article className="p-4 lg:p-6 rounded-lg bg-canvas-subtle border border-default">
                    <h1 className="mb-3 text-2xl font-bold text-default lg:text-3xl">
                        {selectedBlog.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-3 pb-3 mb-4 text-xs border-b text-muted border-default">
                        <div className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            <span>{formatDate(selectedBlog.pubDate)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock size={14} />
                            <span>{getReadingTime(selectedBlog.content)}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span>By {selectedBlog.author}</span>
                        </div>
                    </div>

                    {selectedBlog.thumbnail && (
                        <img
                            src={selectedBlog.thumbnail}
                            alt={selectedBlog.title}
                            className="object-cover w-full mb-4 rounded-lg h-48"
                            style={{ maxHeight: '400px' }}
                        />
                    )}

                    {/* Blog Content */}
                    <div 
                        className="blog-content mb-6 prose prose-sm lg:prose-base max-w-none text-default
                            prose-headings:text-default prose-p:text-default prose-a:text-primary 
                            prose-strong:text-default prose-code:text-default prose-code:bg-canvas-muted
                            prose-pre:bg-canvas-muted prose-pre:text-default prose-pre:border prose-pre:border-default
                            prose-blockquote:text-muted prose-blockquote:border-primary
                            prose-li:text-default prose-img:rounded-lg
                            prose-table:border-default prose-th:bg-canvas-muted
                            dark:prose-invert"
                        dangerouslySetInnerHTML={{ __html: selectedBlog.content }}
                    />

                    {/* Read on Medium Link */}
                    <div className="flex items-center justify-center py-4 mb-6 border-t border-b border-default">
                        <a
                            href={selectedBlog.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-white transition-colors rounded-lg bg-primary-emphasis hover:bg-primary-emphasis/90"
                        >
                            <span>Read Original Article on Medium</span>
                            <ExternalLink size={14} />
                        </a>
                    </div>

                    {/* Comments Section */}
                    <div className="mb-6">
                        <h2 className="mb-3 text-xl font-bold text-default">Comments</h2>
                        <p className="mb-3 text-xs text-muted">
                            Share your thoughts and discuss this article with the community.
                        </p>
                        <Giscus blogTitle={selectedBlog.title} />
                    </div>
                </article>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto mt-14 lg:mt-0">
            <div className="mb-8 text-center lg:text-left">
                <h1 className="mb-4 text-4xl font-bold text-default">Personal <span className='text-primary'>Feed</span></h1>
                <p className="max-w-2xl text-muted">
                    My thoughts, learnings, notes and ideas about technology, development, lifestyle and more.
                </p>
            </div>

            {blogs.length === 0 ? (
                <div className="p-12 text-center rounded-lg bg-canvas-subtle border border-default">
                    <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted" />
                    <p className="text-lg text-default">No blogs found</p>
                    <p className="mt-2 text-sm text-muted">
                        Start writing on Medium to see your blogs here!
                    </p>
                </div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2">
                    {blogs.map((blog, index) => {
                        const thumbnail = blog.thumbnail || extractImageFromContent(blog.content);
                        const excerpt = stripHtml(blog.description || blog.content).substring(0, 150);

                        return (
                            <article
                                key={index}
                                className="flex flex-col overflow-hidden transition-all duration-300 rounded-lg bg-canvas-subtle border border-default hover:border-primary hover:shadow-lg cursor-pointer"
                                onClick={() => setSelectedBlog(blog)}
                            >
                                {thumbnail && (
                                    <div className="relative w-full overflow-hidden h-48 bg-canvas-muted">
                                        <img
                                            src={thumbnail}
                                            alt={blog.title}
                                            className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                                            loading="lazy"
                                        />
                                    </div>
                                )}

                                <div className="flex flex-col flex-1 p-5">
                                    <h2 className="mb-3 text-xl font-bold transition-colors text-default hover:text-primary line-clamp-2">
                                        {blog.title}
                                    </h2>

                                    <p className="mb-4 text-sm line-clamp-3 text-muted">
                                        {excerpt}...
                                    </p>

                                    <div className="flex flex-wrap items-center gap-3 mt-auto text-xs text-muted">
                                        <div className="flex items-center gap-1">
                                            <Calendar size={14} className='text-primary' />
                                            <span>{formatDate(blog.pubDate)}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Clock size={14} className='text-primary' />
                                            <span>{getReadingTime(blog.content)}</span>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2 mt-4">
                                        <button className="text-sm font-medium transition-colors text-primary hover:text-primary-emphasis">
                                            Read More →
                                        </button>
                                    </div>
                                </div>
                            </article>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Blog;