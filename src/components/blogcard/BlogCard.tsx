import React from 'react';
interface BlogCardProps {
    id?: string;
    title: string;
    content: string;
    onEdit?: () => void;
    onDelete?: () => void;
}

function BlogTitle({title}: {title: string}) {
    return (
        <h3 style={{ margin: '4px 0' }}>{title}</h3>
    )
}
const BlogCard: React.FC<BlogCardProps> = ({ id, title, content, onEdit, onDelete }) => {
    return (
        <div>
            <BlogTitle title={title} />
            <p>{content}</p>
            <div style={{ marginTop: 8 }}>
                {onEdit && <button onClick={onEdit} style={{ marginRight: 8 }}>Edit</button>}
                {onDelete && <button onClick={() => { if (confirm('Delete this post?')) onDelete(); }}>Delete</button>}
            </div>
        </div>
    )
}
export default BlogCard;

