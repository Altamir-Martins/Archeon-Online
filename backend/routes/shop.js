import express from 'express';
import pool from '../models/db.js';
import { authenticateToken } from './auth.js';
import { calculatePointsFor10Percent } from '../models/currency.js';

const router = express.Router();

// Get all shop products
router.get('/products', async (req, res) => {
  try {
    const products = await pool.query(
      'SELECT * FROM shop_products ORDER BY created_at DESC'
    );

    res.json({ products: products.rows });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Process purchase
router.post('/purchase', authenticateToken, async (req, res) => {
  try {
    const { items, totalAmount, pointsUsed } = req.body;
    const userId = req.user.id;

    // Calculate points earned (10% of final amount)
    const finalAmount = totalAmount - (pointsUsed * 0.1); // Assuming pointsUsed is in points, each point = R$0.10 discount
    const pointsEarned = Math.floor(finalAmount * 0.1);

    // Create purchase record
    const purchase = await pool.query(`
      INSERT INTO purchases (user_id, service_name, amount, points_earned, status)
      VALUES ($1, $2, $3, $4, 'completed')
      RETURNING *
    `, [userId, 'Digital Products Purchase', finalAmount, pointsEarned]);

    // Update user points and services completed
    await pool.query(`
      UPDATE users
      SET points = points - $1 + $2, services_completed = services_completed + 1, updated_at = NOW()
      WHERE id = $3
    `, [pointsUsed, pointsEarned, userId]);

    // Check for rewards (every 5 services)
    const user = await pool.query(
      'SELECT services_completed FROM users WHERE id = $1',
      [userId]
    );

    let newReward = null;
    const newServicesCount = user.rows[0].services_completed + 1;
    if (newServicesCount % 5 === 0) {
      const rewardTypes = [
        { type: 'caricature', name: 'Caricatura Grátis', description: 'Uma caricatura personalizada do seu personagem' },
        { type: 'discount10', name: '10% OFF', description: 'Desconto de 10% na próxima compra' },
        { type: 'cartoon', name: 'Versão Cartoon', description: 'Transforme sua imagem em estilo cartoon' },
        { type: 'points', name: 'Bônus de Pontos', description: '100 pontos extras de fidelidade' }
      ];

      const randomReward = rewardTypes[Math.floor(Math.random() * rewardTypes.length)];

      const reward = await pool.query(
        'INSERT INTO rewards (user_id, type, name, description) VALUES ($1, $2, $3, $4) RETURNING *',
        [userId, randomReward.type, randomReward.name, randomReward.description]
      );

      newReward = reward.rows[0];

      // If points reward, add extra points
      if (randomReward.type === 'points') {
        await pool.query(
          'UPDATE users SET points = points + 100 WHERE id = $1',
          [userId]
        );
      }
    }

    res.json({
      message: 'Purchase completed successfully',
      purchase: purchase.rows[0],
      pointsEarned,
      newReward
    });

  } catch (error) {
    console.error('Purchase error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user purchase history
router.get('/history', authenticateToken, async (req, res) => {
  try {
    const purchases = await pool.query(
      'SELECT * FROM purchases WHERE user_id = $1 ORDER BY created_at DESC',
      [req.user.id]
    );

    res.json({ purchases: purchases.rows });
  } catch (error) {
    console.error('Get history error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update product price (admin only)
router.put('/products/:productId/price', authenticateToken, async (req, res) => {
  try {
    const { productId } = req.params;
    const { price } = req.body;

    // Check if user is admin
    const user = await pool.query(
      'SELECT is_admin FROM users WHERE id = $1',
      [req.user.id]
    );

    if (!user.rows[0]?.is_admin) {
      return res.status(403).json({ error: 'Admin access required' });
    }

    // Validate price
    if (!price || isNaN(price) || price <= 0) {
      return res.status(400).json({ error: 'Valid price required' });
    }

    // Calculate points for 10% discount
    const pointsFor10Discount = calculatePointsFor10Percent(price);

    // Update product
    const result = await pool.query(
      'UPDATE shop_products SET price = $1, points_for_10_discount = $2 WHERE id = $3 RETURNING *',
      [price, pointsFor10Discount, productId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({
      message: 'Price updated successfully',
      product: result.rows[0]
    });

  } catch (error) {
    console.error('Update price error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export { router as shopRoutes };