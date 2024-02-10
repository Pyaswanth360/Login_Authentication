const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.MEASURIT_SERVER_PORT;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON requests

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI);


// Check if the connection is successful
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Import routes
const adminRouter = require('./controllers/admin_routers');
const userRouter = require('./controllers/user_routers');


// Use routes
app.use('/admin', adminRouter);
app.use('/user', userRouter);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});