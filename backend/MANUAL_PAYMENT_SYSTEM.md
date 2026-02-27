# Manual Payment Verification System - Documentation

## Overview

This is a complete manual payment verification system for DevNest that allows users to pay ₦3000 via bank transfer for lifetime premium access. No Stripe or Paystack integration required.

---

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

If you encounter any issues, install multer specifically:
```bash
npm install multer
```

### 2. Environment Variables

Make sure your `.env` file includes:

```env
PORT=5008
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

### 3. Create Admin User

You need at least one admin user to approve payments. Update a user's role to 'admin' in MongoDB:

```javascript
// Using MongoDB Compass or mongosh
db.users.updateOne(
  { email: "admin@devnest.com" },
  { $set: { role: "admin" } }
)
```

### 4. Start the Server

```bash
npm run dev
```

---

## 📋 System Features

### ✅ User Model Updates
- `subscription.status`: "free" | "pending" | "active"
- `subscription.paidAt`: Date when payment was approved

### ✅ Payment Model
- Stores payment proof image
- Transaction reference
- Status tracking (pending/approved/rejected)
- Admin notes

### ✅ Middleware
- `protect`: JWT authentication
- `isAdmin`: Admin-only access
- `requireActiveSubscription`: Blocks non-paying users from premium content

---

## 🔐 API Endpoints

### **USER ENDPOINTS**

#### 1. Submit Payment Proof
```http
POST /api/payment/submit-proof
Authorization: Bearer <token>
Content-Type: multipart/form-data

Body:
- reference: String (transaction reference)
- proofImage: File (screenshot of payment)
```

**Response:**
```json
{
  "message": "Payment proof submitted successfully. Awaiting admin approval.",
  "payment": {
    "id": "payment_id",
    "reference": "TRX123456",
    "amount": 3000,
    "status": "pending",
    "submittedAt": "2026-02-25T10:00:00.000Z"
  }
}
```

#### 2. Get My Payment Status
```http
GET /api/payment/my-status
Authorization: Bearer <token>
```

**Response:**
```json
{
  "subscription": {
    "status": "pending",
    "paidAt": null,
    "hasAccess": false
  },
  "payments": [
    {
      "id": "payment_id",
      "reference": "TRX123456",
      "amount": 3000,
      "status": "pending",
      "submittedAt": "2026-02-25T10:00:00.000Z"
    }
  ]
}
```

---

### **ADMIN ENDPOINTS**

#### 3. Get Pending Payments
```http
GET /api/payment/pending
Authorization: Bearer <admin_token>
```

**Response:**
```json
{
  "count": 5,
  "payments": [
    {
      "id": "payment_id",
      "user": {
        "id": "user_id",
        "name": "John Doe",
        "email": "john@example.com"
      },
      "amount": 3000,
      "reference": "TRX123456",
      "proofImage": "uploads/payment-proofs/payment-xxx.jpg",
      "status": "pending",
      "submittedAt": "2026-02-25T10:00:00.000Z"
    }
  ]
}
```

#### 4. Get All Payments (with filters)
```http
GET /api/payment/all?status=approved&page=1&limit=20
Authorization: Bearer <admin_token>
```

Query Parameters:
- `status`: "pending" | "approved" | "rejected" (optional)
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 50)

#### 5. Approve Payment
```http
PUT /api/payment/approve/:paymentId
Authorization: Bearer <admin_token>
Content-Type: application/json

Body:
{
  "note": "Payment verified" (optional)
}
```

**What happens:**
- ✅ Payment status → "approved"
- ✅ User subscription.status → "active"
- ✅ User subscription.paidAt → current date
- ✅ User gets lifetime access

**Response:**
```json
{
  "message": "Payment approved successfully",
  "payment": {
    "id": "payment_id",
    "reference": "TRX123456",
    "status": "approved",
    "approvedAt": "2026-02-25T11:00:00.000Z"
  },
  "user": {
    "id": "user_id",
    "email": "john@example.com",
    "subscription": {
      "status": "active",
      "paidAt": "2026-02-25T11:00:00.000Z"
    }
  }
}
```

#### 6. Reject Payment
```http
PUT /api/payment/reject/:paymentId
Authorization: Bearer <admin_token>
Content-Type: application/json

Body:
{
  "note": "Invalid transaction reference" (required, min 10 chars)
}
```

**What happens:**
- ❌ Payment status → "rejected"
- ❌ User subscription.status → "free"
- ❌ User does NOT get access

#### 7. Get Payment Statistics
```http
GET /api/payment/stats
Authorization: Bearer <admin_token>
```

**Response:**
```json
{
  "stats": {
    "payments": {
      "pending": 5,
      "approved": 120,
      "rejected": 3,
      "total": 128
    },
    "revenue": 360000,
    "activeSubscriptions": 120
  }
}
```

#### 8. View Payment Proof Image
```http
GET /api/payment/proof/:filename
Authorization: Bearer <admin_token>
```

Returns the uploaded payment screenshot.

---

## 🛡️ Protected Routes

All premium content routes now require:
1. Valid JWT token (`protect` middleware)
2. Active subscription (`requireActiveSubscription` middleware)

### Protected Endpoints:
- `GET /api/courses/:slug` - View course details
- `GET /api/modules/:courseId` - Get course modules
- `GET /api/modules/single/:moduleId` - Get single module
- `GET /api/lessons/:moduleId` - Get lessons by module
- `GET /api/lessons/course/:courseId` - Get lessons by course
- `GET /api/lessons/single/:lessonId` - Get single lesson

---

## 🔄 User Flow

### For Users:

1. **Register/Login** → Get JWT token
2. **Pay ₦3000** via bank transfer
3. **Submit Payment Proof:**
   - Upload screenshot
   - Enter transaction reference
   - Status changes to "pending"
4. **Wait for Admin Approval**
5. **Access Granted** → subscription.status = "active"

### For Admins:

1. **Login as admin**
2. **View pending payments:** `GET /api/payment/pending`
3. **View payment proof image:** `GET /api/payment/proof/:filename`
4. **Verify transaction**
5. **Approve or Reject:**
   - Approve → User gets lifetime access
   - Reject → User stays on free plan

---

## 🗂️ File Upload Details

### Upload Configuration:
- **Allowed formats:** JPG, JPEG, PNG, GIF, WEBP
- **Max file size:** 5MB
- **Storage location:** `backend/uploads/payment-proofs/`
- **Filename format:** `payment-{userId}-{timestamp}-{random}.jpg`

### Error Handling:
- Missing reference → 400 error
- Missing image → 400 error
- File too large → 400 error
- Invalid file type → 400 error
- Duplicate reference → 400 error
- Already has pending payment → 400 error
- Already has active subscription → 400 error

---

## 🧪 Testing the System

### Test User Payment Submission:

```bash
curl -X POST http://localhost:5008/api/payment/submit-proof \
  -H "Authorization: Bearer YOUR_USER_TOKEN" \
  -F "reference=TRX123456789" \
  -F "proofImage=@/path/to/screenshot.jpg"
```

### Test Admin Approval:

```bash
curl -X PUT http://localhost:5008/api/payment/approve/PAYMENT_ID \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"note": "Payment verified successfully"}'
```

---

## 📊 Database Collections

### Users Collection:
```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  password: String (hashed),
  role: "user" | "admin",
  subscription: {
    status: "free" | "pending" | "active",
    paidAt: Date
  },
  createdAt: Date,
  updatedAt: Date
}
```

### Payments Collection:
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: User),
  amount: 3000,
  reference: String,
  proofImage: String (file path),
  status: "pending" | "approved" | "rejected",
  adminNote: String,
  approvedBy: ObjectId (ref: User),
  approvedAt: Date,
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔧 Troubleshooting

### Issue: "No token provided"
**Solution:** Include JWT token in Authorization header:
```
Authorization: Bearer your_jwt_token_here
```

### Issue: "Access denied. Admin privileges required"
**Solution:** Update user role to 'admin' in database.

### Issue: "Premium subscription required"
**Solution:** User must:
1. Submit payment proof
2. Wait for admin approval
3. Get subscription.status = "active"

### Issue: File upload fails
**Solution:** 
- Check file size (max 5MB)
- Check file format (only images allowed)
- Ensure uploads directory exists and is writable

### Issue: Cannot approve payment
**Solution:**
- Verify you're logged in as admin
- Check payment exists and status is "pending"
- Payment can only be approved/rejected once

---

## 🎯 Key Features

✅ **No third-party payment processors** (No Stripe/Paystack)
✅ **Manual verification** by admin
✅ **One-time payment** of ₦3000
✅ **Lifetime access** once approved
✅ **File upload protection** (max 5MB, images only)
✅ **Duplicate prevention** (same reference cannot be submitted twice)
✅ **Proper error handling** with descriptive messages
✅ **Admin audit trail** (who approved, when approved)
✅ **Payment statistics** for admin dashboard

---

## 📝 Important Notes

1. **Payment is one-time only** - Once approved, users have lifetime access
2. **Admins must manually verify** bank transfer before approval
3. **Users can only have ONE pending payment** at a time
4. **Rejected payments** can resubmit with new reference
5. **File uploads are stored locally** in `uploads/payment-proofs/`
6. **All premium routes are protected** with subscription middleware
7. **JWT token required** for all authenticated endpoints

---

## 🚀 Production Checklist

Before deploying to production:

- [ ] Set up production MongoDB database
- [ ] Configure proper JWT_SECRET (long, random string)
- [ ] Set up proper file storage (consider cloud storage for production)
- [ ] Configure CORS for your frontend domain
- [ ] Set up HTTPS for secure file uploads
- [ ] Create admin accounts
- [ ] Test payment flow end-to-end
- [ ] Set up backup system for payment proof images
- [ ] Configure proper logging for payment transactions
- [ ] Set up email notifications for payment submissions/approvals

---

## 🎓 Next Steps

1. Install dependencies: `npm install`
2. Create an admin user in database
3. Test payment submission as regular user
4. Test approval/rejection as admin
5. Verify premium content is protected
6. Build admin dashboard for payment management

---

## 📞 Support

For issues or questions:
- Check error messages in server logs
- Verify all environment variables are set
- Ensure MongoDB is running
- Check user role is set to 'admin' for admin operations

---

**System Status:** ✅ Production Ready
**Payment Method:** Manual Bank Transfer Verification
**Payment Amount:** ₦3,000 (One-time)
**Access Type:** Lifetime

---

*Last Updated: February 25, 2026*
