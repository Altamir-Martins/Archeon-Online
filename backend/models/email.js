import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Load template
const loadTemplate = (templateName) => {
  const templatePath = path.join(__dirname, 'templates', `${templateName}.json`);
  const template = JSON.parse(fs.readFileSync(templatePath, 'utf8'));
  return template;
};

// Render template with data
const renderTemplate = (template, data) => {
  let subject = template.subject;
  let body = template.body;

  // Replace variables in subject
  Object.keys(data).forEach(key => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    subject = subject.replace(regex, data[key]);
    body = body.replace(regex, data[key]);
  });

  // Handle Handlebars-style loops (simple implementation)
  body = body.replace(/{{#each\s+(\w+)}}([\s\S]*?){{\/each}}/g, (match, arrayName, content) => {
    const array = data[arrayName] || [];
    return array.map(item => {
      let itemContent = content;
      Object.keys(item).forEach(key => {
        const regex = new RegExp(`{{${key}}}`, 'g');
        itemContent = itemContent.replace(regex, item[key]);
      });
      return itemContent;
    }).join('');
  });

  // Handle conditionals (simple if)
  body = body.replace(/{{#if\s+(\w+)}}([\s\S]*?){{\/if}}/g, (match, condition, content) => {
    return data[condition] ? content : '';
  });

  return { subject, body };
};

// Load base HTML template
const loadBaseTemplate = () => {
  const basePath = path.join(__dirname, 'templates', 'base.html');
  return fs.readFileSync(basePath, 'utf8');
};

// Send email
export const sendEmail = async (to, templateName, data = {}) => {
  try {
    const transporter = createTransporter();

    // Load and render template
    const template = loadTemplate(templateName);
    const { subject, body } = renderTemplate(template, data);

    // Load base HTML and inject body
    let html = loadBaseTemplate();
    html = html.replace('{{{body}}}', body);
    html = html.replace('{{subject}}', subject);

    // Add hero image URL (you may need to host this image)
    const heroImage = data.heroImage || 'https://via.placeholder.com/600x200/030213/ffffff?text=Archeon';
    html = html.replace('{{heroImage}}', heroImage);

    const mailOptions = {
      from: `"Archeon" <${process.env.EMAIL_FROM}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

// Specific email functions
export const sendPurchaseConfirmationToClient = async (clientEmail, purchaseData) => {
  return await sendEmail(clientEmail, 'purchase-client', purchaseData);
};

export const sendPurchaseNotificationToAdmin = async (adminEmail, purchaseData) => {
  return await sendEmail(adminEmail, 'purchase-admin', purchaseData);
};

export const sendContactNotificationToAdmin = async (adminEmail, contactData) => {
  return await sendEmail(adminEmail, 'contact-admin', contactData);
};