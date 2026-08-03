import React from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Title from './components/title/Title';

import Home from './pages/Home';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Login from './components/login/Login';
import * as postsApi from './api/posts';

type BlogPost = { id: string; title: string; content: string };

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  return String(err);
}

function App() {
  const [blogs, setBlogs] = React.useState<BlogPost[]>([]);
  const [currentPage, setCurrentPage] = React.useState('home');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const [token, setToken] = React.useState<string | null>(() => localStorage.getItem('agrelius_token'));
  const isAuthenticated = Boolean(token);

  React.useEffect(() => {
    postsApi.setAuthToken(token);
  }, [token]);

  React.useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await postsApi.listPosts();
        if (mounted) setBlogs(data || []);
      } catch (err) {
        console.error('Failed to load posts', err);
        if (mounted) setError(getErrorMessage(err));
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => { mounted = false };
  }, []);

  const handleLogin = async (username: string, password: string) => {
    const t = await postsApi.login(username, password);
    setToken(t);
    localStorage.setItem('agrelius_token', t);
    setCurrentPage('blog');
  };

  const handleLogout = () => {
    setToken(null);
    postsApi.setAuthToken(null);
    localStorage.removeItem('agrelius_token');
  };

  const addBlog = async (post: Omit<BlogPost, 'id'> | BlogPost) => {
    setError(null);
    try {
      const created = await postsApi.createPost({ title: post.title, content: post.content });
      setBlogs((prev) => [created, ...prev]);
    } catch (err) {
      console.error('Create failed', err);
      const msg = getErrorMessage(err);
      setError(msg);
      alert('Failed to create post: ' + msg);
    }
  };

  const updateBlog = async (updated: BlogPost) => {
    setError(null);
    try {
      const saved = await postsApi.updatePost(updated.id, { title: updated.title, content: updated.content });
      setBlogs((prev) => prev.map((b) => (b.id === saved.id ? saved : b)));
    } catch (err) {
      console.error('Update failed', err);
      const msg = getErrorMessage(err);
      setError(msg);
      alert('Failed to update post: ' + msg);
    }
  };

  const deleteBlog = async (id: string) => {
    setError(null);
    try {
      await postsApi.deletePost(id);
      setBlogs((prev) => prev.filter((b) => b.id !== id));
    } catch (err) {
      console.error('Delete failed', err);
      const msg = getErrorMessage(err);
      setError(msg);
      alert('Failed to delete post: ' + msg);
    }
  };

  return (
    <div className="App">
      <div className="app-header">
        <Title />
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Navbar setCurrentPage={setCurrentPage} />
          {isAuthenticated ? (
            <>
              <span style={{ fontSize: 12 }}>Signed in</span>
              <button onClick={handleLogout}>Sign out</button>
            </>
          ) : (
            <button onClick={() => setCurrentPage('login')}>Sign in</button>
          )}
        </div>
      </div>
      {error && <div style={{ color: 'red', padding: 8 }}>{error}</div>}
      <div>
        {currentPage === 'home' && <Home />}
        {currentPage === 'contact' && <Contact />}
        {currentPage === 'login' && (
          <div style={{ padding: 16 }}>
            <React.Suspense fallback={<div>Loading...</div>}>
              {/* Lazy render login to keep bundle small */}
              <Login onLogin={handleLogin} onCancel={() => setCurrentPage('home')} />
            </React.Suspense>
          </div>
        )}
        {currentPage === 'blog' && (
          loading ? (
            <div style={{ padding: 16 }}>Loading posts...</div>
          ) : (
            <Blog
              blogs={blogs}
              onAdd={(p) => addBlog(p)}
              onUpdate={(p) => updateBlog(p)}
              onDelete={(id) => deleteBlog(id)}
              isAuthenticated={isAuthenticated}
              onRequireLogin={() => setCurrentPage('login')}
            />
          )
        )}
      </div>
    </div>
  );
}

export default App;
