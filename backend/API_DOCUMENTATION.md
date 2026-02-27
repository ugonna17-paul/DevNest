# DevNest Backend API Documentation

Complete backend architecture for the DevNest learning platform built with Node.js, Express, and MongoDB.

## 📁 Project Structure

```
backend/
├── config/
│   └── db.js                 # MongoDB connection
├── models/
│   ├── User.js              # User authentication model
│   ├── Course.js            # Course model
│   ├── Module.js            # Module model (course sections)
│   ├── Lesson.js            # Lesson model (individual lessons)
│   └── Progress.js          # User progress tracking
├── controllers/
│   ├── authController.js    # Authentication logic
│   ├── courseController.js  # Course CRUD operations
│   ├── moduleController.js  # Module operations
│   ├── lessonController.js  # Lesson operations
│   ├── progressController.js # Progress tracking
│   ├── dashboardController.js # Dashboard stats
│   └── playgroundController.js # Code playground
├── routes/
│   ├── authRoutes.js        # Auth endpoints
│   ├── courseRoutes.js      # Course endpoints
│   ├── moduleRoutes.js      # Module endpoints
│   ├── lessonRoutes.js      # Lesson endpoints
│   ├── progressRoutes.js    # Progress endpoints
│   ├── dashboardRoutes.js   # Dashboard endpoint
│   └── playgroundRoutes.js  # Playground endpoint
├── middleware/
│   ├── authMiddleware.js    # JWT authentication
│   └── errorHandler.js      # Centralized error handling
├── seed.js                  # Database seeding script
└── index.js                 # Main server file
```

## 🚀 Getting Started

### Prerequisites
- Node.js v22.0.0 or higher
- MongoDB running locally or connection URI
- npm or yarn package manager

### Installation

1. **Install dependencies:**
```bash
cd backend
npm install
```

2. **Set up environment variables:**
Create a `.env` file in the backend directory:
```env
PORT=5008
MONGODB_URI=mongodb://localhost:27017/devnest
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

3. **Start MongoDB:**
```bash
# If using local MongoDB
mongod
```

4. **Seed the database:**
```bash
node seed.js
```
This will populate your database with 3 complete courses (HTML, CSS, JavaScript) with modules and lessons.

5. **Start the server:**
```bash
npm start
```

Server will run on `http://localhost:5008`

## 📚 API Endpoints

### Authentication Routes (`/api/auth`)

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
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

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Update Profile (Protected)
```http
PUT /api/auth/update-profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Smith",
  "email": "john.smith@example.com"
}
```

#### Change Password (Protected)
```http
PUT /api/auth/change-password
Authorization: Bearer <token>
Content-Type: application/json

{
  "currentPassword": "password123",
  "newPassword": "newpassword456"
}
```

---

### Course Routes (`/api/courses`)

#### Get All Courses
```http
GET /api/courses
```

**Response:**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "course_id",
      "title": "HTML Fundamentals",
      "description": "Learn the building blocks of the web...",
      "level": "Beginner",
      "slug": "html",
      "duration": "4 hours",
      "prerequisites": [],
      "icon": "📄",
      "totalLessons": 15,
      "moduleCount": 3,
      "lessonCount": 15
    }
  ]
}
```

#### Get Course by Slug
```http
GET /api/courses/:slug
```

**Example:** `GET /api/courses/javascript`

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "course_id",
    "title": "JavaScript Essentials",
    "slug": "javascript",
    "modules": [
      {
        "_id": "module_id",
        "title": "JavaScript Fundamentals",
        "description": "Variables, data types, operators...",
        "order": 1,
        "lessons": [
          {
            "_id": "lesson_id",
            "title": "Introduction to JavaScript",
            "duration": 20,
            "order": 1
          }
        ]
      }
    ]
  }
}
```

#### Create Course (Admin - for testing)
```http
POST /api/courses
Content-Type: application/json

{
  "title": "React Fundamentals",
  "description": "Learn React from scratch",
  "level": "Intermediate",
  "slug": "react",
  "duration": "8 hours",
  "prerequisites": ["JavaScript"],
  "icon": "⚛️",
  "totalLessons": 20
}
```

---

### Module Routes (`/api/modules`)

#### Get Modules by Course
```http
GET /api/modules/:courseId
```

#### Get Single Module
```http
GET /api/modules/single/:moduleId
```

#### Create Module (Admin - for testing)
```http
POST /api/modules
Content-Type: application/json

{
  "course": "course_id",
  "title": "Module Title",
  "description": "Module description",
  "order": 1
}
```

---

### Lesson Routes (`/api/lessons`)

#### Get Lessons by Module
```http
GET /api/lessons/:moduleId
```

#### Get Lessons by Course
```http
GET /api/lessons/course/:courseId
```

#### Get Single Lesson
```http
GET /api/lessons/single/:lessonId
```

**Response includes navigation:**
```json
{
  "success": true,
  "data": {
    "_id": "lesson_id",
    "title": "Variables and Data Types",
    "content": "# Markdown content here...",
    "codeExample": "let x = 10;",
    "duration": 30,
    "navigation": {
      "previous": {
        "_id": "prev_lesson_id",
        "title": "Introduction to JavaScript"
      },
      "next": {
        "_id": "next_lesson_id",
        "title": "Functions"
      }
    }
  }
}
```

#### Create Lesson (Admin - for testing)
```http
POST /api/lessons
Content-Type: application/json

{
  "module": "module_id",
  "course": "course_id",
  "title": "Lesson Title",
  "content": "# Markdown content",
  "codeExample": "console.log('Hello');",
  "duration": 25,
  "order": 1
}
```

---

### Progress Routes (`/api/progress`) - All Protected

#### Mark Lesson as Complete
```http
POST /api/progress
Authorization: Bearer <token>
Content-Type: application/json

{
  "lessonId": "lesson_id",
  "courseId": "course_id",
  "timeSpent": 1200
}
```

**Response:**
```json
{
  "success": true,
  "message": "Lesson marked as complete",
  "data": {
    "user": "user_id",
    "lesson": "lesson_id",
    "course": "course_id",
    "completed": true,
    "completedAt": "2024-01-15T10:30:00Z"
  }
}
```

#### Get User Progress
```http
GET /api/progress
Authorization: Bearer <token>

# Optional: Filter by course
GET /api/progress?courseId=course_id
```

#### Get Course Progress Percentage
```http
GET /api/progress/course/:courseId
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "courseId": "course_id",
    "totalLessons": 25,
    "completedLessons": 10,
    "percentage": 40
  }
}
```

#### Update Lesson Access (track last accessed)
```http
PUT /api/progress/access
Authorization: Bearer <token>
Content-Type: application/json

{
  "lessonId": "lesson_id",
  "courseId": "course_id"
}
```

---

### Dashboard Route (`/api/dashboard`) - Protected

#### Get Dashboard Data
```http
GET /api/dashboard
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "user_id",
      "name": "John Doe",
      "email": "john@example.com",
      "joinedAt": "2024-01-01T00:00:00Z"
    },
    "stats": {
      "totalCompletedLessons": 15,
      "enrolledCoursesCount": 3,
      "weeklyCompletedLessons": 5,
      "currentStreak": 7
    },
    "enrolledCourses": [
      {
        "courseId": "course_id",
        "title": "JavaScript Essentials",
        "slug": "javascript",
        "level": "Beginner",
        "icon": "⚡",
        "totalLessons": 25,
        "completedLessons": 10,
        "percentage": 40
      }
    ],
    "lastAccessedLesson": {
      "lessonId": "lesson_id",
      "lessonTitle": "Functions",
      "courseTitle": "JavaScript Essentials",
      "courseSlug": "javascript",
      "lastAccessedAt": "2024-01-15T10:30:00Z"
    }
  }
}
```

---

### Playground Route (`/api/run-code`)

#### Run Code
```http
POST /api/run-code
Content-Type: application/json

{
  "html": "<h1>Hello</h1>",
  "css": "h1 { color: blue; }",
  "javascript": "console.log('Hello World');"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "output": "<!DOCTYPE html><html>...</html>",
    "html": "<h1>Hello</h1>",
    "css": "h1 { color: blue; }",
    "javascript": "console.log('Hello World');"
  }
}
```

---

## 🔒 Authentication

Protected routes require a JWT token in the Authorization header:

```http
Authorization: Bearer your_jwt_token_here
```

The token is returned when you register or login. It expires after 7 days.

---

## 🗃️ Database Models

### Course
- `title` - Course name
- `description` - Course description
- `level` - Beginner/Intermediate/Advanced
- `slug` - URL-friendly identifier (unique)
- `duration` - Estimated completion time
- `prerequisites` - Array of prerequisite course names
- `icon` - Emoji or icon identifier
- `totalLessons` - Number of lessons
- `isPublished` - Boolean
- `order` - Display order

### Module
- `course` - Reference to Course
- `title` - Module name
- `description` - Module description
- `order` - Display order
- `isPublished` - Boolean

### Lesson
- `module` - Reference to Module
- `course` - Reference to Course
- `title` - Lesson name
- `content` - Markdown content
- `codeExample` - Code snippet
- `duration` - Minutes to complete
- `order` - Display order
- `videoUrl` - Optional video URL
- `isPublished` - Boolean
- `isPremium` - Boolean

### Progress
- `user` - Reference to User
- `lesson` - Reference to Lesson
- `course` - Reference to Course
- `completed` - Boolean
- `completedAt` - Timestamp
- `timeSpent` - Seconds spent
- `lastAccessedAt` - Timestamp

---

## 🧪 Testing the API

### Using cURL

**Register a new user:**
```bash
curl -X POST http://localhost:5008/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```

**Get all courses:**
```bash
curl http://localhost:5008/api/courses
```

**Mark lesson complete:**
```bash
curl -X POST http://localhost:5008/api/progress \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"lessonId":"lesson_id","courseId":"course_id","timeSpent":1200}'
```

### Using Postman

1. Import the API endpoints
2. Set up environment variables for base URL and token
3. Use Collections to organize requests

---

## 🛠️ Error Handling

All errors return in this format:

```json
{
  "success": false,
  "message": "Error message here",
  "errors": ["Optional array of validation errors"]
}
```

### Common HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (invalid/missing token)
- `404` - Not Found
- `500` - Server Error

---

## 📊 Seeding the Database

The `seed.js` script populates your database with:
- **3 Complete Courses**: HTML, CSS, JavaScript
- **8 Modules** total across all courses
- **17 Lessons** with full markdown content and code examples

**Run the seed script:**
```bash
node seed.js
```

**What gets created:**
1. **HTML Fundamentals** (Beginner)
   - Getting Started with HTML (2 lessons)
   - Core HTML Elements (2 lessons)
   - Lists and Tables (2 lessons)

2. **CSS Styling** (Beginner)
   - CSS Basics (2 lessons)
   - Box Model and Layout (2 lessons)

3. **JavaScript Essentials** (Beginner)
   - JavaScript Fundamentals (2 lessons)
   - Functions and Control Flow (2 lessons)
   - DOM Manipulation (2 lessons)

---

## 🚀 Production Deployment

1. **Set environment variables:**
```env
NODE_ENV=production
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=strong_random_secret
PORT=5008
```

2. **Use PM2 for process management:**
```bash
npm install -g pm2
pm2 start index.js --name devnest-api
pm2 save
pm2 startup
```

3. **Enable security best practices:**
- Use helmet.js for security headers
- Enable rate limiting
- Use HTTPS
- Validate all inputs
- Sanitize user data

---

## 📝 API Usage Examples

### Frontend Integration

**Fetch all courses:**
```javascript
const response = await fetch('http://localhost:5008/api/courses');
const { data } = await response.json();
console.log(data); // Array of courses
```

**Get dashboard data:**
```javascript
const token = localStorage.getItem('token');
const response = await fetch('http://localhost:5008/api/dashboard', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
const { data } = await response.json();
console.log(data.stats); // User statistics
```

**Mark lesson complete:**
```javascript
const token = localStorage.getItem('token');
await fetch('http://localhost:5008/api/progress', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    lessonId: 'lesson_id_here',
    courseId: 'course_id_here',
    timeSpent: 900 // seconds
  })
});
```

---

## 🤝 Contributing

1. Add new features in separate branches
2. Follow CommonJS module syntax
3. Add proper error handling
4. Document new endpoints
5. Test thoroughly before merging

---

## 📄 License

This project is part of DevNest learning platform.

---

## 🆘 Support

For issues or questions:
1. Check this documentation
2. Review the code comments
3. Test endpoints with Postman
4. Check MongoDB connection
5. Verify JWT token validity

---

**Built with ❤️ for DevNest Learning Platform**
