const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../models/Post');

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new post
router.post('/', async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      author: new mongoose.Types.ObjectId(req.body.author),
      category: new mongoose.Types.ObjectId(req.body.category),
      tags: req.body.tags
    });

    const newPost = await post.save();
    const populatedPost = await Post.findById(newPost._id)
      .populate('author', '-password')
      .populate('category');
    
    res.status(201).json(populatedPost);
  } catch (err) {
    if (err.name === 'BSONError') {
      return res.status(400).json({ message: 'Invalid author or category ID format' });
    }
    res.status(400).json({ message: err.message });
  }
});

// Get one post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a post
router.patch('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      if (req.body.title) post.title = req.body.title;
      if (req.body.content) post.content = req.body.content;
      if (req.body.author) post.author = req.body.author;
      if (req.body.tags) post.tags = req.body.tags;

      const updatedPost = await post.save();
      res.json(updatedPost);
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a post
router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      await post.remove();
      res.json({ message: 'Post deleted' });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;