const express = require('express');
const { Router } = require('express');
const mongoose = require('mongoose');
const User = require('../models/userModels');
const router = express.Router();

// Create a new user
router.post('/', async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const userAdded = await User.create({ name, email, age });
    res.status(201).json(userAdded);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const showAll = await User.find();
    res.status(200).json(showAll);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single user by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a user
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  try {
    const updateUser = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a user
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const showOne = await User.findByIdAndDelete({ _id: id });
    if (!showOne) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(showOne);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
