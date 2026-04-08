import express from 'express';
import pool from '../models/db.js';
import { authenticateToken } from './auth.js';

const router = express.Router();

// Get all site content
router.get('/', async (req, res) => {
  try {
    const content = await pool.query(
      'SELECT * FROM site_content ORDER BY updated_at DESC'
    );

    // Transform to key-value object
    const contentMap = {};
    content.rows.forEach(item => {
      contentMap[item.content_key] = {
        id: item.id,
        type: item.content_type,
        value: item.content_value,
        position: item.element_position,
        updatedAt: item.updated_at
      };
    });

    res.json({ content: contentMap });
  } catch (error) {
    console.error('Get content error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update content (text or image)
router.post('/update', authenticateToken, async (req, res) => {
  try {
    const { id, content, type } = req.body;
    const userId = req.user.id;

    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    // Get old value for logging
    const oldContent = await pool.query(
      'SELECT content_value FROM site_content WHERE content_key = $1',
      [id]
    );

    const oldValue = oldContent.rows.length > 0 ? oldContent.rows[0].content_value : null;

    // Update or insert content
    const result = await pool.query(`
      INSERT INTO site_content (content_key, content_type, content_value, updated_by)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (content_key)
      DO UPDATE SET
        content_value = EXCLUDED.content_value,
        content_type = EXCLUDED.content_type,
        updated_by = EXCLUDED.updated_by,
        updated_at = NOW()
      RETURNING *
    `, [id, type, content, userId]);

    // Log the change
    await pool.query(
      'INSERT INTO admin_logs (user_id, action, content_key, old_value, new_value) VALUES ($1, $2, $3, $4, $5)',
      [userId, 'edit_content', id, oldValue, content]
    );

    res.json({
      message: 'Content updated successfully',
      content: result.rows[0]
    });

  } catch (error) {
    console.error('Update content error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update element position
router.post('/position', authenticateToken, async (req, res) => {
  try {
    const { id, position } = req.body;
    const userId = req.user.id;

    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const result = await pool.query(`
      UPDATE site_content
      SET element_position = $1, updated_by = $2, updated_at = NOW()
      WHERE content_key = $3
      RETURNING *
    `, [JSON.stringify(position), userId, id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Content not found' });
    }

    // Log the change
    await pool.query(
      'INSERT INTO admin_logs (user_id, action, content_key, old_value, new_value) VALUES ($1, $2, $3, $4, $5)',
      [userId, 'move_element', id, null, JSON.stringify(position)]
    );

    res.json({
      message: 'Position updated successfully',
      content: result.rows[0]
    });

  } catch (error) {
    console.error('Update position error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get admin logs
router.get('/logs', authenticateToken, async (req, res) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    const logs = await pool.query(`
      SELECT l.*, u.username
      FROM admin_logs l
      JOIN users u ON l.user_id = u.id
      ORDER BY l.created_at DESC
      LIMIT 100
    `);

    res.json({ logs: logs.rows });
  } catch (error) {
    console.error('Get logs error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export { router as contentRoutes };