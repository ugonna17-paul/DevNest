// Course data service with complete course information
export const coursesData = {
  javascript: {
    name: 'JavaScript',
    description: 'Master JavaScript from basics to advanced concepts. Learn modern ES6+ features and become proficient in the most popular programming language.',
    difficulty: 'Beginner → Intermediate',
    duration: '30 hours',
    prerequisites: ['HTML', 'CSS'],
    progress: 45,
    completedLessons: 13,
    totalLessons: 30,
    installation: {
      title: 'Getting Started with JavaScript',
      steps: [
        {
          step: 1,
          title: 'No Installation Required!',
          description: 'JavaScript runs directly in your web browser. You can start coding immediately using:',
          points: [
            'Browser DevTools Console (F12)',
            'Online editors like CodePen or JSFiddle',
            'Our built-in Playground'
          ]
        },
        {
          step: 2,
          title: 'Optional: Set Up Node.js',
          description: 'For running JavaScript outside the browser:',
          commands: [
            '# Download Node.js from nodejs.org',
            '# Verify installation',
            'node --version',
            'npm --version',
            '',
            '# Run JavaScript files',
            'node filename.js'
          ]
        },
        {
          step: 3,
          title: 'Recommended Code Editor',
          description: 'VS Code is the most popular editor for JavaScript:',
          points: [
            'Download from code.visualstudio.com',
            'Install extensions: ESLint, Prettier',
            'Configure auto-formatting'
          ]
        }
      ]
    },
    modules: [
      {
        id: 1,
        name: 'Introduction to JavaScript',
        description: 'Learn what JavaScript is and set up your development environment',
        lessons: [
          { 
            id: 1, 
            title: 'What is JavaScript?', 
            duration: '8 min', 
            completed: true, 
            locked: false,
            content: {
              introduction: 'JavaScript is a versatile programming language that powers dynamic web content...',
              topics: ['History of JavaScript', 'JavaScript in the browser', 'JavaScript outside the browser']
            }
          },
          { id: 2, title: 'Setting Up Your Environment', duration: '12 min', completed: true, locked: false },
          { id: 3, title: 'Your First JavaScript Program', duration: '10 min', completed: true, locked: false },
        ]
      },
      {
        id: 2,
        name: 'Variables & Data Types',
        description: 'Understanding how to store and work with data',
        lessons: [
          { id: 4, title: 'Variables and Constants', duration: '15 min', completed: true, locked: false },
          { id: 5, title: 'Data Types in JavaScript', duration: '18 min', completed: true, locked: false },
          { id: 6, title: 'Type Conversion', duration: '12 min', completed: true, locked: false },
        ]
      },
      {
        id: 3,
        name: 'Functions',
        description: 'Master functions and understand their role in JavaScript',
        lessons: [
          { id: 7, title: 'Function Basics', duration: '14 min', completed: true, locked: false },
          { id: 8, title: 'Arrow Functions', duration: '16 min', completed: true, locked: false },
          { id: 9, title: 'Function Parameters', duration: '15 min', completed: true, locked: false },
          { id: 10, title: 'Return Values', duration: '12 min', completed: true, locked: false },
        ]
      },
      {
        id: 4,
        name: 'Arrays & Objects',
        description: 'Work with complex data structures',
        lessons: [
          { id: 11, title: 'Working with Arrays', duration: '20 min', completed: true, locked: false },
          { id: 12, title: 'Array Methods', duration: '22 min', completed: true, locked: false },
          { id: 13, title: 'Objects in JavaScript', duration: '18 min', completed: true, locked: false },
          { id: 14, title: 'Object Methods', duration: '16 min', completed: false, locked: false },
        ]
      },
      {
        id: 5,
        name: 'DOM Manipulation',
        description: 'Learn to interact with web pages dynamically',
        lessons: [
          { id: 15, title: 'Introduction to the DOM', duration: '15 min', completed: false, locked: false },
          { id: 16, title: 'Selecting Elements', duration: '18 min', completed: false, locked: false },
          { id: 17, title: 'Modifying Elements', duration: '20 min', completed: false, locked: false },
          { id: 18, title: 'Event Listeners', duration: '22 min', completed: false, locked: false },
        ]
      },
      {
        id: 6,
        name: 'ES6+ Features',
        description: 'Modern JavaScript features for cleaner code',
        lessons: [
          { id: 19, title: 'Destructuring', duration: '16 min', completed: false, locked: false },
          { id: 20, title: 'Spread & Rest Operators', duration: '14 min', completed: false, locked: false },
          { id: 21, title: 'Template Literals', duration: '10 min', completed: false, locked: false },
          { id: 22, title: 'Modules', duration: '18 min', completed: false, locked: false },
        ]
      },
      {
        id: 7,
        name: 'Async & Promises',
        description: 'Handle asynchronous operations like a pro',
        lessons: [
          { id: 23, title: 'Understanding Async', duration: '20 min', completed: false, locked: false },
          { id: 24, title: 'Promises Explained', duration: '22 min', completed: false, locked: false },
          { id: 25, title: 'Async/Await', duration: '18 min', completed: false, locked: false },
          { id: 26, title: 'Error Handling', duration: '16 min', completed: false, locked: false },
        ]
      },
      {
        id: 8,
        name: 'API Fetching',
        description: 'Connect to external services and fetch data',
        lessons: [
          { id: 27, title: 'Fetch API Basics', duration: '18 min', completed: false, locked: true },
          { id: 28, title: 'Working with JSON', duration: '16 min', completed: false, locked: true },
          { id: 29, title: 'Handling Responses', duration: '20 min', completed: false, locked: true },
        ]
      },
      {
        id: 9,
        name: 'Mini Projects',
        description: 'Apply everything you learned',
        lessons: [
          { id: 30, title: 'Build a Todo App', duration: '45 min', completed: false, locked: true },
        ]
      },
    ]
  },

  react: {
    name: 'React',
    description: 'Build modern, interactive user interfaces with React. Learn components, hooks, state management, and more.',
    difficulty: 'Intermediate',
    duration: '40 hours',
    prerequisites: ['JavaScript', 'HTML', 'CSS'],
    progress: 20,
    completedLessons: 5,
    totalLessons: 25,
    installation: {
      title: 'Setting Up React Development Environment',
      steps: [
        {
          step: 1,
          title: 'Install Node.js',
          description: 'React requires Node.js and npm:',
          commands: [
            '# Check if Node.js is installed',
            'node --version',
            'npm --version',
            '',
            '# If not installed, download from nodejs.org'
          ]
        },
        {
          step: 2,
          title: 'Create React App',
          description: 'Use Create React App to start a new project:',
          commands: [
            '# Create a new React app',
            'npx create-react-app my-app',
            '',
            '# Navigate to the project',
            'cd my-app',
            '',
            '# Start development server',
            'npm start',
            '',
            '# Browser opens at http://localhost:3000'
          ]
        },
        {
          step: 3,
          title: 'Alternative: Use Vite (Recommended)',
          description: 'Vite is faster than Create React App:',
          commands: [
            '# Create React app with Vite',
            'npm create vite@latest my-react-app -- --template react',
            '',
            '# Install dependencies',
            'cd my-react-app',
            'npm install',
            '',
            '# Start dev server',
            'npm run dev'
          ]
        },
        {
          step: 4,
          title: 'Install React DevTools',
          description: 'Essential browser extension for debugging:',
          points: [
            'Install "React Developer Tools" for Chrome/Firefox',
            'Inspect component hierarchy',
            'View props and state in real-time'
          ]
        }
      ]
    },
    modules: []
  },

  nodejs: {
    name: 'Node.js',
    description: 'Learn server-side JavaScript with Node.js. Build REST APIs, work with databases, and create full-stack applications.',
    difficulty: 'Intermediate → Advanced',
    duration: '35 hours',
    prerequisites: ['JavaScript'],
    progress: 0,
    completedLessons: 0,
    totalLessons: 22,
    installation: {
      title: 'Installing Node.js and Setting Up Your Environment',
      steps: [
        {
          step: 1,
          title: 'Install Node.js',
          description: 'Download and install Node.js from the official website:',
          commands: [
            '# Visit https://nodejs.org',
            '# Download LTS version (recommended)',
            '# Run the installer',
            '',
            '# Verify installation',
            'node --version',
            'npm --version'
          ]
        },
        {
          step: 2,
          title: 'Initialize Your First Project',
          description: 'Create a new Node.js project:',
          commands: [
            '# Create project directory',
            'mkdir my-node-app',
            'cd my-node-app',
            '',
            '# Initialize npm',
            'npm init -y',
            '',
            '# Install Express (popular framework)',
            'npm install express',
            '',
            '# Create main file',
            'touch index.js'
          ]
        },
        {
          step: 3,
          title: 'Create Your First Server',
          description: 'Write a simple Express server:',
          commands: [
            '// index.js',
            "const express = require('express');",
            'const app = express();',
            'const port = 3000;',
            '',
            "app.get('/', (req, res) => {",
            "  res.send('Hello World!');",
            '});',
            '',
            'app.listen(port, () => {',
            '  console.log(`Server running at http://localhost:${port}`);',
            '});'
          ]
        },
        {
          step: 4,
          title: 'Run Your Server',
          description: 'Start the development server:',
          commands: [
            '# Run the server',
            'node index.js',
            '',
            '# Or use nodemon for auto-restart',
            'npm install -g nodemon',
            'nodemon index.js'
          ]
        }
      ]
    },
    modules: []
  },

  html: {
    name: 'HTML',
    description: 'Learn the foundation of web development. Master HTML5 elements, semantic markup, and best practices.',
    difficulty: 'Beginner',
    duration: '15 hours',
    prerequisites: [],
    progress: 100,
    completedLessons: 15,
    totalLessons: 15,
    installation: {
      title: 'Getting Started with HTML',
      steps: [
        {
          step: 1,
          title: 'No Installation Required!',
          description: 'HTML is a markup language that works directly in browsers.',
          points: [
            'Open any text editor (Notepad, TextEdit, etc.)',
            'Save files with .html extension',
            'Double-click to open in browser'
          ]
        },
        {
          step: 2,
          title: 'Recommended: Use a Code Editor',
          description: 'Better experience with features like syntax highlighting:',
          points: [
            'VS Code (most popular)',
            'Sublime Text',
            'Atom',
            'Notepad++'
          ]
        },
        {
          step: 3,
          title: 'Create Your First HTML File',
          description: 'Basic HTML structure:',
          commands: [
            '<!DOCTYPE html>',
            '<html lang="en">',
            '<head>',
            '  <meta charset="UTF-8">',
            '  <title>My First Page</title>',
            '</head>',
            '<body>',
            '  <h1>Hello World!</h1>',
            '</body>',
            '</html>'
          ]
        }
      ]
    },
    modules: [
      {
        id: 1,
        name: 'HTML Basics',
        description: 'Learn the fundamental building blocks of web pages',
        lessons: [
          { id: 1, title: 'Introduction to HTML', duration: '10 min', completed: true, locked: false },
          { id: 2, title: 'HTML Document Structure', duration: '12 min', completed: true, locked: false },
          { id: 3, title: 'Headings and Paragraphs', duration: '8 min', completed: true, locked: false },
          { id: 4, title: 'Links and Navigation', duration: '15 min', completed: true, locked: false },
          { id: 5, title: 'Images and Media', duration: '12 min', completed: true, locked: false },
        ]
      }
    ]
  },

  css: {
    name: 'CSS',
    description: 'Style your web pages beautifully. Learn layouts, animations, responsive design, and modern CSS techniques.',
    difficulty: 'Beginner → Intermediate',
    duration: '25 hours',
    prerequisites: ['HTML'],
    progress: 75,
    completedLessons: 15,
    totalLessons: 20,
    installation: {
      title: 'Getting Started with CSS',
      steps: [
        {
          step: 1,
          title: 'No Installation Required!',
          description: 'CSS works alongside HTML in any browser.',
          points: [
            'Create a .css file',
            'Link it to your HTML',
            'Start styling!'
          ]
        },
        {
          step: 2,
          title: 'Linking CSS to HTML',
          description: 'Three ways to add CSS:',
          commands: [
            '<!-- 1. External CSS (recommended) -->',
            '<link rel="stylesheet" href="styles.css">',
            '',
            '<!-- 2. Internal CSS -->',
            '<style>',
            '  body { background: #000; }',
            '</style>',
            '',
            '<!-- 3. Inline CSS -->',
            '<p style="color: blue;">Text</p>'
          ]
        },
        {
          step: 3,
          title: 'Install Browser DevTools',
          description: 'Essential for CSS debugging:',
          points: [
            'Press F12 in any browser',
            'Inspect elements in real-time',
            'Edit styles live',
            'Test responsive designs'
          ]
        }
      ]
    },
    modules: []
  },

  tailwind: {
    name: 'Tailwind CSS',
    description: 'Modern utility-first CSS framework. Build responsive designs faster without writing custom CSS.',
    difficulty: 'Beginner → Intermediate',
    duration: '18 hours',
    prerequisites: ['HTML', 'CSS'],
    progress: 0,
    completedLessons: 0,
    totalLessons: 12,
    installation: {
      title: 'Installing Tailwind CSS',
      steps: [
        {
          step: 1,
          title: 'Install Tailwind via npm',
          description: 'Set up Tailwind in your project:',
          commands: [
            '# Create a new project',
            'mkdir my-project',
            'cd my-project',
            'npm init -y',
            '',
            '# Install Tailwind CSS',
            'npm install -D tailwindcss',
            '',
            '# Initialize Tailwind',
            'npx tailwindcss init'
          ]
        },
        {
          step: 2,
          title: 'Configure Template Paths',
          description: 'Update tailwind.config.js:',
          commands: [
            '/** @type {import(\'tailwindcss\').Config} */',
            'module.exports = {',
            '  content: [',
            '    "./src/**/*.{html,js}",',
            '    "./public/index.html"',
            '  ],',
            '  theme: {',
            '    extend: {},',
            '  },',
            '  plugins: [],',
            '}'
          ]
        },
        {
          step: 3,
          title: 'Add Tailwind Directives',
          description: 'Create your CSS file (src/input.css):',
          commands: [
            '@tailwind base;',
            '@tailwind components;',
            '@tailwind utilities;'
          ]
        },
        {
          step: 4,
          title: 'Build Your CSS',
          description: 'Compile Tailwind:',
          commands: [
            '# Build CSS',
            'npx tailwindcss -i ./src/input.css -o ./public/output.css --watch',
            '',
            '# Link in HTML',
            '<link href="/output.css" rel="stylesheet">'
          ]
        },
        {
          step: 5,
          title: 'Alternative: Use Tailwind CDN (Quick Start)',
          description: 'For testing, use CDN:',
          commands: [
            '<!-- Add to HTML <head> -->',
            '<script src="https://cdn.tailwindcss.com"></script>',
            '',
            '<!-- Start using classes -->',
            '<h1 class="text-3xl font-bold text-blue-600">',
            '  Hello Tailwind!',
            '</h1>'
          ]
        }
      ]
    },
    modules: []
  }
};

// Get course by ID
export const getCourse = (courseId) => {
  return coursesData[courseId] || null;
};

// Get all courses
export const getAllCourses = () => {
  return Object.entries(coursesData).map(([id, course]) => ({
    id,
    ...course
  }));
};
