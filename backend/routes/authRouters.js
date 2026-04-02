const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

async function syncAdminRole(user) {
  const adminList = (process.env.ADMIN_EMAILS || '')
    .split(',')
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  if (adminList.length && adminList.includes(user.email.toLowerCase())) {
    if (user.role !== 'admin') {
      user.role = 'admin';
      await user.save();
    }
  }
}

function saveSession(req, res, body) {
  req.session.save((saveErr) => {
    if (saveErr) {
      console.error('Session save error:', saveErr);
      return res.status(500).json({ success: false, message: 'Could not establish session.' });
    }
    return res.status(body.status).json(body.json);
  });
}

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, cellphone } = req.body;
    if (!name) return res.status(400).json({ success: false, message: 'Name required.' });
    if (!email) return res.status(400).json({ success: false, message: 'Email required.' });
    if (!password) return res.status(400).json({ success: false, message: 'Password required.' });
    if (!cellphone) return res.status(400).json({ success: false, message: 'Cellphone required.' });
    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        message: 'Password must be at least 8 characters long.',
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ success: false, message: 'Email already registered.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      cellphone,
    });

    await syncAdminRole(newUser);

    req.session.regenerate((regErr) => {
      if (regErr) {
        console.error('Session regenerate error:', regErr);
        return res.status(201).json({
          success: true,
          message: 'User registered successfully. Sign in to start a session.',
        });
      }
      req.session.userId = newUser._id.toString();
      req.session.role = newUser.role;
      saveSession(req, res, {
        status: 201,
        json: { success: true, message: 'User registered successfully' },
      });
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ success: false, message: 'Error registering user', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const jwtSecret = process.env.JWT_SECRET;

    if (!email) return res.status(400).json({ success: false, message: 'Email is required.' });
    if (!password) return res.status(400).json({ success: false, message: 'Password is required.' });
    if (!jwtSecret) {
      return res.status(500).json({ success: false, message: 'JWT secret is not configured' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ success: false, message: 'Invalid email or password.' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    await syncAdminRole(user);

    req.session.regenerate((regErr) => {
      if (regErr) {
        console.error('Session regenerate error:', regErr);
        return res.status(500).json({ success: false, message: 'Could not create session.' });
      }

      req.session.userId = user._id.toString();
      req.session.role = user.role;

      const token = jwt.sign({ userId: user._id, email: user.email }, jwtSecret, { expiresIn: '1d' });

      req.session.save((saveErr) => {
        if (saveErr) {
          console.error('Session save error:', saveErr);
          return res.status(500).json({ success: false, message: 'Could not save session.' });
        }
        return res.status(200).json({
          success: true,
          message: 'Login successful.',
          token,
        });
      });
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ success: false, message: 'Error logging in', error: error.message });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ success: false, message: 'Could not log out.' });
    }
    res.clearCookie('dlptc.sid', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });
    return res.json({ success: true, message: 'Logged out.' });
  });
});

module.exports = router;
