const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { 
  hashPassword, 
  verifyPassword, 
  generateToken, 
  trackFailedAttempt,
  checkPasswordStrength,
  securityConfig 
} = require('../middleware/authSecurity');

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Register user with enhanced security
exports.register = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { username, email, password } = req.body;

    // Check password strength
    const passwordStrength = checkPasswordStrength(password);
    if (!passwordStrength.isValid) {
      return res.status(400).json({
        success: false,
        message: 'Password does not meet security requirements',
        passwordRequirements: {
          minLength: securityConfig.PASSWORD_MIN_LENGTH,
          requiresLowercase: true,
          requiresUppercase: true,
          requiresNumbers: true,
          requiresSymbols: true
        },
        currentStrength: passwordStrength
      });
    }

    // Check if user exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: existingUser.email === email ? 'Email already registered' : 'Username already taken'
      });
    }

    // Create verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Create user (password will be hashed automatically by the User model)
    const user = new User({
      username,
      email,
      password: password, // The User model will hash this automatically
      verificationToken,
      createdAt: new Date(),
      loginCount: 0,
      isVerified: true // Allow immediate login without email verification for development
    });

    await user.save();

    // Send verification email
    const verificationUrl = `${process.env.CLIENT_URL}/verify/${verificationToken}`;
    
    try {
      await transporter.sendMail({
        to: email,
        subject: 'Verify your SocialRoa account',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4F46E5;">Welcome to SocialRoa!</h2>
            <p>Thank you for creating an account. Please verify your email address to complete your registration.</p>
            <div style="margin: 30px 0;">
              <a href="${verificationUrl}" 
                 style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
                Verify Email Address
              </a>
            </div>
            <p style="color: #666; font-size: 14px;">
              If you didn't create an account, please ignore this email.
            </p>
            <p style="color: #666; font-size: 14px;">
              This link will expire in 24 hours for security reasons.
            </p>
          </div>
        `
      });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Continue with registration even if email fails
    }

    // Generate token for immediate login after registration
    const tokenPayload = {
      userId: user._id,
      email: user.email,
      role: user.role || 'user'
    };

    res.status(201).json({
      success: true,
      message: 'Account created successfully. Please check your email for verification.',
      token: generateToken(tokenPayload),
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic || null,
        isVerified: user.isVerified,
        role: user.role || 'user'
      },
      passwordStrength: passwordStrength.strength
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during registration'
    });
  }
};

// Login user with enhanced security
exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array()
      });
    }

    const { email, password, rememberMe } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal that the user doesn't exist - track failed attempt
      trackFailedAttempt(email);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check password using the User model's comparePassword method
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      const lockout = trackFailedAttempt(email);
      
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
        attemptsRemaining: securityConfig.MAX_LOGIN_ATTEMPTS - lockout.attempts,
        lockoutWarning: lockout.attempts >= 3
      });
    }

    // Check if account is verified (temporarily disabled for development)
    // if (!user.isVerified) {
    //   return res.status(403).json({
    //     success: false,
    //     message: 'Please verify your email before logging in'
    //   });
    // }

    // Update user login info
    user.isOnline = true;
    user.lastSeen = new Date();
    user.lastLogin = new Date();
    user.loginCount = (user.loginCount || 0) + 1;
    await user.save();

    // Generate secure token
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

    res.json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profilePic: user.profilePic,
        isVerified: user.isVerified,
        bio: user.bio,
        role: user.role || 'user',
        lastLogin: user.lastLogin
      },
      expiresIn: securityConfig.JWT_EXPIRES_IN
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Verify email
exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid verification token'
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();

    res.json({
      success: true,
      message: 'Email verified successfully'
    });
  } catch (error) {
    console.error('Email verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Forgot password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    // Send reset email
    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
    
    await transporter.sendMail({
      to: email,
      subject: 'Password Reset - SocialRoa',
      html: `
        <h2>Password Reset</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>This link will expire in 1 hour.</p>
      `
    });

    res.json({
      success: true,
      message: 'Password reset email sent'
    });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Reset password
exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Invalid or expired reset token'
      });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({
      success: true,
      message: 'Password reset successfully'
    });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Get current user error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};

// Logout
exports.logout = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    user.isOnline = false;
    user.lastSeen = new Date();
    await user.save();

    res.json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};