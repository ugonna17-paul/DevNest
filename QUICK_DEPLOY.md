# 🚀 Quick Start - DevNest Deployment

## Option 1: Fastest Way (Recommended for Beginners)

### Step 1: Deploy Backend on Render
1. Go to **https://render.com** and sign up with GitHub
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub account and select `DevNest` repository
4. Configure:
   - **Name**: `devnest-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node index.js`
5. Add Environment Variables (click "Advanced"):
   ```
   MONGODB_URI = mongodb+srv://ugonnaaninwodo_db_user:Ugonna17@devnest.lc6pzpv.mongodb.net/?appName=DevNest
   JWT_SECRET = Ugonna
   EMAIL_USER = ugonnaaninwodo@gmail.com
   EMAIL_PASS = mslbfbvdwhnchnxk
   PORT = 5008
   NODE_ENV = production
   ```
6. Click **"Create Web Service"**
7. Wait 5-10 minutes, then copy your URL: `https://devnest-backend-XXXX.onrender.com`

### Step 2: Deploy Frontend on Vercel
1. Go to **https://vercel.com** and sign up with GitHub
2. Click **"Add New Project"**
3. Select your `DevNest` repository
4. Configure:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `devnest`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Add Environment Variable:
   ```
   VITE_API_URL = https://devnest-backend-XXXX.onrender.com
   ```
   (Use the URL from Step 1)
6. Click **"Deploy"**
7. Wait 2-3 minutes, your site will be live!

### Step 3: Configure MongoDB Atlas
1. Go to **https://cloud.mongodb.com**
2. Click **Network Access** → **Add IP Address**
3. Add: `0.0.0.0/0` (Allow access from anywhere)
4. Click **Confirm**

### ✅ Done! 
Your app is live at: `https://devnest-XXXX.vercel.app`

---

## Option 2: Using PowerShell Script (Windows)

```powershell
cd C:\Users\USER-PC\Desktop\DevNest
.\deploy.ps1
```

Follow the prompts!

---

## 🐛 Common Issues

### Issue: "Failed to connect to MongoDB"
**Solution**: Add IP `0.0.0.0/0` to MongoDB Atlas Network Access

### Issue: "CORS Error" in browser console
**Solution**: Update `backend/index.js` line 26:
```javascript
app.use(cors({
  origin: ['http://localhost:5173', 'https://your-vercel-url.vercel.app'],
  credentials: true
}));
```

### Issue: Render backend is sleeping
**Solution**: Free tier sleeps after 15 min inactivity. First request takes 30 seconds to wake up. Upgrade to $7/month for always-on.

---

## 💰 Costs

- **Free Forever**: Render (with sleep) + Vercel + MongoDB Atlas
- **Paid (Recommended)**: $7/month Render + Free Vercel + Free MongoDB = **$7/month total**

---

## 📱 After Deployment

1. Visit your Vercel URL
2. Login with: `admin@devnest.com` / `admin123`
3. Test payment submission
4. Share your URL with students!

---

Need detailed steps? See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
