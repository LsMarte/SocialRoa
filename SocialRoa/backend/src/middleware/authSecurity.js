// Security middleware and utilities for SocialRoa authentication
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const validator = require('validator');

// Rate limiting for login attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: {
    error: 'Too many login attempts, please try again later.',
    retryAfter: Math.round(15 * 60 * 1000 / 1000),
  },
  standardHeaders: true,
  legacyHeaders: false,
  // Store in memory (use Redis in production)
  store: new rateLimit.MemoryStore(),
});

// Account lockout tracking (use Redis in production)
const accountLockouts = new Map();

// Security configuration
const securityConfig = {
  JWT_SECRET: process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production',
  JWT_EXPIRES_IN: '7d',
  BCRYPT_ROUNDS: 12,
  MAX_LOGIN_ATTEMPTS: 5,
  LOCKOUT_TIME: 15 * 60 * 1000, // 15 minutes
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
};

// Input validation middleware
const validateLoginInput = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  // Email validation
  if (!email) {
    errors.push('Email is required');
  } else if (!validator.isEmail(email)) {
    errors.push('Please provide a valid email address');
  } else if (email.length > 255) {
    errors.push('Email is too long');
  }

  // Password validation
  if (!password) {
    errors.push('Password is required');
  } else if (password.length < 6) {
    errors.push('Password must be at least 6 characters long');
  } else if (password.length > 128) {
    errors.push('Password is too long');
  }

  // Sanitize input
  req.body.email = validator.normalizeEmail(email || '');
  req.body.password = validator.escape(password || '');

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  next();
};

// Check account lockout
const checkAccountLockout = (req, res, next) => {
  const { email } = req.body;
  const lockout = accountLockouts.get(email);

  if (lockout && lockout.lockedUntil > Date.now()) {
    const remainingTime = Math.ceil((lockout.lockedUntil - Date.now()) / 1000);
    return res.status(423).json({
      success: false,
      message: 'Account temporarily locked due to too many failed login attempts',
      lockedUntil: lockout.lockedUntil,
      remainingTime,
      retryAfter: remainingTime
    });
  }

  // Clear expired lockout
  if (lockout && lockout.lockedUntil <= Date.now()) {
    accountLockouts.delete(email);
  }

  next();
};

// Track failed login attempts
const trackFailedAttempt = (email) => {
  const now = Date.now();
  const lockout = accountLockouts.get(email) || { attempts: 0, firstAttempt: now };

  // Reset attempts if it's been more than the lockout window
  if (now - lockout.firstAttempt > securityConfig.LOCKOUT_TIME) {
    lockout.attempts = 0;
    lockout.firstAttempt = now;
  }

  lockout.attempts += 1;

  if (lockout.attempts >= securityConfig.MAX_LOGIN_ATTEMPTS) {
    lockout.lockedUntil = now + securityConfig.LOCKOUT_TIME;
  }

  accountLockouts.set(email, lockout);
  return lockout;
};

// Password hashing utility
const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(securityConfig.BCRYPT_ROUNDS);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw new Error('Password hashing failed');
  }
};

// Password verification utility
const verifyPassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw new Error('Password verification failed');
  }
};

// JWT token generation
const generateToken = (payload) => {
  return jwt.sign(payload, securityConfig.JWT_SECRET, {
    expiresIn: securityConfig.JWT_EXPIRES_IN,
    issuer: 'SocialRoa',
    audience: 'SocialRoa-users'
  });
};

// JWT token verification middleware
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Access token is required'
    });
  }

  try {
    const decoded = jwt.verify(token, securityConfig.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    let message = 'Invalid token';
    if (error.name === 'TokenExpiredError') {
      message = 'Token has expired';
    } else if (error.name === 'JsonWebTokenError') {
      message = 'Malformed token';
    }

    return res.status(403).json({
      success: false,
      message
    });
  }
};

// Security headers middleware
const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
});

// Login route handler
const loginHandler = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;

    // Find user in database (replace with your database logic)
    const user = await User.findOne({ email });
    
    if (!user) {
      // Don't reveal that the user doesn't exist
      trackFailedAttempt(email);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password);
    
    if (!isValidPassword) {
      const lockout = trackFailedAttempt(email);
      
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
        attemptsRemaining: securityConfig.MAX_LOGIN_ATTEMPTS - lockout.attempts,
        lockoutWarning: lockout.attempts >= 3
      });
    }

    // Clear failed attempts on successful login
    accountLockouts.delete(email);

    // Update last login
    await User.findByIdAndUpdate(user._id, {
      lastLogin: new Date(),
      $inc: { loginCount: 1 }
    });

    // Generate token
    const tokenPayload = {
      userId: user._id,
      email: user.email,
      role: user.role || 'user'
    };

    const token = generateToken(tokenPayload);

    // Set secure cookie if remember me is enabled
    if (rememberMe) {
      res.cookie('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days
      });
    }

    // Return success response
    res.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        role: user.role,
        lastLogin: user.lastLogin
      },
      token,
      expiresIn: securityConfig.JWT_EXPIRES_IN
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Logout handler
const logoutHandler = (req, res) => {
  // Clear auth cookie
  res.clearCookie('authToken');
  
  res.json({
    success: true,
    message: 'Logout successful'
  });
};

// Password strength checker
const checkPasswordStrength = (password) => {
  const checks = {
    length: password.length >= securityConfig.PASSWORD_MIN_LENGTH,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    numbers: /\d/.test(password),
    symbols: /[@$!%*?&]/.test(password),
    noCommonPatterns: !/(123|abc|password|qwerty)/i.test(password)
  };

  const score = Object.values(checks).filter(Boolean).length;
  
  let strength = 'very-weak';
  if (score >= 6) strength = 'strong';
  else if (score >= 4) strength = 'medium';
  else if (score >= 2) strength = 'weak';

  return {
    score,
    strength,
    checks,
    isValid: checks.length && checks.lowercase && checks.uppercase && checks.numbers
  };
};

module.exports = {
  loginLimiter,
  validateLoginInput,
  checkAccountLockout,
  trackFailedAttempt,
  hashPassword,
  verifyPassword,
  generateToken,
  verifyToken,
  securityHeaders,
  loginHandler,
  logoutHandler,
  checkPasswordStrength,
  securityConfig
};
