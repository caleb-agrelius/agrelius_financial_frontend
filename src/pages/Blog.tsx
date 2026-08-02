import React from 'react';

import BlogCard from '../components/blogcard/BlogCard';
import PostEditor from '../components/posteditor/PostEditor';

type BlogPost = { id: string; title: string; content: string };

const Blog: React.FC<{
  blogs: BlogPost[];
  onAdd: (post: Omit<BlogPost, 'id'> | BlogPost) => void;
  onUpdate: (post: BlogPost) => void;
  onDelete: (id: string) => void;
  isAuthenticated?: boolean;
  onRequireLogin?: () => void;
}> = ({ blogs, onAdd, onUpdate, onDelete, isAuthenticated, onRequireLogin }) => {
  const [editing, setEditing] = React.useState<BlogPost | null>(null);

  return (
    <div>
      <h2>Blog</h2>
      <div style={{ marginBottom: 12 }}>
        {isAuthenticated ? (
          <button onClick={() => setEditing({ id: '', title: '', content: '' })}>New Post</button>
        ) : (
          <button onClick={() => onRequireLogin ? onRequireLogin() : alert('Please login to add posts')}>Login to add post</button>
        )}
      </div>

      {editing && (
        <PostEditor
          initial={editing}
          onSave={(post) => {
            if (!post.id) {
              onAdd(post);
            } else {
              onUpdate(post as BlogPost);
            }
            setEditing(null);
          }}
          onCancel={() => setEditing(null)}
        />
      )}

      <div>
        {blogs.map((blog) => (
          <div key={blog.id} style={{ borderBottom: '1px solid #ddd', padding: '8px 0' }}>
            <BlogCard
              id={blog.id}
              title={blog.title}
              content={blog.content}
                onEdit={isAuthenticated ? () => setEditing(blog) : undefined}
                onDelete={isAuthenticated ? () => onDelete(blog.id) : undefined}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
