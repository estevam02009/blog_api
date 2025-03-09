const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const Category = require('../models/Category');
const User = require('../models/User');
const auth = require('../middleware/auth');

router.get('/stats', auth, async (req, res) => {
  try {
    const [totalPosts, totalCategories, totalUsers] = await Promise.all([
      Post.countDocuments(),
      Category.countDocuments(),
      User.countDocuments()
    ]);

    res.json({
      totalPosts,
      totalCategories,
      totalUsers
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ message: 'Error fetching statistics' });
  }
});

module.exports = router;