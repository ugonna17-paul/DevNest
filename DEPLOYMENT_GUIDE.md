# 🚀 DevNest Deployment Guide

Complete guide to deploy your DevNest application to production.

---

## 📋 Table of Contents
1. [Pre-Deployment Checklist](#pre-deployment-checklist)
2. [Backend Deployment (Render)](#backend-deployment)
3. [Frontend Deployment (Vercel)](#frontend-deployment)
4. [Environment Variables](#environment-variables)
5. [Post-Deployment](#post-deployment)

---

## ✅ Pre-Deployment Checklist

### 1. Ensure MongoDB Atlas is Ready
- ✅ Already configured: `mongodb+srv://ugonnaaninwodo_db_user:Ugonna17@devnest.lc6pzpv.mongodb.net/`
- ✅ Whitelist all IPs: Go to MongoDB Atlas → Network Access → Add `0.0.0.0/0` (allow from anywhere)

### 2. Prepare Environment Variables
You'll need these for deployment:
```
MONGODB_URI=mongodb+srv://ugonnaaninwodo_db_user:Ugonna17@devnest.lc6pzpv.mongodb.net/?appName=DevNest
JWT_SECRET=Ugonna
EMAIL_USER=ugonnaaninwodo@gmail.com
EMAIL_PASS=mslbfbvdwhnchnxk
PORT=5008
NODE_ENV=production
```

### 3. Test Locally
```bash
# Backend
cd backend
node index.js

# Frontend (new terminal)
cd devnest
npm run dev
```

---

## 🔧 Backend Deployment (Render.com)

### Step 1: Create Render Account
1. Go to https://render.com
2. Sign up with GitHub
3. Connect your GitHub account

### Step 2: Push Code to GitHub (If not already)
```bash
cd C:\Users\USER-PC\Desktop\DevNest

# Initialize git (if not already)
git init
git add .
git commit -m "Prepare for deployment"

# Create GitHub repository and push
git remote add origin https://github.com/YOUR_USERNAME/devnest.git
git branch -M main
git push -u origin main
```

### Step 3: Deploy Backend on Render

1. **Go to Render Dashboard**
   - Click "New +" → "Web Service"

2. **Connect Repository**
   - Select your GitHub repo
   - Root Directory: `backend`

3. **Configure Service**
   ```
   Name: devnest-backend
   Environment: Node
   Region: Choose closest to Nigeria (e.g., Frankfurt)
   Branch: main
   Root Directory: backend
   Build Command: npm install
   Start Command: node index.js
   ```

4. **Add Environment Variables**
   Click "Advanced" → "Add Environment Variable":
   ```
   MONGODB_URI = mongodb+srv://ugonnaaninwodo_db_user:Ugonna17@devnest.lc6pzpv.mongodb.net/?appName=DevNest
   JWT_SECRET = Ugonna
   EMAIL_USER = ugonnaaninwodo@gmail.com
   EMAIL_PASS = mslbfbvdwhnchnxk
   PORT = 5008
   NODE_ENV = production
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait 5-10 minutes for deployment
   - Copy your backend URL: `https://devnest-backend.onrender.com`

### ⚠️ Important: Update CORS
After deployment, update `backend/index.js`:
```javascript
app.use(cors({
  origin: ['http://localhost:5173', 'https://your-frontend-url.vercel.app'],
  credentials: true
}));
```

---

## 🎨 Frontend Deployment (Vercel)

### Step 1: Create Production Build Config

**Update `devnest/vite.config.js`:**
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173
  },
  build: {
    outDir: 'dist'
  }
})
```

**Create `devnest/.env.production`:**
```
VITE_API_URL=https://devnest-backend.onrender.com
```

### Step 2: Update API Calls

**Update all fetch URLs in frontend:**

Find all instances of `http://localhost:5008` and replace with:
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5008';
// Then use: `${API_URL}/api/...`
```

Example in `devnest/src/pages/Dashboard.jsx`:
```javascript
const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5008'}/api/dashboard`, {
  headers: { 'Authorization': `Bearer ${token}` }
});
```

### Step 3: Deploy to Vercel

1. **Install Vercel CLI** (Optional - or use Vercel website)
   ```bash
   npm install -g vercel
   ```

2. **Deploy via Vercel Website** (Recommended)
   - Go to https://vercel.com
   - Sign up with GitHub
   - Click "Add New Project"
   - Select your repository
   - Framework Preset: **Vite**
   - Root Directory: `devnest`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Environment Variables:
     ```
     VITE_API_URL = https://devnest-backend.onrender.com
     ```
   - Click "Deploy"

3. **Get Your URL**
   - Your site will be live at: `https://your-project.vercel.app`

---

## 🔐 Environment Variables Summary

### Backend (Render)
```env
MONGODB_URI=mongodb+srv://ugonnaaninwodo_db_user:Ugonna17@devnest.lc6pzpv.mongodb.net/?appName=DevNest
JWT_SECRET=Ugonna
EMAIL_USER=ugonnaaninwodo@gmail.com
EMAIL_PASS=mslbfbvdwhnchnxk
PORT=5008
NODE_ENV=production
```

### Frontend (Vercel)
```env
VITE_API_URL=https://devnest-backend.onrender.com
```

---

## 🎯 Post-Deployment Checklist

### 1. Test Backend
```bash
curl https://devnest-backend.onrender.com
# Should return: {"message":"DevNest API Running"...}
```

### 2. Test Frontend
- Visit: `https://your-project.vercel.app`
- Try logging in: admin@devnest.com / admin123
- Test payment submission
- Check admin dashboard

### 3. MongoDB Atlas Network Access
- Go to MongoDB Atlas → Network Access
- Add IP: `0.0.0.0/0` (Allow from anywhere)
- This allows Render to connect

### 4. Update Payment Screenshot Storage
- Render has ephemeral storage
- Consider using **Cloudinary** for file uploads:
  
  ```bash
  cd backend
  npm install cloudinary multer-storage-cloudinary
  ```

### 5. Monitor Logs
- **Render**: Dashboard → Your Service → Logs
- **Vercel**: Dashboard → Your Project → Deployments → View Function Logs

---

## 🔄 Quick Update Commands

### Update Backend
```bash
# Make changes, then:
git add .
git commit -m "Update backend"
git push

# Render auto-deploys! ✅
```

### Update Frontend
```bash
# Make changes, then:
git add .
git commit -m "Update frontend"
git push

# Vercel auto-deploys! ✅
```

---

## 🐛 Troubleshooting

### Backend won't start
- Check Render logs for errors
- Verify all environment variables are set
- Check MongoDB Atlas whitelist includes `0.0.0.0/0`

### Frontend can't connect to backend
- Verify `VITE_API_URL` is set correctly
- Check CORS settings in backend
- Open browser console (F12) to see errors

### Payment images not loading
- Render uses ephemeral storage
- Files uploaded will be deleted on restart
- Solution: Integrate Cloudinary for permanent storage

### Database connection fails
- Check MongoDB Atlas Network Access
- Verify connection string is correct
- Check if cluster is running

---

## 💰 Cost Breakdown

### Free Tier (Perfect for starting)
- **Render**: Free (sleeps after 15 min inactivity, starts in 30s)
- **Vercel**: Free (Unlimited deployments)
- **MongoDB Atlas**: Free (512MB storage, enough for 1000s of users)
- **Total**: $0/month 🎉

### Paid Tier (For serious traffic)
- **Render**: $7/month (always on, faster)
- **Vercel**: Free (Pro $20/month if you need teams)
- **MongoDB Atlas**: $9/month (M2 cluster)
- **Total**: ~$16/month

---

## 📱 Custom Domain (Optional)

### Vercel Custom Domain
1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain: `devnest.com`
3. Update DNS records as instructed

### Render Custom Domain
1. Go to Render Dashboard → Your Service → Settings → Custom Domain
2. Add: `api.devnest.com`
3. Update DNS CNAME record

---

## ✅ Final Production URLs

After deployment:
- **Frontend**: `https://devnest.vercel.app` (or your custom domain)
- **Backend API**: `https://devnest-backend.onrender.com`
- **Admin Login**: admin@devnest.com / admin123

---

## 🎉 Success!

Your DevNest platform is now live and accessible worldwide!

### Next Steps:
1. Share your URL with students
2. Monitor analytics in Vercel
3. Check Render logs for any backend errors
4. Set up custom domain (optional)
5. Enable auto-SSL (already included by Vercel & Render)

---

**Need help?** Check:
- Render Docs: https://render.com/docs
- Vercel Docs: https://vercel.com/docs
- MongoDB Atlas: https://www.mongodb.com/docs/atlas/
