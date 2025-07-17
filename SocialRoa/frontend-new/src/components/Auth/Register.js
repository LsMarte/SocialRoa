import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import { registerUser } from '../../utils/api';

const Register = () => {
    const [formData, handleChange, resetForm] = useForm({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [errors, setErrors] = useState({});
    const [apiError, setApiError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const validateForm = () => {
        const newErrors = {};
        if (!formData.username) {
            newErrors.username = 'Username is required.';
        } else if (formData.username.length < 3) {
            newErrors.username = 'Username must be at least 3 characters long.';
        }

        if (!formData.email) {
            newErrors.email = 'Email is required.';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid.';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required.';
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long.';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            setApiError('');
            setSuccess('');
            return;
        }

        setLoading(true);
        setErrors({});
        setApiError('');
        setSuccess('');

        try {
            // Do not send confirmPassword to the backend
            const { confirmPassword, ...userData } = formData;
            await registerUser(userData.username, userData.email, userData.password);
            setSuccess('Registration successful! Redirecting to login...');
            resetForm();
            setTimeout(() => {
                history.push('/login');
            }, 2000);
        } catch (err) {
            setApiError(err.response?.data?.message || 'Registration failed. Please try again.');
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
                noValidate
            >
                <h2 className="text-2xl font-bold mb-6 text-center text-indigo-700 dark:text-indigo-300">
                    Register
                </h2>
                {apiError && <div className="alert alert-danger">{apiError}</div>}
                {success && <div className="alert alert-success">{success}</div>}
                <div className="mb-4">
                    <label className="block mb-1 text-gray-700 dark:text-gray-200" htmlFor="username">
                        Username
                    </label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        className="form-input"
                    />
                    {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username}</p>}
                </div>
                <div className="mb-4">
                    <label className="block mb-1 text-gray-700 dark:text-gray-200" htmlFor="email">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>
                <div className="mb-6">
                    <label className="block mb-1 text-gray-700 dark:text-gray-200" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="form-input"
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>
                <div className="mb-6">
                    <label className="block mb-1 text-gray-700 dark:text-gray-200" htmlFor="confirmPassword">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="form-input"
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                </div>
                <button
                    type="submit"
                    className="btn-indigo w-full"
                    disabled={loading}
                >
                    {loading ? 'Registering...' : 'Register'}
                </button>
                <div className="mt-6 text-center">
                    <p className="text-gray-600 dark:text-gray-300">
                        Already have an account?{' '}
                        <Link to="/login" className="text-indigo-500 hover:underline font-semibold">Login</Link>
                    </p>
                </div>
            </form>
        </div>
    );
};

export default Register;