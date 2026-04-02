const User = require('../models/User');

/**
 * Requires a valid server-side session with a matching user.
 * Profile and other sensitive routes use this instead of bearer tokens.
 */
const sessionAuth = async (req, res, next) => {
  try {
    const userId = req.session?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Authentication required. Sign in to access this resource.',
      });
    }

    const user = await User.findById(userId).select('-password');

    if (!user) {
      req.session.destroy(() => {});
      return res.status(401).json({ success: false, message: 'Session is no longer valid.' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }
};

module.exports = sessionAuth;
