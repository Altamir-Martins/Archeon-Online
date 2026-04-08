# Archeon Backend API

Backend API for the Archeon portfolio website with CMS, gamification, and digital shop functionality.

## Features

- 🔐 **Authentication**: JWT-based login/register with bcrypt password hashing
- 👤 **User Management**: Profile updates, points system, rewards tracking
- 🎮 **Gamification**: XP/levels, rewards every 5 services, discount system
- 🛒 **Digital Shop**: Product catalog, cart with point discounts, purchase history
- ✏️ **CMS System**: Admin-only content editing (text, images, positions)
- 💳 **Payments**: Stripe integration for secure payments
- 📧 **Email**: Nodemailer for transactional emails (contact forms, etc.)
- ☁️ **File Storage**: Cloudinary for image uploads
- 📊 **Admin Logs**: Audit trail for all content changes

## Tech Stack

- **Runtime**: Node.js with ES modules
- **Framework**: Express.js
- **Database**: PostgreSQL with pg library
- **Authentication**: JWT + bcrypt
- **Payments**: Stripe
- **File Storage**: Cloudinary
- **Email**: Nodemailer
- **Security**: Helmet, CORS

## Setup

1. **Install dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Environment variables**:
   Copy `.env` and fill in your credentials:
   - PostgreSQL connection string
   - JWT secret
   - Stripe keys
   - Cloudinary credentials
   - Email settings

3. **Database setup**:
   - Create a PostgreSQL database
   - Run the schema.sql file to create tables and seed data
   ```bash
   psql -d your_database < models/schema.sql
   ```

4. **Start the server**:
   ```bash
   npm run dev  # Development with nodemon
   # or
   npm start    # Production
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Users
- `GET /api/users/profile` - Get user profile with rewards/purchases
- `PUT /api/users/profile` - Update user profile
- `POST /api/users/add-points` - Add points to user
- `POST /api/users/use-reward/:rewardId` - Mark reward as used

### Content (CMS)
- `GET /api/content` - Get all site content
- `POST /api/content/update` - Update content (admin only)
- `POST /api/content/position` - Update element position (admin only)
- `GET /api/content/logs` - Get admin logs (admin only)

### Shop
- `GET /api/shop/products` - Get all products
- `POST /api/shop/purchase` - Process purchase
- `GET /api/shop/history` - Get user purchase history

### Payments
- `POST /api/payments/create-payment-intent` - Create Stripe payment intent
- `POST /api/payments/webhook` - Stripe webhook handler
- `GET /api/payments/config` - Get Stripe publishable key

### Contact
- `POST /api/contact/request` - Handle project request form submission

## Database Schema

See `models/schema.sql` for the complete database structure including:
- users, rewards, purchases, site_content, admin_logs, shop_products tables
- Indexes for performance
- Sample data seeding

## Security Features

- Password hashing with bcrypt
- JWT tokens with expiration
- Admin-only routes protection
- Input validation
- CORS configuration
- Helmet security headers
- SQL injection prevention with parameterized queries

## Deployment

Recommended deployment platforms:
- **Backend**: Railway, Render, or Heroku
- **Database**: Supabase, Neon, or Railway Postgres
- **Frontend**: Vercel or Netlify

## Email System

The system includes automated email notifications with HTML templates that match the site's design.

### Email Templates
- **Purchase Confirmation (Client)**: Thanks for purchase, order details, gamification updates
- **Purchase Notification (Admin)**: New order ticket with client details and order info
- **Contact Request (Admin)**: New project request with client details and requirements

### Email Features
- HTML templates with inline CSS (email client compatible)
- Site branding with logo and hero image background
- Responsive design for mobile/email clients
- Dynamic content replacement
- SMTP configuration (Gmail/Outlook)

### Configuration
Set the following in `.env`:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
ADMIN_EMAIL=admin@yourdomain.com
```

For Gmail, use an "App Password" instead of your regular password.

## Integration with Frontend

The backend is designed to work with the existing React frontend. Key integration points:

1. **Authentication**: Replace localStorage with JWT tokens
2. **Content Loading**: Fetch content from `/api/content` on page load
3. **Admin Editing**: POST updates to `/api/content/update`
4. **Shop**: Use Stripe for payments, track purchases
5. **Gamification**: Sync points and rewards with backend

## Development

- Use `npm run dev` for development with auto-restart
- Test endpoints with tools like Postman or Insomnia
- Check logs for debugging
- Database changes should be versioned with migrations

## Contributing

1. Follow the existing code structure
2. Add proper error handling
3. Update this README for new features
4. Test thoroughly before committing