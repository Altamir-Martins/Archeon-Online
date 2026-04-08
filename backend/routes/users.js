import express from 'express';
import bcrypt from 'bcryptjs';
import pool from '../models/db.js';
import { authenticateToken } from './auth.js';

const router = express.Router();

// Get user profile with rewards and purchases
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    // Get user data
    const user = await pool.query(
      'SELECT id, username, email, is_admin, points, services_completed, created_at FROM users WHERE id = $1',
      [req.user.id]
    );

    if (user.rows.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Get rewards
    const rewards = await pool.query(
      'SELECT * FROM rewards WHERE user_id = $1 ORDER BY earned_at DESC',
      [req.user.id]
    );

    // Get purchase history
    const purchases = await pool.query(
      'SELECT * FROM purchases WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    );

    res.json({
      user: user.rows[0],
      rewards: rewards.rows,
      purchaseHistory: purchases.rows
    });

  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req, res) => {
  try {
    const { username, email } = req.body;
    const userId = req.user.id;

    // Check if new username/email is already taken by another user
    if (username || email) {
      const existing = await pool.query(
        'SELECT id FROM users WHERE (username = $1 OR email = $2) AND id != $3',
        [username || '', email || '', userId]
      );

      if (existing.rows.length > 0) {
        return res.status(400).json({ error: 'Username or email already taken' });
      }
    }

    // Update user
    const updateFields = [];
    const values = [];
    let paramCount = 1;

    if (username) {
      updateFields.push(`username = $${paramCount++}`);
      values.push(username);
    }
    if (email) {
      updateFields.push(`email = $${paramCount++}`);
      values.push(email);
    }

    if (updateFields.length === 0) {
      return res.status(400).json({ error: 'No fields to update' });
    }

    updateFields.push(`updated_at = NOW()`);
    values.push(userId);

    const query = `
      UPDATE users
      SET ${updateFields.join(', ')}
      WHERE id = $${paramCount}
      RETURNING id, username, email, is_admin, points, services_completed, updated_at
    `;

    const updatedUser = await pool.query(query, values);

    res.json({
      message: 'Profile updated successfully',
      user: updatedUser.rows[0]
    });

  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Add points to user (for purchases)
router.post('/add-points', authenticateToken, async (req, res) => {
  try {
    const { points, reason } = req.body;
    const userId = req.user.id;

    // Add points
    await pool.query(
      'UPDATE users SET points = points + $1, updated_at = NOW() WHERE id = $2',
      [points, userId]
    );

    // Check if user should get a reward (every 5 services)
    const user = await pool.query(
      'SELECT services_completed FROM users WHERE id = $1',
      [userId]
    );

    const servicesCompleted = user.rows[0].services_completed;
    if (servicesCompleted > 0 && servicesCompleted % 5 === 0) {
      // Award a random reward
      const rewardTypes = [
        { type: 'caricature', name: 'Caricatura Grátis', description: 'Uma caricatura personalizada do seu personagem' },
        { type: 'discount10', name: '10% OFF', description: 'Desconto de 10% na próxima compra' },
        { type: 'cartoon', name: 'Versão Cartoon', description: 'Transforme sua imagem em estilo cartoon' },
        { type: 'points', name: 'Bônus de Pontos', description: '100 pontos extras de fidelidade' }
      ];

      const randomReward = rewardTypes[Math.floor(Math.random() * rewardTypes.length)];

      await pool.query(
        'INSERT INTO rewards (user_id, type, name, description) VALUES ($1, $2, $3, $4)',
        [userId, randomReward.type, randomReward.name, randomReward.description]
      );

      // If points reward, add extra points
      if (randomReward.type === 'points') {
        await pool.query(
          'UPDATE users SET points = points + 100 WHERE id = $1',
          [userId]
        );
      }
    }

    res.json({ message: 'Points added successfully' });

  } catch (error) {
    console.error('Add points error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Use reward
router.post('/use-reward/:rewardId', authenticateToken, async (req, res) => {
  try {
    const { rewardId } = req.params;
    const userId = req.user.id;

    const reward = await pool.query(
      'UPDATE rewards SET used = true, used_at = NOW() WHERE id = $1 AND user_id = $2 AND used = false RETURNING *',
      [rewardId, userId]
    );

    if (reward.rows.length === 0) {
      return res.status(404).json({ error: 'Reward not found or already used' });
    }

    res.json({ message: 'Reward used successfully', reward: reward.rows[0] });

  } catch (error) {
    console.error('Use reward error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export { router as userRoutes };