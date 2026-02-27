# 🚀 Quick Setup Guide - DevNest Payment System

## Step 1: Install Dependencies

```bash
cd backend
npm install
```

This installs the `stripe` package automatically.

---

## Step 2: Configure Environment Variables

1. Copy the example file:
   ```bash
   cp .env.example .env
   ```

2. Get your Stripe keys from [Stripe Dashboard](https://dashboard.stripe.com/test/apikeys)

3. Update `.env` file:
   ```env
   STRIPE_SECRET_KEY=sk_test_your_key_here
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   FRONTEND_URL=http://localhost:5173
   ```

---

## Step 3: Set Up Stripe Webhook (Local Development)

1. Install Stripe CLI:
   - **Windows:** `scoop install stripe`
   - **macOS:** `brew install stripe/stripe-cli/stripe`
   - **Linux:** Download from [stripe.com/docs/stripe-cli](https://stripe.com/docs/stripe-cli)

2. Login to Stripe:
   ```bash
   stripe login
   ```

3. Forward webhooks to your local server:
   ```bash
   stripe listen --forward-to localhost:5008/api/payment/webhook
   ```

4. Copy the webhook signing secret (starts with `whsec_`) and add it to your `.env` file

---

## Step 4: Start Your Server

```bash
npm run dev
```

The server should start on port 5008.

---

## Step 5: Protect Your Routes

### Example: Protect Lesson Routes

Edit `routes/lessonRoutes.js`:

```javascript
const { protect } = require("../middleware/authMiddleware");
const { requireActiveSubscription } = require("../middleware/subscriptionMiddleware");

// Before (free access):
router.get("/:id", protect, getLessonById);

// After (requires payment):
router.get("/:id", protect, requireActiveSubscription, getLessonById);
```

### Example: Protect Course Routes

Edit `routes/courseRoutes.js`:

```javascript
const { protect } = require("../middleware/authMiddleware");
const { requireActiveSubscription } = require("../middleware/subscriptionMiddleware");

// Free route (list of courses)
router.get("/", protect, getAllCourses);

// Premium route (course details)
router.get("/:id", protect, requireActiveSubscription, getCourseById);
```

---

## Step 6: Test the Payment Flow

### Option 1: Using Stripe Test Cards

1. Go to `http://localhost:5173/payment` (your payment page)
2. Click "Pay Now"
3. You'll be redirected to Stripe Checkout
4. Use test card: `4242 4242 4242 4242`
   - Expiry: Any future date (e.g., 12/34)
   - CVC: Any 3 digits (e.g., 123)
   - ZIP: Any 5 digits (e.g., 12345)
5. Complete payment
6. You'll be redirected back to your success page
7. Verify subscription status:
   ```bash
   GET http://localhost:5008/api/payment/subscription-status
   Authorization: Bearer YOUR_JWT_TOKEN
   ```

### Option 2: Using Stripe CLI to Trigger Webhook

```bash
# Trigger a successful payment event
stripe trigger checkout.session.completed

# Check your database - user subscription should be "active"
```

---

## Testing Checklist

- [ ] Server starts without errors
- [ ] Can create checkout session (POST /api/payment/create-checkout-session)
- [ ] Stripe CLI is listening for webhooks
- [ ] Can complete test payment
- [ ] Webhook updates user subscription to "active"
- [ ] Can verify payment (GET /api/payment/verify?sessionId=xxx)
- [ ] Premium routes are protected (return 403 for free users)
- [ ] Premium routes are accessible (return 200 for paid users)

---

## Common Issues

### "Webhook signature verification failed"

**Fix:** Make sure Stripe CLI is running and the webhook secret in `.env` matches the one shown in the CLI output.

### "No such customer"

**Fix:** The Stripe customer ID in the database doesn't exist. Clear your database and try again.

### "Premium subscription required"

**Fix:** User hasn't paid yet or webhook didn't fire. Check:
1. Stripe CLI is running
2. Webhook was received (check CLI output)
3. User's subscription status in database

---

## Next Steps

1. **Protect your routes** - Add `requireActiveSubscription` middleware to premium routes
2. **Build frontend UI** - Create payment page, success page, and subscription status display
3. **Test thoroughly** - Try different scenarios (success, cancel, failed payment)
4. **Go live** - Switch to live keys when ready for production

---

## Need Help?

📖 **Full Documentation:** See `PAYMENT_SYSTEM_DOCUMENTATION.md`

🔧 **API Endpoints:**
- POST `/api/payment/create-checkout-session` - Start payment
- GET `/api/payment/subscription-status` - Check status
- GET `/api/payment/verify?sessionId=xxx` - Verify payment
- POST `/api/payment/webhook` - Stripe webhook (automatic)

---

## Frontend Integration Example

```javascript
// Create payment button
const handlePayment = async () => {
  const response = await fetch('/api/payment/create-checkout-session', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  
  const { url } = await response.json();
  window.location.href = url; // Redirect to Stripe
};

// Check subscription status
const checkStatus = async () => {
  const response = await fetch('/api/payment/subscription-status', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  const { subscription } = await response.json();
  console.log('Has access:', subscription.hasAccess);
};
```

---

**You're all set! 🎉**
