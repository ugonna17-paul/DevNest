# DevNest Backend - Quick Start Guide

## 🚀 Getting Started in 3 Steps

### Step 1: Install Dependencies
```powershell
cd backend
npm install
```

### Step 2: Set Up Environment
Create a `.env` file in the `backend` folder:
```env
PORT=5008
MONGODB_URI=mongodb://localhost:27017/devnest
JWT_SECRET=devnest_secret_key_2024
NODE_ENV=development
```

### Step 3: Seed Database & Start Server
```powershell
# Seed the database with courses (run once)
node seed.js

# Start the server
npm start
```

Server will be running at `http://localhost:5008` ✅

---

## 📋 What's Included

After seeding, you'll have:
- ✅ 3 complete courses (HTML, CSS, JavaScript)
- ✅ 8 modules with organized content
- ✅ 17 detailed lessons with code examples
- ✅ Full REST API ready to use

---

## 🧪 Test the API

**1. Register a user:**
```powershell
Invoke-RestMethod -Uri "http://localhost:5008/api/auth/register" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

**2. Get all courses:**
```powershell
Invoke-RestMethod -Uri "http://localhost:5008/api/courses"
```

**3. Get a specific course:**
```powershell
Invoke-RestMethod -Uri "http://localhost:5008/api/courses/javascript"
```

---

## 📚 API Endpoints Overview

| Endpoint | Method | Auth | Description |
|----------|--------|------|-------------|
| `/api/auth/register` | POST | No | Register new user |
| `/api/auth/login` | POST | No | Login user |
| `/api/auth/update-profile` | PUT | Yes | Update profile |
| `/api/auth/change-password` | PUT | Yes | Change password |
| `/api/courses` | GET | No | Get all courses |
| `/api/courses/:slug` | GET | No | Get course by slug |
| `/api/modules/:courseId` | GET | No | Get course modules |
| `/api/lessons/:moduleId` | GET | No | Get module lessons |
| `/api/lessons/single/:lessonId` | GET | No | Get single lesson |
| `/api/progress` | POST | Yes | Mark lesson complete |
| `/api/progress` | GET | Yes | Get user progress |
| `/api/dashboard` | GET | Yes | Get dashboard stats |
| `/api/run-code` | POST | No | Run playground code |

---

## 🔑 Authentication

Protected endpoints require a JWT token:

```javascript
headers: {
  'Authorization': 'Bearer YOUR_TOKEN_HERE'
}
```

You get the token when you register or login.

---

## 🗃️ Database Structure

```
Course (e.g., "JavaScript Essentials")
  └── Module (e.g., "JavaScript Fundamentals")
      └── Lesson (e.g., "Variables and Data Types")
          └── Progress (user completion tracking)
```

---

## 💡 Useful Commands

**Re-seed database (clear and repopulate):**
```powershell
node seed.js
```

**Check if server is running:**
```powershell
Invoke-RestMethod -Uri "http://localhost:5008"
```

**View all API endpoints:**
Visit: `http://localhost:5008` in your browser

---

## 🐛 Troubleshooting

**MongoDB connection error?**
- Make sure MongoDB is running: `mongod`
- Check your MONGODB_URI in `.env`

**Port already in use?**
- Change PORT in `.env` to another number (e.g., 5009)

**JWT errors?**
- Make sure JWT_SECRET is set in `.env`
- Check token expiration (tokens last 7 days)

---

## 📖 Full Documentation

See [API_DOCUMENTATION.md](./API_DOCUMENTATION.md) for:
- Complete endpoint details
- Request/response examples
- Data models
- Production deployment guide

---

**Ready to build something awesome! 🚀**
