// DevNest Frontend API Service
// All backend API calls with proper error handling and authentication

const API_BASE_URL = 'http://localhost:5008/api';

// Helper function to get auth headers
const getAuthHeaders = () => {
    const token = localStorage.getItem('token');
    return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` })
    };
};

// Helper function to handle API responses
const handleResponse = async (response) => {
    const data = await response.json();
    
    if (!response.ok) {
        throw new Error(data.error || data.message || 'Something went wrong');
    }
    
    return data;
};

// ==================== AUTH APIs ====================

/**
 * Register a new user
 * @param {Object} userData - { name, email, password }
 * @returns {Promise<Object>} { success, token, user }
 */
export const registerUser = async (userData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData)
        });
        
        return await handleResponse(response);
    } catch (error) {
        console.error('Register error:', error);
        throw error;
    }
};

/**
 * Login user
 * @param {Object} credentials - { email, password }
 * @returns {Promise<Object>} { success, token, user }
 */
export const loginUser = async (credentials) => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials)
        });
        
        return await handleResponse(response);
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

/**
 * Get current user profile (protected)
 * @returns {Promise<Object>} { success, user }
 */
export const getUserProfile = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/auth/profile`, {
            method: 'GET',
            headers: getAuthHeaders()
        });
        
        return await handleResponse(response);
    } catch (error) {
        console.error('Get profile error:', error);
        throw error;
    }
};

// ==================== COURSE APIs ====================

/**
 * Get all courses
 * @returns {Promise<Object>} { success, data: [courses] }
 */
export const getAllCourses = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/courses`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        
        return await handleResponse(response);
    } catch (error) {
        console.error('Get courses error:', error);
        throw error;
    }
};

/**
 * Get single course by slug with modules and lessons
 * @param {string} slug - Course slug (e.g., 'html', 'css', 'javascript')
 * @returns {Promise<Object>} { success, data: course }
 */
export const getCourseBySlug = async (slug) => {
    try {
        const response = await fetch(`${API_BASE_URL}/courses/${slug}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        
        return await handleResponse(response);
    } catch (error) {
        console.error('Get course error:', error);
        throw error;
    }
};

// ==================== MODULE APIs ====================

/**
 * Get all modules for a course
 * @param {string} courseId - Course ID
 * @returns {Promise<Object>} { success, data: [modules] }
 */
export const getModulesByCourse = async (courseId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/modules/course/${courseId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        
        return await handleResponse(response);
    } catch (error) {
        console.error('Get modules error:', error);
        throw error;
    }
};

// ==================== LESSON APIs ====================

/**
 * Get all lessons for a module
 * @param {string} moduleId - Module ID
 * @returns {Promise<Object>} { success, data: [lessons] }
 */
export const getLessonsByModule = async (moduleId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/lessons/module/${moduleId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        
        return await handleResponse(response);
    } catch (error) {
        console.error('Get lessons error:', error);
        throw error;
    }
};

/**
 * Get single lesson by ID with navigation
 * @param {string} lessonId - Lesson ID
 * @returns {Promise<Object>} { success, data: lesson }
 */
export const getLessonById = async (lessonId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/lessons/single/${lessonId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });
        
        return await handleResponse(response);
    } catch (error) {
        console.error('Get lesson error:', error);
        throw error;
    }
};

// ==================== PROGRESS APIs (Protected) ====================

/**
 * Mark lesson as complete (protected)
 * @param {string} lessonId - Lesson ID
 * @returns {Promise<Object>} { success, data: progress }
 */
export const markLessonComplete = async (lessonId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/progress`, {
            method: 'POST',
            headers: getAuthHeaders(),
            body: JSON.stringify({ lessonId })
        });
        
        return await handleResponse(response);
    } catch (error) {
        console.error('Mark complete error:', error);
        throw error;
    }
};

/**
 * Track lesson access (protected)
 * @param {string} lessonId - Lesson ID
 * @returns {Promise<Object>} { success, message }
 */
export const trackLessonAccess = async (lessonId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/progress/access`, {
            method: 'PUT',
            headers: getAuthHeaders(),
            body: JSON.stringify({ lessonId })
        });
        
        return await handleResponse(response);
    } catch (error) {
        console.error('Track access error:', error);
        throw error;
    }
};

/**
 * Get user progress for all courses (protected)
 * @returns {Promise<Object>} { success, data: [progress] }
 */
export const getUserProgress = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/progress`, {
            method: 'GET',
            headers: getAuthHeaders()
        });
        
        return await handleResponse(response);
    } catch (error) {
        console.error('Get progress error:', error);
        throw error;
    }
};

/**
 * Get progress percentage for a specific course (protected)
 * @param {string} courseId - Course ID
 * @returns {Promise<Object>} { success, data: { percentage, completed, total } }
 */
export const getCourseProgress = async (courseId) => {
    try {
        const response = await fetch(`${API_BASE_URL}/progress/course/${courseId}`, {
            method: 'GET',
            headers: getAuthHeaders()
        });
        
        return await handleResponse(response);
    } catch (error) {
        console.error('Get course progress error:', error);
        throw error;
    }
};

// ==================== DASHBOARD API (Protected) ====================

/**
 * Get dashboard data (protected)
 * @returns {Promise<Object>} { success, data: dashboardData }
 */
export const getDashboardData = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/dashboard`, {
            method: 'GET',
            headers: getAuthHeaders()
        });
        
        return await handleResponse(response);
    } catch (error) {
        console.error('Get dashboard error:', error);
        throw error;
    }
};

// ==================== PLAYGROUND API ====================

/**
 * Run code in playground
 * @param {Object} code - { html, css, javascript }
 * @returns {Promise<Object>} { success, data: { output, html, css, javascript } }
 */
export const runCode = async (code) => {
    try {
        const response = await fetch(`${API_BASE_URL}/run-code`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(code)
        });
        
        return await handleResponse(response);
    } catch (error) {
        console.error('Run code error:', error);
        throw error;
    }
};

// ==================== USAGE EXAMPLES ====================

/*
// Example 1: Register and Login Flow
import { registerUser, loginUser } from './services/apiService';

const handleRegister = async (formData) => {
    try {
        const result = await registerUser(formData);
        localStorage.setItem('token', result.token);
        console.log('User registered:', result.user);
    } catch (error) {
        alert(error.message);
    }
};

const handleLogin = async (credentials) => {
    try {
        const result = await loginUser(credentials);
        localStorage.setItem('token', result.token);
        console.log('User logged in:', result.user);
    } catch (error) {
        alert(error.message);
    }
};

// Example 2: Fetch Courses
import { getAllCourses, getCourseBySlug } from './services/apiService';

const fetchCourses = async () => {
    try {
        const result = await getAllCourses();
        console.log('Courses:', result.data);
    } catch (error) {
        console.error(error.message);
    }
};

const fetchHTMLCourse = async () => {
    try {
        const result = await getCourseBySlug('html');
        console.log('HTML Course:', result.data);
    } catch (error) {
        console.error(error.message);
    }
};

// Example 3: Fetch Lesson and Track Progress
import { getLessonById, trackLessonAccess, markLessonComplete } from './services/apiService';

const viewLesson = async (lessonId) => {
    try {
        // Fetch lesson content
        const lessonResult = await getLessonById(lessonId);
        console.log('Lesson:', lessonResult.data);
        
        // Track that user accessed this lesson
        await trackLessonAccess(lessonId);
        
        // Later, when user completes the lesson
        const progressResult = await markLessonComplete(lessonId);
        console.log('Progress updated:', progressResult.data);
    } catch (error) {
        console.error(error.message);
    }
};

// Example 4: Dashboard
import { getDashboardData } from './services/apiService';

const loadDashboard = async () => {
    try {
        const result = await getDashboardData();
        const { stats, lastAccessedLesson, enrolledCourses } = result.data;
        console.log('Stats:', stats);
        console.log('Last lesson:', lastAccessedLesson);
        console.log('Enrolled courses:', enrolledCourses);
    } catch (error) {
        console.error(error.message);
    }
};

// Example 5: Code Playground
import { runCode } from './services/apiService';

const executeCode = async () => {
    try {
        const result = await runCode({
            html: '<h1>Hello World</h1>',
            css: 'h1 { color: blue; }',
            javascript: 'console.log("Hello");'
        });
        
        console.log('Output:', result.data.output);
        // Render output in iframe
        document.getElementById('preview').srcdoc = result.data.output;
    } catch (error) {
        console.error(error.message);
    }
};

// Example 6: React Component with API
import React, { useState, useEffect } from 'react';
import { getAllCourses } from './services/apiService';

function CourseList() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const result = await getAllCourses();
                setCourses(result.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        
        fetchCourses();
    }, []);
    
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    
    return (
        <div>
            {courses.map(course => (
                <div key={course._id}>
                    <h2>{course.title}</h2>
                    <p>{course.description}</p>
                </div>
            ))}
        </div>
    );
}
*/

export default {
    // Auth
    registerUser,
    loginUser,
    getUserProfile,
    
    // Courses
    getAllCourses,
    getCourseBySlug,
    
    // Modules
    getModulesByCourse,
    
    // Lessons
    getLessonsByModule,
    getLessonById,
    
    // Progress
    markLessonComplete,
    trackLessonAccess,
    getUserProgress,
    getCourseProgress,
    
    // Dashboard
    getDashboardData,
    
    // Playground
    runCode
};
