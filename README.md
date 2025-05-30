# Event Flow Design System

A full-stack event management application built with React, Node.js, Express, and MongoDB.

## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/try/download/community) (v4.4 or higher)
- npm (comes with Node.js) or [yarn](https://yarnpkg.com/)

## Project Structure

```
event-flow-design-system/
├── src/                    # Frontend source code
│   ├── components/        # React components
│   ├── pages/            # Page components
│   ├── api/              # API routes
│   ├── lib/              # Utility functions
│   └── types/            # TypeScript type definitions
├── server.js             # Backend server
├── app.js               # MongoDB schema
└── .env                 # Environment variables
```

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd event-flow-design-system
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   npm install express mongoose cors dotenv @tanstack/react-query

   # Install frontend dependencies
   npm install react-router-dom @radix-ui/react-slot lucide-react
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory with the following content:
   ```
   MONGODB_URI=mongodb://localhost:27017/event-flow
   PORT=5000
   ```

4. **Start MongoDB**
   - Windows: MongoDB should run as a service automatically
   - macOS/Linux: Open a terminal and run:
     ```bash
     mongod
     ```

## Running the Application

1. **Start the Backend Server**
   ```bash
   # In the root directory
   node server.js
   ```
   You should see:
   ```
   MongoDB Connected: localhost
   Database Name: event-flow
   Server is running on port 5000
   API available at http://localhost:5000/api
   ```

2. **Start the Frontend Development Server**
   ```bash
   # In a new terminal
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

## Features

- Create, view, and manage events
- Filter events by category
- Search events by title, location, or category
- Responsive design for all devices
- Real-time database updates

## API Endpoints

- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get a specific event
- `POST /api/events` - Create a new event

## Database Schema

Events are stored with the following structure:
```javascript
{
  title: String,      // Required
  date: Date,        // Required
  location: String,   // Required
  category: String,   // Required
  image: String,      // Required
  price: Number,      // Required, minimum 0
  createdAt: Date,    // Automatically added
  updatedAt: Date     // Automatically added
}
```

## Testing the Application

1. **Create a New Event**
   - Navigate to `http://localhost:5173/create-event`
   - Fill out the event details
   - Click "Create Event"

2. **View Events**
   - Go to `http://localhost:5173/events`
   - Browse through the list of events
   - Use filters and search functionality

## Troubleshooting

1. **MongoDB Connection Issues**
   - Ensure MongoDB is running
   - Check if the MongoDB URI in `.env` is correct
   - Verify MongoDB port (default: 27017) is not blocked

2. **Server Connection Issues**
   - Check if port 5000 is available
   - Ensure all environment variables are set
   - Check server logs for detailed error messages

3. **Frontend Issues**
   - Clear browser cache
   - Check browser console for errors
   - Ensure all dependencies are installed

## Contributing

1. Fork the repository
2. Create a new branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
