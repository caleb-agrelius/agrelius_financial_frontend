import React from 'react';

import BlogCard from '../components/blogcard/BlogCard';


const Blog: React.FC<{ blogs: { title: string; content: string }[] }> = ({ blogs }) => {
    return (
        <div>Blog
            {blogs.map((blog, index) => (
                <BlogCard key={index} title={blog.title} content={blog.content} />
            ))}
        </div>
    )
}
export default Blog;