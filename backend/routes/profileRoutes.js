const express = require('express');
const mongoose = require('mongoose');
const sessionAuth = require('../middleware/sessionAuth');
const requireAdmin = require('../middleware/requireAdmin');
const User = require('../models/User');

const router = express.Router();

function profilePayload(user) {
  return {
    id: user._id,
    name: user.name,
    email: user.email,
    cellphone: user.cellphone,
    role: user.role || 'user',
    createdAt: user.createdAt,
  };
}

/** Authenticated user: own profile only (session-bound). */
router.get('/', sessionAuth, (req, res) => {
  res.json({
    success: true,
    profile: profilePayload(req.user),
  });
});

/** Administrators: read another user's profile by id. */
router.get('/admin/:userId', sessionAuth, requireAdmin, async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({ success: false, message: 'Invalid user id.' });
    }

    const target = await User.findById(userId).select('-password');
    if (!target) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    return res.json({
      success: true,
      profile: profilePayload(target),
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error loading profile.' });
  }
});

module.exports = router;
