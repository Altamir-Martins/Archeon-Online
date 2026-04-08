import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import pool from './models/db.js';
import { authRoutes } from './routes/auth.js';
import { userRoutes } from './routes/users.js';
import { contentRoutes } from './routes/content.js';
import { shopRoutes } from './routes/shop.js';
import { paymentRoutes } from './routes/payments.js';
import { contactRoutes } from './routes/contact.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

async function ensureAdminUser() {
  if (!ADMIN_USERNAME || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    return;
  }

  try {
    const existingAdmin = await pool.query(
      'SELECT id FROM users WHERE username = $1 OR email = $2',
      [ADMIN_USERNAME, ADMIN_EMAIL]
    );

    if (existingAdmin.rows.length > 0) {
      console.log('✅ Admin já existe no banco de dados');
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(ADMIN_PASSWORD, salt);

    await pool.query(
      'INSERT INTO users (username, email, password_hash, is_admin, points, services_completed) VALUES ($1, $2, $3, true, 0, 0)',
      [ADMIN_USERNAME, ADMIN_EMAIL, passwordHash]
    );

    console.log('✅ Admin criado automaticamente no banco de dados');
  } catch (error) {
    console.error('❌ Falha ao criar usuário admin:', error);
  }
}

// Middleware
app.use(helmet());

const allowedOrigins = [
  process.env.FRONTEND_URL,
  ...(process.env.ALLOWED_ORIGINS?.split(',').map((origin) => origin.trim()) || []),
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
        return;
      }
      if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`Origin ${origin} not allowed by CORS`));
      }
    },
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/contact', contactRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

(async () => {
  await ensureAdminUser();

  app.listen(PORT, () => {
    console.log(`🚀 Archeon Backend running on port ${PORT}`);
  });
})();