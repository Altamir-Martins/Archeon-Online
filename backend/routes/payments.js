import express from 'express';
import Stripe from 'stripe';
import pool from '../models/db.js';
import { authenticateToken } from './auth.js';
import { sendPurchaseConfirmationToClient, sendPurchaseNotificationToAdmin } from '../models/email.js';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create payment intent
router.post('/create-payment-intent', authenticateToken, async (req, res) => {
  try {
    const { amount, currency = 'usd', items } = req.body;

    // Convert amount to cents (Stripe expects cents)
    const amountInCents = Math.round(amount * 100);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency,
      metadata: {
        userId: req.user.id,
        items: JSON.stringify(items)
      }
    });

    res.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id
    });

  } catch (error) {
    console.error('Create payment intent error:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
});

// Webhook to handle successful payments
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    const { userId, items } = paymentIntent.metadata;

    try {
      // Get user data
      const user = await pool.query(
        'SELECT username, email, points, services_completed FROM users WHERE id = $1',
        [userId]
      );

      if (user.rows.length === 0) {
        console.error('User not found for payment:', userId);
        return res.status(200).json({ received: true });
      }

      const userData = user.rows[0];

      // Process the successful payment
      const finalAmount = paymentIntent.amount / 100; // Convert back from cents
      const pointsEarned = Math.floor(finalAmount * 0.1);

      // Create purchase record
      const purchase = await pool.query(`
        INSERT INTO purchases (user_id, service_name, amount, points_earned, status)
        VALUES ($1, $2, $3, $4, 'completed')
        RETURNING *
      `, [userId, 'Digital Products Purchase', finalAmount, pointsEarned]);

      // Update user points and services
      await pool.query(`
        UPDATE users
        SET points = points + $1, services_completed = services_completed + 1, updated_at = NOW()
        WHERE id = $2
      `, [pointsEarned, userId]);

      // Check for rewards (every 5 services)
      const newServicesCount = userData.services_completed + 1;
      let newReward = null;
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

      // Prepare email data
      const orderId = purchase.rows[0].id.split('-')[0].toUpperCase(); // Simple order ID
      const orderDate = new Date().toLocaleDateString('pt-BR');

      // Calculate level and title
      const totalPoints = userData.points + pointsEarned + (newReward?.type === 'points' ? 100 : 0);
      const xp = totalPoints * 10;
      const level = Math.floor(xp / 200) + 1;
      const titles = [
        'Aprendiz', 'Iniciado', 'Artesão', 'Forjador', 'Invocador',
        'Arquitecto de Mundos', 'Mestre Criador', 'Guardião de Relíquias',
        'Lenda Viva', 'Arquiteto Supremo'
      ];
      const titleIndex = Math.min(Math.floor((level - 1) / 4), titles.length - 1);
      const title = titles[titleIndex];

      // Parse items
      let parsedItems = [];
      try {
        parsedItems = JSON.parse(items);
      } catch (e) {
        parsedItems = [{ name: 'Produtos Digitais', category: 'Vários', price: finalAmount }];
      }

      const emailData = {
        orderId,
        orderDate,
        username: userData.username,
        email: userData.email,
        userId,
        items: parsedItems,
        totalAmount: finalAmount.toFixed(2),
        pointsUsed: 0, // For now, assuming no points used in Stripe flow
        pointsEarned,
        totalPoints,
        level,
        title,
        servicesCompleted: newServicesCount,
        newReward,
        paymentStatus: 'Pago',
        heroImage: 'https://via.placeholder.com/600x200/030213/ffffff?text=Archeon'
      };

      // Send emails
      const adminEmail = process.env.ADMIN_EMAIL || 'killerduck393@gmail.com';

      await sendPurchaseConfirmationToClient(userData.email, emailData);
      await sendPurchaseNotificationToAdmin(adminEmail, emailData);

      console.log(`Payment processed and emails sent for user ${userId}: $${finalAmount}, ${pointsEarned} points earned`);

    } catch (error) {
      console.error('Error processing successful payment:', error);
    }
  }

  res.json({ received: true });
});

// Get Stripe publishable key (for frontend)
router.get('/config', (req, res) => {
  res.json({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY
  });
});

export { router as paymentRoutes };