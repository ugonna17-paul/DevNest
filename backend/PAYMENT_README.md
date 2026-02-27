# 💳 DevNest Payment System

Secure one-time payment system using Stripe for lifetime access to premium courses.

---

## 🎯 Overview

- **Payment Amount:** ₦3,000 (Nigerian Naira)
- **Payment Type:** One-time payment
- **Access:** Lifetime access to all premium courses
- **Payment Gateway:** Stripe Checkout
- **Security:** Backend-verified, webhook-based confirmation

---

## 📋 What's Been Implemented

### ✅ Backend Components

1. **User Model Update** (`models/User.js`)
   - Added `subscription` field with status, paidAt, and Stripe IDs

2. **Payment Controller** (`controllers/paymentController.js`)
   - Create Stripe checkout session
   - Handle Stripe webhooks
   - Verify payment status
   - Get subscription status

3. **Subscription Middleware** (`middleware/subscriptionMiddleware.js`)
   - `requireActiveSubscription` - Blocks access for free users
   - `checkSubscription` - Adds subscription info to request

4. **Payment Routes** (`routes/paymentRoutes.js`)
   - POST `/api/payment/create-checkout-session`
   - POST `/api/payment/webhook`
   - GET `/api/payment/subscription-status`
   - GET `/api/payment/verify`

5. **Main Server Update** (`index.js`)
   - Added payment routes
   - Configured webhook to receive raw body

6. **Dependencies** (`package.json`)
   - Added `stripe` package (v14.14.0)

### 📚 Documentation Files

1. **QUICK_SETUP_GUIDE.md** - Get started in 5 minutes
2. **PAYMENT_SYSTEM_DOCUMENTATION.md** - Complete reference
3. **HOW_TO_PROTECT_ROUTES.md** - Step-by-step route protection
4. **.env.example** - Environment variables template

---

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Add your Stripe keys to `.env`:

```env
STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_secret
FRONTEND_URL=http://localhost:5173
```

### 3. Set Up Stripe Webhook (Local)

```bash
# Install Stripe CLI
stripe login

# Forward webhooks
stripe listen --forward-to localhost:5008/api/payment/webhook
```

### 4. Start Server

```bash
npm run dev
```

### 5. Test Payment

Use Stripe test card: `4242 4242 4242 4242`

---

## 🔐 Security Features

✅ **Backend-only verification** - Frontend cannot fake payment status  
✅ **Webhook signature verification** - Prevents fake webhooks  
✅ **JWT authentication** - All endpoints require valid token  
✅ **Metadata validation** - Prevents payment hijacking  
✅ **Environment variables** - Secrets never in code  

---

## 📊 Payment Flow

```
User clicks "Pay Now"
       ↓
Frontend calls create-checkout-session
       ↓
Backend creates Stripe session
       ↓
User redirected to Stripe Checkout
       ↓
User enters card details
       ↓
Stripe processes payment
       ↓
Stripe sends webhook to backend
       ↓
Backend verifies webhook signature
       ↓
Backend updates user subscription to "active"
       ↓
User redirected to success page
       ↓
Frontend verifies payment status
       ↓
User gains access to premium content
```

---

## 🛡️ Protecting Routes

### Example: Protect Lesson Content

```javascript
const { protect } = require('../middleware/authMiddleware');
const { requireActiveSubscription } = require('../middleware/subscriptionMiddleware');

// Before: Anyone can access
router.get('/:id', getLessonById);

// After: Only paid users can access
router.get('/:id', protect, requireActiveSubscription, getLessonById);
```

### Response for Free Users (403)

```json
{
  "message": "Premium subscription required",
  "code": "SUBSCRIPTION_REQUIRED",
  "subscription": {
    "status": "free",
    "hasAccess": false
  }
}
```

---

## 🔌 API Endpoints

### Create Checkout Session

```http
POST /api/payment/create-checkout-session
Authorization: Bearer <JWT_TOKEN>
```

**Response:**
```json
{
  "sessionId": "cs_test_xxxxx",
  "url": "https://checkout.stripe.com/c/pay/cs_test_xxxxx"
}
```

### Get Subscription Status

```http
GET /api/payment/subscription-status
Authorization: Bearer <JWT_TOKEN>
```

**Response:**
```json
{
  "subscription": {
    "status": "active",
    "paidAt": "2026-02-25T10:30:00.000Z",
    "hasAccess": true
  }
}
```

### Verify Payment

```http
GET /api/payment/verify?sessionId=cs_test_xxxxx
Authorization: Bearer <JWT_TOKEN>
```

### Webhook (Stripe Only)

```http
POST /api/payment/webhook
Stripe-Signature: <SIGNATURE>
```

---

## 🧪 Testing

### Test Cards

| Card | Result |
|------|--------|
| 4242 4242 4242 4242 | Success |
| 4000 0000 0000 0002 | Declined |
| 4000 0000 0000 9995 | Insufficient funds |

Use any future expiry, any CVC, any ZIP.

### Trigger Test Webhook

```bash
stripe trigger checkout.session.completed
```

---

## 🌐 Frontend Integration

### Payment Button

```javascript
const handlePayment = async () => {
  const response = await fetch('/api/payment/create-checkout-session', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  
  const { url } = await response.json();
  window.location.href = url;
};
```

### Check Subscription

```javascript
const response = await fetch('/api/payment/subscription-status', {
  headers: { 'Authorization': `Bearer ${token}` }
});

const { subscription } = await response.json();

if (subscription.hasAccess) {
  // Show premium content
} else {
  // Show payment page
}
```

---

## 📁 File Structure

```
backend/
├── controllers/
│   └── paymentController.js          ✨ NEW
├── middleware/
│   └── subscriptionMiddleware.js     ✨ NEW
├── models/
│   └── User.js                       🔄 UPDATED
├── routes/
│   └── paymentRoutes.js              ✨ NEW
├── index.js                          🔄 UPDATED
├── package.json                      🔄 UPDATED
├── .env.example                      ✨ NEW
├── QUICK_SETUP_GUIDE.md              ✨ NEW
├── PAYMENT_SYSTEM_DOCUMENTATION.md   ✨ NEW
└── HOW_TO_PROTECT_ROUTES.md          ✨ NEW
```

---

## 🚨 Common Issues

### "Webhook signature verification failed"

**Fix:** Ensure Stripe CLI is running and webhook secret in `.env` matches CLI output.

### "Premium subscription required" even after payment

**Fix:**
1. Check Stripe CLI is forwarding webhooks
2. Verify webhook was received (check CLI output)
3. Check user's subscription status in database

### Can't create checkout session

**Fix:**
1. Verify `STRIPE_SECRET_KEY` in `.env`
2. Check JWT token is valid
3. Ensure Stripe account is activated

---

## 📖 Documentation

- **Quick Setup:** [QUICK_SETUP_GUIDE.md](./QUICK_SETUP_GUIDE.md)
- **Full Documentation:** [PAYMENT_SYSTEM_DOCUMENTATION.md](./PAYMENT_SYSTEM_DOCUMENTATION.md)
- **Route Protection:** [HOW_TO_PROTECT_ROUTES.md](./HOW_TO_PROTECT_ROUTES.md)

---

## 🎯 Next Steps

1. ✅ **Install dependencies:** `npm install`
2. ✅ **Configure .env:** Add Stripe keys
3. ✅ **Set up webhook:** Run Stripe CLI
4. ✅ **Start server:** `npm run dev`
5. ⬜ **Protect routes:** Add middleware to premium routes
6. ⬜ **Build frontend:** Create payment UI
7. ⬜ **Test thoroughly:** Try complete payment flow
8. ⬜ **Go live:** Switch to live Stripe keys

---

## 💡 Tips

- **Start with test mode** - Use `sk_test_` keys
- **Test webhooks locally** - Use Stripe CLI
- **Protect routes selectively** - Some content can be free
- **Handle errors gracefully** - Show helpful messages to users
- **Log everything** - Track payment attempts and failures
- **Use HTTPS in production** - Required for webhooks

---

## 🤝 Support

Need help? Check the documentation files:

1. **Getting started:** QUICK_SETUP_GUIDE.md
2. **Detailed info:** PAYMENT_SYSTEM_DOCUMENTATION.md
3. **Route protection:** HOW_TO_PROTECT_ROUTES.md
4. **Environment setup:** .env.example

---

## 📝 License

Part of the DevNest learning platform.

---

**Built with security, simplicity, and scalability in mind. 🚀**
