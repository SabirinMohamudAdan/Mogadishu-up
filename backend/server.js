// // server.js
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // MongoDB connection
// mongoose.connect('mongodb://localhost:27017/auth_demo', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.log(err));

// // User Model
// const UserSchema = new mongoose.Schema({
//     username: { type: String, required: true, unique: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     createdAt: { type: Date, default: Date.now }
// });

// const User = mongoose.model('User', UserSchema);

// // JWT Secret
// const JWT_SECRET = 'your_jwt_secret_key';

// // Registration Endpoint
// app.post('/api/register', async (req, res) => {
//     try {
//         const { username, email, password } = req.body;
        
//         // Check if user exists
//         const existingUser = await User.findOne({ $or: [{ username }, { email }] });
//         if (existingUser) {
//             return res.status(400).json({ message: 'Username or email already exists' });
//         }
        
//         // Hash password
//         const hashedPassword = await bcrypt.hash(password, 10);
        
//         // Create new user
//         const newUser = new User({
//             username,
//             email,
//             password: hashedPassword
//         });
        
//         await newUser.save();
        
//         // Generate token
//         const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '1h' });
        
//         res.status(201).json({ token, userId: newUser._id, username: newUser.username });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// // Login Endpoint
// app.post('/api/login', async (req, res) => {
//     try {
//         const { username, password } = req.body;
        
//         // Find user
//         const user = await User.findOne({ username });
//         if (!user) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }
        
//         // Check password
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//             return res.status(400).json({ message: 'Invalid credentials' });
//         }
        
//         // Generate token
//         const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        
//         res.json({ token, userId: user._id, username: user.username });
//     } catch (error) {
//         res.status(500).json({ message: 'Server error' });
//     }
// });

// // Protected Route Example
// app.get('/api/profile', async (req, res) => {
//     try {
//         const token = req.headers.authorization?.split(' ')[1];
//         if (!token) {
//             return res.status(401).json({ message: 'No token provided' });
//         }
        
//         const decoded = jwt.verify(token, JWT_SECRET);
//         const user = await User.findById(decoded.id).select('-password');
        
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }
        
//         res.json(user);
//     } catch (error) {
//         res.status(401).json({ message: 'Invalid token' });
//     }
// });

// const PORT = 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));




// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const rateLimit = require('express-rate-limit');
// const helmet = require('helmet');
// const mongoSanitize = require('express-mongo-sanitize');
// const { validationResult, check } = require('express-validator');

// const app = express();

// // Security middleware
// app.use(helmet());
// app.use(cors({
//   origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
//   credentials: true
// }));
// app.use(bodyParser.json());
// app.use(mongoSanitize());

// // Rate limiting
// const authLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 5, // limit each IP to 5 requests per windowMs
//   message: 'Too many requests from this IP, please try again later'
// });

// // MongoDB connection
// mongoose.connect(process.env.DB_URL || 'mongodb://localhost:27017/auth_demo', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true
// })
// .then(() => console.log('MongoDB connected'))
// .catch(err => console.log(err));

// // User Model
// const UserSchema = new mongoose.Schema({
//   username: { 
//     type: String, 
//     required: true, 
//     unique: true,
//     minlength: 4,
//     maxlength: 20,
//     trim: true
//   },
//   email: { 
//     type: String, 
//     required: true, 
//     unique: true,
//     trim: true,
//     lowercase: true,
//     match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
//   },
//   password: { 
//     type: String, 
//     required: true,
//     minlength: 8
//   },
//   createdAt: { type: Date, default: Date.now }
// });

// UserSchema.index({ username: 1, email: 1 });

// const User = mongoose.model('User', UserSchema);

// // JWT Secret
// const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
// const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

// // Validation middleware
// const validateRegister = [
//   check('username')
//     .notEmpty().withMessage('Username is required')
//     .isLength({ min: 4 }).withMessage('Username must be at least 4 characters')
//     .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers and underscores'),
//   check('email')
//     .notEmpty().withMessage('Email is required')
//     .isEmail().withMessage('Please provide a valid email'),
//   check('password')
//     .notEmpty().withMessage('Password is required')
//     .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
//     .matches(/^(?=.*[A-Za-z])(?=.*\d)/).withMessage('Password must contain at least one letter and one number')
// ];

// const validateLogin = [
//   check('username')
//     .notEmpty().withMessage('Username is required'),
//   check('password')
//     .notEmpty().withMessage('Password is required')
// ];

// // Registration Endpoint
// app.post('/api/register', authLimiter, validateRegister, async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   try {
//     const { username, email, password } = req.body;
    
//     // Check if user exists
//     const existingUser = await User.findOne({ $or: [{ username }, { email }] });
//     if (existingUser) {
//       return res.status(400).json({ 
//         errors: [{
//           msg: existingUser.username === username 
//             ? 'Username already exists' 
//             : 'Email already exists'
//         }]
//       });
//     }
    
//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 12);
    
//     // Create new user
//     const newUser = new User({
//       username,
//       email,
//       password: hashedPassword
//     });
    
//     await newUser.save();
    
//     // Generate token
//     const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    
//     res.status(201).json({ 
//       token, 
//       userId: newUser._id, 
//       username: newUser.username 
//     });
//   } catch (error) {
//     console.error('Registration error:', error);
//     res.status(500).json({ errors: [{ msg: 'Server error' }] });
//   }
// });

// // Login Endpoint
// app.post('/api/login', authLimiter, validateLogin, async (req, res) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   try {
//     const { username, password } = req.body;
    
//     // Find user
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
//     }
    
//     // Check password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
//     }
    
//     // Generate token
//     const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    
//     res.json({ 
//       token, 
//       userId: user._id, 
//       username: user.username 
//     });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ errors: [{ msg: 'Server error' }] });
//   }
// });

// // Protected Route Example
// app.get('/api/profile', async (req, res) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       return res.status(401).json({ errors: [{ msg: 'No token provided' }] });
//     }
    
//     const token = authHeader.split(' ')[1];
//     const decoded = jwt.verify(token, JWT_SECRET);
//     const user = await User.findById(decoded.id).select('-password');
    
//     if (!user) {
//       return res.status(404).json({ errors: [{ msg: 'User not found' }] });
//     }
    
//     res.json(user);
//   } catch (error) {
//     console.error('Profile error:', error);
//     if (error.name === 'JsonWebTokenError') {
//       return res.status(401).json({ errors: [{ msg: 'Invalid token' }] });
//     }
//     if (error.name === 'TokenExpiredError') {
//       return res.status(401).json({ errors: [{ msg: 'Token expired' }] });
//     }
//     res.status(500).json({ errors: [{ msg: 'Server error' }] });
//   }
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ errors: [{ msg: 'Something broke!' }] });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const { validationResult, check } = require('express-validator');

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(bodyParser.json());
app.use(mongoSanitize());

// Rate limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many requests from this IP, please try again later'
});

// MongoDB connection (updated to remove deprecated options)
mongoose.connect(process.env.DB_URL || 'mongodb://127.0.0.1:27017/auth_demo')
.then(() => console.log('MongoDB connected successfully'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1); // Exit if DB connection fails
});

// User Model
const UserSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true,
    minlength: 4,
    maxlength: 20,
    trim: true
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: { 
    type: String, 
    required: true,
    minlength: 8
  },
  createdAt: { type: Date, default: Date.now }
});

// Create indexes
UserSchema.index({ username: 1 });
UserSchema.index({ email: 1 });

const User = mongoose.model('User', UserSchema);

// JWT Configuration
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

// Validation middleware
const validateRegister = [
  check('username')
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 4 }).withMessage('Username must be at least 4 characters')
    .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers and underscores'),
  check('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email'),
  check('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[A-Za-z])(?=.*\d)/).withMessage('Password must contain at least one letter and one number')
];

const validateLogin = [
  check('username').notEmpty().withMessage('Username is required'),
  check('password').notEmpty().withMessage('Password is required')
];

// Registration Endpoint
app.post('/api/register', authLimiter, validateRegister, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, email, password } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      const errorMsg = existingUser.username === username 
        ? 'Username already exists' 
        : 'Email already exists';
      return res.status(400).json({ errors: [{ msg: errorMsg }] });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Create and save new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword
    });
    
    // Generate token
    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    
    res.status(201).json({ 
      token, 
      userId: newUser._id, 
      username: newUser.username 
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
});

// Login Endpoint
app.post('/api/login', authLimiter, validateLogin, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, password } = req.body;
    
    // Find user
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: 'Invalid credentials' }] });
    }
    
    // Generate token
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    
    res.json({ 
      token, 
      userId: user._id, 
      username: user.username 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
});

// Protected Route Example
app.get('/api/profile', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ errors: [{ msg: 'No token provided' }] });
    }
    
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ errors: [{ msg: 'User not found' }] });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Profile error:', error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ errors: [{ msg: 'Invalid token' }] });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ errors: [{ msg: 'Token expired' }] });
    }
    res.status(500).json({ errors: [{ msg: 'Server error' }] });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ errors: [{ msg: 'Internal server error' }] });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));