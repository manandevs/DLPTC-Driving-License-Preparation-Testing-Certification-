const express = require('express');
const cors = require('cors');
const session = require('express-session');
const { MongoStore } = require('connect-mongo');
const dotenv = require('dotenv');
const connectDB = require('./config/connectDB');
const { version: API_VERSION } = require('./package.json');

const authRoutes = require('./routes/authRouters');
const profileRoutes = require('./routes/profileRoutes');

dotenv.config();

const app = express();

const isProd = process.env.NODE_ENV === 'production';
const sessionSecret = process.env.SESSION_SECRET || process.env.JWT_SECRET;
if (!process.env.SESSION_SECRET && isProd) {
  console.warn('SESSION_SECRET is not set; set a strong secret in production.');
}

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());

app.use(
  session({
    name: 'dlptc.sid',
    secret: sessionSecret || 'dlptc-dev-only-unsafe-change-me',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      dbName: process.env.MONGO_DB_NAME || 'test',
      ttl: 14 * 24 * 60 * 60,
      crypto: {
        secret: sessionSecret || 'dlptc-dev-only-unsafe-change-me',
      },
    }),
    cookie: {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax',
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/api/version', (req, res) => {
  res.json({
    name: 'DLPTC API',
    version: API_VERSION,
    dataProtection: {
      sessionBasedAuth: true,
      profileSessionOnly: true,
      adminProfileAccess: true,
      cookieHttpOnly: true,
      cookieSigned: true,
      sessionStoreEncrypted: true,
    },
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);

connectDB()
  .then(() => {
    app.listen(8000, () => {
      console.log('Server running on http://localhost:8000');
      console.log(`DLPTC API version ${API_VERSION} (session-based profile protection)`);
    });
  })
  .catch((error) => {
    console.log('DB connection error:', error.message);
  });
