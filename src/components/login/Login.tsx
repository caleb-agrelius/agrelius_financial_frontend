import React from 'react';

const Login: React.FC<{ onLogin: (username: string, password: string) => Promise<void>; onCancel?: () => void }> = ({ onLogin, onCancel }) => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const submit = async () => {
    setError(null);
    setLoading(true);
    try {
      await onLogin(username.trim(), password);
    } catch (err: any) {
      setError(err?.message || String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: 12, maxWidth: 420 }}>
      <h3>Login</h3>
      <div style={{ marginBottom: 8 }}>
        <label style={{ display: 'block', fontWeight: 600 }}>Username</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} style={{ width: '100%' }} />
      </div>
      <div style={{ marginBottom: 8 }}>
        <label style={{ display: 'block', fontWeight: 600 }}>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{ width: '100%' }} />
      </div>
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      <div>
        <button onClick={submit} disabled={loading} style={{ marginRight: 8 }}>{loading ? 'Signing in...' : 'Sign in'}</button>
        {onCancel && <button onClick={onCancel}>Cancel</button>}
      </div>
    </div>
  );
};

export default Login;
