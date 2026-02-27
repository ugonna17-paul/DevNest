# Complete CSS Course - Beginner to Advanced

## Table of Contents
1. [CSS Fundamentals](#css-fundamentals)
2. [Box Model](#box-model)
3. [Positioning](#positioning)
4. [Display & Layout](#display-layout)
5. [Flexbox](#flexbox)
6. [CSS Grid](#css-grid)
7. [Responsiveness](#responsiveness)
8. [Animations & Transitions](#animations-transitions)
9. [Pseudo Classes & Elements](#pseudo-classes-elements)
10. [Backgrounds & Colors](#backgrounds-colors)
11. [Typography](#typography)
12. [Advanced CSS](#advanced-css)
13. [Real Project Components](#real-project-components)
14. [Best Practices](#best-practices)

---

## CSS Fundamentals

### What is CSS?

**CSS (Cascading Style Sheets)** is a styling language used to describe the presentation of HTML documents. It controls layout, colors, fonts, spacing, and visual effects.

**Why CSS?**
- Separates content (HTML) from presentation (CSS)
- Reusable styles across multiple pages
- Easier maintenance
- Better performance

### CSS Syntax

```css
/* CSS Rule Structure */
selector {
  property: value;
  another-property: another-value;
}
```

**Example:**
```css
/* Select all paragraphs and make them blue */
p {
  color: blue;
  font-size: 16px;
}
```

### CSS Selectors

#### 1. Element Selector
Targets all elements of a specific type.

```html
<p>This is a paragraph.</p>
<p>Another paragraph.</p>
```

```css
/* Targets ALL <p> elements */
p {
  color: navy;
  line-height: 1.6;
}
```

**When to use:** Styling base elements consistently across the site.

#### 2. Class Selector
Targets elements with a specific class. Can be reused on multiple elements.

```html
<div class="card">Card 1</div>
<div class="card">Card 2</div>
<p class="card">Card 3</p>
```

```css
/* Targets ALL elements with class="card" */
.card {
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: white;
}
```

**When to use:** Reusable styles for multiple elements.

#### 3. ID Selector
Targets a single unique element. Should be unique per page.

```html
<header id="main-header">Website Header</header>
```

```css
/* Targets the element with id="main-header" */
#main-header {
  background: #333;
  color: white;
  padding: 20px;
}
```

**When to use:** Unique elements like header, footer, or JavaScript targets.

#### 4. Universal Selector
Targets all elements on the page.

```css
/* Reset default margins and padding */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```

**When to use:** CSS resets or applying base styles to everything.

#### 5. Attribute Selector
Targets elements based on their attributes.

```html
<input type="text" placeholder="Name">
<input type="email" placeholder="Email">
<a href="https://example.com" target="_blank">Link</a>
```

```css
/* Style email inputs specifically */
input[type="email"] {
  border-color: blue;
}

/* Style external links */
a[target="_blank"] {
  color: red;
}

/* Elements with href starting with "https" */
a[href^="https"] {
  font-weight: bold;
}
```

**When to use:** Styling specific input types or targeting attributes.

#### 6. Group Selector
Apply same styles to multiple selectors.

```css
/* Multiple selectors sharing the same styles */
h1, h2, h3 {
  font-family: 'Arial', sans-serif;
  color: #333;
}
```

**When to use:** When multiple elements need identical styles.

### Specificity

**Specificity determines which CSS rule applies when multiple rules target the same element.**

**Specificity hierarchy (low to high):**
1. Element selectors: `p { }` → 1 point
2. Class selectors: `.card { }` → 10 points
3. ID selectors: `#header { }` → 100 points
4. Inline styles: `<p style="color: red;">` → 1000 points
5. `!important` → Overrides everything (use sparingly!)

```html
<p id="intro" class="text">Hello World</p>
```

```css
/* Specificity: 1 point */
p {
  color: blue;
}

/* Specificity: 10 points - WINS over element selector */
.text {
  color: green;
}

/* Specificity: 100 points - WINS over class selector */
#intro {
  color: red;
}

/* Specificity: 1000 points - WINS over everything */
/* <p style="color: purple;"> */
```

**Result:** The text will be **red** because ID selector has highest specificity.

### Cascade & Inheritance

**Cascade:** When multiple rules have equal specificity, the **last rule** in the stylesheet wins.

```css
p {
  color: blue;
}

p {
  color: red; /* This wins - it comes last */
}
```

**Inheritance:** Some properties are inherited from parent to child elements.

```html
<div class="parent">
  <p>This paragraph inherits the color</p>
</div>
```

```css
.parent {
  color: purple; /* Children inherit this */
  border: 1px solid black; /* NOT inherited */
}
```

**Inherited properties:**
- color
- font-family
- font-size
- line-height
- text-align

**Not inherited:**
- margin, padding
- border
- background
- width, height

### Inline vs Internal vs External CSS

#### 1. Inline CSS
CSS written directly in HTML elements.

```html
<p style="color: blue; font-size: 18px;">Inline styled text</p>
```

**Pros:** Quick for testing
**Cons:** Not reusable, hard to maintain
**When to use:** Rarely, only for one-off overrides or dynamic styles via JavaScript

#### 2. Internal CSS
CSS written in `<style>` tag within HTML file.

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    p {
      color: green;
    }
  </style>
</head>
<body>
  <p>Styled paragraph</p>
</body>
</html>
```

**When to use:** Single-page websites or page-specific styles

#### 3. External CSS (RECOMMENDED)
CSS in separate `.css` file, linked to HTML.

```html
<!-- index.html -->
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <p>Styled paragraph</p>
</body>
</html>
```

```css
/* styles.css */
p {
  color: purple;
}
```

**Pros:** Reusable, organized, cached by browser
**When to use:** ALWAYS for production websites

---

## Box Model

### What is the Box Model?

Every HTML element is a rectangular box with 4 layers:

```
┌─────────────────────────────────────┐
│           MARGIN (transparent)       │
│  ┌───────────────────────────────┐  │
│  │     BORDER                     │  │
│  │  ┌─────────────────────────┐  │  │
│  │  │    PADDING              │  │  │
│  │  │  ┌───────────────────┐  │  │  │
│  │  │  │    CONTENT        │  │  │  │
│  │  │  │  (text/images)    │  │  │  │
│  │  │  └───────────────────┘  │  │  │
│  │  └─────────────────────────┘  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

### Content
The actual content (text, images, etc.).

```css
.box {
  width: 300px;
  height: 200px;
}
```

### Padding
Space **inside** the element, between content and border.

```html
<div class="box-padding">Content</div>
```

```css
.box-padding {
  padding: 20px; /* All sides */
  /* OR */
  padding: 10px 20px; /* top/bottom left/right */
  /* OR */
  padding: 10px 20px 30px 40px; /* top right bottom left (clockwise) */
  /* OR */
  padding-top: 10px;
  padding-right: 20px;
  padding-bottom: 30px;
  padding-left: 40px;
  
  background: lightblue; /* Padding has the background color */
}
```

**When to use:** Creating breathing room inside elements (buttons, cards, containers).

### Border
Line around the element, between padding and margin.

```css
.box-border {
  border: 2px solid #333; /* width style color */
  /* OR */
  border-width: 2px;
  border-style: solid; /* solid, dashed, dotted, double */
  border-color: #333;
  /* OR individual sides */
  border-top: 1px solid red;
  border-right: 2px dashed blue;
}
```

```css
/* Rounded corners */
.rounded {
  border-radius: 8px; /* All corners */
  /* OR */
  border-radius: 10px 20px 30px 40px; /* top-left, top-right, bottom-right, bottom-left */
}
```

### Margin
Space **outside** the element, creating distance from other elements.

```css
.box-margin {
  margin: 20px; /* All sides */
  /* OR */
  margin: 10px auto; /* top/bottom auto (centers horizontally) */
  /* OR */
  margin-top: 20px;
  margin-bottom: 40px;
  margin-left: auto;
  margin-right: auto; /* Centers block element */
}
```

**When to use:** Spacing between elements.

### Padding vs Margin - The Key Difference

```html
<div class="container">
  <div class="box-with-padding">Padding Box</div>
  <div class="box-with-margin">Margin Box</div>
</div>
```

```css
.container {
  background: #f0f0f0;
  padding: 20px;
}

.box-with-padding {
  background: lightblue;
  padding: 30px; /* Space INSIDE - background extends */
  border: 2px solid blue;
}

.box-with-margin {
  background: lightcoral;
  margin: 30px; /* Space OUTSIDE - creates gap from container */
  border: 2px solid red;
}
```

**Key Difference:**
- **Padding:** Increases element's clickable area, has background color
- **Margin:** Creates space between elements, transparent, not clickable

**Real Example - Button:**
```css
/* ✅ CORRECT: Padding makes button bigger and clickable */
.button {
  padding: 12px 24px; /* Vertical Horizontal */
  background: blue;
  color: white;
  border: none;
}

/* ❌ WRONG: Margin pushes button away but doesn't increase click area */
.button-wrong {
  margin: 12px 24px; /* Don't do this */
  background: blue;
}
```

### box-sizing

Controls how width/height are calculated.

```css
/* Default behavior: content-box */
.content-box {
  box-sizing: content-box;
  width: 300px;
  padding: 20px;
  border: 5px solid black;
  /* Total width = 300 + 20 + 20 + 5 + 5 = 350px */
}

/* Better behavior: border-box */
.border-box {
  box-sizing: border-box;
  width: 300px;
  padding: 20px;
  border: 5px solid black;
  /* Total width = 300px (includes padding and border) */
}
```

**Best Practice:**
```css
/* Apply to ALL elements */
* {
  box-sizing: border-box;
}
```

**Why border-box is better:** Predictable sizing. Width stays exactly what you set.

### Margin Collapse

**Vertical margins between elements collapse (merge) into a single margin.**

```html
<div class="box1">Box 1</div>
<div class="box2">Box 2</div>
```

```css
.box1 {
  margin-bottom: 30px;
}

.box2 {
  margin-top: 50px;
}

/* 
  Gap between boxes is NOT 30 + 50 = 80px
  It's just 50px (the larger margin wins)
*/
```

**How to prevent margin collapse:**
1. Use padding instead
2. Use flexbox/grid (they don't collapse)
3. Add border or padding to parent

---

## Positioning

### static (default)

Elements flow normally in the document.

```css
.static-box {
  position: static; /* Default - no special positioning */
}
```

**When to use:** Default behavior, no special positioning needed.

### relative

Positioned relative to its normal position. **Doesn't affect layout of other elements.**

```html
<div class="box relative">Moved Box</div>
```

```css
.relative {
  position: relative;
  top: 20px; /* Moves DOWN 20px from original position */
  left: 30px; /* Moves RIGHT 30px from original position */
  /* Original space is preserved! */
}
```

**When to use:**
- Small adjustments to position
- Creating positioning context for absolutely positioned children

### absolute

Removed from normal document flow. Positioned relative to nearest **positioned ancestor** (not static).

```html
<div class="parent">
  <div class="child">I'm absolutely positioned</div>
</div>
```

```css
.parent {
  position: relative; /* Positioning context */
  width: 400px;
  height: 300px;
  background: lightgray;
}

.child {
  position: absolute;
  top: 20px; /* 20px from parent's top */
  right: 20px; /* 20px from parent's right */
  background: coral;
  padding: 10px;
}
```

**When to use:**
- Tooltips
- Badges on avatars
- Overlays
- Dropdown menus

### fixed

Positioned relative to the **viewport**. Stays in place when scrolling.

```css
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #333;
  color: white;
  padding: 20px;
  z-index: 1000;
}
```

**When to use:**
- Fixed navigation bars
- Floating action buttons
- Cookie consent banners

### sticky

Hybrid of relative and fixed. Switches between them based on scroll position.

```css
.sticky-nav {
  position: sticky;
  top: 0; /* Sticks when scrolled to top */
  background: white;
  border-bottom: 1px solid #ddd;
  padding: 10px;
}
```

**When to use:**
- Table headers that stick while scrolling
- Section headings
- Sidebar navigation

### z-index & Stacking Context

Controls layering of overlapping elements. **Only works on positioned elements** (not static).

```html
<div class="box box1">Box 1 - z-index: 1</div>
<div class="box box2">Box 2 - z-index: 2</div>
<div class="box box3">Box 3 - z-index: 3</div>
```

```css
.box {
  position: absolute;
  width: 150px;
  height: 150px;
}

.box1 {
  background: red;
  top: 50px;
  left: 50px;
  z-index: 1; /* Bottom layer */
}

.box2 {
  background: green;
  top: 100px;
  left: 100px;
  z-index: 3; /* Top layer */
}

.box3 {
  background: blue;
  top: 150px;
  left: 150px;
  z-index: 2; /* Middle layer */
}
```

**Common z-index values:**
- Tooltips: 1000
- Dropdowns: 2000
- Modals: 9000
- Notifications: 9999

### Real Example: Modal Popup

```html
<button onclick="openModal()">Open Modal</button>

<div class="modal-overlay" id="modal">
  <div class="modal-content">
    <h2>Modal Title</h2>
    <p>Modal content goes here</p>
    <button onclick="closeModal()">Close</button>
  </div>
</div>
```

```css
/* Overlay covers entire viewport */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7); /* Semi-transparent black */
  display: none; /* Hidden by default */
  justify-content: center;
  align-items: center;
  z-index: 9000;
}

.modal-overlay.active {
  display: flex; /* Show when active */
}

/* Modal box centered in overlay */
.modal-content {
  position: relative;
  background: white;
  padding: 40px;
  border-radius: 12px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
}
```

```javascript
function openModal() {
  document.getElementById('modal').classList.add('active');
}

function closeModal() {
  document.getElementById('modal').classList.remove('active');
}
```

### Real Example: Fixed Navbar

```html
<nav class="navbar">
  <div class="nav-container">
    <a href="#" class="logo">Logo</a>
    <ul class="nav-menu">
      <li><a href="#home">Home</a></li>
      <li><a href="#about">About</a></li>
      <li><a href="#contact">Contact</a></li>
    </ul>
  </div>
</nav>

<main style="padding-top: 80px;">
  <!-- Content -->
</main>
```

```css
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #1e293b;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  color: white;
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
}

.nav-menu {
  list-style: none;
  display: flex;
  gap: 30px;
  margin: 0;
  padding: 0;
}

.nav-menu a {
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-menu a:hover {
  color: #60a5fa;
}
```

### Real Example: Floating Action Button

```html
<button class="fab">+</button>
```

```css
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
  font-size: 32px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  transition: transform 0.3s, box-shadow 0.3s;
}

.fab:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.4);
}
```

---

## Display & Layout

### display: block

Takes up full width available. Starts on a new line.

```html
<div class="block">Block 1</div>
<div class="block">Block 2</div>
```

```css
.block {
  display: block; /* Default for div, p, h1, etc. */
  background: lightblue;
  padding: 10px;
  margin-bottom: 10px;
}
```

**Block-level elements:**
- `<div>`, `<p>`, `<h1>-<h6>`, `<section>`, `<article>`, `<header>`, `<footer>`

### display: inline

Takes only as much width as needed. Doesn't break to new line.

**⚠️ Cannot set width/height on inline elements!**

```html
<span class="inline">Inline 1</span>
<span class="inline">Inline 2</span>
<span class="inline">Inline 3</span>
```

```css
.inline {
  display: inline; /* Default for span, a, strong, etc. */
  background: lightcoral;
  padding: 5px; /* Vertical padding doesn't push elements below */
}
```

**Inline elements:**
- `<span>`, `<a>`, `<strong>`, `<em>`, `<img>`

### display: inline-block

Best of both worlds: flows inline but respects width/height.

```html
<div class="inline-block">Box 1</div>
<div class="inline-block">Box 2</div>
<div class="inline-block">Box 3</div>
```

```css
.inline-block {
  display: inline-block;
  width: 150px;
  height: 100px;
  background: lightgreen;
  margin: 10px;
  padding: 10px;
  vertical-align: top; /* Aligns tops */
}
```

**When to use:** Navigation buttons, card grids (though flexbox/grid are better).

### display: none

Completely removes element from layout.

```css
.hidden {
  display: none; /* Element not rendered, takes no space */
}

/* Alternative: visibility: hidden */
.invisible {
  visibility: hidden; /* Element hidden but STILL takes space */
}
```

---

## Flexbox

### What is Flexbox?

**Flexbox** is a one-dimensional layout system for arranging items in rows or columns with flexible sizing and alignment.

**When to use Flexbox:**
- Navigation bars
- Aligning items horizontally/vertically
- Distributing space between items
- Card layouts with equal heights

### Flex Container

```html
<div class="flex-container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
</div>
```

```css
.flex-container {
  display: flex; /* Activates flexbox */
  background: #f0f0f0;
  padding: 20px;
}

.item {
  background: #3b82f6;
  color: white;
  padding: 20px;
  margin: 10px;
}
```

### flex-direction

Controls the main axis (row or column).

```css
.flex-row {
  display: flex;
  flex-direction: row; /* Default: left to right */
}

.flex-row-reverse {
  display: flex;
  flex-direction: row-reverse; /* Right to left */
}

.flex-column {
  display: flex;
  flex-direction: column; /* Top to bottom */
}

.flex-column-reverse {
  display: flex;
  flex-direction: column-reverse; /* Bottom to top */
}
```

### justify-content

Aligns items along the **main axis** (horizontal if row, vertical if column).

```css
.flex-container {
  display: flex;
}

/* Align items horizontally */
.justify-start {
  justify-content: flex-start; /* Default: items at start */
}

.justify-center {
  justify-content: center; /* Items centered */
}

.justify-end {
  justify-content: flex-end; /* Items at end */
}

.justify-between {
  justify-content: space-between; /* Equal space BETWEEN items */
}

.justify-around {
  justify-content: space-around; /* Equal space AROUND items */
}

.justify-evenly {
  justify-content: space-evenly; /* Equal space everywhere */
}
```

### align-items

Aligns items along the **cross axis** (vertical if row, horizontal if column).

```css
.flex-container {
  display: flex;
  height: 300px; /* Need height to see vertical alignment */
}

.align-start {
  align-items: flex-start; /* Items at top */
}

.align-center {
  align-items: center; /* Items centered vertically */
}

.align-end {
  align-items: flex-end; /* Items at bottom */
}

.align-stretch {
  align-items: stretch; /* Default: items stretch to fill container */
}

.align-baseline {
  align-items: baseline; /* Align text baselines */
}
```

### Perfect Centering with Flexbox

```css
.center-everything {
  display: flex;
  justify-content: center; /* Horizontal center */
  align-items: center; /* Vertical center */
  height: 100vh; /* Full viewport height */
}
```

```html
<div class="center-everything">
  <div>Perfectly Centered!</div>
</div>
```

### flex-wrap

Controls whether items wrap to next line.

```css
.flex-nowrap {
  display: flex;
  flex-wrap: nowrap; /* Default: items shrink to fit */
}

.flex-wrap {
  display: flex;
  flex-wrap: wrap; /* Items wrap to next line */
}

.flex-wrap-reverse {
  display: flex;
  flex-wrap: wrap-reverse; /* Wrap in reverse */
}
```

### gap

Space between flex items (modern CSS).

```css
.flex-with-gap {
  display: flex;
  gap: 20px; /* 20px space between items */
  /* OR */
  gap: 20px 40px; /* row-gap column-gap */
}
```

**Old alternative (still works):**
```css
.item {
  margin: 10px; /* Less precise */
}
```

### flex-grow

Controls how items grow to fill available space.

```html
<div class="flex-container">
  <div class="item grow-1">Grow 1</div>
  <div class="item grow-2">Grow 2</div>
  <div class="item grow-3">Grow 3</div>
</div>
```

```css
.flex-container {
  display: flex;
}

.grow-1 {
  flex-grow: 1; /* Takes 1 part of available space */
}

.grow-2 {
  flex-grow: 2; /* Takes 2 parts (twice as much) */
}

.grow-3 {
  flex-grow: 3; /* Takes 3 parts (three times) */
}
```

### flex-shrink

Controls how items shrink when space is limited.

```css
.no-shrink {
  flex-shrink: 0; /* Never shrink */
}

.can-shrink {
  flex-shrink: 1; /* Default: can shrink */
}
```

### flex-basis

Sets initial size before growing/shrinking.

```css
.item {
  flex-basis: 200px; /* Start at 200px wide */
  /* OR */
  flex-basis: 33.333%; /* Start at 33.333% of container */
}
```

### Flex Shorthand

```css
.item {
  /* flex: grow shrink basis */
  flex: 1 1 200px;
  /* OR common patterns: */
  flex: 1; /* Same as: 1 1 0% */
  flex: 0 0 auto; /* Don't grow or shrink */
}
```

### Real Example: Responsive Navigation Bar

```html
<nav class="navbar">
  <div class="logo">MyBrand</div>
  <ul class="nav-links">
    <li><a href="#home">Home</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#services">Services</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
  <div class="nav-actions">
    <button class="btn-login">Login</button>
    <button class="btn-signup">Sign Up</button>
  </div>
</nav>
```

```css
.navbar {
  display: flex;
  justify-content: space-between; /* Logo left, links center, buttons right */
  align-items: center; /* Vertical alignment */
  padding: 20px 40px;
  background: #1e293b;
  color: white;
}

.logo {
  font-size: 24px;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 30px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links a {
  color: white;
  text-decoration: none;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #60a5fa;
}

.nav-actions {
  display: flex;
  gap: 15px;
}

.btn-login, .btn-signup {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: transform 0.2s;
}

.btn-login {
  background: transparent;
  color: white;
  border: 1px solid white;
}

.btn-signup {
  background: #3b82f6;
  color: white;
}

.btn-login:hover, .btn-signup:hover {
  transform: translateY(-2px);
}
```

### Real Example: Card Layout

```html
<div class="card-container">
  <div class="card">
    <h3>Feature 1</h3>
    <p>Description of feature 1</p>
  </div>
  <div class="card">
    <h3>Feature 2</h3>
    <p>Description of feature 2 with more content</p>
  </div>
  <div class="card">
    <h3>Feature 3</h3>
    <p>Description of feature 3</p>
  </div>
</div>
```

```css
.card-container {
  display: flex;
  gap: 30px;
  flex-wrap: wrap; /* Wrap on small screens */
}

.card {
  flex: 1 1 300px; /* Grow, shrink, min 300px */
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}

.card h3 {
  margin-top: 0;
  color: #1e293b;
}

.card p {
  color: #64748b;
  line-height: 1.6;
}
```

---

## CSS Grid

### What is CSS Grid?

**CSS Grid** is a two-dimensional layout system for creating complex layouts with rows and columns.

**When to use Grid:**
- Page layouts (header, sidebar, content, footer)
- Image galleries
- Complex dashboards
- Magazine-style layouts

### Basic Grid Setup

```html
<div class="grid-container">
  <div class="grid-item">1</div>
  <div class="grid-item">2</div>
  <div class="grid-item">3</div>
  <div class="grid-item">4</div>
  <div class="grid-item">5</div>
  <div class="grid-item">6</div>
</div>
```

```css
.grid-container {
  display: grid;
  grid-template-columns: 200px 200px 200px; /* 3 columns */
  grid-template-rows: 100px 100px; /* 2 rows */
  gap: 20px; /* Space between items */
  background: #f0f0f0;
  padding: 20px;
}

.grid-item {
  background: #3b82f6;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  border-radius: 8px;
}
```

### grid-template-columns & grid-template-rows

```css
/* Fixed sizes */
.grid {
  grid-template-columns: 200px 300px 200px;
}

/* Fractional units (fr) - distribute available space */
.grid {
  grid-template-columns: 1fr 2fr 1fr; /* Middle column is twice as wide */
}

/* repeat() function */
.grid {
  grid-template-columns: repeat(3, 1fr); /* 3 equal columns */
  /* Same as: 1fr 1fr 1fr */
}

/* Mix units */
.grid {
  grid-template-columns: 250px 1fr 250px; /* Fixed sidebars, fluid center */
}

/* minmax() for responsive sizing */
.grid {
  grid-template-columns: repeat(3, minmax(200px, 1fr));
  /* Each column: min 200px, max equal distribution */
}
```

### gap

Space between grid items.

```css
.grid {
  display: grid;
  gap: 20px; /* Same for rows and columns */
  /* OR */
  row-gap: 20px;
  column-gap: 30px;
}
```

### grid-column & grid-row (Spanning)

Make items span multiple columns/rows.

```html
<div class="grid">
  <div class="header">Header</div>
  <div class="sidebar">Sidebar</div>
  <div class="content">Content</div>
  <div class="footer">Footer</div>
</div>
```

```css
.grid {
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: auto 1fr auto;
  gap: 20px;
  height: 100vh;
}

.header {
  grid-column: 1 / 3; /* Span from line 1 to line 3 (2 columns) */
  /* OR */
  grid-column: 1 / -1; /* Span all columns */
  background: #1e293b;
  color: white;
  padding: 20px;
}

.sidebar {
  grid-row: 2 / 3; /* Row 2 */
  background: #334155;
  color: white;
  padding: 20px;
}

.content {
  background: white;
  padding: 20px;
}

.footer {
  grid-column: 1 / -1; /* Span all columns */
  background: #475569;
  color: white;
  padding: 20px;
  text-align: center;
}
```

### grid-template-areas (Named Areas)

Intuitive layout with names.

```html
<div class="layout">
  <header class="header">Header</header>
  <aside class="sidebar">Sidebar</aside>
  <main class="content">Content</main>
  <footer class="footer">Footer</footer>
</div>
```

```css
.layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar content"
    "footer footer";
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 20px;
  height: 100vh;
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
  padding: 20px;
}

.footer {
  grid-area: footer;
  background: #475569;
  color: white;
  padding: 20px;
  text-align: center;
}
```

### auto-fit vs auto-fill

Create responsive grids without media queries.

```css
/* auto-fit: Stretches items to fill available space */
.grid-auto-fit {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

/* auto-fill: Keeps item size, may leave empty space */
.grid-auto-fill {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}
```

**auto-fit is usually what you want for responsive card grids.**

### Real Example: Responsive Image Gallery

```html
<div class="gallery">
  <img src="image1.jpg" alt="Image 1">
  <img src="image2.jpg" alt="Image 2">
  <img src="image3.jpg" alt="Image 3">
  <img src="image4.jpg" alt="Image 4">
  <img src="image5.jpg" alt="Image 5">
  <img src="image6.jpg" alt="Image 6">
</div>
```

```css
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

.gallery img {
  width: 100%;
  height: 250px;
  object-fit: cover; /* Crop to fill space */
  border-radius: 12px;
  transition: transform 0.3s;
}

.gallery img:hover {
  transform: scale(1.05);
}
```

### Real Example: Dashboard Layout

```html
<div class="dashboard">
  <header class="dash-header">Dashboard Header</header>
  <aside class="dash-sidebar">Sidebar Navigation</aside>
  <main class="dash-main">
    <div class="stat-card">Stats 1</div>
    <div class="stat-card">Stats 2</div>
    <div class="stat-card">Stats 3</div>
    <div class="stat-card">Stats 4</div>
    <div class="chart">Chart Area</div>
    <div class="recent">Recent Activity</div>
  </main>
</div>
```

```css
.dashboard {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main";
  grid-template-columns: 250px 1fr;
  grid-template-rows: 70px 1fr;
  height: 100vh;
  background: #f1f5f9;
}

.dash-header {
  grid-area: header;
  background: white;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
}

.dash-sidebar {
  grid-area: sidebar;
  background: #1e293b;
  color: white;
  padding: 30px 20px;
}

.dash-main {
  grid-area: main;
  padding: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  align-content: start;
}

.stat-card {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.chart {
  grid-column: 1 / -1; /* Full width */
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  min-height: 400px;
}

.recent {
  grid-column: 1 / -1; /* Full width */
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}
```

---

## Responsiveness

### What is Responsive Design?

**Responsive design** ensures websites look good on all devices (desktop, tablet, mobile).

**Key principles:**
1. Fluid layouts (%, fr, auto)
2. Flexible images
3. Media queries

### Mobile-First Approach

Design for mobile first, then enhance for larger screens.

**Why?** Easier to scale up than down. Better performance on mobile.

```css
/* ✅ MOBILE-FIRST (Recommended) */
.container {
  padding: 20px; /* Mobile default */
}

@media (min-width: 768px) {
  .container {
    padding: 40px; /* Tablet and up */
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 60px; /* Desktop */
  }
}

/* ❌ DESKTOP-FIRST (Not recommended) */
.container {
  padding: 60px; /* Desktop */
}

@media (max-width: 1024px) {
  .container {
    padding: 40px;
  }
}
```

### Common Breakpoints

```css
/* Mobile: default (no media query needed) */

/* Tablet: 768px and up */
@media (min-width: 768px) {
  /* Tablet styles */
}

/* Desktop: 1024px and up */
@media (min-width: 1024px) {
  /* Desktop styles */
}

/* Large Desktop: 1440px and up */
@media (min-width: 1440px) {
  /* Large desktop styles */
}
```

### Media Query Syntax

```css
/* Min-width (mobile-first) */
@media (min-width: 768px) {
  /* Styles for 768px and wider */
}

/* Max-width (desktop-first) */
@media (max-width: 767px) {
  /* Styles for 767px and narrower */
}

/* Range */
@media (min-width: 768px) and (max-width: 1023px) {
  /* Styles only for tablets */
}

/* Orientation */
@media (orientation: landscape) {
  /* Landscape mode */
}

@media (orientation: portrait) {
  /* Portrait mode */
}

/* Multiple conditions */
@media (min-width: 768px) and (orientation: landscape) {
  /* Tablet landscape */
}
```

### Real Example: Responsive Navigation

```html
<nav class="responsive-nav">
  <div class="nav-brand">Logo</div>
  <button class="hamburger">☰</button>
  <ul class="nav-menu">
    <li><a href="#home">Home</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#services">Services</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</nav>
```

```css
/* Mobile styles */
.responsive-nav {
  background: #1e293b;
  padding: 20px;
  position: relative;
}

.nav-brand {
  color: white;
  font-size: 24px;
  font-weight: bold;
}

.hamburger {
  display: block;
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 28px;
  cursor: pointer;
}

.nav-menu {
  display: none; /* Hidden on mobile by default */
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
  padding: 0;
  list-style: none;
}

.nav-menu.active {
  display: flex; /* Show when hamburger clicked */
}

.nav-menu a {
  color: white;
  text-decoration: none;
  padding: 10px;
  border-radius: 6px;
  transition: background 0.3s;
}

.nav-menu a:hover {
  background: #334155;
}

/* Tablet and Desktop */
@media (min-width: 768px) {
  .responsive-nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .hamburger {
    display: none; /* Hide hamburger on desktop */
  }
  
  .nav-menu {
    display: flex !important; /* Always visible */
    flex-direction: row;
    margin-top: 0;
  }
}
```

### Real Example: Responsive Grid

```html
<div class="responsive-grid">
  <div class="card">Card 1</div>
  <div class="card">Card 2</div>
  <div class="card">Card 3</div>
  <div class="card">Card 4</div>
  <div class="card">Card 5</div>
  <div class="card">Card 6</div>
</div>
```

```css
.responsive-grid {
  display: grid;
  gap: 20px;
  padding: 20px;
}

.card {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Mobile: 1 column */
@media (min-width: 0) {
  .responsive-grid {
    grid-template-columns: 1fr;
  }
}

/* Tablet: 2 columns */
@media (min-width: 768px) {
  .responsive-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Desktop: 3 columns */
@media (min-width: 1024px) {
  .responsive-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Fluid Typography with clamp()

`clamp()` creates responsive font sizes without media queries.

**Syntax:** `clamp(min, preferred, max)`

```css
h1 {
  /* Scales from 24px to 48px based on viewport */
  font-size: clamp(24px, 5vw, 48px);
  /* min: 24px, preferred: 5% of viewport, max: 48px */
}

p {
  font-size: clamp(14px, 2vw, 18px);
}

.container {
  /* Fluid padding */
  padding: clamp(20px, 5vw, 80px);
}
```

### Responsive Images

```html
<img src="image.jpg" alt="Responsive image" class="responsive-img">
```

```css
.responsive-img {
  max-width: 100%; /* Never exceed container width */
  height: auto; /* Maintain aspect ratio */
  display: block; /* Remove inline spacing */
}

/* Modern: aspect-ratio */
.responsive-img-fixed {
  width: 100%;
  aspect-ratio: 16 / 9; /* Force 16:9 ratio */
  object-fit: cover; /* Crop to fill */
}
```

### Container Queries (Modern CSS)

Style elements based on container size, not viewport.

```css
.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
```

---

## Animations & Transitions

### Transitions

Smooth animation between states (hover, focus, etc.).

**Syntax:** `transition: property duration timing-function delay;`

```html
<button class="btn">Hover me</button>
```

```css
.btn {
  background: #3b82f6;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  
  /* Transition syntax */
  transition: background 0.3s ease, transform 0.3s ease;
  /* OR */
  transition: all 0.3s ease; /* All properties */
}

.btn:hover {
  background: #2563eb;
  transform: translateY(-2px);
}
```

### Transition Properties

```css
.element {
  /* Specify which properties to animate */
  transition-property: background, transform;
  
  /* Duration (s or ms) */
  transition-duration: 0.3s;
  
  /* Timing function */
  transition-timing-function: ease; /* ease, linear, ease-in, ease-out, ease-in-out */
  
  /* Delay before animation */
  transition-delay: 0.1s;
  
  /* Shorthand */
  transition: background 0.3s ease 0.1s;
}
```

### Timing Functions

```css
/* Smooth start and end (default) */
transition: all 0.3s ease;

/* Constant speed */
transition: all 0.3s linear;

/* Slow start */
transition: all 0.3s ease-in;

/* Slow end */
transition: all 0.3s ease-out;

/* Slow start and end */
transition: all 0.3s ease-in-out;

/* Custom cubic bezier */
transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55); /* Bounce effect */
```

### Transform

Change element's position, size, and rotation **without affecting layout**.

```css
/* Translate (move) */
.translate {
  transform: translateX(50px); /* Move right */
  transform: translateY(-20px); /* Move up */
  transform: translate(50px, -20px); /* Both */
}

/* Scale */
.scale {
  transform: scale(1.5); /* 150% size */
  transform: scale(1.2, 0.8); /* Width 120%, height 80% */
}

/* Rotate */
.rotate {
  transform: rotate(45deg); /* 45 degrees clockwise */
  transform: rotate(-90deg); /* 90 degrees counter-clockwise */
}

/* Skew */
.skew {
  transform: skewX(20deg);
  transform: skewY(10deg);
}

/* Combine multiple transforms */
.combined {
  transform: translateX(50px) rotate(45deg) scale(1.2);
}
```

### Real Example: Interactive Card

```html
<div class="interactive-card">
  <img src="image.jpg" alt="Card image">
  <h3>Card Title</h3>
  <p>Card description goes here</p>
  <button>Learn More</button>
</div>
```

```css
.interactive-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.interactive-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.interactive-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.interactive-card:hover img {
  transform: scale(1.1);
}

.interactive-card h3,
.interactive-card p,
.interactive-card button {
  padding: 0 20px;
}

.interactive-card button {
  margin: 20px;
  padding: 10px 20px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.interactive-card button:hover {
  background: #2563eb;
}
```

### Keyframe Animations

Create complex multi-step animations.

**Syntax:**
```css
@keyframes animationName {
  0% { /* Starting state */ }
  50% { /* Middle state */ }
  100% { /* Ending state */ }
}
```

### Fade In Animation

```css
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-in-element {
  animation: fadeIn 1s ease;
}
```

### Slide In Animation

```css
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

.slide-in {
  animation: slideInLeft 0.5s ease;
}
```

### Animation Properties

```css
.animated {
  /* animation: name duration timing-function delay iteration-count direction fill-mode; */
  animation-name: bounce;
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
  animation-delay: 0.5s;
  animation-iteration-count: infinite; /* Or number like 3 */
  animation-direction: alternate; /* normal, reverse, alternate, alternate-reverse */
  animation-fill-mode: forwards; /* Keep final state */
  animation-play-state: running; /* Or paused */
  
  /* Shorthand */
  animation: bounce 1s ease-in-out 0.5s infinite alternate;
}
```

### Real Example: Loading Spinner

```html
<div class="spinner"></div>
```

```css
.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
```

### Real Example: Pulse Animation

```html
<button class="pulse-btn">Notification</button>
```

```css
.pulse-btn {
  position: relative;
  padding: 12px 24px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.pulse-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 6px;
  background: inherit;
  animation: pulse 2s ease-out infinite;
}

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
```

### Real Example: Bounce Animation

```css
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
```

---

## Pseudo Classes & Elements

### Pseudo Classes

Select elements based on their **state** or **position**.

#### :hover

```css
a:hover {
  color: #3b82f6;
  text-decoration: underline;
}

button:hover {
  background: #2563eb;
  transform: scale(1.05);
}
```

#### :focus

```css
input:focus {
  outline: 2px solid #3b82f6;
  border-color: #3b82f6;
}

button:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}
```

#### :active

```css
button:active {
  transform: scale(0.95);
}
```

#### :nth-child()

```html
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
  <li>Item 4</li>
  <li>Item 5</li>
</ul>
```

```css
/* First item */
li:first-child {
  color: red;
}

/* Last item */
li:last-child {
  color: blue;
}

/* Every odd item */
li:nth-child(odd) {
  background: #f3f4f6;
}

/* Every even item */
li:nth-child(even) {
  background: #e5e7eb;
}

/* Every 3rd item */
li:nth-child(3n) {
  font-weight: bold;
}

/* Specific item (3rd) */
li:nth-child(3) {
  color: green;
}
```

#### :not()

```css
/* All paragraphs except those with class "exclude" */
p:not(.exclude) {
  color: navy;
}

/* All buttons except disabled ones */
button:not(:disabled) {
  cursor: pointer;
}
```

### Pseudo Elements

Create and style parts of elements that don't exist in HTML.

#### ::before and ::after

Insert content before/after element.

```html
<blockquote>This is a quote</blockquote>
```

```css
blockquote::before {
  content: '"';
  font-size: 48px;
  color: #3b82f6;
  margin-right: 10px;
}

blockquote::after {
  content: '"';
  font-size: 48px;
  color: #3b82f6;
  margin-left: 10px;
}
```

**Real Example: Icon Before Link**
```css
.external-link::after {
  content: ' ↗';
  color: #3b82f6;
}
```

**Real Example: Required Field Asterisk**
```css
.required-label::after {
  content: ' *';
  color: red;
}
```

#### ::placeholder

```css
input::placeholder {
  color: #9ca3af;
  font-style: italic;
  opacity: 0.7;
}
```

#### ::selection

Style highlighted text.

```css
::selection {
  background: #3b82f6;
  color: white;
}
```

### Creative Examples

#### Decorated Heading

```html
<h2 class="decorated-heading">Beautiful Heading</h2>
```

```css
.decorated-heading {
  position: relative;
  text-align: center;
  padding: 20px 0;
}

.decorated-heading::before,
.decorated-heading::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 100px;
  height: 2px;
  background: #3b82f6;
}

.decorated-heading::before {
  left: 0;
}

.decorated-heading::after {
  right: 0;
}
```

#### Custom Checkbox

```html
<label class="custom-checkbox">
  <input type="checkbox">
  <span class="checkmark"></span>
  Accept terms
</label>
```

```css
.custom-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.custom-checkbox input {
  display: none; /* Hide default checkbox */
}

.checkmark {
  width: 24px;
  height: 24px;
  border: 2px solid #d1d5db;
  border-radius: 4px;
  margin-right: 10px;
  position: relative;
  transition: all 0.3s ease;
}

.custom-checkbox input:checked + .checkmark {
  background: #3b82f6;
  border-color: #3b82f6;
}

.custom-checkbox input:checked + .checkmark::after {
  content: '✓';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-weight: bold;
}
```

---

## Backgrounds & Colors

### Background Color

```css
.element {
  background-color: #3b82f6; /* Hex */
  background-color: rgb(59, 130, 246); /* RGB */
  background-color: rgba(59, 130, 246, 0.5); /* RGBA with opacity */
  background-color: hsl(217, 91%, 60%); /* HSL */
}
```

### Background Image

```css
.hero {
  background-image: url('hero.jpg');
  background-size: cover; /* Cover entire area */
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Don't repeat */
  background-attachment: fixed; /* Parallax effect */
  
  /* Shorthand */
  background: url('hero.jpg') center/cover no-repeat fixed;
}
```

### Background Size

```css
.bg-cover {
  background-size: cover; /* Scale to cover, may crop */
}

.bg-contain {
  background-size: contain; /* Fit entire image, may have empty space */
}

.bg-custom {
  background-size: 50% auto; /* Custom size */
}
```

### Gradients

#### Linear Gradient

```css
.gradient-linear {
  background: linear-gradient(to right, #3b82f6, #8b5cf6);
  /* OR */
  background: linear-gradient(45deg, #3b82f6, #8b5cf6);
  /* OR multiple colors */
  background: linear-gradient(to bottom, #3b82f6, #8b5cf6, #ec4899);
}
```

#### Radial Gradient

```css
.gradient-radial {
  background: radial-gradient(circle, #3b82f6, #8b5cf6);
}
```

#### Conic Gradient

```css
.gradient-conic {
  background: conic-gradient(#3b82f6, #8b5cf6, #ec4899, #3b82f6);
}
```

### Multiple Backgrounds

```css
.multi-bg {
  background:
    url('overlay.png') center/cover no-repeat,
    linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.7)),
    url('background.jpg') center/cover no-repeat;
}
```

### Modern Gradient Examples

```css
/* Mesh gradient */
.mesh-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

/* Glassmorphism background */
.glass-bg {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

/* Animated gradient */
.animated-gradient {
  background: linear-gradient(270deg, #3b82f6, #8b5cf6, #ec4899);
  background-size: 600% 600%;
  animation: gradientShift 10s ease infinite;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

---

## Typography

### Font Family

```css
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  /* System fonts for best performance */
}

h1 {
  font-family: 'Georgia', serif;
}

code {
  font-family: 'Courier New', monospace;
}
```

### Google Fonts Integration

```html
<!-- In HTML <head> -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
```

```css
body {
  font-family: 'Inter', sans-serif;
}
```

### Font Properties

```css
.text {
  font-size: 16px; /* Or rem, em, %, vw */
  font-weight: 400; /* 100-900, or normal, bold */
  font-style: italic; /* normal, italic, oblique */
  line-height: 1.6; /* Spacing between lines */
  letter-spacing: 0.5px; /* Space between letters */
  word-spacing: 2px; /* Space between words */
  text-transform: uppercase; /* uppercase, lowercase, capitalize */
  text-decoration: underline; /* none, underline, line-through */
  text-align: left; /* left, center, right, justify */
}
```

### Font Weight

```css
.light {
  font-weight: 300;
}

.normal {
  font-weight: 400; /* Or 'normal' */
}

.semibold {
  font-weight: 600;
}

.bold {
  font-weight: 700; /* Or 'bold' */
}
```

### Line Height

```css
/* Bad: lines too cramped */
.cramped {
  line-height: 1;
}

/* Good: readable spacing */
.readable {
  line-height: 1.6; /* 1.5-1.8 is ideal for body text */
}

/* Headings: tighter line height */
h1 {
  line-height: 1.2;
}
```

### Text Alignment

```css
.left {
  text-align: left; /* Default */
}

.center {
  text-align: center;
}

.right {
  text-align: right;
}

.justify {
  text-align: justify; /* Stretch lines to fill width */
}
```

### Advanced Typography

```css
/* Truncate long text with ellipsis */
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 200px;
}

/* Multi-line truncate */
.truncate-multiline {
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Number of lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Drop cap */
.drop-cap::first-letter {
  font-size: 3em;
  font-weight: bold;
  float: left;
  margin-right: 10px;
  line-height: 1;
}
```

---

## Advanced CSS

### CSS Variables (Custom Properties)

Define reusable values.

```css
:root {
  /* Color palette */
  --primary: #3b82f6;
  --secondary: #8b5cf6;
  --success: #10b981;
  --danger: #ef4444;
  --text: #1f2937;
  --bg: #ffffff;
  
  /* Spacing */
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  
  /* Breakpoints */
  --mobile: 768px;
  --desktop: 1024px;
}

/* Use variables */
.button {
  background: var(--primary);
  padding: var(--spacing-md);
  color: white;
}

.button:hover {
  background: var(--secondary);
}
```

**Dynamic theming:**
```css
/* Light theme (default) */
:root {
  --bg: #ffffff;
  --text: #000000;
}

/* Dark theme */
body.dark-theme {
  --bg: #1f2937;
  --text: #f9fafb;
}

body {
  background: var(--bg);
  color: var(--text);
  transition: background 0.3s, color 0.3s;
}
```

### calc()

Perform calculations in CSS.

```css
.element {
  /* Subtract fixed value from percentage */
  width: calc(100% - 80px);
  
  /* Complex calculation */
  padding: calc(20px + 2vw);
  
  /* Mix units */
  height: calc(100vh - 60px); /* Full height minus navbar */
}

/* Real example: Centered box with offset */
.centered-box {
  width: calc(100% - 40px);
  max-width: 1200px;
  margin: 0 auto;
}
```

### clamp()

Responsive values with min and max.

```css
/* clamp(minimum, preferred, maximum) */
h1 {
  font-size: clamp(24px, 5vw, 64px);
  /* Mobile: 24px, Desktop: grows up to 64px */
}

.container {
  width: clamp(300px, 90%, 1200px);
  padding: clamp(20px, 5vw, 80px);
}
```

### aspect-ratio

Maintain width-to-height ratio.

```css
.video-wrapper {
  aspect-ratio: 16 / 9; /* 16:9 video */
  width: 100%;
}

.square-box {
  aspect-ratio: 1 / 1; /* Perfect square */
  width: 200px;
}
```

### object-fit

Control how images/videos fit in containers.

```css
.cover-image {
  width: 100%;
  height: 300px;
  object-fit: cover; /* Crop to fill */
  object-position: center; /* Focus on center */
}

.contain-image {
  width: 100%;
  height: 300px;
  object-fit: contain; /* Fit entire image, may have empty space */
}
```

### overflow

Control content that exceeds container size.

```css
.scrollable {
  overflow: auto; /* Scrollbar when needed */
  max-height: 400px;
}

.hidden-overflow {
  overflow: hidden; /* Hide overflow */
}

.scroll-x {
  overflow-x: auto; /* Horizontal scroll only */
  overflow-y: hidden;
}
```

### Custom Scrollbar

```css
.custom-scroll::-webkit-scrollbar {
  width: 12px;
}

.custom-scroll::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

.custom-scroll::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}

.custom-scroll::-webkit-scrollbar-thumb:hover {
  background: #555;
}
```

### backdrop-filter

Blur/filter elements behind an element.

```css
.glass-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  padding: 30px;
}
```

### Glassmorphism Example

```html
<div class="glass-container">
  <div class="glass-card">
    <h2>Glassmorphism Card</h2>
    <p>Beautiful frosted glass effect</p>
  </div>
</div>
```

```css
.glass-container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.glass-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  color: white;
}

.glass-card h2 {
  margin-top: 0;
}
```

### Neumorphism Example

```html
<div class="neu-container">
  <div class="neu-card">
    <h3>Neumorphic Card</h3>
    <p>Soft, embossed look</p>
    <button class="neu-button">Click me</button>
  </div>
</div>
```

```css
.neu-container {
  background: #e0e5ec;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.neu-card {
  background: #e0e5ec;
  border-radius: 20px;
  padding: 40px;
  box-shadow:
    20px 20px 60px #bec3c9,
    -20px -20px 60px #ffffff;
}

.neu-card h3 {
  margin-top: 0;
  color: #4a5568;
}

.neu-card p {
  color: #718096;
}

.neu-button {
  background: #e0e5ec;
  border: none;
  border-radius: 12px;
  padding: 12px 24px;
  margin-top: 20px;
  cursor: pointer;
  box-shadow:
    5px 5px 10px #bec3c9,
    -5px -5px 10px #ffffff;
  transition: all 0.3s ease;
}

.neu-button:active {
  box-shadow:
    inset 5px 5px 10px #bec3c9,
    inset -5px -5px 10px #ffffff;
}
```

---

## Real Project Components

### Animated Hero Section

```html
<section class="hero">
  <div class="hero-content">
    <h1 class="hero-title">Build Amazing Websites</h1>
    <p class="hero-subtitle">Learn modern web development with our comprehensive courses</p>
    <div class="hero-buttons">
      <button class="btn-primary">Get Started</button>
      <button class="btn-secondary">Learn More</button>
    </div>
  </div>
  <div class="hero-image">
    <img src="hero-illustration.svg" alt="Hero illustration">
  </div>
</section>
```

```css
.hero {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 60px;
  padding: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.hero-content {
  animation: slideInLeft 0.8s ease;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.hero-title {
  font-size: clamp(36px, 6vw, 64px);
  font-weight: 700;
  margin-bottom: 20px;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: clamp(16px, 2vw, 20px);
  margin-bottom: 40px;
  opacity: 0.9;
}

.hero-buttons {
  display: flex;
  gap: 20px;
}

.btn-primary,
.btn-secondary {
  padding: 16px 32px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.btn-primary {
  background: white;
  color: #667eea;
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid white;
}

.btn-primary:hover,
.btn-secondary:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.hero-image {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

.hero-image img {
  width: 100%;
  max-width: 600px;
}

/* Responsive */
@media (max-width: 768px) {
  .hero {
    grid-template-columns: 1fr;
    padding: 40px 20px;
    text-align: center;
  }
  
  .hero-buttons {
    justify-content: center;
    flex-direction: column;
  }
}
```

### Responsive Card Grid

```html
<section class="features">
  <h2 class="section-title">Our Features</h2>
  <div class="feature-grid">
    <div class="feature-card">
      <div class="feature-icon">🚀</div>
      <h3>Fast Performance</h3>
      <p>Optimized for lightning-fast load times</p>
    </div>
    <div class="feature-card">
      <div class="feature-icon">📱</div>
      <h3>Responsive Design</h3>
      <p>Works perfectly on all devices</p>
    </div>
    <div class="feature-card">
      <div class="feature-icon">🔒</div>
      <h3>Secure</h3>
      <p>Built with security best practices</p>
    </div>
    <div class="feature-card">
      <div class="feature-icon">⚡</div>
      <h3>Modern Tech</h3>
      <p>Using the latest web technologies</p>
    </div>
  </div>
</section>
```

```css
.features {
  padding: 80px 20px;
  background: #f9fafb;
}

.section-title {
  text-align: center;
  font-size: clamp(32px, 5vw, 48px);
  margin-bottom: 60px;
  color: #1f2937;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.feature-card {
  background: white;
  padding: 40px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
}

.feature-icon {
  font-size: 48px;
  margin-bottom: 20px;
}

.feature-card h3 {
  font-size: 24px;
  margin-bottom: 12px;
  color: #1f2937;
}

.feature-card p {
  color: #6b7280;
  line-height: 1.6;
}
```

### Modal Dialog

```html
<button onclick="openModal()" class="open-modal-btn">Open Modal</button>

<div id="modal" class="modal">
  <div class="modal-backdrop" onclick="closeModal()"></div>
  <div class="modal-content">
    <button class="modal-close" onclick="closeModal()">×</button>
    <h2>Modal Title</h2>
    <p>This is a modal dialog with a backdrop and close button.</p>
    <div class="modal-actions">
      <button onclick="closeModal()" class="btn-cancel">Cancel</button>
      <button class="btn-confirm">Confirm</button>
    </div>
  </div>
</div>
```

```css
.modal {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
}

.modal.active {
  display: block;
}

.modal-backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  animation: fadeIn 0.3s ease;
}

.modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 40px;
  border-radius: 16px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translate(-50%, -40%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

.modal-close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 32px;
  cursor: pointer;
  color: #9ca3af;
  transition: color 0.3s;
}

.modal-close:hover {
  color: #1f2937;
}

.modal-content h2 {
  margin-top: 0;
  margin-bottom: 16px;
}

.modal-actions {
  display: flex;
  gap: 12px;
  margin-top: 30px;
  justify-content: flex-end;
}

.btn-cancel,
.btn-confirm {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s;
}

.btn-cancel {
  background: #e5e7eb;
  color: #1f2937;
}

.btn-confirm {
  background: #3b82f6;
  color: white;
}

.btn-cancel:hover {
  background: #d1d5db;
}

.btn-confirm:hover {
  background: #2563eb;
}
```

```javascript
function openModal() {
  document.getElementById('modal').classList.add('active');
}

function closeModal() {
  document.getElementById('modal').classList.remove('active');
}
```

### Sidebar Layout

```html
<div class="app-layout">
  <aside class="sidebar">
    <div class="sidebar-header">
      <h2>Dashboard</h2>
    </div>
    <nav class="sidebar-nav">
      <a href="#" class="nav-item active">
        <span class="icon">📊</span>
        Overview
      </a>
      <a href="#" class="nav-item">
        <span class="icon">👥</span>
        Users
      </a>
      <a href="#" class="nav-item">
        <span class="icon">📈</span>
        Analytics
      </a>
      <a href="#" class="nav-item">
        <span class="icon">⚙️</span>
        Settings
      </a>
    </nav>
  </aside>
  
  <main class="main-content">
    <header class="content-header">
      <h1>Welcome Back!</h1>
    </header>
    <div class="content-body">
      <!-- Main content here -->
    </div>
  </main>
</div>
```

```css
.app-layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  min-height: 100vh;
}

.sidebar {
  background: #1e293b;
  color: white;
  padding: 20px 0;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}

.sidebar-header {
  padding: 0 20px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-header h2 {
  margin: 0;
  font-size: 24px;
}

.sidebar-nav {
  margin-top: 20px;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  color: #94a3b8;
  text-decoration: none;
  transition: background 0.3s, color 0.3s;
}

.nav-item:hover {
  background: rgba(255, 255, 255, 0.05);
  color: white;
}

.nav-item.active {
  background: #3b82f6;
  color: white;
}

.icon {
  font-size: 20px;
}

.main-content {
  background: #f1f5f9;
}

.content-header {
  background: white;
  padding: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.content-header h1 {
  margin: 0;
}

.content-body {
  padding: 30px;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .app-layout {
    grid-template-columns: 1fr;
  }
  
  .sidebar {
    position: fixed;
    top: 0;
    left: -250px;
    height: 100%;
    width: 250px;
    z-index: 1000;
    transition: left 0.3s ease;
  }
  
  .sidebar.open {
    left: 0;
  }
}
```

### Animated Button Styles

```html
<div class="button-showcase">
  <button class="btn btn-glow">Glow Effect</button>
  <button class="btn btn-slide">Slide Effect</button>
  <button class="btn btn-ripple">Ripple Effect</button>
  <button class="btn btn-3d">3D Effect</button>
</div>
```

```css
.button-showcase {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  padding: 40px;
}

.btn {
  padding: 14px 28px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

/* Glow Effect */
.btn-glow {
  background: #3b82f6;
  color: white;
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
}

.btn-glow:hover {
  box-shadow: 0 0 40px rgba(59, 130, 246, 0.8);
  transform: translateY(-2px);
}

/* Slide Effect */
.btn-slide {
  background: #8b5cf6;
  color: white;
}

.btn-slide::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.2);
  transition: left 0.3s ease;
}

.btn-slide:hover::before {
  left: 100%;
}

/* 3D Effect */
.btn-3d {
  background: #10b981;
  color: white;
  box-shadow: 0 6px 0 #059669;
  transform: translateY(0);
}

.btn-3d:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 0 #059669;
}

.btn-3d:active {
  transform: translateY(4px);
  box-shadow: 0 2px 0 #059669;
}
```

---

## Best Practices

### BEM Naming Convention

**BEM = Block Element Modifier**

Improves code readability and maintainability.

```html
<!-- Block -->
<div class="card">
  <!-- Element -->
  <h3 class="card__title">Title</h3>
  <p class="card__description">Description</p>
  <!-- Element with Modifier -->
  <button class="card__button card__button--primary">Click me</button>
</div>
```

```css
/* Block */
.card {
  background: white;
  padding: 20px;
  border-radius: 8px;
}

/* Element */
.card__title {
  font-size: 24px;
  margin-bottom: 12px;
}

.card__description {
  color: #6b7280;
}

.card__button {
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
}

/* Modifier */
.card__button--primary {
  background: #3b82f6;
  color: white;
}

.card__button--secondary {
  background: #e5e7eb;
  color: #1f2937;
}
```

**Benefits:**
- Clear relationships between elements
- Easy to understand structure
- Avoids naming conflicts
- Simplifies debugging

### Clean Structure

```css
/* ❌ BAD: Messy structure */
div{color:red;font-size:16px;background:blue;}
p{margin:10px;padding:5px;}

/* ✅ GOOD: Clean, organized */
/* Base styles */
div {
  color: red;
  font-size: 16px;
  background: blue;
}

p {
  margin: 10px;
  padding: 5px;
}

/* Component styles */
.card {
  /* Layout */
  display: flex;
  padding: 20px;
  margin-bottom: 20px;
  
  /* Visual */
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  
  /* Typography */
  font-size: 16px;
  color: #1f2937;
}
```

**Organize CSS properties in order:**
1. Positioning (position, top, left, z-index)
2. Box model (display, width, height, margin, padding)
3. Visual (background, border, box-shadow)
4. Typography (font-size, color, line-height)
5. Misc (cursor, transition, animation)

### Performance Tips

#### 1. Use Efficient Selectors

```css
/* ❌ SLOW: Universal selector */
* {
  margin: 0;
}

/* ✅ BETTER: Reset only what you need */
body, h1, h2, p, ul {
  margin: 0;
}

/* ❌ SLOW: Overly specific */
div.container > ul > li > a {
  color: blue;
}

/* ✅ FAST: Use classes */
.nav-link {
  color: blue;
}
```

#### 2. Minimize Repaints and Reflows

```css
/* ❌ BAD: Triggers reflow */
.element:hover {
  width: 200px; /* Changes layout */
}

/* ✅ GOOD: Use transform (GPU accelerated) */
.element:hover {
  transform: scale(1.1); /* Doesn't affect layout */
}
```

#### 3. Use `will-change` for Animations

```css
.animated-element {
  will-change: transform, opacity;
  /* Tells browser to optimize this element */
}

/* Remove after animation */
.animated-element.done {
  will-change: auto;
}
```

#### 4. Optimize Images

```css
/* Use object-fit instead of background images when possible */
img {
  width: 100%;
  height: 300px;
  object-fit: cover; /* Better performance than background-size */
}
```

### When to Use Flexbox vs Grid

**Use Flexbox when:**
- One-dimensional layouts (row OR column)
- Navigation bars
- Aligning items within a container
- Unknown number of items
- Content-based sizing

**Use Grid when:**
- Two-dimensional layouts (rows AND columns)
- Complex page layouts
- Fixed layout structure
- Need overlapping elements
- Magazine-style layouts

```css
/* Flexbox: Navigation bar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Grid: Page layout */
.page-layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar content"
    "footer footer";
}
```

### Mobile-First Benefits

```css
/* ❌ Desktop-first: More overrides needed */
.element {
  font-size: 24px;
  padding: 40px;
}

@media (max-width: 768px) {
  .element {
    font-size: 16px;
    padding: 20px;
  }
}

/* ✅ Mobile-first: Progressive enhancement */
.element {
  font-size: 16px;
  padding: 20px;
}

@media (min-width: 768px) {
  .element {
    font-size: 24px;
    padding: 40px;
  }
}
```

**Benefits:**
- Better mobile performance (less CSS to override)
- Forces you to prioritize content
- Easier to enhance than strip down

### Common Mistakes to Avoid

#### 1. Not Using `box-sizing: border-box`

```css
/* ❌ BAD: Confusing width calculations */
.box {
  width: 300px;
  padding: 20px;
  border: 5px solid black;
  /* Actual width = 300 + 40 + 10 = 350px */
}

/* ✅ GOOD: Predictable sizing */
* {
  box-sizing: border-box;
}

.box {
  width: 300px;
  padding: 20px;
  border: 5px solid black;
  /* Actual width = 300px */
}
```

#### 2. Overusing `!important`

```css
/* ❌ BAD: Creates specificity wars */
.button {
  background: blue !important;
}

/* ✅ GOOD: Use proper specificity */
.button.button-primary {
  background: blue;
}
```

#### 3. Not Considering Accessibility

```css
/* ❌ BAD: Removes focus outline */
button:focus {
  outline: none; /* Keyboard users can't see focus */
}

/* ✅ GOOD: Custom focus style */
button:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* OR use :focus-visible (modern) */
button:focus-visible {
  outline: 2px solid #3b82f6;
}
```

#### 4. Fixed Pixel Values Everywhere

```css
/* ❌ BAD: Not responsive */
.container {
  width: 1200px;
  font-size: 16px;
}

/* ✅ GOOD: Flexible values */
.container {
  max-width: 1200px;
  width: 90%;
  font-size: clamp(14px, 2vw, 18px);
}
```

#### 5. Not Organizing CSS

```css
/* ❌ BAD: Random order */
.element {
  color: blue;
  position: absolute;
  margin: 10px;
  font-size: 16px;
  display: flex;
}

/* ✅ GOOD: Logical grouping */
.element {
  /* Positioning */
  position: absolute;
  
  /* Layout */
  display: flex;
  margin: 10px;
  
  /* Typography */
  font-size: 16px;
  color: blue;
}
```

---

## Summary

This CSS course covered:

✅ **Fundamentals:** Selectors, specificity, cascade, inheritance
✅ **Box Model:** Content, padding, border, margin, box-sizing
✅ **Positioning:** Static, relative, absolute, fixed, sticky, z-index
✅ **Layout Systems:** Flexbox and Grid with real examples
✅ **Responsiveness:** Mobile-first, media queries, fluid typography
✅ **Animations:** Transitions, transforms, keyframes
✅ **Pseudo Classes & Elements:** :hover, ::before, ::after
✅ **Advanced:** CSS variables, calc(), clamp(), aspect-ratio
✅ **Real Components:** Hero sections, cards, modals, sidebars
✅ **Best Practices:** BEM naming, performance, accessibility

### Next Steps

1. **Practice:** Build real projects using these concepts
2. **Experiment:** Try different layouts and animations
3. **Learn a framework:** Tailwind CSS, Bootstrap, or CSS-in-JS
4. **Study real websites:** Inspect CSS on sites you admire
5. **Stay updated:** Follow CSS blogs and try new features

### Resources

- MDN Web Docs: https://developer.mozilla.org/en-US/docs/Web/CSS
- CSS-Tricks: https://css-tricks.com
- Can I Use: https://caniuse.com
- Flexbox Froggy: https://flexboxfroggy.com
- Grid Garden: https://cssgridgarden.com

**Remember:** CSS mastery comes with practice. Build projects, make mistakes, and keep learning!
