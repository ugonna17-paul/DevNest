# DevNest Payment System Documentation

## Overview

DevNest uses Stripe for secure one-time payments. Users pay ₦3,000 once to get lifetime access to all premium courses.

---

## Payment Flow

1. **User initiates payment** → Frontend calls `/api/payment/create-checkout-session`
2. **Backend creates Stripe session** → Returns checkout URL
3. **User redirected to Stripe** → Completes payment securely
4. **Stripe webhook fires** → Backend receives payment confirmation
5. **User subscription updated** → Status changed to "active"
6. **User redirected back** → Frontend verifies payment status
7. **User gains access** → Premium content unlocked

---

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

This will install the `stripe` package (v14.14.0).

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in the values:

```bash
cp .env.example .env
```

**Required Stripe Variables:**

```env
STRIPE_SECRET_KEY=sk_test_51xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
FRONTEND_URL=http://localhost:5173
```

### 3. Get Stripe Keys

1. Create account at [stripe.com](https://stripe.com)
2. Go to **Developers** → **API Keys**
3. Copy **Secret key** (starts with `sk_test_` or `sk_live_`)
4. For webhook secret, see "Webhook Setup" section below

### 4. Set Up Stripe Webhook

#### Local Development (using Stripe CLI)

1. Install Stripe CLI:
   ```bash
   # Windows (using Scoop)
   scoop install stripe
   
   # macOS (using Homebrew)
   brew install stripe/stripe-cli/stripe
   
   # Or download from: https://stripe.com/docs/stripe-cli
   ```

2. Login to Stripe:
   ```bash
   stripe login
   ```

3. Forward webhooks to local server:
   ```bash
   stripe listen --forward-to localhost:5008/api/payment/webhook
   ```

4. Copy the webhook signing secret (starts with `whsec_`) to your `.env` file

#### Production Deployment

1. Go to Stripe Dashboard → **Developers** → **Webhooks**
2. Click **Add endpoint**
3. Enter your webhook URL: `https://your-domain.com/api/payment/webhook`
4. Select events to listen for:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the signing secret to your production `.env` file

---

## API Endpoints

### 1. Create Checkout Session

**POST** `/api/payment/create-checkout-session`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

**Response:**
```json
{
  "sessionId": "cs_test_xxxxx",
  "url": "https://checkout.stripe.com/c/pay/cs_test_xxxxx"
}
```

**Usage:**
```javascript
const response = await fetch('/api/payment/create-checkout-session', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
});

const { url } = await response.json();
window.location.href = url; // Redirect to Stripe Checkout
```

---

### 2. Get Subscription Status

**GET** `/api/payment/subscription-status`

**Headers:**
```
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

---

### 3. Verify Payment

**GET** `/api/payment/verify?sessionId=cs_test_xxxxx`

**Headers:**
```
Authorization: Bearer <JWT_TOKEN>
```

**Response:**
```json
{
  "message": "Payment verified successfully",
  "subscription": {
    "status": "active",
    "paidAt": "2026-02-25T10:30:00.000Z",
    "hasAccess": true
  }
}
```

---

### 4. Webhook Endpoint

**POST** `/api/payment/webhook`

**Headers:**
```
stripe-signature: <STRIPE_SIGNATURE>
Content-Type: application/json
```

**Note:** This endpoint is called by Stripe, not your frontend. It must receive raw body (not JSON parsed).

---

## User Model

The User model now includes a `subscription` field:

```javascript
{
  subscription: {
    status: "free" | "active",      // Default: "free"
    paidAt: Date,                    // When payment was made
    stripeCustomerId: String,        // Stripe customer ID
    stripePaymentIntentId: String    // Payment intent ID
  }
}
```

**States:**
- `free` - No payment made (default)
- `active` - Payment confirmed, has access to premium content

---

## Protecting Premium Routes

### Using `requireActiveSubscription` Middleware

This middleware blocks access if subscription is not active:

```javascript
const { protect } = require('./middleware/authMiddleware');
const { requireActiveSubscription } = require('./middleware/subscriptionMiddleware');

// Protect premium lesson
router.get('/lessons/:id', 
  protect,                      // Check if user is logged in
  requireActiveSubscription,    // Check if subscription is active
  getLessonById
);
```

**Error Response (403):**
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

### Using `checkSubscription` Middleware (Optional)

This middleware adds subscription info to `req` object without blocking:

```javascript
router.get('/courses', 
  protect,
  checkSubscription,  // Adds req.subscription
  (req, res) => {
    // Access subscription info
    if (req.subscription.hasAccess) {
      // Show premium content
    } else {
      // Show limited content
    }
  }
);
```

---

## Frontend Integration Example

### 1. Payment Flow Component

```javascript
import { useState } from 'react';

function PaymentPage() {
  const [loading, setLoading] = useState(false);
  
  const handlePayment = async () => {
    setLoading(true);
    
    try {
      const response = await fetch('/api/payment/create-checkout-session', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      const { url } = await response.json();
      
      // Redirect to Stripe Checkout
      window.location.href = url;
      
    } catch (error) {
      console.error('Payment error:', error);
      alert('Failed to initiate payment');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div>
      <h2>Unlock Premium Access</h2>
      <p>One-time payment: ₦3,000</p>
      <p>Lifetime access to all courses</p>
      <button onClick={handlePayment} disabled={loading}>
        {loading ? 'Processing...' : 'Pay Now'}
      </button>
    </div>
  );
}
```

### 2. Payment Success Page

```javascript
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const [verifying, setVerifying] = useState(true);
  const [success, setSuccess] = useState(false);
  
  useEffect(() => {
    const sessionId = searchParams.get('session_id');
    
    if (sessionId) {
      verifyPayment(sessionId);
    }
  }, [searchParams]);
  
  const verifyPayment = async (sessionId) => {
    try {
      const response = await fetch(
        `/api/payment/verify?sessionId=${sessionId}`,
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      const data = await response.json();
      
      if (data.subscription.hasAccess) {
        setSuccess(true);
      }
    } catch (error) {
      console.error('Verification error:', error);
    } finally {
      setVerifying(false);
    }
  };
  
  if (verifying) {
    return <div>Verifying payment...</div>;
  }
  
  if (success) {
    return (
      <div>
        <h2>✅ Payment Successful!</h2>
        <p>You now have lifetime access to all premium courses!</p>
        <a href="/dashboard">Go to Dashboard</a>
      </div>
    );
  }
  
  return <div>Payment verification failed</div>;
}
```

### 3. Subscription Status Hook

```javascript
import { useState, useEffect } from 'react';

export function useSubscription() {
  const [subscription, setSubscription] = useState({
    status: 'free',
    hasAccess: false,
    loading: true
  });
  
  useEffect(() => {
    fetchSubscriptionStatus();
  }, []);
  
  const fetchSubscriptionStatus = async () => {
    try {
      const response = await fetch('/api/payment/subscription-status', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      const data = await response.json();
      setSubscription({
        ...data.subscription,
        loading: false
      });
    } catch (error) {
      console.error('Subscription status error:', error);
      setSubscription(prev => ({ ...prev, loading: false }));
    }
  };
  
  return { subscription, refresh: fetchSubscriptionStatus };
}

// Usage
function Dashboard() {
  const { subscription } = useSubscription();
  
  if (subscription.loading) {
    return <div>Loading...</div>;
  }
  
  if (!subscription.hasAccess) {
    return <div>Please upgrade to access premium content</div>;
  }
  
  return <div>Welcome to premium content!</div>;
}
```

---

## Security Best Practices

### ✅ Implemented Security Features

1. **Backend Verification Only**
   - Payment status is ONLY updated via Stripe webhook
   - Frontend cannot fake payment status
   - User subscription is checked on backend for every request

2. **Webhook Signature Verification**
   - Every webhook is verified using Stripe signature
   - Prevents fake webhook requests

3. **JWT Authentication**
   - All payment endpoints require valid JWT token
   - User identity is verified before processing

4. **Metadata Validation**
   - User ID is stored in Stripe session metadata
   - Prevents payment hijacking

5. **Environment Variables**
   - Secrets stored in `.env` file
   - Never committed to git

### ⚠️ Additional Recommendations

1. **Use HTTPS in Production**
   - Required for Stripe webhooks
   - Protects sensitive data

2. **Enable Stripe Radar**
   - Fraud detection
   - Block suspicious transactions

3. **Log All Payment Events**
   - Track payment attempts
   - Monitor for anomalies

4. **Rate Limiting**
   - Prevent checkout session spam
   - Use express-rate-limit

5. **Input Validation**
   - Validate all user inputs
   - Sanitize data before database operations

---

## Testing

### Test Mode

Stripe provides test mode with test keys (starting with `sk_test_`).

**Test Card Numbers:**

| Card Number | Description |
|------------|-------------|
| 4242 4242 4242 4242 | Successful payment |
| 4000 0000 0000 0002 | Card declined |
| 4000 0000 0000 9995 | Insufficient funds |

**Test Details:**
- Any future expiry date (e.g., 12/34)
- Any 3-digit CVC
- Any postal code

### Testing Webhooks Locally

```bash
# Terminal 1: Run your backend
npm run dev

# Terminal 2: Run Stripe CLI
stripe listen --forward-to localhost:5008/api/payment/webhook

# Terminal 3: Trigger test webhook
stripe trigger checkout.session.completed
```

---

## Troubleshooting

### Webhook Not Receiving Events

1. **Check Stripe CLI is running:**
   ```bash
   stripe listen --forward-to localhost:5008/api/payment/webhook
   ```

2. **Verify webhook secret in `.env`:**
   ```env
   STRIPE_WEBHOOK_SECRET=whsec_xxxxx
   ```

3. **Check webhook endpoint is accessible:**
   - Route must be BEFORE `express.json()` middleware
   - Uses `express.raw()` for raw body

### Payment Successful but Subscription Not Updated

1. **Check webhook logs in Stripe Dashboard:**
   - Go to Developers → Webhooks
   - Click on your endpoint
   - View recent events and their responses

2. **Check server logs:**
   - Look for "Subscription activated for user" message
   - Check for any error messages

3. **Verify events are selected:**
   - `checkout.session.completed`
   - `payment_intent.succeeded`

### "Premium subscription required" Error

1. **Check user's subscription status:**
   ```javascript
   GET /api/payment/subscription-status
   ```

2. **Manually update in database (for testing):**
   ```javascript
   // In MongoDB
   db.users.updateOne(
     { email: "test@example.com" },
     { 
       $set: { 
         "subscription.status": "active",
         "subscription.paidAt": new Date()
       }
     }
   )
   ```

---

## Going Live (Production)

### 1. Switch to Live Keys

Update `.env` with live keys (starting with `sk_live_`):

```env
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

### 2. Set Up Production Webhook

1. Go to Stripe Dashboard → **Webhooks**
2. Add endpoint: `https://your-domain.com/api/payment/webhook`
3. Select events: `checkout.session.completed`, `payment_intent.succeeded`
4. Copy signing secret to `.env`

### 3. Update Frontend URL

```env
FRONTEND_URL=https://your-production-domain.com
```

### 4. Enable HTTPS

- Required for webhooks
- Use Let's Encrypt or cloud provider SSL

### 5. Test in Production

1. Make a real payment with a real card
2. Check webhook is received
3. Verify subscription is updated
4. Test premium content access

---

## Support

For issues or questions:

1. **Stripe Documentation:** https://stripe.com/docs
2. **Stripe Support:** https://support.stripe.com
3. **DevNest Issues:** [GitHub Issues](#)

---

## License

This payment system is part of DevNest platform.
