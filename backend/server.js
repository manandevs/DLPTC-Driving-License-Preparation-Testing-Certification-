const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/connectDB');
const authRoutes = require('./routes/authRouters');
const profileRoutes = require('./routes/profileRoutes');
const { version: API_VERSION } = require('./package.json');

dotenv.config();
const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

connectDB()
  .then(() => {
    app.listen(8000, () => {
      console.log('Server running on http://localhost:8000');
      console.log(`DLPTC API version ${API_VERSION} (JWT Authentication)`);
    });
  })
  .catch((error) => {
    console.error('DB connection error:', error.message);
  });