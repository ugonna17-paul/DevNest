# 🎓 DevNest - Developer Learning Platform

A full-stack web application for learning web development with comprehensive documentation, code examples, and progress tracking.

## 🌟 Features

### ✨ Core Features
- **6 Complete Courses**: HTML, CSS, JavaScript, React, Node.js, Tailwind CSS
- **32+ Structured Lessons** with markdown documentation and copyable code examples
- **Progress Tracking System** for authenticated users
- **Interactive Code Playground** for testing HTML, CSS, and JavaScript
- **User Dashboard** with statistics, streaks, and learning progress
- **JWT Authentication** with secure password hashing
- **Responsive Design** built with Tailwind CSS
- **RESTful API** with comprehensive error handling

### 📚 Available Courses

1. **HTML Fundamentals** (Beginner, 4 hours)
   - Getting Started with HTML
   - Core Elements
   - Forms & Semantic Tags

2. **CSS Styling** (Beginner, 5 hours)
   - Basics & Selectors
   - Layout & Responsive Design

3. **JavaScript Essentials** (Beginner, 6 hours)
   - Fundamentals
   - Data & Functions
   - Async & DOM

4. **React Development** (Intermediate, 8 hours)
   - React Fundamentals
   - React Hooks & Routing

5. **Node.js Backend Development** (Intermediate, 10 hours)
   - Node.js Fundamentals
   - REST APIs & JWT Authentication

6. **Tailwind CSS Mastery** (Beginner, 6 hours)
   - Tailwind Fundamentals
   - Responsive Design & Dark Mode

## 🛠 Tech Stack

### Backend
- Node.js v22.0.0
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- CommonJS module system

### Frontend
- React 19.2.4
- Vite 7.3.1
- React Router DOM
- Tailwind CSS
- Recharts (data visualization)
- React Toastify (notifications)
- Lucide React (icons)

## 📁 Project Structure

```
DevNest/
├── backend/                 # Node.js/Express backend
│   ├── config/             
│   │   └── db.js           # MongoDB connection
│   ├── controllers/        # Route controllers
│   │   ├── authController.js
│   │   ├── courseController.js
│   │   ├── moduleController.js
│   │   ├── lessonController.js
│   │   ├── progressController.js
│   │   ├── dashboardController.js
│   │   └── playgroundController.js
│   ├── middleware/         
│   │   ├── auth.js         # JWT authentication
│   │   └── errorHandler.js # Error handling
│   ├── models/             # Mongoose schemas
│   │   ├── User.js
│   │   ├── Course.js
│   │   ├── Module.js
│   │   ├── Lesson.js
│   │   └── Progress.js
│   ├── routes/             # API routes
│   │   ├── authRoutes.js
│   │   ├── courseRoutes.js
│   │   ├── moduleRoutes.js
│   │   ├── lessonRoutes.js
│   │   ├── progressRoutes.js
│   │   ├── dashboardRoutes.js
│   │   └── playgroundRoutes.js
│   ├── .env               # Environment variables
│   ├── index.js           # Express server
│   ├── seed.js            # Database seeding script
│   └── package.json
│
└── devnest/               # React frontend
    ├── src/
    │   ├── components/
    │   │   ├── auth/      # Auth components
    │   │   ├── Footer.jsx
    │   │   ├── Hero.jsx
    │   │   └── ...
    │   ├── pages/
    │   │   ├── Dashboard.jsx
    │   │   ├── CoursePage.jsx
    │   │   └── LessonPage.jsx
    │   ├── services/
    │   │   └── apiService.js  # API calls
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    └── package.json
```

## 🚀 Quick Start

### Prerequisites
- Node.js v18+ installed
- MongoDB installed and running
- Git installed

### Backend Setup

1. **Navigate to backend directory**
```bash
cd backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create .env file**
```env
PORT=5008
MONGODB_URI=mongodb://localhost:27017/devnest
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d
NODE_ENV=development
```

4. **Start MongoDB**
```bash
# Windows
net start MongoDB

# Mac/Linux
sudo systemctl start mongod

# Or use Docker
docker run -d -p 27017:27017 --name mongodb mongo
```

5. **Seed the database**
```bash
node seed.js
```

Expected output:
```
MongoDB connected for seeding...
Creating HTML course...
Creating CSS course...
Creating JavaScript course...
Creating React course...
Creating Node.js course...
Creating Tailwind CSS course...

=== SEEDING COMPLETE ===
6 courses created with modules and lessons
```

6. **Start backend server**
```bash
npm start
```

Server will run on `http://localhost:5008`

### Frontend Setup

1. **Navigate to frontend directory**
```bash
cd devnest
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

App will run on `http://localhost:5173`

## 🔌 API Endpoints

### Public Endpoints
```
GET    /api/courses              # Get all courses
GET    /api/courses/:slug        # Get course by slug
GET    /api/modules/course/:id   # Get course modules
GET    /api/lessons/module/:id   # Get module lessons
GET    /api/lessons/single/:id   # Get single lesson
POST   /api/run-code             # Run code in playground
POST   /api/auth/register        # Register user
POST   /api/auth/login           # Login user
```

### Protected Endpoints (require JWT token)
```
GET    /api/auth/profile         # Get user profile
GET    /api/dashboard            # Get dashboard data
GET    /api/progress             # Get user progress
GET    /api/progress/course/:id  # Get course progress
POST   /api/progress             # Mark lesson complete
PUT    /api/progress/access      # Track lesson access
```

## 🔐 Authentication

### Register
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
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
        "id": "...",
        "name": "John Doe",
        "email": "john@example.com"
    }
}
```

### Login
```javascript
POST /api/auth/login
Content-Type: application/json

{
    "email": "john@example.com",
    "password": "password123"
}
```

### Using Protected Routes
```javascript
GET /api/dashboard
Authorization: Bearer <your_jwt_token>
```

## 💻 Frontend API Usage

The frontend includes a comprehensive API service file at `devnest/src/services/apiService.js` with all API calls:

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

// Fetch courses
const fetchCourses = async () => {
    try {
        const result = await getAllCourses();
        setCourses(result.data);
    } catch (error) {
        console.error(error);
    }
};
```

## 🎨 Code Playground

The code playground allows users to test HTML, CSS, and JavaScript:

```javascript
import { runCode } from './services/apiService';

const executeCode = async () => {
    try {
        const result = await runCode({
            html: '<h1>Hello World</h1>',
            css: 'h1 { color: blue; }',
            javascript: 'console.log("Hello");'
        });
        
        // Render output in iframe
        document.getElementById('preview').srcdoc = result.data.output;
    } catch (error) {
        console.error(error);
    }
};
```

## 📊 Database Models

### User
```javascript
{
    name: String,
    email: String (unique),
    password: String (hashed),
    isActive: Boolean,
    createdAt: Date
}
```

### Course
```javascript
{
    title: String,
    description: String,
    level: String (Beginner/Intermediate/Advanced),
    slug: String (unique),
    duration: String,
    prerequisites: [String],
    icon: String,
    totalLessons: Number,
    isPublished: Boolean,
    order: Number
}
```

### Module
```javascript
{
    course: ObjectId (ref: Course),
    title: String,
    description: String,
    order: Number,
    isPublished: Boolean
}
```

### Lesson
```javascript
{
    module: ObjectId (ref: Module),
    course: ObjectId (ref: Course),
    title: String,
    content: String (markdown),
    codeExample: String,
    duration: Number (minutes),
    order: Number,
    isPublished: Boolean
}
```

### Progress
```javascript
{
    user: ObjectId (ref: User),
    lesson: ObjectId (ref: Lesson),
    course: ObjectId (ref: Course),
    completed: Boolean,
    completedAt: Date,
    lastAccessedAt: Date
}
```

## 🧪 Testing the API

### Using cURL

**Register:**
```bash
curl -X POST http://localhost:5008/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"test123"}'
```

**Login:**
```bash
curl -X POST http://localhost:5008/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"test123"}'
```

**Get Courses:**
```bash
curl http://localhost:5008/api/courses
```

**Get Dashboard (Protected):**
```bash
curl http://localhost:5008/api/dashboard \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5008
MONGODB_URI=mongodb://localhost:27017/devnest
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRE=7d
NODE_ENV=development
```

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod --version`
- Check connection string in .env
- Verify MongoDB is listening on port 27017

### Port Already in Use
```bash
# Find and kill process on port 5008
# Windows:
netstat -ano | findstr :5008
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:5008 | xargs kill -9
```

### CORS Issues
- Backend includes CORS middleware
- Ensure frontend URL matches CORS configuration
- Check browser console for specific CORS errors

### Seed Script Fails
```bash
# Clear database and re-seed
mongo
use devnest
db.dropDatabase()
exit
node seed.js
```

## 📚 Documentation

- **Complete API Documentation**: See [COMPLETE_API_DOCUMENTATION.md](./COMPLETE_API_DOCUMENTATION.md)
- **Frontend API Service**: See `devnest/src/services/apiService.js`

## 🔒 Security Features

- Passwords hashed with bcryptjs (10 salt rounds)
- JWT tokens with 7-day expiration
- Protected routes with authentication middleware
- Input validation with Mongoose schemas
- Error handling middleware
- CORS configuration

## 🎯 Learning Flow

1. **Browse Courses** → View all 6 available courses
2. **Select Course** → See modules and lessons
3. **Start Lesson** → Read documentation and code examples
4. **Practice** → Use code playground
5. **Complete Lesson** → Mark as complete (requires auth)
6. **Track Progress** → View stats on dashboard

## 🤝 Contributing

This is a learning project. Feel free to fork and customize!

## 📄 License

MIT License - Feel free to use for learning and personal projects.

## 🔗 Links

- Backend API: `http://localhost:5008`
- Frontend App: `http://localhost:5173`
- MongoDB: `mongodb://localhost:27017`

## 📞 Support

For issues or questions:
1. Check the [COMPLETE_API_DOCUMENTATION.md](./COMPLETE_API_DOCUMENTATION.md)
2. Review error messages in browser console
3. Check backend terminal logs
4. Verify MongoDB connection

---

**Happy Learning! 🚀**

Built with Node.js, Express, MongoDB, React, and Tailwind CSS.
