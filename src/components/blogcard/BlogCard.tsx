import React from 'react';
interface BlogCardProps {
    title: string;
    content: string;
}

function BlogTitle({title}: {title: string}) {
    return (
        <h1>{title}</h1>
    )
}
const BlogCard: React.FC<BlogCardProps> = ({ title, content }) => {
    return (
        <div>
            <BlogTitle title={title} />
            <p>{content}</p>
        </div>
    )
}
export default BlogCard;

