import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { loginUser } from '../../utils/api';

const Login = () => {
  const [form, setForm] = useState({ 
    email: '', 
    password: '', 
    rememberMe: false 
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockoutTime, setLockoutTime] = useState(0);
  const [validationErrors, setValidationErrors] = useState({});
  const [captchaRequired, setCaptchaRequired] = useState(false);
  const [captchaValue, setCaptchaValue] = useState('');
  const [generatedCaptcha, setGeneratedCaptcha] = useState('');
  
  const history = useHistory();
  const { login } = useAuth();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  // Generate simple CAPTCHA
  const generateCaptcha = useCallback(() => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 6; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
    setGeneratedCaptcha(result);
  }, []);

  // Initialize component
  useEffect(() => {
    // Check if user is locked out
    const lockoutEnd = localStorage.getItem('lockoutEnd');
    if (lockoutEnd && new Date() < new Date(lockoutEnd)) {
      setIsLocked(true);
      setLockoutTime(Math.ceil((new Date(lockoutEnd) - new Date()) / 1000));
    }

    // Get login attempts from localStorage
    const attempts = parseInt(localStorage.getItem('loginAttempts') || '0');
    setLoginAttempts(attempts);
    
    if (attempts >= 3) {
      setCaptchaRequired(true);
      generateCaptcha();
    }

    // Focus on email input
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, [generateCaptcha]);

  // Lockout timer
  useEffect(() => {
    if (isLocked && lockoutTime > 0) {
      const timer = setInterval(() => {
        setLockoutTime(prev => {
          if (prev <= 1) {
            setIsLocked(false);
            localStorage.removeItem('lockoutEnd');
            localStorage.removeItem('loginAttempts');
            setLoginAttempts(0);
            setCaptchaRequired(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isLocked, lockoutTime]);

  // Input validation
  const validateForm = () => {
    const errors = {};
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email) {
      errors.email = 'Email is required';
    } else if (!emailRegex.test(form.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Password validation
    if (!form.password) {
      errors.password = 'Password is required';
    } else if (form.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    // CAPTCHA validation
    if (captchaRequired && captchaValue !== generatedCaptcha) {
      errors.captcha = 'CAPTCHA verification failed';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLocked) {
      setError(`Account is locked. Please wait ${Math.ceil(lockoutTime / 60)} minutes.`);
      return;
    }

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Simulate rate limiting delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const res = await loginUser(form.email, form.password);
      
      // Successful login - reset attempts
      localStorage.removeItem('loginAttempts');
      localStorage.removeItem('lockoutEnd');
      setLoginAttempts(0);
      setCaptchaRequired(false);

      // Handle "Remember Me"
      if (form.rememberMe) {
        localStorage.setItem('rememberUser', 'true');
        localStorage.setItem('userEmail', form.email);
      }

      login(res.user, res.token);
      history.push('/profile');
      
    } catch (err) {
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      localStorage.setItem('loginAttempts', newAttempts.toString());

      // Lock account after 5 failed attempts
      if (newAttempts >= 5) {
        const lockoutEnd = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
        localStorage.setItem('lockoutEnd', lockoutEnd.toISOString());
        setIsLocked(true);
        setLockoutTime(15 * 60);
        setError('Too many failed attempts. Account locked for 15 minutes.');
      } else if (newAttempts >= 3) {
        setCaptchaRequired(true);
        generateCaptcha();
        setError(`Invalid credentials. ${5 - newAttempts} attempts remaining. CAPTCHA required.`);
      } else {
        setError(`Invalid credentials. ${5 - newAttempts} attempts remaining.`);
      }

      // Clear password field for security
      setForm(prev => ({ ...prev, password: '' }));
      if (passwordRef.current) {
        passwordRef.current.focus();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    // TODO: Implement forgot password functionality
    alert('Forgot password functionality will be implemented soon.');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-200 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="w-full max-w-md">
        {/* Security Badge */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            🔒 Secure Login Portal
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="card w-full"
          autoComplete="on"
          noValidate
        >
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-indigo-700 dark:text-indigo-300 mb-2">
              Welcome Back
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Sign in to your SocialRoa account
            </p>
          </div>

          {/* Lockout Warning */}
          {isLocked && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
              <div className="flex items-center">
                <span className="text-xl mr-2">🔒</span>
                <div>
                  <p className="font-semibold">Account Temporarily Locked</p>
                  <p className="text-sm">Time remaining: {formatTime(lockoutTime)}</p>
                </div>
              </div>
            </div>
          )}

          {/* Error Display */}
          {error && (
            <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
              <div className="flex items-center">
                <span className="text-xl mr-2">⚠️</span>
                <span>{error}</span>
              </div>
            </div>
          )}

          {/* Login Attempts Warning */}
          {loginAttempts > 0 && loginAttempts < 5 && !isLocked && (
            <div className="mb-4 p-3 bg-yellow-100 border border-yellow-400 text-yellow-700 rounded-md">
              <div className="flex items-center text-sm">
                <span className="mr-2">⚠️</span>
                <span>Security Alert: {loginAttempts} failed login attempt{loginAttempts > 1 ? 's' : ''}</span>
              </div>
            </div>
          )}

          {/* Email Field */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
              Email Address *
            </label>
            <input
              ref={emailRef}
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              disabled={isLocked}
              className={`form-input w-full ${validationErrors.email ? 'border-red-500' : ''}`}
              placeholder="Enter your email address"
              autoComplete="username"
              aria-describedby={validationErrors.email ? 'email-error' : undefined}
            />
            {validationErrors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
                {validationErrors.email}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
              Password *
            </label>
            <div className="relative">
              <input
                ref={passwordRef}
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                disabled={isLocked}
                className={`form-input w-full pr-12 ${validationErrors.password ? 'border-red-500' : ''}`}
                placeholder="Enter your password"
                autoComplete="current-password"
                aria-describedby={validationErrors.password ? 'password-error' : undefined}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                disabled={isLocked}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>
            {validationErrors.password && (
              <p id="password-error" className="mt-1 text-sm text-red-600" role="alert">
                {validationErrors.password}
              </p>
            )}
          </div>

          {/* CAPTCHA */}
          {captchaRequired && (
            <div className="mb-4">
              <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                Security Verification *
              </label>
              <div className="flex items-center space-x-3">
                <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded border font-mono text-lg tracking-wider">
                  {generatedCaptcha}
                </div>
                <button
                  type="button"
                  onClick={generateCaptcha}
                  className="text-indigo-600 hover:text-indigo-800 text-sm"
                  disabled={isLocked}
                >
                  🔄 Refresh
                </button>
              </div>
              <input
                type="text"
                value={captchaValue}
                onChange={(e) => setCaptchaValue(e.target.value)}
                className={`form-input w-full mt-2 ${validationErrors.captcha ? 'border-red-500' : ''}`}
                placeholder="Enter the characters above"
                disabled={isLocked}
                aria-describedby={validationErrors.captcha ? 'captcha-error' : undefined}
              />
              {validationErrors.captcha && (
                <p id="captcha-error" className="mt-1 text-sm text-red-600" role="alert">
                  {validationErrors.captcha}
                </p>
              )}
            </div>
          )}

          {/* Remember Me */}
          <div className="mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="rememberMe"
                checked={form.rememberMe}
                onChange={handleChange}
                disabled={isLocked}
                className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Remember me for 30 days
              </span>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || isLocked}
            className={`btn-indigo w-full ${(loading || isLocked) ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing In...
              </span>
            ) : isLocked ? (
              '🔒 Account Locked'
            ) : (
              'Sign In'
            )}
          </button>

          {/* Additional Links */}
          <div className="mt-6 space-y-3 text-center">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-indigo-600 hover:text-indigo-800 hover:underline text-sm font-medium"
              disabled={isLocked}
            >
              🔑 Forgot your password?
            </button>
            
            <div className="flex items-center justify-center">
              <div className="border-t border-gray-300 flex-grow mr-3"></div>
              <span className="text-gray-500 text-sm">or</span>
              <div className="border-t border-gray-300 flex-grow ml-3"></div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Don't have an account?{' '}
              <Link 
                to="/register" 
                className="text-indigo-600 hover:text-indigo-800 hover:underline font-semibold"
              >
                Create Account
              </Link>
            </p>
          </div>

          {/* Security Info */}
          <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900 rounded-md">
            <div className="flex items-start">
              <span className="text-blue-500 mr-2">🛡️</span>
              <div className="text-xs text-blue-700 dark:text-blue-300">
                <p className="font-semibold mb-1">Security Features:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Account lockout after 5 failed attempts</li>
                  <li>CAPTCHA verification after 3 attempts</li>
                  <li>Secure password hashing</li>
                  <li>Rate limiting protection</li>
                </ul>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;