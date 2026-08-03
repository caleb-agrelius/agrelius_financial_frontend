import React from 'react';

type BlogPost = { id?: string; title: string; content: string };

const PostEditor: React.FC<{
  initial: BlogPost;
  onSave: (post: BlogPost) => void;
  onCancel?: () => void;
}> = ({ initial, onSave, onCancel }) => {
  const [title, setTitle] = React.useState(initial.title || '');
  const [content, setContent] = React.useState(initial.content || '');

  React.useEffect(() => {
    setTitle(initial.title || '');
    setContent(initial.content || '');
  }, [initial]);

  return (
    <div style={{ border: '1px solid #ccc', padding: 12, marginBottom: 12 }}>
      <div style={{ marginBottom: 8 }}>
        <label style={{ display: 'block', fontWeight: 600 }}>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: '100%' }} />
      </div>
      <div style={{ marginBottom: 8 }}>
        <label style={{ display: 'block', fontWeight: 600 }}>Content</label>
        <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={8} style={{ width: '100%' }} />
      </div>
      <div>
        <button onClick={() => onSave({ id: initial.id, title: title.trim(), content: content.trim() })} style={{ marginRight: 8 }}>
          Save
        </button>
        {onCancel && <button onClick={onCancel}>Cancel</button>}
      </div>
    </div>
  );
};

export default PostEditor;
