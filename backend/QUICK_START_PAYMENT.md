# Quick Start Guide - Manual Payment System

## 🎯 What Was Implemented

Your DevNest platform now has a complete manual payment verification system without Stripe or Paystack.

---

## ✅ Summary of Changes

### 1. **Models (Already Configured)**
- ✅ User model has `subscription.status` and `subscription.paidAt`
- ✅ Payment model stores proof images and references
- ✅ Course model has `isPremium` flag

### 2. **Controllers**
- ✅ `paymentController.js` - Complete rewrite for manual verification
  - Submit payment proof
  - Approve/reject payments
  - Get payment statistics
  - Admin payment management

### 3. **Routes**
- ✅ `paymentRoutes.js` - New routes with file upload
- ✅ `courseRoutes.js` - Protected with subscription middleware
- ✅ `moduleRoutes.js` - Protected with subscription middleware
- ✅ `lessonRoutes.js` - Protected with subscription middleware

### 4. **Middleware**
- ✅ `authMiddleware.js` - Added `protect` and `isAdmin` functions
- ✅ `subscriptionMiddleware.js` - Already has `requireActiveSubscription`

### 5. **Dependencies**
- ✅ Added `multer` for file uploads
- ✅ Removed `stripe` dependency

---

## 🚀 Getting Started (5 Steps)

### Step 1: Install Dependencies

```bash
cd backend
npm install
```

This will install multer and all other dependencies.

### Step 2: Create Admin User

Edit `createAdmin.js` and change:
- Email (line 34)
- Password (line 35)

Then run:
```bash
node createAdmin.js
```

### Step 3: Start the Server

```bash
npm run dev
```

Server will run on `http://localhost:5008`

### Step 4: Test as User

1. Register/login as regular user
2. Submit payment proof:
```bash
POST /api/payment/submit-proof
- reference: "TRX123456"
- proofImage: [upload file]
```

### Step 5: Test as Admin

1. Login as admin
2. View pending payments:
```bash
GET /api/payment/pending
```
3. Approve payment:
```bash
PUT /api/payment/approve/:paymentId
```

---

## 📁 File Structure

```
backend/
├── controllers/
│   └── paymentController.js         ✨ NEW - Manual verification logic
├── routes/
│   └── paymentRoutes.js             ✨ UPDATED - File upload support
│   └── courseRoutes.js              ✨ UPDATED - Protected routes
│   └── moduleRoutes.js              ✨ UPDATED - Protected routes
│   └── lessonRoutes.js              ✨ UPDATED - Protected routes
├── middleware/
│   └── authMiddleware.js            ✨ UPDATED - protect & isAdmin
│   └── subscriptionMiddleware.js    ✅ Already exists
├── models/
│   └── User.js                      ✅ Already configured
│   └── Payment.js                   ✅ Already configured
│   └── Course.js                    ✨ UPDATED - Added isPremium
├── uploads/
│   └── payment-proofs/              ✨ NEW - Auto-created
├── createAdmin.js                   ✨ NEW - Admin setup script
├── MANUAL_PAYMENT_SYSTEM.md         ✨ NEW - Full documentation
├── BANK_TRANSFER_INSTRUCTIONS.md    ✨ NEW - User instructions
└── package.json                     ✨ UPDATED - Added multer
```

---

## 🔐 API Endpoints Overview

### **For Users:**
- `POST /api/payment/submit-proof` - Submit payment
- `GET /api/payment/my-status` - Check status

### **For Admins:**
- `GET /api/payment/pending` - View pending
- `GET /api/payment/all` - All payments
- `PUT /api/payment/approve/:id` - Approve
- `PUT /api/payment/reject/:id` - Reject
- `GET /api/payment/stats` - Statistics
- `GET /api/payment/proof/:filename` - View image

### **Protected Routes (require active subscription):**
- `GET /api/courses/:slug`
- `GET /api/modules/:courseId`
- `GET /api/lessons/:moduleId`

---

## 🎓 User Flow

```
1. User pays ₦3,000 via bank transfer
         ↓
2. User submits proof (screenshot + reference)
         ↓
3. User.subscription.status = "pending"
         ↓
4. Admin reviews payment proof
         ↓
5a. APPROVED                    5b. REJECTED
    ↓                               ↓
    subscription.status = "active"  subscription.status = "free"
    ↓                               ↓
    Lifetime access granted         User can resubmit
```

---

## 🧪 Testing Commands

### Test User Registration:
```bash
curl -X POST http://localhost:5008/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'
```

### Test Payment Submission:
```bash
curl -X POST http://localhost:5008/api/payment/submit-proof \
  -H "Authorization: Bearer USER_TOKEN" \
  -F "reference=TRX123456789" \
  -F "proofImage=@screenshot.jpg"
```

### Test Admin Approval:
```bash
curl -X PUT http://localhost:5008/api/payment/approve/PAYMENT_ID \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"note":"Verified"}'
```

---

## ⚠️ Important Configuration

### 1. Update Bank Details

Edit `BANK_TRANSFER_INSTRUCTIONS.md` with your actual:
- Bank name
- Account number
- Account name
- Contact information

### 2. Environment Variables

Ensure `.env` has:
```env
PORT=5008
MONGODB_URI=mongodb://localhost:27017/devnest
JWT_SECRET=your_super_secret_jwt_key_here
NODE_ENV=development
```

### 3. CORS Configuration

If you're running frontend on different port, update `index.js`:
```javascript
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  credentials: true
}));
```

---

## 📊 Database Indexes

The Payment model has indexes for performance:
- `{ user: 1, status: 1 }` - User payment queries
- `{ status: 1, createdAt: -1 }` - Admin pending list

---

## 🔒 Security Features

✅ **File Upload Protection:**
- Max 5MB file size
- Only image formats allowed
- Unique filenames with user ID

✅ **Payment Validation:**
- No duplicate references
- One pending payment per user
- Already subscribed users blocked

✅ **Admin Protection:**
- Only admins can approve/reject
- Audit trail (who approved, when)
- Admin notes for rejections

✅ **JWT Authentication:**
- All routes protected with JWT
- Token expiration handled
- Role-based access control

---

## 🐛 Common Issues & Solutions

### Issue: "protect is not a function"
**Solution:** Updated `authMiddleware.js` exports `{ protect, isAdmin }`

### Issue: "Cannot find module 'multer'"
**Solution:** Run `npm install multer`

### Issue: File upload fails
**Solution:** `uploads/payment-proofs/` directory auto-created on first run

### Issue: Cannot approve payment
**Solution:** Ensure:
1. Logged in as admin (role: "admin")
2. Payment status is "pending"
3. Payment ID is correct

---

## 📈 Next Steps

1. **Frontend Integration:**
   - Create payment submission form
   - Build admin dashboard for approvals
   - Show payment status to users

2. **Email Notifications:**
   - Send email when payment submitted
   - Send email when approved/rejected
   - Use existing nodemailer setup

3. **Production Deployment:**
   - Use cloud storage for images (AWS S3, Cloudinary)
   - Set up proper logging
   - Configure backup system

4. **Analytics:**
   - Track payment conversion rate
   - Monitor rejection reasons
   - Revenue tracking

---

## 📚 Documentation Files

- `MANUAL_PAYMENT_SYSTEM.md` - Complete API documentation
- `BANK_TRANSFER_INSTRUCTIONS.md` - User-facing payment guide
- `createAdmin.js` - Admin user creation script
- This file - Quick start guide

---

## ✨ Key Features

✅ No Stripe or Paystack required
✅ Manual admin verification
✅ One-time ₦3,000 payment
✅ Lifetime access
✅ File upload with validation
✅ Duplicate prevention
✅ Admin audit trail
✅ Protected premium routes
✅ Payment statistics
✅ Clean error handling

---

## 🎉 You're Ready!

Your manual payment system is fully implemented and production-ready.

**Next immediate steps:**
1. Run `npm install`
2. Run `node createAdmin.js`
3. Start server with `npm run dev`
4. Test payment flow
5. Build frontend integration

---

Need help? Check `MANUAL_PAYMENT_SYSTEM.md` for detailed API docs.

**Status:** ✅ Complete & Ready to Use
