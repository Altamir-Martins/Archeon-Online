import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../models/db.js';

const router = express.Router();

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if user exists
    const userExists = await pool.query(
      'SELECT id FROM users WHERE username = $1 OR email = $2',
      [username, email]
    );

    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'Username or email already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    // Create user
    const newUser = await pool.query(
      'INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email, is_admin, points, services_completed',
      [username, email, passwordHash]
    );

    // Generate JWT
    const token = jwt.sign(
      { id: newUser.rows[0].id, isAdmin: newUser.rows[0].is_admin },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Calculate level and title for new user (starts at 0 points = level 1)
    const level = 1;
    const title = 'Aprendiz';

    const userData = {
      id: newUser.rows[0].id,
      username: newUser.rows[0].username,
      email: newUser.rows[0].email,
      isAdmin: newUser.rows[0].is_admin,
      points: newUser.rows[0].points,
      level,
      title,
      servicesCompleted: newUser.rows[0].services_completed,
    };

    res.status(201).json({
      message: 'User registered successfully',
      user: userData,
      token
    });

  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    if (!usernameOrEmail || !password) {
      return res.status(400).json({ error: 'Username/email and password are required' });
    }

    // Find user
    const user = await pool.query(
      'SELECT * FROM users WHERE username = $1 OR email = $1',
      [usernameOrEmail]
    );

    if (user.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const foundUser = user.rows[0];

    // Check password
    const isValidPassword = await bcrypt.compare(password, foundUser.password_hash);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: foundUser.id, isAdmin: foundUser.is_admin },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    // Calculate level and title
    const level = Math.floor((foundUser.points / 200) + 1);
    const titles = ['Aprendiz', 'Artesão', 'Mestre', 'Lendário'];
    const title = titles[Math.min(level - 1, 3)];

    // Return user data without password
    const userData = {
      id: foundUser.id,
      username: foundUser.username,
      email: foundUser.email,
      isAdmin: foundUser.is_admin,
      points: foundUser.points,
      level,
      title,
      servicesCompleted: foundUser.services_completed,
    };

    res.json({
      message: 'Login successful',
      user: userData,
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Verify token middleware
export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Get current user
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const user = await pool.query(
      'SELECT id, username, email, is_admin, points, services_completed, created_at FROM users WHERE id = $1',
      [req.user.id]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ user: user.rows[0] });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Validate token - alias for /me endpoint
router.get('/validate', authenticateToken, async (req, res) => {
  try {
    const user = await pool.query(
      `SELECT id, username, email, is_admin as "isAdmin", points, 
              FLOOR((points / 200) + 1) as level,
              CASE 
                WHEN (FLOOR((points / 200) + 1)) = 1 THEN 'Aprendiz'
                WHEN (FLOOR((points / 200) + 1)) = 2 THEN 'Artesão'
                WHEN (FLOOR((points / 200) + 1)) = 3 THEN 'Mestre'
                WHEN (FLOOR((points / 200) + 1)) >= 4 THEN 'Lendário'
                ELSE 'Aprendiz'
              END as title,
              services_completed as "servicesCompleted", 
              created_at FROM users WHERE id = $1`,
      [req.user.id]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user.rows[0]);
  } catch (error) {
    console.error('Validate token error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export { router as authRoutes };