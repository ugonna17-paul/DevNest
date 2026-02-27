# UPDATE BANK DETAILS

## Location
File: `devnest/src/pages/Settings.jsx`

Find this section (around line 234):

```jsx
<div className="mt-2 p-3 bg-[#0D1117] rounded-md">
  <p>Bank: <span className="text-[#C9D1D9]">[YOUR BANK NAME]</span></p>
  <p>Account Number: <span className="text-[#C9D1D9]">[YOUR ACCOUNT NUMBER]</span></p>
  <p>Account Name: <span className="text-[#C9D1D9]">[YOUR BUSINESS NAME]</span></p>
</div>
```

## Replace with your actual details:

```jsx
<div className="mt-2 p-3 bg-[#0D1117] rounded-md">
  <p>Bank: <span className="text-[#C9D1D9]">Access Bank</span></p>
  <p>Account Number: <span className="text-[#C9D1D9]">1234567890</span></p>
  <p>Account Name: <span className="text-[#C9D1D9]">DevNest Technologies</span></p>
</div>
```

---

## Testing the Payment Flow:

### As a User:
1. Login to your account
2. Go to Settings page
3. See subscription status (should show "Free Plan")
4. Fill in transaction reference
5. Upload payment screenshot
6. Click "Submit Payment Proof"
7. Status changes to "Pending"

### As an Admin:
1. Login as admin user
2. Go to: http://localhost:5008/api/payment/pending (or create admin dashboard)
3. View pending payments
4. Approve/reject payments
5. User gets instant access when approved

---

## Already Working:
✅ Backend API endpoints (all created)
✅ File upload with multer
✅ Payment status tracking
✅ Subscription middleware
✅ Course/lesson protection
✅ Frontend payment form
✅ Real-time status updates
✅ Payment history display

---

## Next: Test It!

1. Make sure server is running:
   ```bash
   cd backend
   node index.js
   ```

2. Make sure frontend is running:
   ```bash
   cd devnest
   npm run dev
   ```

3. Navigate to Settings and try the payment flow!
