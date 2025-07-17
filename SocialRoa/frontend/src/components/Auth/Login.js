import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { loginUser } from '../../utils/api';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { login } = useAuth();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await loginUser(form.email, form.password);
      login(res.user, res.token);
      history.push('/profile');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800">
      <form
        onSubmit={handleSubmit}
        className="card w-full max-w-md"
        autoComplete="off"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700 dark:text-indigo-300">Iniciar sesión</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-4">
          <label className="block mb-1 text-gray-700 dark:text-gray-200">Correo</label>
          <input
            type="text"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="form-input"
            autoFocus
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 text-gray-700 dark:text-gray-200">Contraseña</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="form-input"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn-indigo w-full"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
        <div className="mt-4 text-center">
          <Link to="/reset-password" className="text-indigo-500 hover:underline text-sm">¿Olvidaste tu contraseña?</Link>
        </div>
        <div className="mt-6 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            Don't have an account?{' '}
            <Link to="/register" className="text-indigo-500 hover:underline font-semibold">Register</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;