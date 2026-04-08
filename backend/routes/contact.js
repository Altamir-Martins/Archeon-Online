import express from 'express';
import pool from '../models/db.js';
import { sendContactNotificationToAdmin } from '../models/email.js';

const router = express.Router();

// Handle project request form submission
router.post('/request', async (req, res) => {
  try {
    const { name, email, phone, serviceType, description, references, budget, deadline } = req.body;

    // Validation
    if (!name || !email || !description) {
      return res.status(400).json({ error: 'Nome, email e descrição são obrigatórios' });
    }

    // Create a simple ticket ID
    const ticketId = `REQ-${Date.now().toString().slice(-6)}`;
    const requestDate = new Date().toLocaleDateString('pt-BR');

    // Prepare email data
    const emailData = {
      ticketId,
      requestDate,
      name,
      email,
      phone: phone || 'Não informado',
      serviceType: serviceType || 'Não especificado',
      description,
      references: references || '',
      budget: budget || 'Não informado',
      deadline: deadline || 'Não informado',
      heroImage: 'https://via.placeholder.com/600x200/030213/ffffff?text=Archeon'
    };

    // Send email to admin
    const adminEmail = process.env.ADMIN_EMAIL || 'killerduck393@gmail.com';
    await sendContactNotificationToAdmin(adminEmail, emailData);

    // Optionally save to database (for tracking)
    // You could add a contacts table if needed

    res.json({
      message: 'Solicitação enviada com sucesso! Entraremos em contato em breve.',
      ticketId
    });

  } catch (error) {
    console.error('Contact request error:', error);
    res.status(500).json({ error: 'Erro ao enviar solicitação' });
  }
});

export { router as contactRoutes };