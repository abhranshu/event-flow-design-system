require('dotenv').config();
const mongoose = require('mongoose');
const Event = require('../models/Event');

const sampleEvents = [
  {
    title: "Tech Conference 2024",
    date: new Date("2024-06-15"),
    location: "San Francisco Convention Center",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: 299,
    isFeatured: true
  },
  {
    title: "Summer Music Festival",
    date: new Date("2024-07-20"),
    location: "Central Park, New York",
    category: "Music",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: 150,
    isFeatured: true
  },
  {
    title: "Food & Wine Expo",
    date: new Date("2024-08-10"),
    location: "Chicago Exhibition Center",
    category: "Food & Drink",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    price: 75,
    isFeatured: false
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing events
    await Event.deleteMany({});
    console.log('Cleared existing events');

    // Insert sample events
    await Event.insertMany(sampleEvents);
    console.log('Added sample events');

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase(); 