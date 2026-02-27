# 🔐 How to Protect Your Existing Routes

This guide shows you exactly how to add payment protection to your existing DevNest routes.

---

## The Middleware You'll Use

```javascript
const { protect } = require('../middleware/authMiddleware');
const { requireActiveSubscription } = require('../middleware/subscriptionMiddleware');
```

- **`protect`** - Checks if user is logged in (already exists)
- **`requireActiveSubscription`** - Checks if user has paid (NEW)

---

## Example 1: Lesson Routes

### BEFORE (Current Code)

File: `routes/lessonRoutes.js`

```javascript
const express = require('express');
const router = express.Router();
const {
    getLessonsByModule,
    getLessonById,
    createLesson,
    getLessonsByCourse
} = require('../controllers/lessonController');

// Public routes
router.get('/:moduleId', getLessonsByModule);
router.get('/course/:courseId', getLessonsByCourse);
router.post('/', createLesson);

// Single lesson
router.get('/single/:lessonId', getLessonById);

module.exports = router;
```

### AFTER (With Payment Protection)

```javascript
const express = require('express');
const router = express.Router();
const {
    getLessonsByModule,
    getLessonById,
    createLesson,
    getLessonsByCourse
} = require('../controllers/lessonController');
const { protect } = require('../middleware/authMiddleware');
const { requireActiveSubscription } = require('../middleware/subscriptionMiddleware');

// Protected routes - requires login AND payment
router.get('/:moduleId', protect, requireActiveSubscription, getLessonsByModule);
router.get('/course/:courseId', protect, requireActiveSubscription, getLessonsByCourse);
router.get('/single/:lessonId', protect, requireActiveSubscription, getLessonById);

// Admin route - only for creating lessons
router.post('/', protect, createLesson);

module.exports = router;
```

**What changed?**
- Added import for both middleware
- Added both middleware to routes that should be premium
- Order matters: `protect` first (check login), then `requireActiveSubscription` (check payment)

---

## Example 2: Course Routes

### BEFORE

File: `routes/courseRoutes.js`

```javascript
const express = require("express");
const router = express.Router();
const { getAllCourses, getCourseById, createCourse } = require("../controllers/courseController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getAllCourses);
router.get("/:courseId", protect, getCourseById);
router.post("/", protect, createCourse);

module.exports = router;
```

### AFTER

```javascript
const express = require("express");
const router = express.Router();
const { getAllCourses, getCourseById, createCourse } = require("../controllers/courseController");
const { protect } = require("../middleware/authMiddleware");
const { requireActiveSubscription } = require("../middleware/subscriptionMiddleware");

// Free - Users can see course list
router.get("/", protect, getAllCourses);

// Premium - Users must pay to see course details
router.get("/:courseId", protect, requireActiveSubscription, getCourseById);

// Admin only
router.post("/", protect, createCourse);

module.exports = router;
```

**Strategy:**
- Course list (GET `/`) - FREE (show what's available)
- Course details (GET `/:id`) - PREMIUM (need payment to access)
- Creating courses (POST `/`) - Admin only

---

## Example 3: Module Routes

### AFTER (With Payment Protection)

File: `routes/moduleRoutes.js`

```javascript
const express = require("express");
const router = express.Router();
const { getModulesByCourse, getModuleById, createModule } = require("../controllers/moduleController");
const { protect } = require("../middleware/authMiddleware");
const { requireActiveSubscription } = require("../middleware/subscriptionMiddleware");

// Free - show module names/titles
router.get("/course/:courseId", protect, getModulesByCourse);

// Premium - access module content
router.get("/:id", protect, requireActiveSubscription, getModuleById);

// Admin only
router.post("/", protect, createModule);

module.exports = router;
```

---

## Example 4: Progress Routes

### AFTER (With Payment Protection)

File: `routes/progressRoutes.js`

```javascript
const express = require("express");
const router = express.Router();
const { 
  getUserProgress, 
  updateProgress, 
  getProgressByLesson 
} = require("../controllers/progressController");
const { protect } = require("../middleware/authMiddleware");
const { requireActiveSubscription } = require("../middleware/subscriptionMiddleware");

// All progress routes require payment
router.get("/", protect, requireActiveSubscription, getUserProgress);
router.post("/", protect, requireActiveSubscription, updateProgress);
router.get("/:lessonId", protect, requireActiveSubscription, getProgressByLesson);

module.exports = router;
```

---

## Example 5: Dashboard Routes

### AFTER (Mixed Access)

File: `routes/dashboardRoutes.js`

```javascript
const express = require("express");
const router = express.Router();
const { getDashboard, getPremiumStats } = require("../controllers/dashboardController");
const { protect } = require("../middleware/authMiddleware");
const { requireActiveSubscription } = require("../middleware/subscriptionMiddleware");
const { checkSubscription } = require("../middleware/subscriptionMiddleware");

// Show basic dashboard (with subscription info)
router.get("/", protect, checkSubscription, getDashboard);

// Premium stats (only for paid users)
router.get("/premium-stats", protect, requireActiveSubscription, getPremiumStats);

module.exports = router;
```

**Note:** Using `checkSubscription` instead of `requireActiveSubscription` allows the route to work for both free and paid users, but adds subscription info to `req.subscription`.

Then in your controller:

```javascript
exports.getDashboard = async (req, res) => {
  const userId = req.user.id;
  
  // Basic dashboard data for all users
  const basicData = await getBasicDashboardData(userId);
  
  // Add premium data if user has paid
  if (req.subscription.hasAccess) {
    const premiumData = await getPremiumDashboardData(userId);
    return res.json({ ...basicData, ...premiumData, premium: true });
  }
  
  // Return basic data for free users
  res.json({ ...basicData, premium: false });
};
```

---

## Quick Reference

### When to Use Each Middleware

| Route Type | Middleware | Access |
|-----------|-----------|--------|
| Public (no login) | None | Everyone |
| Logged in only | `protect` | Logged in users |
| Premium content | `protect, requireActiveSubscription` | Paid users only |
| Mixed content | `protect, checkSubscription` | Check in controller |

### Middleware Order (IMPORTANT!)

Always use this order:
```javascript
router.get("/route", protect, requireActiveSubscription, controller);
```

1. `protect` - Check authentication first
2. `requireActiveSubscription` - Then check payment
3. `controller` - Finally execute your logic

**Wrong order will cause errors!**

---

## Testing Protected Routes

### Test 1: Access Without Login

```bash
curl http://localhost:5008/api/lessons/single/123
```

**Expected:** 401 Unauthorized

### Test 2: Access With Login (Free User)

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     http://localhost:5008/api/lessons/single/123
```

**Expected:** 403 Forbidden with message "Premium subscription required"

### Test 3: Access With Login (Paid User)

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
     http://localhost:5008/api/lessons/single/123
```

**Expected:** 200 OK with lesson data

---

## Frontend Error Handling

When a user hits a protected route without payment:

```javascript
try {
  const response = await fetch('/api/lessons/single/123', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (response.status === 403) {
    const error = await response.json();
    
    if (error.code === 'SUBSCRIPTION_REQUIRED') {
      // Redirect to payment page
      window.location.href = '/payment';
    }
  }
  
  const data = await response.json();
  // Use data...
  
} catch (error) {
  console.error('Error:', error);
}
```

---

## Recommended Protection Strategy

### Free Access:
- Homepage
- Course listings (names only)
- Module listings (titles only)
- User registration/login
- Sample lesson (first lesson of each course)

### Premium Access (Requires ₦3,000 Payment):
- Full lesson content
- Code playground
- Progress tracking
- Certificates
- Download resources
- Advanced modules

### Implementation:

```javascript
// In your lesson controller
exports.getLessonById = async (req, res) => {
  const lesson = await Lesson.findById(req.params.id);
  
  // Check if this is a free sample lesson
  const isSampleLesson = lesson.isFree || lesson.order === 1;
  
  if (isSampleLesson) {
    // Anyone can access (don't add requireActiveSubscription middleware)
    return res.json(lesson);
  }
  
  // Premium lessons already protected by middleware
  res.json(lesson);
};
```

---

## Summary

**To protect a route:**

1. Import the middleware:
   ```javascript
   const { requireActiveSubscription } = require('../middleware/subscriptionMiddleware');
   ```

2. Add it to your route:
   ```javascript
   router.get('/route', protect, requireActiveSubscription, controller);
   ```

3. Test it:
   - Free user → 403 error
   - Paid user → Success

**That's it! 🎉**
