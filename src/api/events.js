const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// Get all events
router.get('/events', async (req, res) => {
  try {
    const events = await Event.find({});
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single event
router.get('/events/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new event
router.post('/events', async (req, res) => {
  const event = new Event({
    title: req.body.title,
    date: req.body.date,
    location: req.body.location,
    category: req.body.category,
    image: req.body.image,
    price: req.body.price
  });

  try {
    const newEvent = await event.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 