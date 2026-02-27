const mongoose = require('mongoose');
const Course = require('./models/Course');
const Module = require('./models/Module');
const Lesson = require('./models/Lesson');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/devnest')
    .then(() => console.log('MongoDB connected for seeding...'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

const seedData = async () => {
    try {
        // Clear existing data
        console.log('Clearing existing data...');
        await Lesson.deleteMany({});
        await Module.deleteMany({});
        await Course.deleteMany({});
        console.log('Existing data cleared.');

        // ======== HTML COURSE ========
        console.log('Creating HTML course...');
        const htmlCourse = await Course.create({
            title: 'HTML Fundamentals',
            description: 'Learn the building blocks of the web. Master HTML to create well-structured, semantic web pages from scratch.',
            level: 'Beginner',
            slug: 'html',
            duration: '4 hours',
            prerequisites: [],
            icon: '📄',
            totalLessons: 15,
            isPublished: true,
            order: 1
        });

        // HTML Module 1: Getting Started
        const htmlModule1 = await Module.create({
            course: htmlCourse._id,
            title: 'Getting Started with HTML',
            description: 'Introduction to HTML, setting up your environment, and creating your first webpage',
            order: 1,
            isPublished: true
        });

        await Lesson.create([
            {
                module: htmlModule1._id,
                course: htmlCourse._id,
                title: 'What is HTML?',
                content: `# What is HTML?

HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page using a series of elements.

## Key Concepts
- **Markup Language**: HTML uses tags to mark up content
- **Elements**: Building blocks of HTML pages
- **Structure**: Defines how content is organized
- **Semantic**: Modern HTML5 provides meaning to content

## Why Learn HTML?
1. Foundation of web development
2. Required for all web projects
3. Easy to learn and use
4. Opens doors to CSS and JavaScript`,
                codeExample: `<!DOCTYPE html>
<html>
<head>
    <title>My First Page</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>This is my first HTML page.</p>
</body>
</html>`,
                duration: 15,
                order: 1,
                isPublished: true
            },
            {
                module: htmlModule1._id,
                course: htmlCourse._id,
                title: 'Setting Up Your Environment',
                content: `# Setting Up Your Environment

To start writing HTML, you only need a text editor and a web browser.

## Recommended Tools
- **VS Code**: Free, powerful code editor
- **Chrome DevTools**: Built-in browser inspector
- **Live Server**: VS Code extension for live reload

## Installation Steps
1. Download and install VS Code
2. Install "Live Server" extension
3. Create a project folder
4. Open folder in VS Code

## Your First HTML File
1. Create a file named \`index.html\`
2. Add basic HTML structure
3. Right-click and select "Open with Live Server"
4. Your page opens in the browser!`,
                codeExample: `<!-- Save as index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Website</title>
</head>
<body>
    <h1>Welcome to My Website</h1>
</body>
</html>`,
                duration: 20,
                order: 2,
                isPublished: true
            }
        ]);

        // HTML Module 2: Core Elements
        const htmlModule2 = await Module.create({
            course: htmlCourse._id,
            title: 'Core HTML Elements',
            description: 'Learn about headings, paragraphs, links, images, and other essential HTML elements',
            order: 2,
            isPublished: true
        });

        await Lesson.create([
            {
                module: htmlModule2._id,
                course: htmlCourse._id,
                title: 'Headings and Paragraphs',
                content: `# Headings and Paragraphs

Headings and paragraphs are fundamental for structuring content on your web page.

## Headings (h1-h6)
- Six levels of headings
- \`<h1>\` is the most important
- \`<h6>\` is the least important
- Only one \`<h1>\` per page (best practice)

## Paragraphs
- Use \`<p>\` tag for text blocks
- Browsers automatically add space around paragraphs
- Line breaks within paragraphs are ignored

## Best Practices
- Use headings hierarchically
- Don't skip heading levels
- Keep paragraphs concise
- Use semantic meaning over styling`,
                codeExample: `<!DOCTYPE html>
<html>
<body>
    <h1>Main Page Title</h1>
    <p>This is a paragraph with some text.</p>
    
    <h2>Section Heading</h2>
    <p>Another paragraph here.</p>
    
    <h3>Subsection</h3>
    <p>Even more content in this section.</p>
</body>
</html>`,
                duration: 25,
                order: 1,
                isPublished: true
            },
            {
                module: htmlModule2._id,
                course: htmlCourse._id,
                title: 'Links and Images',
                content: `# Links and Images

Learn how to add hyperlinks and images to your web pages.

## Links
- Use \`<a>\` (anchor) tag
- \`href\` attribute specifies destination
- Can link to external sites or pages within your site
- \`target="_blank"\` opens in new tab

## Images
- Use \`<img>\` tag (self-closing)
- \`src\` attribute specifies image source
- \`alt\` attribute for accessibility (required)
- Width and height can be specified

## Accessibility
- Always provide meaningful alt text
- Use descriptive link text
- Avoid "click here" as link text`,
                codeExample: `<!DOCTYPE html>
<html>
<body>
    <!-- Links -->
    <a href="https://google.com">Visit Google</a>
    <a href="about.html">About Page</a>
    <a href="https://github.com" target="_blank">GitHub (new tab)</a>
    
    <!-- Images -->
    <img src="logo.png" alt="Company Logo" width="200">
    <img src="https://example.com/photo.jpg" alt="Beautiful landscape">
</body>
</html>`,
                duration: 30,
                order: 2,
                isPublished: true
            }
        ]);

        // HTML Module 3: Lists and Tables
        const htmlModule3 = await Module.create({
            course: htmlCourse._id,
            title: 'Lists and Tables',
            description: 'Organize content with ordered lists, unordered lists, and tables',
            order: 3,
            isPublished: true
        });

        await Lesson.create([
            {
                module: htmlModule3._id,
                course: htmlCourse._id,
                title: 'Ordered and Unordered Lists',
                content: `# Lists in HTML

Lists help organize related items in a structured way.

## Unordered Lists
- Use \`<ul>\` for bullet points
- Each item wrapped in \`<li>\`
- Default style is bullet points
- Can be nested for sub-items

## Ordered Lists
- Use \`<ol>\` for numbered lists
- Each item wrapped in \`<li>\`
- Numbers automatically increment
- Can start at any number with \`start\` attribute

## Description Lists
- Use \`<dl>\` for term/definition pairs
- \`<dt>\` for the term
- \`<dd>\` for the definition`,
                codeExample: `<!-- Unordered List -->
<ul>
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
</ul>

<!-- Ordered List -->
<ol>
    <li>Learn HTML</li>
    <li>Learn CSS</li>
    <li>Build a project</li>
</ol>

<!-- Nested List -->
<ul>
    <li>Frontend
        <ul>
            <li>React</li>
            <li>Vue</li>
        </ul>
    </li>
    <li>Backend
        <ul>
            <li>Node.js</li>
            <li>Express</li>
        </ul>
    </li>
</ul>`,
                duration: 20,
                order: 1,
                isPublished: true
            },
            {
                module: htmlModule3._id,
                course: htmlCourse._id,
                title: 'HTML Tables',
                content: `# HTML Tables

Tables display data in rows and columns.

## Table Structure
- \`<table>\` wrapper element
- \`<tr>\` for table rows
- \`<th>\` for header cells
- \`<td>\` for data cells
- \`<thead>\`, \`<tbody>\`, \`<tfoot>\` for sections

## Best Practices
- Use tables for tabular data only
- Don't use tables for layout
- Include headers for accessibility
- Consider responsive design

## Attributes
- \`colspan\` spans multiple columns
- \`rowspan\` spans multiple rows`,
                codeExample: `<table border="1">
    <thead>
        <tr>
            <th>Name</th>
            <th>Age</th>
            <th>City</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>John Doe</td>
            <td>28</td>
            <td>New York</td>
        </tr>
        <tr>
            <td>Jane Smith</td>
            <td>34</td>
            <td>London</td>
        </tr>
    </tbody>
</table>`,
                duration: 25,
                order: 2,
                isPublished: true
            }
        ]);

        console.log('HTML course created successfully!');

        // ======== CSS COURSE ========
        console.log('Creating CSS course...');
        const cssCourse = await Course.create({
            title: 'CSS Styling',
            description: 'Master CSS to style beautiful, responsive websites. Learn layouts, animations, and modern CSS techniques.',
            level: 'Beginner',
            slug: 'css',
            duration: '6 hours',
            prerequisites: ['HTML'],
            icon: '🎨',
            totalLessons: 18,
            isPublished: true,
            order: 2
        });

        // CSS Module 1: CSS Basics
        const cssModule1 = await Module.create({
            course: cssCourse._id,
            title: 'CSS Basics',
            description: 'Introduction to CSS, selectors, and applying styles',
            order: 1,
            isPublished: true
        });

        await Lesson.create([
            {
                module: cssModule1._id,
                course: cssCourse._id,
                title: 'What is CSS?',
                content: `# What is CSS?

CSS (Cascading Style Sheets) is used to style and layout web pages. It controls colors, fonts, spacing, and positioning.

## Why CSS?
- Separates content from presentation
- Reusable styles across pages
- Better maintainability
- Responsive design capabilities

## Three Ways to Add CSS
1. **Inline**: Style attribute on elements
2. **Internal**: \`<style>\` tag in HTML
3. **External**: Separate .css file (recommended)

## CSS Syntax
\`\`\`
selector {
    property: value;
}
\`\`\``,
                codeExample: `/* External CSS file: styles.css */
body {
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    margin: 0;
    padding: 20px;
}

h1 {
    color: #333;
    text-align: center;
}

p {
    color: #666;
    line-height: 1.6;
}`,
                duration: 20,
                order: 1,
                isPublished: true
            },
            {
                module: cssModule1._id,
                course: cssCourse._id,
                title: 'CSS Selectors',
                content: `# CSS Selectors

Selectors target HTML elements to apply styles.

## Basic Selectors
- **Element**: \`p { }\` - selects all \`<p>\` tags
- **Class**: \`.classname { }\` - selects elements with class
- **ID**: \`#idname { }\` - selects element with ID
- **Universal**: \`* { }\` - selects everything

## Combinators
- **Descendant**: \`div p\` - p inside div
- **Child**: \`div > p\` - direct child
- **Adjacent**: \`h1 + p\` - p right after h1
- **Sibling**: \`h1 ~ p\` - all p siblings after h1

## Pseudo-classes
- \`:hover\` - mouse over
- \`:active\` - being clicked
- \`:focus\` - has focus
- \`:first-child\`, \`:last-child\``,
                codeExample: `/* Element selector */
p {
    color: blue;
}

/* Class selector */
.highlight {
    background-color: yellow;
}

/* ID selector */
#header {
    font-size: 24px;
}

/* Descendant selector */
div p {
    margin: 10px;
}

/* Pseudo-class */
a:hover {
    color: red;
    text-decoration: none;
}

/* Multiple selectors */
h1, h2, h3 {
    font-family: Georgia, serif;
}`,
                duration: 30,
                order: 2,
                isPublished: true
            }
        ]);

        // CSS Module 2: Box Model and Layout
        const cssModule2 = await Module.create({
            course: cssCourse._id,
            title: 'Box Model and Layout',
            description: 'Understanding the CSS box model, positioning, and flexbox',
            order: 2,
            isPublished: true
        });

        await Lesson.create([
            {
                module: cssModule2._id,
                course: cssCourse._id,
                title: 'The Box Model',
                content: `# The CSS Box Model

Every HTML element is a box with content, padding, border, and margin.

## Box Model Components
1. **Content**: The actual content (text, images)
2. **Padding**: Space inside border
3. **Border**: Surrounds padding
4. **Margin**: Space outside border

## Box-Sizing
- \`content-box\` (default): width = content only
- \`border-box\`: width = content + padding + border

## Display Property
- \`block\`: Full width, new line
- \`inline\`: Width of content, same line
- \`inline-block\`: Hybrid approach
- \`none\`: Hidden`,
                codeExample: `/* Apply to all elements */
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.box {
    width: 300px;
    padding: 20px;
    border: 2px solid #333;
    margin: 10px;
    background-color: lightblue;
}

.inline-element {
    display: inline-block;
    width: 100px;
    height: 100px;
    background: coral;
}`,
                duration: 25,
                order: 1,
                isPublished: true
            },
            {
                module: cssModule2._id,
                course: cssCourse._id,
                title: 'Flexbox Layout',
                content: `# Flexbox Layout

Flexbox makes it easy to create flexible, responsive layouts.

## Container Properties
- \`display: flex\` - enables flexbox
- \`flex-direction\` - row or column
- \`justify-content\` - horizontal alignment
- \`align-items\` - vertical alignment
- \`flex-wrap\` - wrap items or not

## Item Properties
- \`flex-grow\` - how much to grow
- \`flex-shrink\` - how much to shrink
- \`flex-basis\` - initial size
- \`order\` - display order

## Common Patterns
- Centering elements
- Navigation bars
- Card layouts
- Responsive grids`,
                codeExample: `.container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
}

/* Center an element */
.center {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

/* Responsive cards */
.cards {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
}

.card {
    flex: 1 1 300px; /* grow shrink basis */
    padding: 20px;
    background: white;
    border-radius: 8px;
}`,
                duration: 35,
                order: 2,
                isPublished: true
            }
        ]);

        console.log('CSS course created successfully!');

        // ======== JAVASCRIPT COURSE ========
        console.log('Creating JavaScript course...');
        const jsCourse = await Course.create({
            title: 'JavaScript Essentials',
            description: 'Learn JavaScript from basics to advanced. Master variables, functions, DOM manipulation, and async programming.',
            level: 'Beginner',
            slug: 'javascript',
            duration: '10 hours',
            prerequisites: ['HTML', 'CSS'],
            icon: '⚡',
            totalLessons: 25,
            isPublished: true,
            order: 3
        });

        // JS Module 1: JavaScript Basics
        const jsModule1 = await Module.create({
            course: jsCourse._id,
            title: 'JavaScript Fundamentals',
            description: 'Variables, data types, operators, and basic programming concepts',
            order: 1,
            isPublished: true
        });

        await Lesson.create([
            {
                module: jsModule1._id,
                course: jsCourse._id,
                title: 'Introduction to JavaScript',
                content: `# Introduction to JavaScript

JavaScript is a programming language that adds interactivity to websites.

## What Can JavaScript Do?
- Manipulate HTML and CSS
- Respond to user events
- Validate forms
- Create animations
- Communicate with servers (AJAX)
- Build entire applications

## How to Use JavaScript
1. **Inline**: In HTML event attributes
2. **Internal**: \`<script>\` tag in HTML
3. **External**: Separate .js file (best practice)

## First JavaScript Code
\`\`\`javascript
console.log('Hello, World!');
\`\`\`

## Developer Tools
- Press F12 to open browser console
- Test code in the console
- View errors and logs`,
                codeExample: `// External JavaScript file: script.js

// Output to console
console.log('Hello, JavaScript!');

// Show an alert
alert('Welcome to DevNest!');

// Display in document
document.write('This is JavaScript!');

// Change HTML content
document.getElementById('demo').innerHTML = 'Content changed!';`,
                duration: 20,
                order: 1,
                isPublished: true
            },
            {
                module: jsModule1._id,
                course: jsCourse._id,
                title: 'Variables and Data Types',
                content: `# Variables and Data Types

Variables store data values. JavaScript has several data types.

## Declaring Variables
- \`var\` - old way (avoid)
- \`let\` - block-scoped, can reassign
- \`const\` - block-scoped, cannot reassign

## Data Types
1. **String**: Text - \`"hello"\`, \`'world'\`
2. **Number**: All numbers - \`42\`, \`3.14\`
3. **Boolean**: \`true\` or \`false\`
4. **Undefined**: Variable declared but not assigned
5. **Null**: Intentionally empty value
6. **Object**: Collections of key-value pairs
7. **Array**: Ordered lists

## Type Checking
\`\`\`javascript
typeof variableName
\`\`\``,
                codeExample: `// Variables
let name = 'John';
let age = 25;
const PI = 3.14159;
let isStudent = true;

// Arrays
let colors = ['red', 'green', 'blue'];
let numbers = [1, 2, 3, 4, 5];

// Objects
let person = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    email: 'john@example.com'
};

// Type checking
console.log(typeof name);      // "string"
console.log(typeof age);       // "number"
console.log(typeof isStudent); // "boolean"
console.log(typeof person);    // "object"

// Updating values
age = 26;
person.age = 31;
colors.push('yellow');`,
                duration: 30,
                order: 2,
                isPublished: true
            }
        ]);

        // JS Module 2: Functions and Control Flow
        const jsModule2 = await Module.create({
            course: jsCourse._id,
            title: 'Functions and Control Flow',
            description: 'Functions, conditionals, loops, and program flow control',
            order: 2,
            isPublished: true
        });

        await Lesson.create([
            {
                module: jsModule2._id,
                course: jsCourse._id,
                title: 'Functions',
                content: `# Functions in JavaScript

Functions are reusable blocks of code that perform specific tasks.

## Function Declaration
\`\`\`javascript
function functionName(parameters) {
    // code to execute
    return value;
}
\`\`\`

## Function Types
1. **Regular functions**: Named, hoisted
2. **Function expressions**: Assigned to variables
3. **Arrow functions**: Shorter syntax (ES6)
4. **Anonymous functions**: No name

## Parameters and Arguments
- Parameters are placeholders
- Arguments are actual values
- Default parameters: \`function(x = 0)\`
- Rest parameters: \`function(...args)\`

## Return Statement
- Returns value to caller
- Exits function
- Without return, function returns \`undefined\``,
                codeExample: `// Function declaration
function greet(name) {
    return 'Hello, ' + name + '!';
}

// Function expression
const add = function(a, b) {
    return a + b;
};

// Arrow function
const multiply = (a, b) => a * b;

// Arrow function with block
const divide = (a, b) => {
    if (b === 0) return 'Cannot divide by zero';
    return a / b;
};

// Using functions
console.log(greet('John'));        // "Hello, John!"
console.log(add(5, 3));           // 8
console.log(multiply(4, 2));      // 8

// Default parameters
function introduce(name = 'Guest') {
    return 'Welcome, ' + name;
}
console.log(introduce());         // "Welcome, Guest"
console.log(introduce('Alice'));  // "Welcome, Alice"`,
                duration: 35,
                order: 1,
                isPublished: true
            },
            {
                module: jsModule2._id,
                course: jsCourse._id,
                title: 'Conditionals and Loops',
                content: `# Control Flow

Control the flow of your program with conditionals and loops.

## Conditionals
- \`if\` - execute if condition is true
- \`else if\` - check additional conditions
- \`else\` - execute if all conditions false
- \`switch\` - multiple conditions
- Ternary operator: \`condition ? true : false\`

## Loops
- \`for\` - known number of iterations
- \`while\` - condition-based loop
- \`do...while\` - executes at least once
- \`for...of\` - iterate over arrays
- \`for...in\` - iterate over object properties

## Loop Control
- \`break\` - exit loop
- \`continue\` - skip to next iteration`,
                codeExample: `// If-else statement
let score = 85;
if (score >= 90) {
    console.log('A');
} else if (score >= 80) {
    console.log('B');
} else {
    console.log('C');
}

// Ternary operator
let status = score >= 60 ? 'Pass' : 'Fail';

// Switch statement
let day = 'Monday';
switch(day) {
    case 'Monday':
        console.log('Start of week');
        break;
    case 'Friday':
        console.log('Almost weekend!');
        break;
    default:
        console.log('Regular day');
}

// For loop
for (let i = 0; i < 5; i++) {
    console.log(i); // 0, 1, 2, 3, 4
}

// While loop
let count = 0;
while (count < 3) {
    console.log(count);
    count++;
}

// For...of loop (arrays)
let fruits = ['apple', 'banana', 'orange'];
for (let fruit of fruits) {
    console.log(fruit);
}`,
                duration: 40,
                order: 2,
                isPublished: true
            }
        ]);

        // JS Module 3: DOM Manipulation
        const jsModule3 = await Module.create({
            course: jsCourse._id,
            title: 'DOM Manipulation',
            description: 'Select elements, modify content, handle events, and create dynamic web pages',
            order: 3,
            isPublished: true
        });

        await Lesson.create([
            {
                module: jsModule3._id,
                course: jsCourse._id,
                title: 'Selecting Elements',
                content: `# DOM Manipulation Basics

The DOM (Document Object Model) represents your HTML as a tree of objects.

## Selecting Elements
- \`getElementById()\` - single element by ID
- \`getElementsByClassName()\` - collection by class
- \`getElementsByTagName()\` - collection by tag
- \`querySelector()\` - first match (CSS selector)
- \`querySelectorAll()\` - all matches (CSS selector)

## Modifying Content
- \`innerHTML\` - HTML content
- \`textContent\` - text only
- \`value\` - form input value

## Modifying Attributes
- \`getAttribute()\` - get attribute value
- \`setAttribute()\` - set attribute
- \`removeAttribute()\` - remove attribute

## Modifying Styles
- \`element.style.property = value\`
- \`classList.add()\`, \`remove()\`, \`toggle()\``,
                codeExample: `// Selecting elements
const heading = document.getElementById('main-heading');
const buttons = document.querySelectorAll('.btn');
const firstParagraph = document.querySelector('p');

// Modifying content
heading.textContent = 'New Heading';
heading.innerHTML = '<strong>Bold Heading</strong>';

// Modifying attributes
const link = document.querySelector('a');
link.setAttribute('href', 'https://new-url.com');
link.setAttribute('target', '_blank');

// Modifying styles
heading.style.color = 'blue';
heading.style.fontSize = '32px';
heading.style.backgroundColor = '#f0f0f0';

// Working with classes
const box = document.querySelector('.box');
box.classList.add('active');
box.classList.remove('inactive');
box.classList.toggle('highlight');
console.log(box.classList.contains('active')); // true

// Creating elements
const newDiv = document.createElement('div');
newDiv.textContent = 'I am new!';
newDiv.className = 'new-element';
document.body.appendChild(newDiv);`,
                duration: 35,
                order: 1,
                isPublished: true
            },
            {
                module: jsModule3._id,
                course: jsCourse._id,
                title: 'Event Handling',
                content: `# Event Handling

Events allow JavaScript to respond to user actions.

## Common Events
- \`click\` - mouse click
- \`dblclick\` - double click
- \`mouseenter\`, \`mouseleave\` - mouse hover
- \`keydown\`, \`keyup\` - keyboard
- \`submit\` - form submission
- \`change\` - input value change
- \`load\` - page/image loaded

## Adding Event Listeners
\`\`\`javascript
element.addEventListener('event', function)
\`\`\`

## Event Object
- Automatically passed to handler
- Contains info about the event
- \`event.target\` - element that triggered
- \`event.preventDefault()\` - stop default action

## Removing Event Listeners
\`\`\`javascript
element.removeEventListener('event', function)
\`\`\``,
                codeExample: `// Click event
const button = document.querySelector('#myButton');
button.addEventListener('click', function() {
    alert('Button clicked!');
});

// Arrow function
button.addEventListener('click', () => {
    console.log('Clicked with arrow function');
});

// Event object
button.addEventListener('click', (event) => {
    console.log(event.target);     // the button element
    console.log(event.type);       // "click"
});

// Form submission
const form = document.querySelector('#myForm');
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Stop page reload
    const input = document.querySelector('#username');
    console.log('Submitted:', input.value);
});

// Keyboard events
const input = document.querySelector('#search');
input.addEventListener('keyup', (e) => {
    console.log('You typed:', e.target.value);
    if (e.key === 'Enter') {
        console.log('Enter key pressed!');
    }
});

// Multiple events on same element
button.addEventListener('mouseenter', () => {
    button.style.backgroundColor = 'lightblue';
});
button.addEventListener('mouseleave', () => {
    button.style.backgroundColor = '';
});`,
                duration: 40,
                order: 2,
                isPublished: true
            }
        ]);

        console.log('JavaScript course created successfully!');

        // ======== REACT COURSE ========
        console.log('Creating React course...');
        const reactCourse = await Course.create({
            title: 'React Development',
            description: 'Master React.js to build modern, interactive user interfaces with components, hooks, and state management.',
            level: 'Intermediate',
            slug: 'react',
            duration: '8 hours',
            prerequisites: ['JavaScript Essentials'],
            icon: '⚛️',
            totalLessons: 20,
            isPublished: true,
            order: 4
        });

        // React Module 1: React Basics
        const reactModule1 = await Module.create({
            course: reactCourse._id,
            title: 'React Fundamentals',
            description: 'Learn the core concepts of React including components, JSX, and props',
            order: 1,
            isPublished: true
        });

        await Lesson.create([
            {
                module: reactModule1._id,
                course: reactCourse._id,
                title: 'Introduction to React',
                content: `# Introduction to React

React is a JavaScript library for building user interfaces, developed and maintained by Facebook.

## What is React?
React is a declarative, efficient, and flexible JavaScript library for building user interfaces. It lets you compose complex UIs from small and isolated pieces of code called "components".

## Why Use React?
1. **Component-Based**: Build encapsulated components that manage their own state
2. **Declarative**: Design simple views for each state in your application
3. **Learn Once, Write Anywhere**: Develop new features without rewriting existing code
4. **Virtual DOM**: Efficient updates and rendering

## Key Features
- **JSX**: JavaScript syntax extension
- **Components**: Reusable UI building blocks
- **Props**: Pass data between components
- **State**: Manage component data
- **Hooks**: Use state and lifecycle in functional components

## React Ecosystem
- **Create React App**: Official scaffolding tool
- **Next.js**: React framework for production
- **React Router**: Client-side routing
- **Redux/Context**: State management`,
                codeExample: `// Simple React Component
import React from 'react';

function Welcome() {
    return (
        <div>
            <h1>Welcome to React!</h1>
            <p>Let's build something amazing.</p>
        </div>
    );
}

export default Welcome;`,
                duration: 20,
                order: 1,
                isPublished: true
            },
            {
                module: reactModule1._id,
                course: reactCourse._id,
                title: 'Components and JSX',
                content: `# Components and JSX

Components are the building blocks of React applications. JSX is a syntax extension that lets you write HTML-like code in JavaScript.

## What is JSX?
JSX stands for JavaScript XML. It allows us to write HTML elements in JavaScript and place them in the DOM without using createElement() or appendChild().

## Component Types
### Functional Components (Recommended)
- Simple JavaScript functions
- Return JSX
- Can use Hooks

### Class Components (Legacy)
- ES6 classes extending React.Component
- Have lifecycle methods
- Use this.state and this.setState()

## JSX Rules
1. **Single Parent**: Must return one parent element
2. **Close All Tags**: Self-closing tags like <img /> required
3. **className**: Use className instead of class
4. **camelCase**: Attributes use camelCase (onClick, onChange)
5. **JavaScript in JSX**: Use curly braces {}

## Props
Props (properties) are arguments passed into React components. They are passed to components via HTML attributes.

### Props Rules
- Props are read-only
- Components must act like pure functions
- Use destructuring for cleaner code`,
                codeExample: `// Functional Component with Props
function Greeting({ name, age }) {
    return (
        <div className="greeting-card">
            <h2>Hello, {name}!</h2>
            <p>You are {age} years old.</p>
            {age >= 18 ? <p>Adult</p> : <p>Minor</p>}
        </div>
    );
}

// Using the Component
function App() {
    return (
        <div>
            <Greeting name="Alice" age={25} />
            <Greeting name="Bob" age={16} />
        </div>
    );
}

export default App;`,
                duration: 30,
                order: 2,
                isPublished: true
            },
            {
                module: reactModule1._id,
                course: reactCourse._id,
                title: 'State and useState Hook',
                content: `# State and useState Hook

State is a built-in object that stores property values that belong to a component. When state changes, the component re-renders.

## What is State?
- State is mutable data managed within a component
- When state updates, React re-renders the component
- Each component has its own state
- State can be passed to child components as props

## useState Hook
The useState hook lets you add state to functional components.

### Syntax
\`\`\`javascript
const [state, setState] = useState(initialValue);
\`\`\`

- **state**: Current state value
- **setState**: Function to update state
- **initialValue**: Initial state value

## Rules of Hooks
1. Only call Hooks at the top level
2. Only call Hooks from React functions
3. Don't call Hooks in loops, conditions, or nested functions

## State Updates
- State updates are asynchronous
- Use functional updates when new state depends on old state
- Never mutate state directly`,
                codeExample: `import React, { useState } from 'react';

function Counter() {
    // Declare state variable
    const [count, setCount] = useState(0);
    const [name, setName] = useState('Guest');

    // Event handlers
    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count - 1);
    const reset = () => setCount(0);

    // Functional update (recommended)
    const incrementByTwo = () => {
        setCount(prevCount => prevCount + 2);
    };

    return (
        <div className="counter">
            <h2>Welcome, {name}!</h2>
            <input 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
            />
            
            <h1>Count: {count}</h1>
            <button onClick={increment}>+</button>
            <button onClick={decrement}>-</button>
            <button onClick={reset}>Reset</button>
            <button onClick={incrementByTwo}>+2</button>
        </div>
    );
}

export default Counter;`,
                duration: 35,
                order: 3,
                isPublished: true
            }
        ]);

        // React Module 2: Advanced Hooks
        const reactModule2 = await Module.create({
            course: reactCourse._id,
            title: 'React Hooks',
            description: 'Master React Hooks including useEffect, useContext, useRef, and custom hooks',
            order: 2,
            isPublished: true
        });

        await Lesson.create([
            {
                module: reactModule2._id,
                course: reactCourse._id,
                title: 'useEffect Hook',
                content: `# useEffect Hook

The useEffect hook lets you perform side effects in functional components. It serves the same purpose as componentDidMount, componentDidUpdate, and componentWillUnmount in class components.

## What are Side Effects?
Side effects are operations that affect something outside the component:
- Fetching data from an API
- Setting up subscriptions
- Manually changing the DOM
- Timers (setTimeout, setInterval)

## useEffect Syntax
\`\`\`javascript
useEffect(() => {
    // Effect code here
    return () => {
        // Cleanup code (optional)
    };
}, [dependencies]);
\`\`\`

## Dependency Array
- **No array**: Runs after every render
- **Empty array []**: Runs only once after initial render
- **[dep1, dep2]**: Runs when dependencies change

## Common Use Cases
1. **Data Fetching**: Fetch data when component mounts
2. **Subscriptions**: Subscribe to external data sources
3. **Event Listeners**: Add/remove event listeners
4. **Timers**: Set up intervals or timeouts
5. **LocalStorage**: Sync state with localStorage

## Cleanup Function
Return a cleanup function to prevent memory leaks:
- Remove event listeners
- Cancel network requests
- Clear timers
- Unsubscribe from subscriptions`,
                codeExample: `import React, { useState, useEffect } from 'react';

function DataFetcher() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(0);

    // Runs once on mount
    useEffect(() => {
        console.log('Component mounted');
        
        // Cleanup on unmount
        return () => {
            console.log('Component will unmount');
        };
    }, []);

    // Runs when count changes
    useEffect(() => {
        console.log('Count changed to:', count);
        document.title = \`Count: \${count}\`;
    }, [count]);

    // Data fetching example
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://api.example.com/data');
                const result = await response.json();
                setData(result);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Timer example with cleanup
    useEffect(() => {
        const timer = setInterval(() => {
            console.log('Timer tick');
        }, 1000);

        // Cleanup: clear interval when component unmounts
        return () => clearInterval(timer);
    }, []);

    if (loading) return <p>Loading...</p>;

    return (
        <div>
            <h1>Count: {count}</h1>
            <button onClick={() => setCount(count + 1)}>
                Increment
            </button>
            <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
    );
}

export default DataFetcher;`,
                duration: 40,
                order: 4,
                isPublished: true
            },
            {
                module: reactModule2._id,
                course: reactCourse._id,
                title: 'React Router',
                content: `# React Router

React Router is the standard routing library for React. It enables navigation between different components/views in a single-page application.

## Installation
\`\`\`bash
npm install react-router-dom
\`\`\`

## Core Components
- **BrowserRouter**: Wrapper component for the entire app
- **Routes**: Container for all Route components
- **Route**: Defines a route with path and element
- **Link**: Navigation component (like <a> tag)
- **NavLink**: Link with active state styling
- **useNavigate**: Hook for programmatic navigation
- **useParams**: Hook to access URL parameters

## Basic Setup
Wrap your app in BrowserRouter and define routes.

## Navigation
- Use Link for declarative navigation
- Use useNavigate for programmatic navigation
- Use NavLink for navigation with active states

## URL Parameters
Access dynamic URL segments with useParams hook.

## Nested Routes
Create hierarchical route structures with nested Route components.`,
                codeExample: `import React from 'react';
import { 
    BrowserRouter, 
    Routes, 
    Route, 
    Link, 
    useParams,
    useNavigate 
} from 'react-router-dom';

// Components
function Home() {
    return <h1>Home Page</h1>;
}

function About() {
    return <h1>About Page</h1>;
}

function User() {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <div>
            <h1>User Profile: {id}</h1>
            <button onClick={() => navigate('/')}>
                Go Home
            </button>
        </div>
    );
}

function NotFound() {
    return <h1>404 - Page Not Found</h1>;
}

// Navigation Component
function Navigation() {
    return (
        <nav>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/user/123">User 123</Link>
        </nav>
    );
}

// Main App
function App() {
    return (
        <BrowserRouter>
            <Navigation />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/user/:id" element={<User />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;`,
                duration: 35,
                order: 5,
                isPublished: true
            }
        ]);

        console.log('React course created successfully!');

        // ======== NODE.JS COURSE ========
        console.log('Creating Node.js course...');
        const nodeCourse = await Course.create({
            title: 'Node.js Backend Development',
            description: 'Learn server-side JavaScript with Node.js. Build RESTful APIs, work with databases, and create production-ready backend applications.',
            level: 'Intermediate',
            slug: 'nodejs',
            duration: '10 hours',
            prerequisites: ['JavaScript Essentials'],
            icon: '🟢',
            totalLessons: 25,
            isPublished: true,
            order: 5
        });

        // Node.js Module 1: Getting Started
        const nodeModule1 = await Module.create({
            course: nodeCourse._id,
            title: 'Node.js Fundamentals',
            description: 'Introduction to Node.js, NPM, modules, and the event loop',
            order: 1,
            isPublished: true
        });

        await Lesson.create([
            {
                module: nodeModule1._id,
                course: nodeCourse._id,
                title: 'Introduction to Node.js',
                content: `# Introduction to Node.js

Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine. It allows you to run JavaScript on the server.

## What is Node.js?
Node.js is an open-source, cross-platform JavaScript runtime environment that executes JavaScript code outside a web browser.

## Key Features
1. **Asynchronous and Event-Driven**: Non-blocking I/O operations
2. **Fast Execution**: Built on V8 JavaScript engine
3. **Single-Threaded**: Uses event loop for concurrency
4. **NPM**: Largest ecosystem of open-source libraries
5. **Cross-Platform**: Works on Windows, Mac, Linux

## Use Cases
- RESTful APIs
- Real-time applications (chat, gaming)
- Microservices
- Streaming applications
- Command-line tools
- Backend for SPAs

## Node.js vs Browser JavaScript
- **Node.js**: No DOM, has file system access, uses CommonJS
- **Browser**: Has DOM, no file system, uses ES modules

## The Event Loop
Node.js uses an event-driven, non-blocking I/O model:
1. Call Stack: Executes synchronous code
2. Callback Queue: Holds callbacks for async operations
3. Event Loop: Moves callbacks to call stack when empty`,
                codeExample: `// Simple Node.js Server
const http = require('http');

const server = http.createServer((req, res) => {
    // Set response header
    res.writeHead(200, { 'Content-Type': 'text/html' });
    
    // Send response
    res.end('<h1>Hello from Node.js!</h1>');
});

// Listen on port 3000
server.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});

// File System Example
const fs = require('fs');

// Read file asynchronously
fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    console.log('File contents:', data);
});

console.log('This runs before file is read!');`,
                duration: 25,
                order: 1,
                isPublished: true
            },
            {
                module: nodeModule1._id,
                course: nodeCourse._id,
                title: 'Express.js Basics',
                content: `# Express.js Basics

Express is a minimal and flexible Node.js web application framework that provides robust features for web and mobile applications.

## Why Express?
- Simple and minimalist
- Robust routing
- Middleware support
- Template engine integration
- Large community and ecosystem

## Installation
\`\`\`bash
npm install express
\`\`\`

## Core Concepts
### 1. Application
The Express application object has methods for routing, middleware, and configuration.

### 2. Routing
Define endpoints (URIs) and how they respond to client requests.

### 3. Middleware
Functions that have access to request and response objects. They can:
- Execute code
- Modify req/res objects
- End request-response cycle
- Call next middleware

### 4. Request Object (req)
Contains info about HTTP request:
- req.body: POST data
- req.params: URL parameters
- req.query: Query strings
- req.headers: HTTP headers

### 5. Response Object (res)
Used to send HTTP response:
- res.send(): Send response
- res.json(): Send JSON
- res.status(): Set status code
- res.render(): Render view`,
                codeExample: `const express = require('express');
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));

// Logger middleware
app.use((req, res, next) => {
    console.log(\`\${req.method} \${req.url}\`);
    next();
});

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to Express!');
});

app.get('/api/users', (req, res) => {
    res.json([
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' }
    ]);
});

// Route with parameters
app.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    res.json({ id, name: 'User ' + id });
});

// POST route
app.post('/api/users', (req, res) => {
    const { name, email } = req.body;
    res.status(201).json({
        message: 'User created',
        user: { id: 3, name, email }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(\`Server running on port \${PORT}\`);
});`,
                duration: 35,
                order: 2,
                isPublished: true
            },
            {
                module: nodeModule1._id,
                course: nodeCourse._id,
                title: 'Working with MongoDB',
                content: `# Working with MongoDB

MongoDB is a NoSQL database that stores data in flexible, JSON-like documents.

## Why MongoDB?
- Schema-less (flexible structure)
- Scalable and performant
- JSON-like documents
- Rich query language
- Works great with Node.js

## Installation
\`\`\`bash
npm install mongodb mongoose
\`\`\`

## Mongoose ODM
Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js.

### Benefits
- Schema validation
- Type casting
- Query building
- Middleware (hooks)
- Virtual properties

## Core Concepts
### 1. Schema
Defines the structure of documents

### 2. Model
Compiled from schema, represents a collection

### 3. Document
Instance of a model, represents one document

## CRUD Operations
- **Create**: Model.create(), new Model().save()
- **Read**: Model.find(), Model.findById()
- **Update**: Model.updateOne(), Model.findByIdAndUpdate()
- **Delete**: Model.deleteOne(), Model.findByIdAndDelete()`,
                codeExample: `const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/myapp')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('Connection error:', err));

// Define Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    age: {
        type: Number,
        min: 0,
        max: 120
    },
    isActive: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Create Model
const User = mongoose.model('User', userSchema);

// CREATE
async function createUser() {
    const user = await User.create({
        name: 'Alice Johnson',
        email: 'alice@example.com',
        age: 28
    });
    console.log('User created:', user);
}

// READ
async function getUsers() {
    const users = await User.find({ isActive: true });
    console.log('Active users:', users);
    
    const user = await User.findById('someId');
    console.log('User:', user);
}

// UPDATE
async function updateUser(id) {
    const user = await User.findByIdAndUpdate(
        id,
        { age: 29 },
        { new: true, runValidators: true }
    );
    console.log('Updated user:', user);
}

// DELETE
async function deleteUser(id) {
    await User.findByIdAndDelete(id);
    console.log('User deleted');
}`,
                duration: 40,
                order: 3,
                isPublished: true
            }
        ]);

        // Node.js Module 2: REST APIs & Authentication
        const nodeModule2 = await Module.create({
            course: nodeCourse._id,
            title: 'REST APIs & Authentication',
            description: 'Build RESTful APIs and implement JWT authentication',
            order: 2,
            isPublished: true
        });

        await Lesson.create([
            {
                module: nodeModule2._id,
                course: nodeCourse._id,
                title: 'Building REST APIs',
                content: `# Building REST APIs

REST (Representational State Transfer) is an architectural style for building web services.

## REST Principles
1. **Client-Server**: Separation of concerns
2. **Stateless**: Each request contains all needed info
3. **Cacheable**: Responses can be cached
4. **Uniform Interface**: Consistent API design
5. **Layered System**: Hierarchical layers

## HTTP Methods
- **GET**: Retrieve data (Read)
- **POST**: Create new resource (Create)
- **PUT/PATCH**: Update resource (Update)
- **DELETE**: Remove resource (Delete)

## Status Codes
- **200**: OK - Success
- **201**: Created - Resource created
- **400**: Bad Request - Invalid data
- **401**: Unauthorized - Auth required
- **403**: Forbidden - No permission
- **404**: Not Found - Resource doesn't exist
- **500**: Server Error - Internal error

## Best Practices
1. Use nouns for endpoints (/users, not /getUsers)
2. Use HTTP methods correctly
3. Version your API (/api/v1/)
4. Return JSON
5. Handle errors properly
6. Implement pagination
7. Use proper status codes`,
                codeExample: `const express = require('express');
const router = express.Router();
const User = require('../models/User');

// GET /api/users - Get all users
router.get('/users', async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        
        const users = await User.find()
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .select('-password');
        
        const count = await User.countDocuments();
        
        res.json({
            success: true,
            data: users,
            totalPages: Math.ceil(count / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// GET /api/users/:id - Get single user
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
            .select('-password');
        
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }
        
        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// POST /api/users - Create user
router.post('/users', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

// PUT /api/users/:id - Update user
router.put('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }
        
        res.json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
});

// DELETE /api/users/:id - Delete user
router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        
        if (!user) {
            return res.status(404).json({
                success: false,
                error: 'User not found'
            });
        }
        
        res.json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

module.exports = router;`,
                duration: 45,
                order: 4,
                isPublished: true
            },
            {
                module: nodeModule2._id,
                course: nodeCourse._id,
                title: 'JWT Authentication',
                content: `# JWT Authentication

JSON Web Token (JWT) is a compact, URL-safe means of representing claims between two parties.

## What is JWT?
A JWT consists of three parts separated by dots:
- **Header**: Token type and algorithm
- **Payload**: Claims (user data)
- **Signature**: Verification signature

## How JWT Works
1. User sends credentials (login)
2. Server validates and creates JWT
3. Client stores JWT (localStorage/cookie)
4. Client sends JWT in headers for protected routes
5. Server verifies JWT and grants access

## Installation
\`\`\`bash
npm install jsonwebtoken bcryptjs
\`\`\`

## JWT Structure
\`\`\`
xxxxx.yyyyy.zzzzz
header.payload.signature
\`\`\`

## Best Practices
1. Store JWT securely
2. Use HTTPS
3. Set expiration time
4. Refresh tokens for long sessions
5. Validate on every request
6. Don't store sensitive data in JWT

## Security Tips
- Hash passwords with bcrypt
- Use strong secret keys
- Implement rate limiting
- Validate all inputs
- Handle errors properly`,
                codeExample: `const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Register Route
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        
        // Check if user exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                error: 'User already exists'
            });
        }
        
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        // Create user
        user = await User.create({
            name,
            email,
            password: hashedPassword
        });
        
        // Generate JWT
        const token = jwt.sign(
            { userId: user._id },
            JWT_SECRET,
            { expiresIn: '7d' }
        );
        
        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }
        
        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                error: 'Invalid credentials'
            });
        }
        
        // Generate JWT
        const token = jwt.sign(
            { userId: user._id },
            JWT_SECRET,
            { expiresIn: '7d' }
        );
        
        res.json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
});

// Auth Middleware
const protect = async (req, res, next) => {
    try {
        let token;
        
        if (req.headers.authorization?.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        
        if (!token) {
            return res.status(401).json({
                success: false,
                error: 'Not authorized'
            });
        }
        
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = await User.findById(decoded.userId).select('-password');
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            error: 'Invalid token'
        });
    }
};

// Protected Route
router.get('/profile', protect, async (req, res) => {
    res.json({
        success: true,
        user: req.user
    });
});

module.exports = router;`,
                duration: 50,
                order: 5,
                isPublished: true
            }
        ]);

        console.log('Node.js course created successfully!');

        // ======== TAILWIND CSS COURSE ========
        console.log('Creating Tailwind CSS course...');
        const tailwindCourse = await Course.create({
            title: 'Tailwind CSS Mastery',
            description: 'Master utility-first CSS with Tailwind. Build modern, responsive interfaces faster without writing custom CSS.',
            level: 'Beginner',
            slug: 'tailwind',
            duration: '6 hours',
            prerequisites: ['HTML Fundamentals', 'CSS Styling'],
            icon: '🎨',
            totalLessons: 18,
            isPublished: true,
            order: 6
        });

        // Tailwind Module 1: Getting Started
        const tailwindModule1 = await Module.create({
            course: tailwindCourse._id,
            title: 'Tailwind Fundamentals',
            description: 'Introduction to Tailwind CSS, installation, and core concepts',
            order: 1,
            isPublished: true
        });

        await Lesson.create([
            {
                module: tailwindModule1._id,
                course: tailwindCourse._id,
                title: 'Introduction to Tailwind CSS',
                content: `# Introduction to Tailwind CSS

Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces.

## What is Tailwind?
Tailwind is a highly customizable, low-level CSS framework that gives you all the building blocks you need to build bespoke designs without opinionated styles.

## Utility-First Approach
Instead of writing custom CSS, you compose designs using pre-built utility classes:
- \`flex\` instead of \`display: flex\`
- \`text-center\` instead of \`text-align: center\`
- \`bg-blue-500\` instead of \`background-color: #3b82f6\`

## Why Tailwind?
1. **Fast Development**: No context switching between HTML and CSS
2. **Consistent Design**: Built-in design system
3. **Responsive**: Mobile-first breakpoints
4. **Customizable**: Full control via config file
5. **Small Bundle**: Unused styles removed in production
6. **No Naming**: No need to invent class names

## Traditional CSS vs Tailwind
### Traditional CSS
\`\`\`css
.button {
    padding: 0.5rem 1rem;
    background-color: blue;
    color: white;
    border-radius: 0.25rem;
}
\`\`\`

### Tailwind
\`\`\`html
<button class="px-4 py-2 bg-blue-500 text-white rounded">
\`\`\`

## Core Concepts
- **Utility Classes**: Single-purpose classes
- **Responsive Design**: Prefix breakpoints (sm:, md:, lg:)
- **State Variants**: hover:, focus:, active:
- **Configuration**: Customize via tailwind.config.js
- **PurgeCSS**: Remove unused styles`,
                codeExample: `<!-- Installation with Vite -->
npm create vite@latest my-project
cd my-project
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

<!-- tailwind.config.js -->
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

<!-- index.css -->
@tailwind base;
@tailwind components;
@tailwind utilities;

<!-- Example Usage -->
<div class="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
  <div class="relative py-3 sm:max-w-xl sm:mx-auto">
    <div class="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
    <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        Welcome to Tailwind
      </h1>
      <p class="text-gray-600">
        Build amazing interfaces with utility classes!
      </p>
      <button class="mt-4 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
        Get Started
      </button>
    </div>
  </div>
</div>`,
                duration: 25,
                order: 1,
                isPublished: true
            },
            {
                module: tailwindModule1._id,
                course: tailwindCourse._id,
                title: 'Layout and Spacing',
                content: `# Layout and Spacing

Tailwind provides comprehensive utilities for controlling layout, spacing, sizing, and positioning.

## Display
- \`block\` - display: block
- \`inline-block\` - display: inline-block
- \`inline\` - display: inline
- \`flex\` - display: flex
- \`grid\` - display: grid
- \`hidden\` - display: none

## Flexbox
### Container
- \`flex\` - Create flex container
- \`flex-row\` / \`flex-col\` - Direction
- \`flex-wrap\` - Enable wrapping
- \`justify-start\` / \`justify-center\` / \`justify-end\` / \`justify-between\`
- \`items-start\` / \`items-center\` / \`items-end\`
- \`gap-4\` - Gap between items

### Items
- \`flex-1\` - flex: 1
- \`flex-grow\` / \`flex-shrink\`

## Grid
- \`grid\` - Create grid container
- \`grid-cols-3\` - 3 columns
- \`gap-4\` - Gap between items
- \`col-span-2\` - Span 2 columns

## Spacing (Padding & Margin)
Scale: 0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 56, 64
- \`p-4\` - padding: 1rem (all sides)
- \`px-4\` - padding left and right
- \`py-4\` - padding top and bottom
- \`pt-4\` - padding top only
- \`m-4\` - margin: 1rem
- \`mx-auto\` - center horizontally
- \`-mt-4\` - negative margin

## Width & Height
- \`w-full\` - width: 100%
- \`w-1/2\` - width: 50%
- \`w-screen\` - width: 100vw
- \`h-full\` - height: 100%
- \`h-screen\` - height: 100vh
- \`min-h-screen\` - min-height: 100vh
- \`max-w-4xl\` - max-width: 56rem`,
                codeExample: `<!-- Flexbox Layout -->
<div class="flex justify-between items-center p-4 bg-white shadow">
  <div class="flex items-center gap-2">
    <img src="logo.png" class="w-10 h-10" alt="Logo">
    <span class="text-xl font-bold">Brand</span>
  </div>
  <nav class="flex gap-6">
    <a href="#" class="hover:text-blue-500">Home</a>
    <a href="#" class="hover:text-blue-500">About</a>
    <a href="#" class="hover:text-blue-500">Contact</a>
  </nav>
</div>

<!-- Grid Layout -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
  <div class="bg-white p-6 rounded-lg shadow">Card 1</div>
  <div class="bg-white p-6 rounded-lg shadow">Card 2</div>
  <div class="bg-white p-6 rounded-lg shadow">Card 3</div>
  <div class="bg-white p-6 rounded-lg shadow col-span-2">Wide Card</div>
  <div class="bg-white p-6 rounded-lg shadow">Card 5</div>
</div>

<!-- Centered Container -->
<div class="min-h-screen flex items-center justify-center bg-gray-100">
  <div class="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold mb-4">Centered Content</h2>
    <p class="text-gray-600 mb-6">
      This content is centered both horizontally and vertically.
    </p>
    <button class="w-full py-3 bg-blue-500 text-white rounded hover:bg-blue-600">
      Click Me
    </button>
  </div>
</div>

<!-- Responsive Spacing -->
<div class="p-4 sm:p-6 md:p-8 lg:p-12">
  <div class="space-y-4">
    <div class="bg-blue-100 p-4">Item 1</div>
    <div class="bg-blue-100 p-4">Item 2</div>
    <div class="bg-blue-100 p-4">Item 3</div>
  </div>
</div>`,
                duration: 35,
                order: 2,
                isPublished: true
            },
            {
                module: tailwindModule1._id,
                course: tailwindCourse._id,
                title: 'Colors and Typography',
                content: `# Colors and Typography

Tailwind provides a comprehensive color palette and typography utilities.

## Colors
Tailwind includes colors with shades from 50 to 900:
- gray, slate, zinc, neutral, stone
- red, orange, amber, yellow, lime, green, emerald, teal, cyan, sky, blue, indigo, violet, purple, fuchsia, pink, rose

### Usage
- \`text-blue-500\` - text color
- \`bg-blue-500\` - background color
- \`border-blue-500\` - border color
- \`ring-blue-500\` - ring (outline) color

## Typography
### Font Size
- \`text-xs\` - 0.75rem
- \`text-sm\` - 0.875rem
- \`text-base\` - 1rem
- \`text-lg\` - 1.125rem
- \`text-xl\` - 1.25rem
- \`text-2xl\` - 1.5rem
- \`text-3xl\` - 1.875rem
- \`text-4xl\` - 2.25rem

### Font Weight
- \`font-thin\` - 100
- \`font-normal\` - 400
- \`font-medium\` - 500
- \`font-semibold\` - 600
- \`font-bold\` - 700
- \`font-black\` - 900

### Text Alignment
- \`text-left\` / \`text-center\` / \`text-right\`
- \`text-justify\`

### Line Height
- \`leading-none\` / \`leading-tight\` / \`leading-normal\` / \`leading-loose\`

### Letter Spacing
- \`tracking-tight\` / \`tracking-normal\` / \`tracking-wide\`

### Text Decoration
- \`underline\` / \`line-through\` / \`no-underline\`

### Text Transform
- \`uppercase\` / \`lowercase\` / \`capitalize\``,
                codeExample: `<!-- Color Examples -->
<div class="space-y-4 p-6">
  <div class="bg-blue-500 text-white p-4 rounded">
    Blue Background
  </div>
  <div class="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded">
    Gradient Background
  </div>
  <div class="border-2 border-red-500 p-4 rounded">
    Red Border
  </div>
  <button class="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded">
    Hover Effect
  </button>
</div>

<!-- Typography Examples -->
<div class="max-w-2xl mx-auto p-6 space-y-6">
  <h1 class="text-4xl font-bold text-gray-900">
    Large Heading
  </h1>
  <h2 class="text-2xl font-semibold text-gray-800">
    Medium Heading
  </h2>
  <p class="text-base text-gray-600 leading-relaxed">
    This is a paragraph with normal text. The leading-relaxed class 
    adds comfortable line spacing for better readability.
  </p>
  <p class="text-sm text-gray-500 italic">
    Small italic text for captions or notes.
  </p>
  <div class="text-xl font-medium">
    <span class="text-blue-600">Primary</span>
    <span class="text-gray-400 mx-2">|</span>
    <span class="text-green-600">Success</span>
    <span class="text-gray-400 mx-2">|</span>
    <span class="text-red-600">Error</span>
  </div>
</div>

<!-- Card with Typography -->
<div class="max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
  <div class="bg-gradient-to-r from-blue-500 to-purple-600 p-6">
    <h3 class="text-2xl font-bold text-white mb-2">
      Premium Plan
    </h3>
    <p class="text-blue-100">
      Everything you need to grow
    </p>
  </div>
  <div class="p-6">
    <div class="text-4xl font-bold text-gray-900 mb-4">
      $29<span class="text-lg font-normal text-gray-500">/mo</span>
    </div>
    <ul class="space-y-2 text-gray-600">
      <li class="flex items-center gap-2">
        <span class="text-green-500">✓</span>
        Unlimited projects
      </li>
      <li class="flex items-center gap-2">
        <span class="text-green-500">✓</span>
        24/7 support
      </li>
      <li class="flex items-center gap-2">
        <span class="text-green-500">✓</span>
        Advanced analytics
      </li>
    </ul>
    <button class="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors">
      Get Started
    </button>
  </div>
</div>`,
                duration: 30,
                order: 3,
                isPublished: true
            }
        ]);

        // Tailwind Module 2: Advanced Features
        const tailwindModule2 = await Module.create({
            course: tailwindCourse._id,
            title: 'Advanced Tailwind',
            description: 'Responsive design, dark mode, and customization',
            order: 2,
            isPublished: true
        });

        await Lesson.create([
            {
                module: tailwindModule2._id,
                course: tailwindCourse._id,
                title: 'Responsive Design',
                content: `# Responsive Design

Tailwind uses a mobile-first approach with five default breakpoints.

## Breakpoints
- **sm**: 640px (small devices)
- **md**: 768px (medium devices)
- **lg**: 1024px (large devices)
- **xl**: 1280px (extra large)
- **2xl**: 1536px (2x extra large)

## How It Works
By default, utilities apply to all screen sizes. Use breakpoint prefixes to apply utilities at specific breakpoints.

### Mobile-First
\`\`\`html
<!-- padding-4 on mobile, padding-8 on medium screens and up -->
<div class="p-4 md:p-8">
\`\`\`

## Common Patterns
### Responsive Columns
\`\`\`html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
\`\`\`

### Responsive Text
\`\`\`html
<h1 class="text-2xl md:text-4xl lg:text-6xl">
\`\`\`

### Hide/Show Elements
\`\`\`html
<div class="hidden md:block">Desktop only</div>
<div class="block md:hidden">Mobile only</div>
\`\`\`

## Best Practices
1. Start with mobile styles
2. Add larger breakpoint styles as needed
3. Use fewer breakpoints for cleaner code
4. Test on real devices
5. Use browser DevTools for testing`,
                codeExample: `<!-- Responsive Navigation -->
<nav class="bg-white shadow">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="flex justify-between h-16">
      <div class="flex items-center">
        <span class="text-xl font-bold">Logo</span>
      </div>
      
      <!-- Mobile menu button -->
      <button class="md:hidden">
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      
      <!-- Desktop menu -->
      <div class="hidden md:flex md:space-x-8">
        <a href="#" class="inline-flex items-center px-1 pt-1 text-gray-900">
          Home
        </a>
        <a href="#" class="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-900">
          About
        </a>
        <a href="#" class="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-gray-900">
          Contact
        </a>
      </div>
    </div>
  </div>
</nav>

<!-- Responsive Grid -->
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
  <div class="bg-blue-100 p-6 rounded">1</div>
  <div class="bg-blue-100 p-6 rounded">2</div>
  <div class="bg-blue-100 p-6 rounded">3</div>
  <div class="bg-blue-100 p-6 rounded">4</div>
</div>

<!-- Responsive Hero Section -->
<div class="relative bg-gradient-to-r from-purple-600 to-blue-600 h-screen">
  <div class="absolute inset-0 flex items-center justify-center">
    <div class="text-center px-4">
      <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
        Build Amazing Things
      </h1>
      <p class="text-base sm:text-lg md:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
        Create responsive, beautiful interfaces with Tailwind CSS
      </p>
      <button class="px-6 py-3 sm:px-8 sm:py-4 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors">
        Get Started
      </button>
    </div>
  </div>
</div>

<!-- Responsive Card Layout -->
<div class="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div class="bg-white rounded-lg shadow-lg p-6">
      <h3 class="text-xl font-semibold mb-2">Card Title</h3>
      <p class="text-gray-600 text-sm sm:text-base">
        Card description goes here
      </p>
    </div>
  </div>
</div>`,
                duration: 35,
                order: 4,
                isPublished: true
            },
            {
                module: tailwindModule2._id,
                course: tailwindCourse._id,
                title: 'Dark Mode',
                content: `# Dark Mode

Tailwind CSS includes first-class support for styling your site in dark mode.

## Setup Dark Mode
Configure dark mode in tailwind.config.js:

\`\`\`javascript
module.exports = {
  darkMode: 'class', // or 'media'
  // ...
}
\`\`\`

## Dark Mode Strategies
### 1. Class Strategy (Recommended)
Manually toggle dark mode with a class on the html element.

\`\`\`html
<html class="dark">
\`\`\`

### 2. Media Strategy
Automatically use system preference.

## Using Dark Mode
Prefix utilities with \`dark:\` to apply them only in dark mode:

\`\`\`html
<div class="bg-white dark:bg-gray-800">
  <h1 class="text-gray-900 dark:text-white">
    Hello World
  </h1>
</div>
\`\`\`

## Toggle Dark Mode (React)
\`\`\`javascript
const [darkMode, setDarkMode] = useState(false);

useEffect(() => {
  if (darkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}, [darkMode]);
\`\`\`

## Best Practices
1. Test both light and dark modes
2. Ensure sufficient contrast
3. Use semantic colors (not just black/white)
4. Persist user preference in localStorage
5. Smooth transitions between modes`,
                codeExample: `<!-- Dark Mode Toggle Component -->
<div class="min-h-screen bg-white dark:bg-gray-900 transition-colors">
  <nav class="bg-white dark:bg-gray-800 shadow-lg">
    <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
        My App
      </h1>
      <button 
        onclick="toggleDarkMode()"
        class="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
      >
        <svg class="w-6 h-6 hidden dark:block" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" fillRule="evenodd" clipRule="evenodd"></path>
        </svg>
        <svg class="w-6 h-6 block dark:hidden" fill="currentColor" viewBox="0 0 20 20">
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
        </svg>
      </button>
    </div>
  </nav>

  <main class="max-w-7xl mx-auto px-4 py-8">
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">
        Dark Mode Example
      </h2>
      <p class="text-gray-600 dark:text-gray-300 mb-6">
        This content automatically adapts to light and dark mode.
      </p>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Card 1
          </h3>
          <p class="text-gray-600 dark:text-gray-400">
            Card content here
          </p>
        </div>
        <div class="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Card 2
          </h3>
          <p class="text-gray-600 dark:text-gray-400">
            Card content here
          </p>
        </div>
        <div class="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg">
          <h3 class="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Card 3
          </h3>
          <p class="text-gray-600 dark:text-gray-400">
            Card content here
          </p>
        </div>
      </div>
    </div>
  </main>
</div>

<script>
function toggleDarkMode() {
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('darkMode', 
    document.documentElement.classList.contains('dark')
  );
}

// Load saved preference
if (localStorage.getItem('darkMode') === 'true') {
  document.documentElement.classList.add('dark');
}
</script>`,
                duration: 30,
                order: 5,
                isPublished: true
            }
        ]);

        console.log('Tailwind CSS course created successfully!');

        console.log('\n=== SEEDING COMPLETE ===');
        console.log(`6 courses created with modules and lessons`);
        console.log('- HTML Fundamentals (3 modules, 7 lessons)');
        console.log('- CSS Styling (2 modules, 4 lessons)');
        console.log('- JavaScript Essentials (3 modules, 6 lessons)');
        console.log('- React Development (2 modules, 5 lessons)');
        console.log('- Node.js Backend Development (2 modules, 5 lessons)');
        console.log('- Tailwind CSS Mastery (2 modules, 5 lessons)');
        console.log('========================\n');

        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seedData();
