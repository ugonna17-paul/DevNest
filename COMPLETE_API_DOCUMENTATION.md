# DevNest Documentation & Learning API System

Complete guide to the DevNest backend architecture, API endpoints, and implementation.

## 📋 Table of Contents
1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Database Models](#database-models)
4. [API Endpoints](#api-endpoints)
5. [Seed Data](#seed-data)
6. [Authentication](#authentication)
7. [Error Handling](#error-handling)
8. [Frontend Integration](#frontend-integration)
9. [Setup Instructions](#setup-instructions)

---

## 🎯 Overview

DevNest is a full-stack developer learning platform with:
- **6 Complete Courses**: HTML, CSS, JavaScript, React, Node.js, Tailwind CSS
- **32+ Lessons** with markdown documentation and code examples
- **Progress Tracking** system for authenticated users
- **Code Playground** for testing HTML/CSS/JavaScript
- **RESTful API** with JWT authentication

---

## 🛠 Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **dotenv** - Environment variables

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **Recharts** - Data visualization
- **React Toastify** - Notifications

---

## 📊 Database Models

### 1. User Model
**File**: `backend/models/User.js`

```javascript
{
    name: String (required, 3-50 chars),
    email: String (required, unique, lowercase),
    password: String (required, min 6 chars, hashed),
    isActive: Boolean (default: true),
    createdAt: Date (default: now)
}
```

### 2. Course Model
**File**: `backend/models/Course.js`

```javascript
{
    title: String (required, unique),
    description: String (required),
    level: String (enum: Beginner/Intermediate/Advanced),
    slug: String (required, unique),
    duration: String,
    prerequisites: [String],
    icon: String,
    totalLessons: Number,
    isPublished: Boolean (default: false),
    order: Number,
    createdAt: Date
}
```

### 3. Module Model
**File**: `backend/models/Module.js`

```javascript
{
    course: ObjectId (ref: Course, required),
    title: String (required),
    description: String,
    order: Number (required),
    isPublished: Boolean (default: false),
    createdAt: Date
}
```

### 4. Lesson Model
**File**: `backend/models/Lesson.js`

```javascript
{
    module: ObjectId (ref: Module, required),
    course: ObjectId (ref: Course, required),
    title: String (required),
    content: String (markdown, required),
    codeExample: String,
    duration: Number (minutes),
    order: Number (required),
    isPublished: Boolean (default: false),
    createdAt: Date
}
```

### 5. Progress Model
**File**: `backend/models/Progress.js`

```javascript
{
    user: ObjectId (ref: User, required),
    lesson: ObjectId (ref: Lesson, required),
    course: ObjectId (ref: Course, required),
    completed: Boolean (default: false),
    completedAt: Date,
    lastAccessedAt: Date,
    createdAt: Date
}
```

**Indexes**:
- `{ user: 1, lesson: 1 }` - unique compound index
- `{ user: 1, course: 1 }`
- `{ user: 1, completed: 1 }`

---

## 🔌 API Endpoints

### Authentication Routes
**Base**: `/api/auth`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/register` | No | Register new user |
| POST | `/login` | No | Login user |
| GET | `/profile` | Yes | Get current user profile |

#### Register User
```javascript
POST /api/auth/register
Content-Type: application/json

{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
}

Response:
{
    "success": true,
    "token": "jwt_token_here",
    "user": {
        "id": "user_id",
        "name": "John Doe",
        "email": "john@example.com"
    }
}
```

#### Login User
```javascript
POST /api/auth/login
Content-Type: application/json

{
    "email": "john@example.com",
    "password": "password123"
}

Response:
{
    "success": true,
    "token": "jwt_token_here",
    "user": {
        "id": "user_id",
        "name": "John Doe",
        "email": "john@example.com"
    }
}
```

### Course Routes
**Base**: `/api/courses`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | No | Get all published courses |
| GET | `/:slug` | No | Get course by slug with modules |

#### Get All Courses
```javascript
GET /api/courses

Response:
{
    "success": true,
    "count": 6,
    "data": [
        {
            "_id": "course_id",
            "title": "HTML Fundamentals",
            "slug": "html",
            "description": "Learn the building blocks...",
            "level": "Beginner",
            "duration": "4 hours",
            "icon": "📄",
            "totalLessons": 15
        }
    ]
}
```

#### Get Course by Slug
```javascript
GET /api/courses/html

Response:
{
    "success": true,
    "data": {
        "_id": "course_id",
        "title": "HTML Fundamentals",
        "slug": "html",
        "modules": [
            {
                "_id": "module_id",
                "title": "Getting Started",
                "order": 1,
                "lessons": [
                    {
                        "_id": "lesson_id",
                        "title": "What is HTML?",
                        "duration": 15,
                        "order": 1
                    }
                ]
            }
        ]
    }
}
```

### Module Routes
**Base**: `/api/modules`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/course/:courseId` | No | Get all modules for a course |

### Lesson Routes
**Base**: `/api/lessons`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/module/:moduleId` | No | Get all lessons in a module |
| GET | `/single/:lessonId` | No | Get single lesson with navigation |

#### Get Single Lesson
```javascript
GET /api/lessons/single/:lessonId

Response:
{
    "success": true,
    "data": {
        "_id": "lesson_id",
        "title": "What is HTML?",
        "content": "# What is HTML?\n\nHTML is...",
        "codeExample": "<!DOCTYPE html>...",
        "duration": 15,
        "course": {
            "_id": "course_id",
            "title": "HTML Fundamentals",
            "slug": "html"
        },
        "module": {
            "_id": "module_id",
            "title": "Getting Started"
        },
        "navigation": {
            "previous": "previous_lesson_id" | null,
            "next": "next_lesson_id" | null
        }
    }
}
```

### Progress Routes (Protected)
**Base**: `/api/progress`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/` | Yes | Mark lesson as complete |
| PUT | `/access` | Yes | Track lesson access |
| GET | `/` | Yes | Get user's all progress |
| GET | `/course/:courseId` | Yes | Get course progress percentage |

#### Mark Lesson Complete
```javascript
POST /api/progress
Authorization: Bearer {token}
Content-Type: application/json

{
    "lessonId": "lesson_id"
}

Response:
{
    "success": true,
    "data": {
        "_id": "progress_id",
        "user": "user_id",
        "lesson": "lesson_id",
        "course": "course_id",
        "completed": true,
        "completedAt": "2026-02-12T10:30:00.000Z"
    }
}
```

#### Get Course Progress
```javascript
GET /api/progress/course/:courseId
Authorization: Bearer {token}

Response:
{
    "success": true,
    "data": {
        "courseId": "course_id",
        "totalLessons": 20,
        "completedLessons": 5,
        "percentage": 25
    }
}
```

### Dashboard Route (Protected)
**Base**: `/api/dashboard`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/` | Yes | Get user dashboard data |

#### Get Dashboard Data
```javascript
GET /api/dashboard
Authorization: Bearer {token}

Response:
{
    "success": true,
    "data": {
        "stats": {
            "totalCompletedLessons": 12,
            "currentStreak": 3,
            "weeklyCompletedLessons": 5,
            "enrolledCoursesCount": 2
        },
        "lastAccessedLesson": {
            "lessonId": "lesson_id",
            "lessonTitle": "Variables in JavaScript",
            "courseTitle": "JavaScript Essentials",
            "lastAccessedAt": "2026-02-12T10:30:00.000Z"
        },
        "enrolledCourses": [
            {
                "courseId": "course_id",
                "title": "HTML Fundamentals",
                "icon": "📄",
                "totalLessons": 15,
                "completedLessons": 10,
                "percentage": 67
            }
        ]
    }
}
```

### Playground Route
**Base**: `/api`

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/run-code` | No | Execute HTML/CSS/JS code |

#### Run Code
```javascript
POST /api/run-code
Content-Type: application/json

{
    "html": "<h1>Hello</h1>",
    "css": "h1 { color: blue; }",
    "javascript": "console.log('Hello');"
}

Response:
{
    "success": true,
    "data": {
        "output": "<!DOCTYPE html>\n<html>...",
        "html": "<h1>Hello</h1>",
        "css": "h1 { color: blue; }",
        "javascript": "console.log('Hello');"
    }
}
```

---

## 🌱 Seed Data

**File**: `backend/seed.js`

The seed script populates the database with **6 complete courses**:

### 1. HTML Fundamentals
- **3 Modules**, **7 Lessons**
- Level: Beginner
- Duration: 4 hours
- Topics: Getting Started, Core Elements, Forms & Semantic Tags

### 2. CSS Styling
- **2 Modules**, **4 Lessons**
- Level: Beginner
- Duration: 5 hours
- Topics: Basics & Selectors, Layout & Responsive Design

### 3. JavaScript Essentials
- **3 Modules**, **6 Lessons**
- Level: Beginner
- Duration: 6 hours
- Topics: Fundamentals, Data & Functions, Async & DOM

### 4. React Development
- **2 Modules**, **5 Lessons**
- Level: Intermediate
- Duration: 8 hours
- Topics: Components & JSX, Hooks & Routing

### 5. Node.js Backend Development
- **2 Modules**, **5 Lessons**
- Level: Intermediate
- Duration: 10 hours
- Topics: Fundamentals, REST APIs & JWT Auth

### 6. Tailwind CSS Mastery
- **2 Modules**, **5 Lessons**
- Level: Beginner
- Duration: 6 hours
- Topics: Fundamentals, Responsive & Dark Mode

### Running Seed Script
```bash
cd backend
node seed.js
```

**Output**:
```
MongoDB connected for seeding...
Clearing existing data...
Creating HTML course...
Creating CSS course...
Creating JavaScript course...
Creating React course...
Creating Node.js course...
Creating Tailwind CSS course...

=== SEEDING COMPLETE ===
6 courses created with modules and lessons
- HTML Fundamentals (3 modules, 7 lessons)
- CSS Styling (2 modules, 4 lessons)
- JavaScript Essentials (3 modules, 6 lessons)
- React Development (2 modules, 5 lessons)
- Node.js Backend Development (2 modules, 5 lessons)
- Tailwind CSS Mastery (2 modules, 5 lessons)
```

---

## 🔐 Authentication

### JWT Implementation

**Middleware**: `backend/middleware/auth.js`

```javascript
const protect = async (req, res, next) => {
    let token;
    
    if (req.headers.authorization?.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Not authorized to access this route'
        });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.userId).select('-password');
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Invalid token'
        });
    }
};
```

### Usage in Routes
```javascript
const { protect } = require('../middleware/auth');

// Protected route
router.get('/dashboard', protect, getDashboardData);
router.post('/progress', protect, markLessonComplete);
```

### Token Storage (Frontend)
```javascript
// Store token after login
localStorage.setItem('token', result.token);

// Include in API requests
headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
}
```

---

## ⚠️ Error Handling

**Middleware**: `backend/middleware/errorHandler.js`

### Handled Error Types
1. **Validation Error** (400) - Mongoose validation
2. **Duplicate Key** (400) - Unique constraint violation
3. **Cast Error** (400) - Invalid ObjectId
4. **JWT Error** (401) - Invalid/expired token
5. **Server Error** (500) - Default errors

### Usage
```javascript
// In controller
try {
    const user = await User.create(userData);
    res.json({ success: true, data: user });
} catch (error) {
    next(error); // Pass to error handler
}

// In index.js
app.use(errorHandler); // Must be last middleware
```

### Error Response Format
```javascript
{
    "success": false,
    "message": "Error description",
    "errors": ["Additional error details"] // Optional
}
```

---

## 💻 Frontend Integration

### API Service File
**Location**: `devnest/src/services/apiService.js`

The API service provides all backend calls with proper error handling:

```javascript
import { loginUser, getAllCourses, getDashboardData } from './services/apiService';

// Login example
const handleLogin = async (credentials) => {
    try {
        const result = await loginUser(credentials);
        localStorage.setItem('token', result.token);
        navigate('/dashboard');
    } catch (error) {
        toast.error(error.message);
    }
};

// Fetch courses example
const fetchCourses = async () => {
    try {
        const result = await getAllCourses();
        setCourses(result.data);
    } catch (error) {
        console.error(error);
    }
};
```

### React Component Example
```javascript
import React, { useState, useEffect } from 'react';
import { getCourseBySlug } from '../services/apiService';

function CoursePage() {
    const [course, setCourse] = useState(null);
    const { slug } = useParams();
    
    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const result = await getCourseBySlug(slug);
                setCourse(result.data);
            } catch (error) {
                toast.error('Failed to load course');
            }
        };
        fetchCourse();
    }, [slug]);
    
    return (
        <div>
            <h1>{course?.title}</h1>
            {/* Render modules and lessons */}
        </div>
    );
}
```

---

## 🚀 Setup Instructions

### Backend Setup

1. **Install Dependencies**
```bash
cd backend
npm install
```

2. **Environment Variables**
Create `.env` file:
```env
PORT=5008
MONGODB_URI=mongodb://localhost:27017/devnest
JWT_SECRET=your_jwt_secret_key_here_change_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

3. **Start MongoDB**
```bash
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl start mongod
```

4. **Seed Database**
```bash
node seed.js
```

5. **Start Backend**
```bash
npm start
# Server runs on http://localhost:5008
```

### Frontend Setup

1. **Install Dependencies**
```bash
cd devnest
npm install
```

2. **Start Development Server**
```bash
npm run dev
# App runs on http://localhost:5173
```

### Testing API Endpoints

**Using Postman/Thunder Client:**

1. **Register User**
```
POST http://localhost:5008/api/auth/register
Body: { "name": "Test User", "email": "test@test.com", "password": "test123" }
```

2. **Login**
```
POST http://localhost:5008/api/auth/login
Body: { "email": "test@test.com", "password": "test123" }
Copy the token from response
```

3. **Get Dashboard (Protected)**
```
GET http://localhost:5008/api/dashboard
Headers: Authorization: Bearer <your_token>
```

4. **Get Courses**
```
GET http://localhost:5008/api/courses
```

5. **Run Code Playground**
```
POST http://localhost:5008/api/run-code
Body: { 
    "html": "<h1>Test</h1>",
    "css": "h1 { color: red; }",
    "javascript": "console.log('Hello');"
}
```

---

## 📁 Project Structure

```
DevNest/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── courseController.js
│   │   ├── moduleController.js
│   │   ├── lessonController.js
│   │   ├── progressController.js
│   │   ├── dashboardController.js
│   │   └── playgroundController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Course.js
│   │   ├── Module.js
│   │   ├── Lesson.js
│   │   └── Progress.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── courseRoutes.js
│   │   ├── moduleRoutes.js
│   │   ├── lessonRoutes.js
│   │   ├── progressRoutes.js
│   │   └── playgroundRoutes.js
│   ├── .env
│   ├── index.js
│   ├── seed.js
│   └── package.json
│
└── devnest/
    ├── src/
    │   ├── components/
    │   │   └── auth/
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   ├── CoursePage.jsx
    │   │   └── LessonPage.jsx
    │   ├── services/
    │   │   └── apiService.js
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## 🔄 API Flow Examples

### Complete Learning Flow

1. **User Registration**
```
POST /api/auth/register → Returns token
Store token in localStorage
```

2. **Browse Courses**
```
GET /api/courses → Get all courses
Click on course → Navigate to /course/html
```

3. **View Course**
```
GET /api/courses/html → Get course with modules
Display modules and lessons
```

4. **Start Lesson**
```
GET /api/lessons/single/:lessonId → Get lesson content
PUT /api/progress/access → Track lesson access (with auth)
Render lesson content and code example
```

5. **Complete Lesson**
```
POST /api/progress → Mark lesson complete (with auth)
Update UI to show completion
Navigate to next lesson
```

6. **View Dashboard**
```
GET /api/dashboard → Get user stats (with auth)
Display progress, streak, enrolled courses
```

---

## 📝 Notes

- All protected routes require `Authorization: Bearer <token>` header
- Public routes: courses, modules, lessons, playground
- Private routes: progress, dashboard, profile
- Token expires in 7 days (configurable in .env)
- All dates are in ISO 8601 format
- Error responses always include `success: false`
- Success responses always include `success: true`

---

## 🎓 Course Content Structure

Each lesson follows this markdown structure:

```markdown
# Lesson Title

Introduction paragraph explaining the topic.

## Section Heading
- Bullet points with key concepts
- Important information

### Subsection
Detailed explanation with examples.

## Key Features
1. Numbered list
2. Of important points
3. In order

### Example
Code or detailed example here.
```

Code examples are stored in the `codeExample` field and can be copied directly.

---

## 🐛 Common Issues & Solutions

### Issue: MongoDB connection error
**Solution**: Ensure MongoDB is running and MONGODB_URI is correct

### Issue: JWT token invalid
**Solution**: Re-login to get new token, check token format in headers

### Issue: Seed script fails
**Solution**: Clear database manually then run seed again
```bash
mongo
use devnest
db.dropDatabase()
exit
node seed.js
```

### Issue: CORS errors
**Solution**: Backend includes CORS middleware for localhost:5173

---

## 📚 Additional Resources

- Express.js Docs: https://expressjs.com/
- Mongoose Docs: https://mongoosejs.com/
- JWT Guide: https://jwt.io/
- React Docs: https://react.dev/
- Tailwind CSS: https://tailwindcss.com/

---

**Built with ❤️ by DevNest Team**
