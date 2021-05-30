// import { Router } from 'express';
const Router = require('express').Router;
// User Model
// import User from '../../models/User';
const User = require('../../models/User');
const auth = require('../../middleware/auth');

const router = Router();

/**
 * @route   GET api/users
 * @desc    Get all users
 * @access  Private
 */

router.get('/', //auth, 
                async (req, res) => {
  try {
    const users = await User.find().select('-password');
    if (!users) throw Error('No users exist');
    // if (users.length === 0) throw Error('No users exist');
    res.json(users);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

// export default router;
module.exports = router;