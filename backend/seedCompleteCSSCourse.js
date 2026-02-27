const mongoose = require('mongoose');
const Course = require('./models/Course');
const Module = require('./models/Module');
const Lesson = require('./models/Lesson');
require('dotenv').config();

const seedCSSCourse = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/devnest');
        console.log('MongoDB Connected for CSS Course Seeding...');

        // Clear existing CSS course data
        const existingCourse = await Course.findOne({ slug: 'css' });
        if (existingCourse) {
            await Lesson.deleteMany({ course: existingCourse._id });
            await Module.deleteMany({ course: existingCourse._id });
            await Course.deleteOne({ _id: existingCourse._id });
            console.log('Cleared existing CSS course data');
        }

        // Create CSS Course
        const cssCourse = await Course.create({
            title: 'Complete CSS Mastery',
            description: 'Master CSS from fundamentals to advanced techniques. Learn layouts, animations, responsiveness, and modern CSS features with real-world projects.',
            level: 'Advanced',
            slug: 'css',
            duration: '12 hours',
            prerequisites: ['HTML'],
            icon: '🎨',
            totalLessons: 28,
            isPublished: true,
            order: 2
        });

        console.log('✅ CSS Course created');

        // ============================================
        // MODULE 1: CSS FUNDAMENTALS
        // ============================================
        const module1 = await Module.create({
            course: cssCourse._id,
            title: 'CSS Fundamentals',
            description: 'Master CSS basics, selectors, specificity, and the cascade',
            order: 1,
            isPublished: true
        });

        await Lesson.create([
            {
                module: module1._id,
                course: cssCourse._id,
                title: 'What is CSS?',
                content: `# What is CSS?

**CSS (Cascading Style Sheets)** is a styling language used to describe the presentation of HTML documents. It controls layout, colors, fonts, spacing, and visual effects.

## Why CSS?

- **Separation of Concerns**: Separates content (HTML) from presentation (CSS)
- **Reusability**: Write styles once, apply to multiple pages
- **Maintainability**: Easier to update and manage
- **Performance**: Better browser caching and faster page loads

## How CSS Works

CSS works by selecting HTML elements and applying styles to them. The browser reads your CSS rules and applies them to the matching HTML elements.

## CSS Syntax Structure

\`\`\`css
selector {
  property: value;
  another-property: another-value;
}
\`\`\`

- **Selector**: Targets which HTML elements to style
- **Property**: What aspect to style (color, size, etc.)
- **Value**: How to style that property`,
                codeExample: `/* Basic CSS Rule */
p {
  color: blue;
  font-size: 16px;
  line-height: 1.6;
}

/* Styling multiple elements */
h1, h2, h3 {
  font-family: 'Arial', sans-serif;
  color: #333;
}

/* Complete example */
body {
  margin: 0;
  padding: 0;
  font-family: 'Segoe UI', sans-serif;
  background-color: #f5f5f5;
}`,
                duration: 20,
                order: 1,
                isPublished: true
            },
            {
                module: module1._id,
                course: cssCourse._id,
                title: 'CSS Selectors',
                content: `# CSS Selectors

Selectors are patterns used to select and style HTML elements.

## Basic Selectors

### Element Selector
Targets all elements of a specific type.

### Class Selector
Targets elements with a specific class. Can be reused.

### ID Selector
Targets a single unique element with a specific ID.

### Universal Selector
Targets all elements on the page.

### Attribute Selector
Targets elements based on their attributes.

## When to Use Each Selector

- **Element**: Styling base elements consistently
- **Class**: Reusable styles for multiple elements (most common)
- **ID**: Unique elements like header, footer
- **Universal**: CSS resets
- **Attribute**: Specific input types or links`,
                codeExample: `/* Element Selector */
p {
  color: navy;
  line-height: 1.6;
}

/* Class Selector (reusable) */
.card {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
}

/* ID Selector (unique) */
#main-header {
  background: #333;
  color: white;
  padding: 20px;
}

/* Universal Selector */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Attribute Selector */
input[type="email"] {
  border-color: blue;
}

a[href^="https"] {
  font-weight: bold;
}

/* Group Selector */
h1, h2, h3 {
  font-family: 'Arial', sans-serif;
  color: #333;
}`,
                duration: 25,
                order: 2,
                isPublished: true
            },
            {
                module: module1._id,
                course: cssCourse._id,
                title: 'Specificity & Cascade',
                content: `# Specificity & Cascade

## CSS Specificity

Specificity determines which CSS rule applies when multiple rules target the same element.

### Specificity Hierarchy (Low to High)

1. **Element selectors**: 1 point
2. **Class selectors**: 10 points
3. **ID selectors**: 100 points
4. **Inline styles**: 1000 points
5. **!important**: Overrides everything (use sparingly!)

## The Cascade

When rules have equal specificity, the **last rule** in the stylesheet wins.

## Inheritance

Some properties are inherited from parent to child elements:
- color
- font-family
- font-size
- line-height
- text-align

Not inherited:
- margin, padding
- border
- background
- width, height`,
                codeExample: `/* Specificity Example */
p {
  color: blue; /* Specificity: 1 */
}

.text {
  color: green; /* Specificity: 10 - WINS */
}

#intro {
  color: red; /* Specificity: 100 - WINS */
}

/* Cascade Example */
p {
  color: blue;
}

p {
  color: red; /* This wins - comes last */
}

/* Inheritance Example */
.parent {
  color: purple; /* Children inherit this */
  border: 1px solid black; /* NOT inherited */
}

/* Avoid !important unless absolutely necessary */
.text {
  color: orange !important; /* Overrides everything */
}`,
                duration: 25,
                order: 3,
                isPublished: true
            },
            {
                module: module1._id,
                course: cssCourse._id,
                title: 'Ways to Add CSS',
                content: `# Three Ways to Add CSS

## 1. Inline CSS

CSS written directly in HTML elements using the \`style\` attribute.

**When to use**: Rarely - only for quick tests or dynamic JavaScript styles

**Pros**: Quick for testing
**Cons**: Not reusable, hard to maintain

## 2. Internal CSS

CSS written in \`<style>\` tag within the HTML file.

**When to use**: Single-page websites or page-specific styles

**Pros**: No extra file needed
**Cons**: Not reusable across pages

## 3. External CSS (RECOMMENDED)

CSS in a separate \`.css\` file, linked to HTML.

**When to use**: ALWAYS for production websites

**Pros**: 
- Reusable across multiple pages
- Better organization
- Cached by browser for better performance
- Easier team collaboration`,
                codeExample: `<!-- 1. Inline CSS -->
<p style="color: blue; font-size: 18px;">
  Inline styled text
</p>

<!-- 2. Internal CSS -->
<!DOCTYPE html>
<html>
<head>
  <style>
    p {
      color: green;
      font-size: 16px;
    }
  </style>
</head>
<body>
  <p>Internally styled paragraph</p>
</body>
</html>

<!-- 3. External CSS (BEST PRACTICE) -->
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <p>Externally styled paragraph</p>
</body>
</html>

/* styles.css */
p {
  color: purple;
  font-size: 16px;
  line-height: 1.6;
}`,
                duration: 20,
                order: 4,
                isPublished: true
            }
        ]);

        console.log('✅ Module 1: CSS Fundamentals completed');

        // ============================================
        // MODULE 2: THE BOX MODEL
        // ============================================
        const module2 = await Module.create({
            course: cssCourse._id,
            title: 'The Box Model',
            description: 'Master content, padding, border, margin, and box-sizing',
            order: 2,
            isPublished: true
        });

        await Lesson.create([
            {
                module: module2._id,
                course: cssCourse._id,
                title: 'Understanding the Box Model',
                content: `# The CSS Box Model

Every HTML element is a rectangular box with 4 layers:

## Box Model Components

1. **Content**: The actual content (text, images)
2. **Padding**: Space INSIDE the element, between content and border
3. **Border**: Line around the element
4. **Margin**: Space OUTSIDE the element, creating distance from other elements

## Visual Structure

\`\`\`
┌─────────────────────────────────────┐
│        MARGIN (transparent)          │
│  ┌───────────────────────────────┐  │
│  │       BORDER                   │  │
│  │  ┌─────────────────────────┐  │  │
│  │  │    PADDING              │  │  │
│  │  │  ┌───────────────────┐  │  │  │
│  │  │  │    CONTENT        │  │  │  │
│  │  │  └───────────────────┘  │  │  │
│  │  └─────────────────────────┘  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
\`\`\`

## Key Differences

- **Padding**: Has background color, increases clickable area
- **Margin**: Transparent, creates space between elements`,
                codeExample: `.box {
  /* Content size */
  width: 300px;
  height: 200px;
  
  /* Padding (inside) */
  padding: 20px;
  /* OR individual sides */
  padding-top: 10px;
  padding-right: 20px;
  padding-bottom: 30px;
  padding-left: 40px;
  /* OR shorthand */
  padding: 10px 20px 30px 40px; /* top right bottom left */
  
  /* Border */
  border: 2px solid #333;
  border-radius: 8px;
  
  /* Margin (outside) */
  margin: 20px;
  /* Center block element */
  margin: 0 auto;
  
  /* Background applies to content + padding */
  background: lightblue;
}`,
                duration: 25,
                order: 1,
                isPublished: true
            },
            {
                module: module2._id,
                course: cssCourse._id,
                title: 'Padding vs Margin',
                content: `# Padding vs Margin

Understanding the difference is crucial for proper layouts.

## Padding (Inside Space)

- Adds space **inside** the element
- Extends the element's background color
- Increases the element's clickable area
- Perfect for buttons, cards, containers

## Margin (Outside Space)

- Adds space **outside** the element
- Transparent (no background)
- Creates gaps between elements
- Used for spacing elements apart

## Real-World Example: Buttons

For buttons, use **padding** to make them bigger and more clickable.
For spacing between buttons, use **margin**.

## Margin Collapse

Vertical margins between elements collapse (merge) into a single margin - the larger one wins.`,
                codeExample: `/* Button Example - Use PADDING */
.button {
  padding: 12px 24px; /* Makes button bigger & clickable */
  background: blue;
  color: white;
  border: none;
  border-radius: 6px;
  margin: 10px; /* Space between buttons */
}

/* Card Example */
.card {
  padding: 30px; /* Space inside card */
  background: white;
  border: 1px solid #ddd;
  margin-bottom: 20px; /* Space between cards */
}

/* Margin Collapse Example */
.box1 {
  margin-bottom: 30px;
}

.box2 {
  margin-top: 50px;
}
/* Gap between boxes = 50px (not 80px!)
   The larger margin wins */

/* Prevent collapse with padding or border */
.container {
  padding: 1px; /* Prevents margin collapse */
}`,
                duration: 20,
                order: 2,
                isPublished: true
            },
            {
                module: module2._id,
                course: cssCourse._id,
                title: 'Box-Sizing Property',
                content: `# Box-Sizing Property

Controls how width and height are calculated.

## content-box (Default)

Width/height applies only to content. Padding and border are ADDED.

**Problem**: If you set width: 300px with padding: 20px and border: 5px, the actual width becomes 350px!

## border-box (Better!)

Width/height includes content, padding, AND border.

**Benefit**: Width stays exactly what you set. Much more predictable!

## Best Practice

Always use \`border-box\` for all elements. Add this to every project:

\`\`\`css
* {
  box-sizing: border-box;
}
\`\`\``,
                codeExample: `/* Default: content-box (confusing) */
.content-box {
  box-sizing: content-box;
  width: 300px;
  padding: 20px;
  border: 5px solid black;
  /* Actual width = 300 + 40 + 10 = 350px */
}

/* Better: border-box (predictable) */
.border-box {
  box-sizing: border-box;
  width: 300px;
  padding: 20px;
  border: 5px solid black;
  /* Actual width = 300px (includes everything!) */
}

/* BEST PRACTICE: Apply to everything */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Now all sizing is predictable */
.container {
  width: 100%;
  max-width: 1200px;
  padding: 40px;
  /* Width calculation is simple! */
}`,
                duration: 20,
                order: 3,
                isPublished: true
            }
        ]);

        console.log('✅ Module 2: The Box Model completed');

        // ============================================
        // MODULE 3: POSITIONING
        // ============================================
        const module3 = await Module.create({
            course: cssCourse._id,
            title: 'CSS Positioning',
            description: 'Master static, relative, absolute, fixed, sticky positions and z-index',
            order: 3,
            isPublished: true
        });

        await Lesson.create([
            {
                module: module3._id,
                course: cssCourse._id,
                title: 'Position: Static & Relative',
                content: `# Position: Static & Relative

## Static (Default)

Elements flow normally in the document. This is the default behavior.

**When to use**: Default behavior, no special positioning needed

## Relative

Element is positioned relative to its **normal position**.

**Key points**:
- Element's original space is preserved
- Doesn't affect other elements
- Creates positioning context for absolute children

**When to use**:
- Small adjustments to position
- Creating positioning context for children
- Stacking layers with z-index`,
                codeExample: `/* Static - Default behavior */
.static-box {
  position: static;
  /* top, right, bottom, left have no effect */
}

/* Relative - Offset from normal position */
.relative-box {
  position: relative;
  top: 20px; /* Moves DOWN 20px */
  left: 30px; /* Moves RIGHT 30px */
  /* Original space is still preserved! */
}

/* Common use: Positioning context */
.parent {
  position: relative; /* Context for absolute child */
}

.child {
  position: absolute;
  top: 10px;
  right: 10px;
  /* Positioned relative to .parent */
}

/* Small adjustments */
.badge {
  position: relative;
  top: -2px; /* Slight upward adjustment */
}`,
                duration: 25,
                order: 1,
                isPublished: true
            },
            {
                module: module3._id,
                course: cssCourse._id,
                title: 'Position: Absolute',
                content: `# Position: Absolute

Element is removed from normal document flow and positioned relative to its nearest **positioned ancestor** (not static).

## Key Characteristics

- Removed from normal flow
- Doesn't affect other elements' positions
- Positioned relative to nearest positioned parent
- If no positioned parent, uses document body

## When to Use

- Tooltips
- Badge notifications on avatars
- Dropdown menus
- Overlays
- Icons on cards
- Close buttons on modals`,
                codeExample: `/* Parent creates positioning context */
.card {
  position: relative;
  width: 300px;
  height: 200px;
  background: white;
  border: 1px solid #ddd;
}

/* Child positioned absolutely */
.badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: red;
  color: white;
  padding: 5px 10px;
  border-radius: 12px;
}

/* Tooltip Example */
.tooltip-container {
  position: relative;
}

.tooltip {
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: #333;
  color: white;
  padding: 8px 12px;
  border-radius: 4px;
  white-space: nowrap;
}

/* Cover entire parent */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}`,
                duration: 25,
                order: 2,
                isPublished: true
            },
            {
                module: module3._id,
                course: cssCourse._id,
                title: 'Position: Fixed & Sticky',
                content: `# Position: Fixed & Sticky

## Fixed Position

Positioned relative to the **viewport**. Stays in place when scrolling.

**When to use**:
- Fixed navigation bars
- Floating action buttons
- Cookie consent banners
- Chat widgets

## Sticky Position

Hybrid of relative and fixed. Switches between them based on scroll position.

**When to use**:
- Table headers that stick while scrolling
- Section headings
- Sidebar navigation that sticks at top`,
                codeExample: `/* Fixed Navigation Bar */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #333;
  color: white;
  padding: 20px;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

/* Remember to add padding to body */
body {
  padding-top: 70px; /* Height of navbar */
}

/* Floating Action Button */
.fab {
  position: fixed;
  bottom: 30px;
  right: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #2563eb;
  color: white;
  border: none;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  z-index: 1000;
}

/* Sticky Header */
.sticky-header {
  position: sticky;
  top: 0;
  background: white;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  z-index: 10;
}`,
                duration: 25,
                order: 3,
                isPublished: true
            },
            {
                module: module3._id,
                course: cssCourse._id,
                title: 'Z-Index & Stacking',
                content: `# Z-Index & Stacking Context

Controls the stacking order of overlapping elements.

## How Z-Index Works

- Only works on **positioned elements** (not static)
- Higher z-index = on top
- Elements in same stacking context are compared
- Parent's z-index affects children

## Common Z-Index Values

- Base content: 1
- Dropdowns: 100
- Tooltips: 1000
- Fixed headers: 1000
- Modals: 9000
- Toasts/Notifications: 9999

## Best Practice

Create a z-index scale in your CSS variables:

\`\`\`css
:root {
  --z-base: 1;
  --z-dropdown: 100;
  --z-sticky: 500;
  --z-modal: 9000;
  --z-toast: 9999;
}
\`\`\``,
                codeExample: `/* Z-index example */
.box-bottom {
  position: absolute;
  z-index: 1;
  background: red;
}

.box-middle {
  position: absolute;
  z-index: 2;
  background: green;
}

.box-top {
  position: absolute;
  z-index: 3;
  background: blue;
}

/* Modal with overlay */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  z-index: 9000;
}

.modal-content {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 40px;
  border-radius: 12px;
  z-index: 9001; /* Above overlay */
}

/* Fixed navbar */
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
}`,
                duration: 20,
                order: 4,
                isPublished: true
            }
        ]);

        console.log('✅ Module 3: CSS Positioning completed');

        // ============================================
        // MODULE 4: FLEXBOX
        // ============================================
        const module4 = await Module.create({
            course: cssCourse._id,
            title: 'Flexbox Layout',
            description: 'Master one-dimensional layouts with Flexbox',
            order: 4,
            isPublished: true
        });

        await Lesson.create([
            {
                module: module4._id,
                course: cssCourse._id,
                title: 'Flexbox Basics',
                content: `# Flexbox Layout System

Flexbox is a one-dimensional layout system for arranging items in rows or columns with flexible sizing and alignment.

## When to Use Flexbox

- Navigation bars
- Aligning items horizontally or vertically
- Distributing space between items
- Card layouts with equal heights
- Centering elements (easiest way!)

## Flex Container vs Flex Items

- **Container**: Parent with \`display: flex\`
- **Items**: Direct children of the container

## Main Axis vs Cross Axis

- **Main Axis**: Primary direction (row = horizontal, column = vertical)
- **Cross Axis**: Perpendicular to main axis`,
                codeExample: `/* Enable Flexbox */
.flex-container {
  display: flex;
  background: #f0f0f0;
  padding: 20px;
}

.flex-item {
  background: #3b82f6;
  color: white;
  padding: 20px;
  margin: 10px;
}

/* Perfect centering (most common use) */
.center-everything {
  display: flex;
  justify-content: center; /* Horizontal */
  align-items: center; /* Vertical */
  height: 100vh;
}

/* Navigation bar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #333;
  color: white;
}

.nav-links {
  display: flex;
  gap: 30px;
  list-style: none;
}`,
                duration: 25,
                order: 1,
                isPublished: true
            },
            {
                module: module4._id,
                course: cssCourse._id,
                title: 'Flex Direction & Wrap',
                content: `# Flex Direction & Wrap

## flex-direction

Controls the main axis direction.

- \`row\` (default): Left to right
- \`row-reverse\`: Right to left
- \`column\`: Top to bottom
- \`column-reverse\`: Bottom to top

## flex-wrap

Controls whether items wrap to next line.

- \`nowrap\` (default): All items on one line
- \`wrap\`: Items wrap to next line
- \`wrap-reverse\`: Wrap in reverse order

## When to Use

- **row**: Navigation bars, buttons, horizontal layouts
- **column**: Vertical menus, mobile layouts
- **wrap**: Responsive card grids, tag lists`,
                codeExample: `/* Row direction (default) */
.flex-row {
  display: flex;
  flex-direction: row;
}

/* Column direction */
.flex-column {
  display: flex;
  flex-direction: column;
}

/* Row-reverse */
.flex-row-reverse {
  display: flex;
  flex-direction: row-reverse;
}

/* Wrapping items */
.flex-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

/* Responsive card grid */
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}

.card {
  flex: 1 1 300px; /* Grow, shrink, min 300px */
  background: white;
  padding: 20px;
  border-radius: 8px;
}`,
                duration: 20,
                order: 2,
                isPublished: true
            },
            {
                module: module4._id,
                course: cssCourse._id,
                title: 'Justify-Content & Align-Items',
                content: `# Justify-Content & Align-Items

## justify-content (Main Axis)

Aligns items along the main axis (horizontal for row, vertical for column).

- \`flex-start\`: Items at start (default)
- \`center\`: Items centered
- \`flex-end\`: Items at end
- \`space-between\`: Equal space BETWEEN items
- \`space-around\`: Equal space AROUND items
- \`space-evenly\`: Equal space everywhere

## align-items (Cross Axis)

Aligns items along the cross axis (vertical for row, horizontal for column).

- \`stretch\` (default): Items stretch to fill container
- \`flex-start\`: Items at top
- \`center\`: Items centered
- \`flex-end\`: Items at bottom
- \`baseline\`: Align text baselines`,
                codeExample: `/* Horizontal centering */
.center-horizontal {
  display: flex;
  justify-content: center;
}

/* Vertical centering */
.center-vertical {
  display: flex;
  align-items: center;
  height: 300px;
}

/* Perfect centering (both) */
.center-both {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

/* Space between items */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Space evenly */
.button-group {
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 20px;
}

/* Align to bottom */
.footer-content {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 200px;
}`,
                duration: 25,
                order: 3,
                isPublished: true
            },
            {
                module: module4._id,
                course: cssCourse._id,
                title: 'Flex Grow, Shrink & Basis',
                content: `# Flex Items: Grow, Shrink & Basis

## flex-grow

Controls how much an item grows to fill available space.

- \`0\` (default): Don't grow
- \`1\`: Grow equally with others
- \`2\`: Grow twice as much

## flex-shrink

Controls how much an item shrinks when space is limited.

- \`1\` (default): Can shrink
- \`0\`: Never shrink

## flex-basis

Sets initial size before growing/shrinking.

- \`auto\` (default): Based on content
- \`200px\`: Fixed size
- \`33.333%\`: Percentage

## Flex Shorthand

\`flex: grow shrink basis\`

Common patterns:
- \`flex: 1\`: Grow equally, shrink equally
- \`flex: 0 0 auto\`: Don't grow or shrink
- \`flex: 1 1 300px\`: Grow, shrink, start at 300px`,
                codeExample: `/* Flex grow example */
.container {
  display: flex;
}

.item-1 {
  flex-grow: 1; /* Takes 1 part */
}

.item-2 {
  flex-grow: 2; /* Takes 2 parts (twice as much) */
}

.item-3 {
  flex-grow: 1; /* Takes 1 part */
}

/* Prevent shrinking */
.no-shrink {
  flex-shrink: 0;
  min-width: 200px;
}

/* Responsive card */
.card {
  flex: 1 1 300px;
  /* Grow: yes, Shrink: yes, Base: 300px */
  max-width: 400px;
}

/* Sidebar layout */
.sidebar {
  flex: 0 0 250px; /* Fixed 250px width */
}

.main-content {
  flex: 1; /* Takes remaining space */
}

/* Three equal columns */
.column {
  flex: 1; /* Equal distribution */
}`,
                duration: 25,
                order: 4,
                isPublished: true
            },
            {
                module: module4._id,
                course: cssCourse._id,
                title: 'Flexbox Gap Property',
                content: `# Gap Property in Flexbox

The \`gap\` property creates space between flex items without using margins.

## Advantages Over Margin

- No margin on outer edges
- Cleaner code
- More predictable spacing
- Works with wrap

## Syntax

- \`gap: 20px\`: Same gap for rows and columns
- \`gap: 20px 40px\`: Row gap, column gap
- \`row-gap\`: Vertical spacing only
- \`column-gap\`: Horizontal spacing only`,
                codeExample: `/* Modern approach with gap */
.flex-container {
  display: flex;
  gap: 20px; /* 20px space between items */
}

/* Different gaps for rows and columns */
.flex-wrap-container {
  display: flex;
  flex-wrap: wrap;
  gap: 30px 40px; /* 30px rows, 40px columns */
}

/* Old approach with margin (less clean) */
.flex-container-old {
  display: flex;
  margin: -10px; /* Negative margin hack */
}

.flex-container-old .item {
  margin: 10px; /* Margin on all sides */
}

/* Responsive card grid */
.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}

.card {
  flex: 1 1 calc(33.333% - 20px);
  min-width: 280px;
}

/* Navigation with gap */
.nav-menu {
  display: flex;
  gap: 30px;
  list-style: none;
}`,
                duration: 20,
                order: 5,
                isPublished: true
            }
        ]);

        console.log('✅ Module 4: Flexbox Layout completed');

        // ============================================
        // MODULE 5: CSS GRID
        // ============================================
        const module5 = await Module.create({
            course: cssCourse._id,
            title: 'CSS Grid Layout',
            description: 'Master two-dimensional layouts with CSS Grid',
            order: 5,
            isPublished: true
        });

        await Lesson.create([
            {
                module: module5._id,
                course: cssCourse._id,
                title: 'CSS Grid Basics',
                content: `# CSS Grid Layout System

CSS Grid is a two-dimensional layout system for creating complex layouts with rows and columns.

## When to Use Grid

- Page layouts (header, sidebar, content, footer)
- Image galleries
- Complex dashboards
- Magazine-style layouts
- When you need both rows AND columns

## Grid vs Flexbox

- **Flexbox**: One-dimensional (row OR column)
- **Grid**: Two-dimensional (rows AND columns)

## Grid Terminology

- **Grid Container**: Parent with \`display: grid\`
- **Grid Items**: Direct children
- **Grid Lines**: Dividing lines
- **Grid Track**: Space between two lines (row or column)
- **Grid Cell**: Single unit
- **Grid Area**: Rectangular area of cells`,
                codeExample: `/* Basic Grid Setup */
.grid-container {
  display: grid;
  grid-template-columns: 200px 200px 200px; /* 3 columns */
  grid-template-rows: 100px 100px; /* 2 rows */
  gap: 20px;
  background: #f0f0f0;
  padding: 20px;
}

.grid-item {
  background: #3b82f6;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
}

/* Using fr units (fractional) */
.grid-fr {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr; /* Middle is 2x wider */
  gap: 20px;
}

/* repeat() function */
.grid-repeat {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 equal columns */
  gap: 20px;
}`,
                duration: 25,
                order: 1,
                isPublished: true
            },
            {
                module: module5._id,
                course: cssCourse._id,
                title: 'Grid Template Areas',
                content: `# Grid Template Areas

Named grid areas make layouts intuitive and easy to read.

## Benefits

- Visual representation of layout
- Easy to understand
- Simple to modify
- Great for page layouts

## How It Works

1. Define areas with \`grid-template-areas\`
2. Assign elements to areas with \`grid-area\`
3. Use dots \`.\` for empty cells

## Common Patterns

- Dashboard layouts
- Website layouts (header, sidebar, content, footer)
- App interfaces`,
                codeExample: `/* Page Layout with Named Areas */
.page-layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar content content"
    "footer footer footer";
  grid-template-columns: 250px 1fr 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 20px;
  min-height: 100vh;
}

.header {
  grid-area: header;
  background: #1e293b;
  color: white;
  padding: 20px;
}

.sidebar {
  grid-area: sidebar;
  background: #334155;
  color: white;
  padding: 20px;
}

.content {
  grid-area: content;
  background: white;
  padding: 30px;
}

.footer {
  grid-area: footer;
  background: #475569;
  color: white;
  padding: 20px;
  text-align: center;
}

/* Asymmetric layout */
.asymmetric {
  display: grid;
  grid-template-areas:
    "logo nav nav"
    "sidebar main main"
    "sidebar main main";
  gap: 20px;
}`,
                duration: 25,
                order: 2,
                isPublished: true
            },
            {
                module: module5._id,
                course: cssCourse._id,
                title: 'Grid Auto-Fit & Auto-Fill',
                content: `# Responsive Grids: Auto-Fit & Auto-Fill

Create responsive grids without media queries using \`auto-fit\` and \`auto-fill\`.

## auto-fit

Stretches grid items to fill available space. Empty tracks collapse.

**Best for**: Responsive card grids where you want items to grow

## auto-fill

Keeps grid item size constant. May leave empty space.

**Best for**: When you want consistent item sizes

## minmax() Function

Sets minimum and maximum size for tracks.

\`minmax(min, max)\`

Common pattern: \`minmax(250px, 1fr)\``,
                codeExample: `/* Auto-fit: Items stretch to fill space */
.grid-auto-fit {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

/* Auto-fill: Keeps item size, may have empty space */
.grid-auto-fill {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

/* Responsive image gallery */
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

.gallery img {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 12px;
}

/* Card grid */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.card {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}`,
                duration: 25,
                order: 3,
                isPublished: true
            },
            {
                module: module5._id,
                course: cssCourse._id,
                title: 'Grid Spanning',
                content: `# Grid Spanning

Make grid items span multiple rows or columns.

## grid-column

Specify which columns an item spans.

- \`grid-column: 1 / 3\`: From line 1 to line 3 (2 columns)
- \`grid-column: 1 / -1\`: All columns
- \`grid-column: span 2\`: Span 2 columns

## grid-row

Specify which rows an item spans.

Same syntax as grid-column.

## When to Use

- Full-width headers/footers
- Featured content
- Asymmetric layouts
- Magazine-style designs`,
                codeExample: `/* Basic Grid */
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(3, 100px);
  gap: 20px;
}

/* Span multiple columns */
.header {
  grid-column: 1 / 4; /* Spans all 3 columns */
  /* OR */
  grid-column: 1 / -1; /* Spans all columns */
  /* OR */
  grid-column: span 3; /* Span 3 columns */
}

/* Span multiple rows */
.sidebar {
  grid-row: 1 / 4; /* Spans 3 rows */
  /* OR */
  grid-row: span 3;
}

/* Both rows and columns */
.featured {
  grid-column: 1 / 3; /* 2 columns */
  grid-row: 1 / 3; /* 2 rows */
}

/* Magazine layout */
.magazine {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.featured-article {
  grid-column: span 2;
  grid-row: span 2;
}

.small-article {
  grid-column: span 1;
  grid-row: span 1;
}`,
                duration: 20,
                order: 4,
                isPublished: true
            }
        ]);

        console.log('✅ Module 5: CSS Grid Layout completed');

        // ============================================
        // MODULE 6: RESPONSIVENESS
        // ============================================
        const module6 = await Module.create({
            course: cssCourse._id,
            title: 'Responsive Design',
            description: 'Master media queries, mobile-first design, and responsive techniques',
            order: 6,
            isPublished: true
        });

        await Lesson.create([
            {
                module: module6._id,
                course: cssCourse._id,
                title: 'Introduction to Responsive Design',
                content: `# Responsive Design Fundamentals

Responsive design ensures websites look great on all devices - desktop, tablet, and mobile.

## Key Principles

1. **Fluid Layouts**: Use %, fr, auto instead of fixed px
2. **Flexible Images**: \`max-width: 100%\`
3. **Media Queries**: Different styles for different screen sizes

## Mobile-First Approach

Design for mobile first, then enhance for larger screens.

**Why?**
- Easier to scale up than down
- Better mobile performance
- Forces content prioritization

## Common Breakpoints

- Mobile: < 768px (default, no media query)
- Tablet: ≥ 768px
- Desktop: ≥ 1024px
- Large Desktop: ≥ 1440px`,
                codeExample: `/* Mobile-first base styles */
.container {
  padding: 20px;
  font-size: 16px;
}

/* Tablet: 768px and up */
@media (min-width: 768px) {
  .container {
    padding: 40px;
    font-size: 18px;
  }
}

/* Desktop: 1024px and up */
@media (min-width: 1024px) {
  .container {
    padding: 60px;
    max-width: 1200px;
    margin: 0 auto;
  }
}

/* Fluid layout */
.grid {
  display: grid;
  grid-template-columns: 1fr; /* Mobile: 1 column */
  gap: 20px;
}

@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr); /* Tablet: 2 columns */
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr); /* Desktop: 3 columns */
  }
}`,
                duration: 25,
                order: 1,
                isPublished: true
            },
            {
                module: module6._id,
                course: cssCourse._id,
                title: 'Media Queries',
                content: `# Media Queries

Media queries apply different styles based on device characteristics.

## Syntax

\`@media (condition) { styles }\`

## Common Media Features

- \`min-width\`: Minimum screen width
- \`max-width\`: Maximum screen width
- \`orientation\`: portrait or landscape
- \`prefers-color-scheme\`: dark or light

## Mobile-First vs Desktop-First

**Mobile-First** (Recommended):
- Use \`min-width\`
- Start with mobile styles
- Add complexity for larger screens

**Desktop-First**:
- Use \`max-width\`
- Start with desktop styles
- Simplify for smaller screens`,
                codeExample: `/* Mobile-first approach (RECOMMENDED) */
.element {
  font-size: 16px; /* Mobile default */
}

@media (min-width: 768px) {
  .element {
    font-size: 18px; /* Tablet */
  }
}

@media (min-width: 1024px) {
  .element {
    font-size: 20px; /* Desktop */
  }
}

/* Max-width (desktop-first) */
@media (max-width: 1023px) {
  .element {
    font-size: 18px;
  }
}

@media (max-width: 767px) {
  .element {
    font-size: 16px;
  }
}

/* Range query */
@media (min-width: 768px) and (max-width: 1023px) {
  .element {
    /* Styles only for tablets */
  }
}

/* Orientation */
@media (orientation: landscape) {
  .element {
    /* Landscape styles */
  }
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  body {
    background: #1a1a1a;
    color: #f0f0f0;
  }
}`,
                duration: 25,
                order: 2,
                isPublished: true
            },
            {
                module: module6._id,
                course: cssCourse._id,
                title: 'Responsive Typography with clamp()',
                content: `# Fluid Typography with clamp()

The \`clamp()\` function creates responsive values that scale smoothly without media queries.

## Syntax

\`clamp(minimum, preferred, maximum)\`

- **Minimum**: Smallest allowed value
- **Preferred**: Ideal value (usually with viewport units)
- **Maximum**: Largest allowed value

## Benefits

- No media queries needed
- Smooth scaling
- Better user experience
- Less code

## When to Use

- Font sizes
- Padding/margins
- Widths
- Any value that should scale smoothly`,
                codeExample: `/* Fluid font size */
h1 {
  font-size: clamp(24px, 5vw, 64px);
  /* Mobile: 24px, Desktop: up to 64px */
  /* Scales smoothly between sizes */
}

p {
  font-size: clamp(14px, 2vw, 18px);
  line-height: 1.6;
}

/* Fluid spacing */
.container {
  padding: clamp(20px, 5vw, 80px);
  max-width: clamp(300px, 90%, 1200px);
  margin: 0 auto;
}

/* Fluid gap */
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: clamp(20px, 3vw, 60px);
}

/* Before clamp() (old way) */
.old-way {
  font-size: 16px;
}

@media (min-width: 768px) {
  .old-way {
    font-size: 20px;
  }
}

@media (min-width: 1024px) {
  .old-way {
    font-size: 24px;
  }
}

/* With clamp() (modern way) */
.modern-way {
  font-size: clamp(16px, 2vw + 1rem, 24px);
}`,
                duration: 20,
                order: 3,
                isPublished: true
            },
            {
                module: module6._id,
                course: cssCourse._id,
                title: 'Responsive Images',
                content: `# Responsive Images

Make images adapt to different screen sizes while maintaining quality and performance.

## Basic Responsive Image

\`max-width: 100%\` - Never exceed container width
\`height: auto\` - Maintain aspect ratio

## object-fit Property

Controls how images fill their containers.

- \`cover\`: Fills container, may crop
- \`contain\`: Fits entire image, may have empty space
- \`fill\`: Stretches to fill (distorts)
- \`none\`: Original size
- \`scale-down\`: Smaller of none or contain

## aspect-ratio Property

Force specific aspect ratios without JavaScript.`,
                codeExample: `/* Basic responsive image */
img {
  max-width: 100%; /* Never wider than container */
  height: auto; /* Maintain aspect ratio */
  display: block; /* Remove inline spacing */
}

/* Fixed height with cover */
.hero-image {
  width: 100%;
  height: 400px;
  object-fit: cover; /* Crop to fill */
  object-position: center; /* Focus on center */
}

/* Force aspect ratio */
.video-container {
  width: 100%;
  aspect-ratio: 16 / 9;
  background: black;
}

.video-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Responsive avatar */
.avatar {
  width: clamp(50px, 10vw, 150px);
  aspect-ratio: 1 / 1; /* Perfect square */
  border-radius: 50%;
  object-fit: cover;
}

/* Gallery with consistent heights */
.gallery-img {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 12px;
  transition: transform 0.3s;
}

.gallery-img:hover {
  transform: scale(1.05);
}`,
                duration: 20,
                order: 4,
                isPublished: true
            }
        ]);

        console.log('✅ Module 6: Responsive Design completed');

        // ============================================
        // MODULE 7: ANIMATIONS & TRANSITIONS
        // ============================================
        const module7 = await Module.create({
            course: cssCourse._id,
            title: 'Animations & Transitions',
            description: 'Master CSS transitions, transforms, and keyframe animations',
            order: 7,
            isPublished: true
        });

        await Lesson.create([
            {
                module: module7._id,
                course: cssCourse._id,
                title: 'CSS Transitions',
                content: `# CSS Transitions

Smooth animations between CSS property changes.

## Syntax

\`transition: property duration timing-function delay;\`

## Transition Properties

- **property**: What to animate (color, transform, all, etc.)
- **duration**: How long (0.3s, 500ms)
- **timing-function**: Speed curve (ease, linear, ease-in-out)
- **delay**: Wait before starting

## Common Timing Functions

- \`ease\`: Default, slow start and end
- \`linear\`: Constant speed
- \`ease-in\`: Slow start
- \`ease-out\`: Slow end
- \`ease-in-out\`: Slow start and end
- \`cubic-bezier()\`: Custom curve

## When to Use

- Hover effects
- Focus states
- Showing/hiding elements
- Color changes
- Size changes`,
                codeExample: `/* Basic transition */
.button {
  background: #3b82f6;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  transition: background 0.3s ease;
}

.button:hover {
  background: #2563eb;
}

/* Multiple properties */
.card {
  background: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  transition: box-shadow 0.3s, transform 0.3s;
}

.card:hover {
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
  transform: translateY(-5px);
}

/* Transition all properties */
.link {
  color: blue;
  text-decoration: none;
  transition: all 0.3s ease;
}

.link:hover {
  color: darkblue;
  text-decoration: underline;
}

/* With delay */
.delayed {
  opacity: 0;
  transition: opacity 0.5s ease 0.2s; /* 0.2s delay */
}

.delayed:hover {
  opacity: 1;
}

/* Individual properties */
.advanced {
  transition-property: background, transform;
  transition-duration: 0.3s, 0.5s;
  transition-timing-function: ease, ease-out;
  transition-delay: 0s, 0.1s;
}`,
                duration: 25,
                order: 1,
                isPublished: true
            },
            {
                module: module7._id,
                course: cssCourse._id,
                title: 'CSS Transform',
                content: `# CSS Transform

Change element's position, size, and rotation **without affecting layout**.

## Transform Functions

### translate()
Move elements horizontally and/or vertically.

### scale()
Resize elements.

### rotate()
Rotate elements.

### skew()
Slant elements.

## Why Transform > Position

- GPU accelerated (better performance)
- Smooth animations
- Doesn't trigger layout reflows
- Can be combined

## Best Practices

- Use transform for animations, not width/height
- Combine multiple transforms
- Use with transitions for smooth effects`,
                codeExample: `/* Translate (move) */
.move-right {
  transform: translateX(50px); /* Move right 50px */
}

.move-up {
  transform: translateY(-20px); /* Move up 20px */
}

.move-both {
  transform: translate(50px, -20px); /* X, Y */
}

/* Scale (resize) */
.zoom-in {
  transform: scale(1.5); /* 150% size */
}

.zoom-horizontal {
  transform: scaleX(1.2); /* 120% width */
}

/* Rotate */
.rotate-45 {
  transform: rotate(45deg);
}

.rotate-reverse {
  transform: rotate(-90deg);
}

/* Skew */
.skew-element {
  transform: skewX(20deg);
}

/* Combine transforms */
.combined {
  transform: translateX(50px) rotate(45deg) scale(1.2);
  /* Order matters! */
}

/* Hover effect */
.card {
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-10px) scale(1.05);
}

/* 3D transforms */
.flip-card {
  transform: rotateY(180deg);
  transform-style: preserve-3d;
}`,
                duration: 25,
                order: 2,
                isPublished: true
            },
            {
                module: module7._id,
                course: cssCourse._id,
                title: 'Keyframe Animations',
                content: `# Keyframe Animations

Create complex multi-step animations with \`@keyframes\`.

## Syntax

\`\`\`css
@keyframes animationName {
  from { /* or 0% */ }
  to { /* or 100% */ }
}
\`\`\`

Or with percentages:

\`\`\`css
@keyframes animationName {
  0% { }
  50% { }
  100% { }
}
\`\`\`

## Animation Properties

- **animation-name**: Keyframe name
- **animation-duration**: Time (1s, 500ms)
- **animation-timing-function**: Speed curve
- **animation-delay**: Wait before starting
- **animation-iteration-count**: How many times (infinite, 3)
- **animation-direction**: normal, reverse, alternate
- **animation-fill-mode**: forwards, backwards, both

## Shorthand

\`animation: name duration timing delay iteration direction;\``,
                codeExample: `/* Simple fade in */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-element {
  animation: fadeIn 1s ease;
}

/* Slide in from left */
@keyframes slideInLeft {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.slide-element {
  animation: slideInLeft 0.5s ease-out;
}

/* Bounce animation */
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-30px);
  }
  60% {
    transform: translateY(-15px);
  }
}

.bounce-element {
  animation: bounce 2s infinite;
}

/* Pulse effect */
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

.pulse-element {
  animation: pulse 2s ease-out infinite;
}

/* Loading spinner */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.spinner {
  animation: spin 1s linear infinite;
}`,
                duration: 30,
                order: 3,
                isPublished: true
            }
        ]);

        console.log('✅ Module 7: Animations & Transitions completed');

        // ============================================
        // MODULE 8: ADVANCED CSS
        // ============================================
        const module8 = await Module.create({
            course: cssCourse._id,
            title: 'Advanced CSS',
            description: 'CSS variables, calc(), modern properties, and best practices',
            order: 8,
            isPublished: true
        });

        await Lesson.create([
            {
                module: module8._id,
                course: cssCourse._id,
                title: 'CSS Variables',
                content: `# CSS Variables (Custom Properties)

Define reusable values throughout your stylesheet.

## Syntax

\`\`\`css
:root {
  --variable-name: value;
}

.element {
  property: var(--variable-name);
}
\`\`\`

## Benefits

- Reusable values
- Easy theming
- Dynamic changes with JavaScript
- Better maintainability
- No preprocessor needed

## Scope

- \`:root\`: Global scope
- Element: Local scope (only within that element)

## Use Cases

- Color palettes
- Spacing scales
- Font sizes
- Theming (light/dark mode)`,
                codeExample: `/* Define variables in :root */
:root {
  /* Colors */
  --primary: #3b82f6;
  --secondary: #8b5cf6;
  --success: #10b981;
  --danger: #ef4444;
  --text: #1f2937;
  --background: #ffffff;
  
  /* Spacing */
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  
  /* Border radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
}

/* Use variables */
.button {
  background: var(--primary);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
  color: white;
}

.button:hover {
  background: var(--secondary);
}

/* Dark theme */
body.dark-theme {
  --text: #f9fafb;
  --background: #1f2937;
}

body {
  color: var(--text);
  background: var(--background);
  transition: background 0.3s, color 0.3s;
}

/* Fallback values */
.element {
  color: var(--custom-color, #333); /* Falls back to #333 */
}

/* JavaScript: Change variables */
/* document.documentElement.style
   .setProperty('--primary', 'red'); */`,
                duration: 25,
                order: 1,
                isPublished: true
            },
            {
                module: module8._id,
                course: cssCourse._id,
                title: 'CSS Functions: calc() & clamp()',
                content: `# CSS Functions

## calc()

Perform calculations in CSS.

**Syntax**: \`calc(expression)\`

**Uses**:
- Mix units (%, px, em, vw)
- Dynamic sizing
- Offset calculations

## clamp()

Responsive values with min and max.

**Syntax**: \`clamp(min, preferred, max)\`

**Uses**:
- Fluid typography
- Responsive spacing
- Container widths

## min() and max()

Choose minimum or maximum value.`,
                codeExample: `/* calc() examples */
.sidebar {
  width: calc(100% - 80px); /* Full width minus 80px */
}

.content {
  height: calc(100vh - 60px); /* Full height minus navbar */
}

.grid-item {
  width: calc(33.333% - 20px); /* Grid with gaps */
}

.responsive {
  padding: calc(20px + 2vw); /* Mix units */
}

/* clamp() for fluid sizing */
h1 {
  font-size: clamp(24px, 5vw, 64px);
  /* Min: 24px, Preferred: 5vw, Max: 64px */
}

.container {
  width: clamp(300px, 90%, 1200px);
  padding: clamp(20px, 5vw, 80px);
  margin: 0 auto;
}

/* min() - takes smaller value */
.box {
  width: min(100%, 800px); /* Whichever is smaller */
}

/* max() - takes larger value */
.text {
  font-size: max(16px, 1vw); /* Never smaller than 16px */
}

/* Combined */
.advanced {
  width: clamp(
    300px,
    calc(100% - 40px),
    1200px
  );
}`,
                duration: 20,
                order: 2,
                isPublished: true
            },
            {
                module: module8._id,
                course: cssCourse._id,
                title: 'Modern CSS Properties',
                content: `# Modern CSS Properties

## aspect-ratio

Maintain width-to-height ratio.

## object-fit

Control how images/videos fit containers.

## backdrop-filter

Apply effects to background.

## gap

Space between flex/grid items.

## scroll-behavior

Smooth scrolling.`,
                codeExample: `/* aspect-ratio */
.video-wrapper {
  width: 100%;
  aspect-ratio: 16 / 9; /* 16:9 ratio */
}

.square {
  aspect-ratio: 1 / 1; /* Perfect square */
  width: 200px;
}

/* object-fit */
.cover-image {
  width: 100%;
  height: 300px;
  object-fit: cover; /* Crop to fill */
  object-position: center top; /* Focus on top */
}

.contain-image {
  width: 100%;
  height: 300px;
  object-fit: contain; /* Fit entire image */
}

/* backdrop-filter (glassmorphism) */
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 30px;
}

/* gap in flexbox/grid */
.flex-container {
  display: flex;
  gap: 20px; /* Space between items */
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

/* scroll-behavior */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
.scrollable::-webkit-scrollbar {
  width: 12px;
}

.scrollable::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 6px;
}`,
                duration: 25,
                order: 3,
                isPublished: true
            },
            {
                module: module8._id,
                course: cssCourse._id,
                title: 'CSS Best Practices',
                content: `# CSS Best Practices

## 1. Use Box-Sizing Border-Box

Always include this in every project:

\`\`\`css
* {
  box-sizing: border-box;
}
\`\`\`

## 2. Mobile-First Approach

Start with mobile styles, enhance for larger screens.

## 3. BEM Naming Convention

Block__Element--Modifier

## 4. Organize Properties

Group by:
1. Positioning
2. Box model
3. Visual
4. Typography

## 5. Avoid !important

Use proper specificity instead.

## 6. Use CSS Variables

For colors, spacing, and repeated values.

## 7. Optimize Performance

- Use transform over position changes
- Minimize repaints/reflows
- Use will-change sparingly

## 8. Keep Specificity Low

Prefer classes over IDs and deep nesting.`,
                codeExample: `/* ✅ GOOD: Apply border-box globally */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* ✅ GOOD: Mobile-first */
.container {
  padding: 20px; /* Mobile */
}

@media (min-width: 768px) {
  .container {
    padding: 40px; /* Desktop */
  }
}

/* ✅ GOOD: BEM naming */
.card { }
.card__title { }
.card__button { }
.card__button--primary { }

/* ✅ GOOD: Organized properties */
.element {
  /* Positioning */
  position: relative;
  top: 10px;
  
  /* Box model */
  display: flex;
  width: 100%;
  padding: 20px;
  
  /* Visual */
  background: white;
  border: 1px solid #ddd;
  
  /* Typography */
  font-size: 16px;
  color: #333;
}

/* ✅ GOOD: CSS variables */
:root {
  --primary: #3b82f6;
  --spacing: 16px;
}

.button {
  background: var(--primary);
  padding: var(--spacing);
}

/* ❌ BAD: Too specific */
div#header .nav ul li a { }

/* ✅ GOOD: Lower specificity */
.nav-link { }`,
                duration: 25,
                order: 4,
                isPublished: true
            }
        ]);

        console.log('✅ Module 8: Advanced CSS completed');

        console.log('\n🎉 Complete CSS Course seeded successfully!');
        console.log(`Total Modules: 8`);
        console.log(`Total Lessons: 28`);
        
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding CSS course:', error);
        process.exit(1);
    }
};

seedCSSCourse();
