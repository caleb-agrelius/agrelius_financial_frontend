require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Knex = require('knex');
const knexConfig = require('../knexfile');
const jwt = require('jsonwebtoken');

const env = process.env.NODE_ENV || 'development';
const knex = Knex(knexConfig[env]);

const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'changeme';
const JWT_SECRET = process.env.JWT_SECRET || (process.env.NODE_ENV === 'development' ? 'dev-secret' : undefined);

if (!JWT_SECRET) {
  console.error('JWT_SECRET is not set. Authentication is disabled. Set JWT_SECRET in production.');
}

const app = express();
app.use(cors());
app.use(express.json());

// Public endpoints
app.get('/posts', async (req, res) => {
  try {
    const posts = await knex('posts').select('id', 'title', 'content').orderBy('created_at', 'desc');
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load posts' });
  }
});

app.get('/posts/:id', async (req, res) => {
  try {
    const post = await knex('posts').select('id', 'title', 'content').where('id', req.params.id).first();
    if (!post) return res.status(404).json({ error: 'Not found' });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to load post' });
  }
});

// Login route
app.post('/login', (req, res) => {
  if (!JWT_SECRET) return res.status(500).json({ error: 'Server authentication not configured' });
  const { username, password } = req.body || {};
  if (!username || !password) return res.status(400).json({ error: 'username and password required' });
  if (username === ADMIN_USER && password === ADMIN_PASS) {
    const token = jwt.sign({ user: username }, JWT_SECRET, { expiresIn: '12h' });
    return res.json({ token });
  }
  return res.status(401).json({ error: 'Invalid credentials' });
});

function authRequired(req, res, next) {
  if (!JWT_SECRET) return res.status(500).json({ error: 'Server authentication not configured' });
  const auth = req.headers.authorization || '';
  if (!auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' });
  const token = auth.slice(7);
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Protected endpoints
app.post('/posts', authRequired, async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ error: 'title and content required' });
    const inserted = await knex('posts').insert({ title, content }).returning(['id', 'title', 'content']);
    const post = Array.isArray(inserted) ? inserted[0] : inserted;
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

app.put('/posts/:id', authRequired, async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ error: 'title and content required' });
    const updated = await knex('posts').where('id', req.params.id).update({ title, content, updated_at: knex.fn.now() });
    if (!updated) return res.status(404).json({ error: 'Not found' });
    const post = await knex('posts').select('id', 'title', 'content').where('id', req.params.id).first();
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update post' });
  }
});

app.delete('/posts/:id', authRequired, async (req, res) => {
  try {
    const deleted = await knex('posts').where('id', req.params.id).del();
    if (!deleted) return res.status(404).json({ error: 'Not found' });
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));
