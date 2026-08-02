const API_BASE = process.env.REACT_APP_API_BASE || '';

let API_TOKEN: string | null = null;
export function setAuthToken(token: string | null) {
  API_TOKEN = token;
}

type BlogPost = { id: string; title: string; content: string };

async function handleRes(res: Response) {
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || `Request failed with status ${res.status}`);
  }
  return res.status === 204 ? null : res.json();
}

function buildHeaders(contentType = true) {
  const headers: Record<string, string> = {};
  if (contentType) headers['Content-Type'] = 'application/json';
  if (API_TOKEN) headers['Authorization'] = `Bearer ${API_TOKEN}`;
  return headers;
}

export async function login(username: string, password: string): Promise<string> {
  const res = await fetch(`${API_BASE}/login`, {
    method: 'POST',
    headers: buildHeaders(),
    body: JSON.stringify({ username, password }),
  });
  const data = await handleRes(res) as { token: string };
  return data.token;
}

export async function listPosts(): Promise<BlogPost[]> {
  const res = await fetch(`${API_BASE}/posts`);
  return handleRes(res) as Promise<BlogPost[]>;
}

export async function getPost(id: string): Promise<BlogPost> {
  const res = await fetch(`${API_BASE}/posts/${id}`);
  return handleRes(res) as Promise<BlogPost>;
}

export async function createPost(post: { title: string; content: string }): Promise<BlogPost> {
  const res = await fetch(`${API_BASE}/posts`, {
    method: 'POST',
    headers: buildHeaders(true),
    body: JSON.stringify(post),
  });
  return handleRes(res) as Promise<BlogPost>;
}

export async function updatePost(id: string, post: { title: string; content: string }): Promise<BlogPost> {
  const res = await fetch(`${API_BASE}/posts/${id}`, {
    method: 'PUT',
    headers: buildHeaders(true),
    body: JSON.stringify(post),
  });
  return handleRes(res) as Promise<BlogPost>;
}

export async function deletePost(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/posts/${id}`, {
    method: 'DELETE',
    headers: buildHeaders(false),
  });
  await handleRes(res);
}

export default { setAuthToken, login, listPosts, getPost, createPost, updatePost, deletePost };
