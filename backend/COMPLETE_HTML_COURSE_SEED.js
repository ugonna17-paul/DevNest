// Complete HTML Course - 30 Lessons
// Properly formatted for MongoDB seeding

const htmlCourseData = {
  course: {
    title: 'HTML',
    level: 'Beginner to Intermediate',
    description: 'Complete foundational HTML course for modern web development',
    slug: 'html',
    duration: '15 hours',
    prerequisites: [],
    icon: '📄',
    isPublished: true,
    order: 1
  },
  modules: [
    {
      title: 'HTML Fundamentals',
      description: 'Core concepts and the building blocks of HTML documents',
      order: 1,
      lessons: [
        {
          title: 'What is HTML',
          order: 1,
          duration: '15',
          content: `# What is HTML

HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure using elements (tags).

## Core Concepts
- **Markup**: Uses tags to annotate content
- **Structure**: Defines organization of content
- **Semantic**: Modern HTML5 gives meaning to content 
- **Universal**: Works across all browsers

## Why Learn HTML?
1. Foundation of all web development
2. Required for every website
3. Simple and intuitive to learn
4. Opens doors to CSS and JavaScript

## How Browsers Process HTML
1. Browser requests HTML file from server
2. Parses HTML into DOM (Document Object Model)
3. Renders content on screen
4. Applies CSS styling
5. Executes JavaScript for interactivity`,
          codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My First Page</title>
</head>
<body>
    <h1>Hello World</h1>
    <p>This is my first HTML page!</p>
</body>
</html>`
        },
        {
          title: 'HTML Document Structure',
          order: 2,
          duration: '20',
          content: `# HTML Document Structure

Every HTML5 document follows a standard structure with required elements.

## Essential Components

**DOCTYPE Declaration**
- First line of every HTML document
- Tells browser to use HTML5
- Format: <!DOCTYPE html>

**HTML Element**
- Root container for entire document
- Include lang attribute for language
- Example: <html lang="en">

**Head Section**
- Contains metadata about the page
- Not visible to users
- Includes title, charset, viewport, links

**Body Section**
- Contains all visible content
- Everything users see goes here

## Required Meta Tags
1. charset="UTF-8" for character encoding
2. viewport for responsive design
3. title for browser tab text`,
          codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Page description">
    <title>Complete Structure Example</title>
</head>
<body>
    <h1>Page Content</h1>
    <p>All visible elements go in the body.</p>
</body>
</html>`
        },
        {
          title: 'Headings and Paragraphs',
          order: 3,
          duration: '25',
          content: `# Headings and Paragraphs

Headings and paragraphs are the foundation of text content on web pages.

## Heading Hierarchy
- Six levels: h1 through h6
- h1 is most important (main title)
- h6 is least important
- Only one h1 per page (best practice)
- Use headings in order (don't skip levels)

## Paragraphs
- p tag wraps blocks of text
- Browsers add spacing automatically
- Line breaks inside paragraphs are ignored
- Each paragraph should contain one main idea

## Best Practices
- Headings create document outline
- Screen readers use headings for navigation
- Search engines prioritize heading content
- Maintain logical hierarchy`,
          codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Headings Demo</title>
</head>
<body>
    <h1>Main Page Title</h1>
    <p>Introduction paragraph with some content.</p>

    <h2>Major Section</h2>
    <p>Section content goes here.</p>

    <h3>Subsection</h3>
    <p>More detailed information.</p>

    <h2>Another Major Section</h2>
    <p>Content for second section.</p>
</body>
</html>`
        },
        {
          title: 'Lists in HTML',
          order: 4,
          duration: '25',
          content: `# Lists in HTML

Lists organize related items into structured groups.

## Unordered Lists
- Use ul tag
- Each item in li tag
- Display as bullet points
- Good for non-sequential items

## Ordered Lists
- Use ol tag
- Each item in li tag
- Numbered automatically
- Good for steps or rankings

## Description Lists
- Use dl tag
- dt for term
- dd for definition
- Good for glossaries

##Lists can be nested for sub-items`,
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
    <li>Build Projects</li>
</ol>

<!-- Nested List -->
<ul>
    <li>Frontend
        <ul>
            <li>HTML</li>
            <li>CSS</li>
        </ul>
    </li>
    <li>Backend
        <ul>
            <li>Node.js</li>
            <li>Express</li>
        </ul>
    </li>
</ul>`
        },
        {
          title: 'Links and Navigation',
          order: 5,
          duration: '30',
          content: `# Links and Navigation

Links connect pages together and are fundamental to the web.

## Anchor Tag Basics
- Use a tag for links
- href attribute specifies destination
- Link text should be descriptive
- Avoid "click here" as link text

## Link Types
- **External**: Full URL to another website
- **Internal**: Relative path to same site
- **Anchor**: Link to section on same page
- **Email**: mailto: protocol for email links

## Target Attribute
- target="_blank" opens in new tab
- Use rel="noopener noreferrer" for security

## Accessibility
- Links should have meaningful text
- Use descriptive phrases
- Indicate when opening new tab`,
          codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Links Example</title>
</head>
<body>
    <nav>
        <a href="index.html">Home</a>
        <a href="about.html">About</a>
        <a href="contact.html">Contact</a>
    </nav>

    <p>Visit <a href="https://developer.mozilla.org" target="_blank" rel="noopener">MDN Web Docs</a></p>

    <p>Email us at <a href="mailto:hello@example.com">hello@example.com</a></p>

    <p>Jump to <a href="#section2">Section 2</a></p>

    <h2 id="section2">Section 2</h2>
</body>
</html>`
        },
        {
          title: 'Images in HTML',
          order: 6,
          duration: '30',
          content: `# Images in HTML

Images add visual content to web pages.

## Image Tag
- img tag is self-closing
- src attribute specifies image source
- alt attribute describes image (required)
- width and height attributes control size

## Alt Text Importance
- Displays if image fails to load
- Used by screen readers for accessibility
- Helps search engines understand content
- Should be descriptive and meaningful

##Image Formats
- JPEG: Photos, complex images
- PNG: Graphics with transparency
- SVG: Scalable vector graphics
- WebP: Modern format with better compression

## Best Practices
- Always include alt text
- Specify dimensions to prevent layout shift
- Optimize images for web
- Use responsive images when needed`,
          codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Images Example</title>
</head>
<body>
    <h1>Image Examples</h1>

    <!-- Local image -->
    <img src="images/logo.png" 
         alt="Company logo" 
         width="200" 
         height="100">

    <!-- External image -->
    <img src="https://example.com/photo.jpg" 
         alt="Beautiful sunset over mountains"
         width="400"
         height="300">

    <!-- Image with link -->
    <a href="gallery.html">
        <img src="thumbnail.jpg" 
             alt="View full gallery">
    </a>
</body>
</html>`
        }
      ]
    },
    {
      title: 'Structure & Semantic HTML',
      description: 'Use semantic elements to describe page meaning and layout',
      order: 2,
      lessons: [
        {
          title: 'Div vs Span',
          order: 1,
          duration: '25',
          content: `# Div vs Span

Div and span are generic containers used when no semantic element fits.

## Div Element
- Block-level container
- Takes full width available
- Creates new line before and after
- Use for grouping sections

## Span Element
- Inline container
- Only takes necessary width
- Stays on same line
- Use for styling part of text

## When to Use
- Use semantic elements first (header, nav, etc)
- Use div/span when no semantic option exists
- Div for layout sections
- Span for inline text styling

## Best Practices
- Add class names for styling
- Keep structure meaningful
- Don't overuse generic containers`,
          codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Div vs Span</title>
</head>
<body>
    <div class="container">
        <h1>Welcome</h1>
        <p>This is a <span class="highlight">highlighted</span> word.</p>
    </div>

    <div class="section">
        <h2>Section Title</h2>
        <p>Content here.</p>
    </div>

    <p>Use <span class="code">code</span> for inline code.</p>
</body>
</html>`
        },
        {
          title: 'Semantic Elements Overview',
          order: 2,
          duration: '35',
          content: `# Semantic Elements Overview

Semantic HTML elements clearly describe their meaning to both browser and developer.

## Main Semantic Elements

**header** - Introductory content or navigation
**nav** - Navigation links
**main** - Primary content (one per page)
**section** - Thematic grouping of content
**article** - Self-contained content
**aside** - Sidebar or related content
**footer** - Closing content or metadata

## Benefits
- Improved accessibility
- Better SEO
- Clearer code structure
- Easier maintenance

## When to Use
- header: Site/article header
- nav: Main navigation menus
- main: Primary page content
- article: Blog posts, news articles
- section: Chapters, tabs
- aside: Sidebars, related links
- footer: Copyright, contact info`,
          codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Semantic Layout</title>
</head>
<body>
    <header>
        <h1>My Website</h1>
        <nav>
            <a href="/">Home</a>
            <a href="/about">About</a>
        </nav>
    </header>

    <main>
        <section>
            <h2>Latest News</h2>
            <article>
                <h3>Article Title</h3>
                <p>Article content...</p>
            </article>
        </section>

        <aside>
            <h3>Related Links</h3>
            <ul>
                <li><a href="#">Link 1</a></li>
            </ul>
        </aside>
    </main>

    <footer>
        <p>&copy; 2026 My Website</p>
    </footer>
</body>
</html>`
        },
        {
          title: 'Header, Nav, Main, Section, Article, Footer',
          order: 3,
          duration: '30',
          content: `# Page Structure Elements

These semantic elements work together to create clear page structure.

## header
- Introductory content
- Can contain logo, title, navigation
- Multiple headers allowed per page
- Use for article headers too

## nav
- Major navigation blocks
- Not for all link groups
- Usually in header
- Can have multiple nav elements

## main
- Primary content of page
- Only ONE main per page
- Directly inside body
- Don't put in header/footer

## section
- Thematic grouping
- Should have heading
- Use for chapters, tabs

## article
- Self-contained content
- Could stand alone
- Blog posts, comments

## footer
- Closing content
- Copyright, links, contact
- Can be for page or section`,
          codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Complete Layout</title>
</head>
<body>
    <header>
        <h1>DevNest Blog</h1>
        <nav>
            <a href="/">Home</a>
            <a href="/articles">Articles</a>
            <a href="/about">About</a>
        </nav>
    </header>

    <main>
        <section>
            <h2>Latest Articles</h2>
            
            <article>
                <header>
                    <h3>HTML Basics</h3>
                    <p>Published: Feb 13, 2026</p>
                </header>
                <p>Article content here...</p>
                <footer>
                    <p>Tags: HTML, Tutorial</p>
                </footer>
            </article>

            <article>
                <h3>CSS Styling</h3>
                <p>More content...</p>
            </article>
        </section>
    </main>

    <footer>
        <p>&copy; 2026 DevNest</p>
        <p>Contact: hello@devnest.io</p>
    </footer>
</body>
</html>`
        },
        {
          title: 'HTML Tables',
          order: 4,
          duration: '30',
          content: `# HTML Tables

Tables display data in rows and columns.

## Table Structure
- table: Wrapper element
- tr: Table row
- th: Header cell
- td: Data cell
- thead: Header section
- tbody: Body section
- tfoot: Footer section

## Best Practices
- Use tables for tabular data only
- Not for page layout
- Include proper headers
- Add caption for context

## Attributes
- border: Table border (use CSS instead)
- colspan: Span multiple columns
- rowspan: Span multiple rows

## Accessibility
- Use th for headers
- Add scope attribute
- Include caption`,
          codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Tables Example</title>
    <style>
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #ddd; padding: 8px; }
        th { background-color: #f2f2f2; }
    </style>
</head>
<body>
    <table>
        <caption>Student Grades</caption>
        <thead>
            <tr>
                <th>Name</th>
                <th>HTML</th>
                <th>CSS</th>
                <th>JavaScript</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>John Doe</td>
                <td>95</td>
                <td>88</td>
                <td>92</td>
            </tr>
            <tr>
                <td>Jane Smith</td>
                <td>90</td>
                <td>94</td>
                <td>89</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td>Average</td>
                <td>92.5</td>
                <td>91</td>
                <td>90.5</td>
            </tr>
        </tfoot>
    </table>
</body>
</html>`
        },
        {
          title: 'Layout Best Practices',
          order: 5,
          duration: '25',
          content: `# Layout Best Practices

Modern HTML layout focuses on semantic structure before styling.

## Principles
1. Use semantic elements first
2. Meaningful class names
3. Consistent heading hierarchy
4. Logical document flow
5. Mobile-first thinking

## Common Patterns
- Header with nav
- Main content area
- Sidebar (aside)
- Footer with info

## Structure Guidelines
- One h1 per page
- Headings in order (h1, h2, h3)
- Related content in sections
- Independent content in articles

## Avoid
- Tables for layout
- Too many nested divs
-  Missing semantic elements
- Skipping heading levels`,
          codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Best Practice Layout</title>
</head>
<body>
    <header class="site-header">
        <div class="brand">
            <h1>Site Name</h1>
        </div>
        <nav class="main-nav">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/about">About</a></li>
            </ul>
        </nav>
    </header>

    <main class="content">
        <section class="hero">
            <h2>Welcome</h2>
            <p>Introduction text</p>
        </section>

        <section class="features">
            <h2>Features</h2>
            <article class="feature">
                <h3>Feature 1</h3>
                <p>Description</p>
            </article>
        </section>
    </main>

    <aside class="sidebar">
        <h2>Related Content</h2>
        <ul>
            <li><a href="#">Link 1</a></li>
        </ul>
    </aside>

    <footer class="site-footer">
        <p>&copy; 2026</p>
    </footer>
</body>
</html>`
        },
        {
          title: 'Div-Based vs Semantic Layouts',
          order: 6,
          duration: '20',
          content: `# Div-Based vs Semantic Layouts

Compare generic div layouts with semantic HTML.

## Div-Based Layout Problems
- No inherent meaning
- Harder to maintain
- Poor accessibility
- Difficult for screen readers
- Less SEO benefit

## Semantic Layout Benefits
- Clear meaning and purpose
- Better accessibility
- Improved SEO
- Easier to style
- Better team collaboration

## Migration Strategy
1. Identify page sections
2. Choose appropriate semantic elements
3. Replace divs with semantic tags
4. Maintain class names for styling
5. Test accessibility

## When Divs Are OK
-  Styling hooks only
- Complex grid layouts
- When no semantic element fits`,
          codeExample: `<!-- OLD: Div-based layout -->
<div class="header">
    <div class="nav">Links</div>
</div>
<div class="main-content">
    <div class="article">Content</div>
</div>
<div class="footer">Footer</div>

<!-- NEW: Semantic layout -->
<header>
    <nav>Links</nav>
</header>
<main>
    <article>Content</article>
</main>
<footer>Footer</footer>

<!-- Semantic with styling divs -->
<header>
    <div class="container">
        <nav>
            <div class="nav-wrapper">
                <a href="/">Home</a>
            </div>
        </nav>
    </div>
</header>`
        }
      ]
    },
    {
      title: 'Forms & User Input',
      description: 'Collect and validate user input with HTML forms',
      order: 3,
      lessons: [
        {
          title: 'Form Tag and Submission',
          order: 1,
          duration: '30',
          content: `# Form Tag and Submission

Forms collect user input and send it to servers.

## Form Element
- form tag wraps all inputs
- action: Where to send data
- method: GET or POST
- name: Form identifier

## GET vs POST
GET
- Data in URL
- Visible in browser
- Bookmarkable
- For searches

POST
- Data in request body
- Not visible in URL
- For sensitive data
- For large data

## Form Submission
- button with type="submit"
- Enter key in text input
- JavaScript can prevent/control

## Attributes
- action="/submit": Submission URL
- method="post": HTTP method
- name="login": Form name`,
          codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Forms Example</title>
</head>
<body>
    <h1>Contact Form</h1>
    
    <!-- Search form with GET -->
    <form action="/search" method="get">
        <label for="query">Search:</label>
        <input type="text" id="query" name="q">
        <button type="submit">Search</button>
    </form>

    <!-- Login form with POST -->
    <form action="/login" method="post">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>

        <button type="submit">Log In</button>
    </form>
</body>
</html>`
        },
        {
          title: 'Input Types: Text, Email, Password',
          order: 2,
          duration: '25',
          content: `# Input Types: Text, Email, Password

Different input types provide appropriate keyboards and validation.

## Text Input
- Basic text entry
- type="text"
- General purpose
- No automatic validation

## Email Input
- type="email"
- Validates email format
- Shows @ keyboard on mobile
- Prevents invalid emails

## Password Input
- type="password"
- Hides entered text
- Shows dots or asterisks
- Still sent as plain text (use HTTPS)

## Common Attributes
- id: Unique identifier
- name: Submitted with form
- required: Must be filled
- placeholder: Hint text
- value: Default value`,
          codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Input Types</title>
</head>
<body>
    <form action="/register" method="post">
        <label for="username">Username:</label>
        <input type="text" 
               id="username" 
               name="username" 
               placeholder="Enter username"
               required>

        <label for="email">Email:</label>
        <input type="email" 
               id="email" 
               name="email" 
               placeholder="you@example.com"
               required>

        <label for="password">Password:</label>
        <input type="password" 
               id="password" 
               name="password" 
               minlength="8"
               required>

        <button type="submit">Register</button>
    </form>
</body>
</html>`
        },
        {
          title: 'Input Types: Number, Date, Color',
          order: 3,
          duration: '25',
          content: `# Input Types: Number, Date, Color

Specialized inputs for specific data types.

## Number Input
- type="number"
- Numeric keyboard on mobile
- min/max attributes
- step attribute for increments

## Date Inputs
- type="date": Calendar picker
- type="datetime-local": Date and time
- type="month": Month picker
- type="week": Week picker
- type="time": Time picker

## Color Input
- type="color"
- Shows color picker
- Returns hex value
- Good for customization

## Range Input
- type="range"
- Slider control
- min/max/step attributes
- Shows value visually`,
          codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Specialized Inputs</title>
</head>
<body>
    <form action="/profile" method="post">
        <label for="age">Age:</label>
        <input type="number" 
               id="age" 
               name="age" 
               min="1" 
               max="120">

        <label for="birthday">Birthday:</label>
        <input type="date" 
               id="birthday" 
               name="birthday">

        <label for="appointment">Appointment:</label>
        <input type="datetime-local" 
               id="appointment" 
               name="appointment">

        <label for="color">Favorite Color:</label>
        <input type="color" 
               id="color" 
               name="color" 
               value="#0000ff">

        <label for="rating">Rating:</label>
        <input type="range" 
               id="rating" 
               name="rating" 
               min="1" 
               max="10" 
               value="5">

        <button type="submit">Save</button>
    </form>
</body>
</html>`
        },
        {
          title: 'Textarea and Select',
          order: 4,
          duration: '30',
          content: `# Textarea and Select

Multi-line text and dropdown selections.

## Textarea
- For longer text input
- rows/cols attributes for size
- No type attribute (not input)
- Closing tag required
- Can resize by default

## Select Dropdown
- select tag for dropdown
- option tags for choices
- value attribute sent to server
- selected attribute for default
- optgroup for grouping options

## Select Multiple
- multiple attribute
- Hold Ctrl/Cmd to select multiple
- Returns array of values

## Best Practices
- Label all inputs
- Provide clear default option
- Use appropriate size`,
          codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Textarea and Select</title>
</head>
<body>
    <form action="/feedback" method="post">
        <label for="topic">Topic:</label>
        <select id="topic" name="topic" required>
            <option value="">-- Select Topic --</option>
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="javascript">JavaScript</option>
        </select>

        <label for="message">Message:</label>
        <textarea id="message" 
                  name="message" 
                  rows="5" 
                  cols="40"
                  placeholder="Enter your message here..."
                  required></textarea>

        <label for="skills">Skills (multiple):</label>
        <select id="skills" 
                name="skills" 
                multiple 
                size="4">
            <option value="html">HTML</option>
            <option value="css">CSS</option>
            <option value="js">JavaScript</option>
            <option value="react">React</option>
        </select>

        <button type="submit">Send</button>
    </form>
</body>
</html>`
        },
        {
          title: 'Radio Buttons and Checkboxes',
          order: 5,
          duration: '25',
          content: `# Radio Buttons and Checkboxes

Options for single or multiple selections.

## Radio Buttons
- Single selection from group
- Same name attribute groups them
- Different value for each
- One can be checked at a time

## Checkboxes
- Multiple selections allowed
- Independent options
- checked attribute for default
- Can select none, one, or all

## Best Practices
- Wrap in label for clickable area
- Use fieldset/legend for groups
- Provide clear option text
- Mark required if needed

## Accessibility
- Label each input
- Group related options
- Indicate required fields`,
          codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Radio and Checkbox</title>
</head>
<body>
    <form action="/subscribe" method="post">
        <fieldset>
            <legend>Choose Plan</legend>
            <label>
                <input type="radio" name="plan" value="free" checked>
                Free Plan
            </label>
            <label>
                <input type="radio" name="plan" value="pro">
                Pro Plan ($9/month)
            </label>
            <label>
                <input type="radio" name="plan" value="enterprise">
                Enterprise Plan
            </label>
        </fieldset>

        <fieldset>
            <legend>Interests</legend>
            <label>
                <input type="checkbox" name="interests" value="html">
                HTML
            </label>
            <label>
                <input type="checkbox" name="interests" value="css">
                CSS
            </label>
            <label>
                <input type="checkbox" name="interests" value="js">
                JavaScript
            </label>
        </fieldset>

        <label>
            <input type="checkbox" name="terms" required>
            I agree to the terms
        </label>

        <button type="submit">Subscribe</button>
    </form>
</body>
</html>`
        },
        {
          title: 'Form Validation: Required and Pattern',
          order: 6,
          duration: '30',
          content: `# Form Validation

HTML5 provides built-in form validation.

## Validation Attributes

**required**
- Field must be filled
- Prevents form submission if empty

**pattern**
- Regular expression validation
- Custom format requirements

**minlength/maxlength**
- Minimum/maximum character count

**min/max**
- For number and date inputs

**type**
- Automatic validation (email, url)

## Validation Messages
- Browser shows default messages
- Can customize with setCustomValidity()

## Validation Behavior
- Validates on submit
- Can validate on blur/input
- Prevents submission if invalid
- Shows first error found`,
          codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Form Validation</title>
</head>
<body>
    <form action="/register" method="post">
        <label for="username">Username (3-12 chars, alphanumeric):</label>
        <input type="text" 
               id="username" 
               name="username" 
               pattern="[a-zA-Z0-9]{3,12}"
               title="3-12 characters, letters and numbers only"
               required>

        <label for="email">Email:</label>
        <input type="email" 
               id="email" 
               name="email" 
               required>

        <label for="password">Password (min 8 chars):</label>
        <input type="password" 
               id="password" 
               name="password" 
               minlength="8"
               required>

        <label for="age">Age (18-100):</label>
        <input type="number" 
               id="age" 
               name="age" 
               min="18" 
               max="100"
               required>

        <label for="website">Website:</label>
        <input type="url" 
               id="website" 
               name="website" 
               placeholder="https://example.com">

        <button type="submit">Register</button>
    </form>
</body>
</html>`
        }
      ]
    },
    {
      title: 'Media, SEO & Accessibility',
      description: 'Embed media and build pages that are discoverable and accessible',
      order: 4,
      lessons: [
        {
          title: 'Video Element',
          order: 1,
          duration: '30',
          content: `# HTML5 Video

Embed video directly in HTML without plugins.

## Video Element
- video tag for video content
- controls shows play/pause buttons
- Multiple sources for compatibility
- Fallback content for old browsers

## Common Attributes
- controls: Show playback controls
- autoplay: Start automatically (muted recommended)
- loop: Repeat video
- muted: Start without sound
- poster: Thumbnail before playing
- preload: How much to buffer

## Video Formats
- MP4 (H.264): Best compatibility
- WebM: Good quality, free codec
- Ogg: Open format

## Best Practices
- Provide multiple formats
- Include subtitles/captions
- Set reasonable dimensions
- Don't autoplay with sound`,
          codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Video Example</title>
</head>
<body>
    <h1>HTML5 Video Demo</h1>

    <video controls 
           width="640" 
           height="360"
           poster="thumbnail.jpg">
        <source src="video.mp4" type="video/mp4">
        <source src="video.webm" type="video/webm">
        <source src="video.ogv" type="video/ogg">
        <track src="subtitles-en.vtt" 
               kind="subtitles" 
               srclang="en" 
               label="English">
        Your browser does not support the video tag.
    </video>

    <video controls 
           loop 
           muted 
           autoplay>
        <source src="background-video.mp4" type="video/mp4">
    </video>
</body>
</html>`
        },
        {
          title: 'Audio in HTML',
          order: 2,
          duration: '25',
          content: `# HTML5 Audio

Embed audio files without plugins.

## Audio Element
- audio tag for audio content
- controls for playback interface
- Multiple sources for compatibility
- Fallback text for old browsers

## Attributes
- controls: Show audio controls
- autoplay: Start automatically
- loop: Repeat audio
- muted: Start muted
- preload: Buffering strategy

## Audio Formats
- MP3: Universal compatibility
- WAV: Uncompressed, large files
- Ogg Vorbis: Open format

## Use Cases
- Podcasts
- Music samples
- Sound effects
- Voice notes`,
          codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Audio Example</title>
</head>
<body>
    <h1>Audio Examples</h1>

    <h2>Podcast Episode</h2>
    <audio controls>
        <source src="podcast-episode.mp3" type="audio/mpeg">
        <source src="podcast-episode.ogg" type="audio/ogg">
        Your browser does not support the audio element.
    </audio>

    <h2>Background Music</h2>
    <audio controls loop>
        <source src="background-music.mp3" type="audio/mpeg">
    </audio>

    <h2>Sound Effect</h2>
    <audio id="soundeffect">
        <source src="click.mp3" type="audio/mpeg">
    </audio>
    <button onclick="document.getElementById('soundeffect').play()">
        Play Sound
    </button>
</body>
</html>`
        },
        {
          title: 'Iframes and Embedded Content',
          order: 3,
          duration: '25',
          content: `# Iframes and Embedded Content

Embed external content in your pages.

## Iframe Element
- Embeds another HTML page
- Common for widgets, maps, videos
- Has own browsing context
- Security considerations important

## Attributes
- src: URL to embed
- width/height: Size
- title: Accessibility description
- frameborder: Border (deprecated, use CSS)
- sandbox: Security restrictions

## Common Uses
- Embed YouTube videos
- Google Maps
- Social media widgets
- Payment forms

## Security
- Use sandbox attribute
- Set CSP headers
- Only embed trusted sources
- Be careful with user data`,
          codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Iframes Example</title>
    <style>
        iframe { border: 1px solid #ccc; }
    </style>
</head>
<body>
    <h1>Embedded Content</h1>

    <h2>YouTube Video</h2>
    <iframe width="560" 
            height="315" 
            src="https://www.youtube.com/embed/VIDEO_ID"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen>
    </iframe>

    <h2>Google Maps</h2>
    <iframe width="600" 
            height="450" 
            src="https://www.google.com/maps/embed?pb=..."
            title="Google Maps"
            loading="lazy">
    </iframe>

    <h2>Embedded Page (Sandboxed)</h2>
    <iframe src="widget.html" 
            width="400" 
            height="300"
            sandbox="allow-scripts allow-same-origin"
            title="Widget">
    </iframe>
</body>
</html>`
        },
        {
          title: 'Meta Tags for SEO',
          order: 4,
          duration: '35',
          content: `# Meta Tags for SEO

Optimize pages for search engines with meta tags.

## Essential SEO Meta Tags

**Title Tag**
- Most important for SEO
- 50-60 characters
- Unique per page
- Descriptive and compelling

**Meta Description**
- 150-160 characters
- Summary for search results
- Includes keywords naturally
- Encourages clicks

**Charset**
- UTF-8 character encoding
- Always include first

**Viewport**
- Mobile responsiveness
- Required for mobile SEO

## Additional SEO Tags
- Meta robots: Indexing instructions
- Canonical: Preferred URL version
- Meta keywords: Obsolete, ignore

## Best Practices
- Unique title/description per page
- Include primary keyword
- Write for humans, not robots
- Keep under character limits`,
          codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Required meta tags -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- SEO meta tags -->
    <title>Learn HTML - Complete Beginner Guide | DevNest</title>
    <meta name="description" content="Master HTML from scratch with our comprehensive beginner-friendly tutorial. Learn semantic HTML5, forms, accessibility, and modern web development practices.">

    <!-- Robots meta -->
    <meta name="robots" content="index, follow">
    
    <!-- Author -->
    <meta name="author" content="DevNest">

    <!-- Canonical URL -->
    <link rel="canonical" href="https://devnest.io/courses/html">

    <!-- Language -->
    <meta http-equiv="content-language" content="en-US">
</head>
<body>
    <h1>Learn HTML Programming</h1>
    <p>Your journey to web development starts here.</p>
</body>
</html>`
        },
        {
          title: 'SEO Basics for HTML',
          order: 5,
          duration: '30',
          content: `# SEO Basics for HTML

Structure HTML for better search engine visibility.

## SEO-Friendly HTML

**Heading Hierarchy**
- One h1 per page with main keyword
- Logical h2-h6 structure
- Don't skip levels
- Use keywords naturally

**Semantic HTML**
- Use proper elements (header, nav, article)
- Describes content meaning
- Helps search engines understand
- Improves accessibility

**Image SEO**
- Always include alt text
- Use descriptive filenames
- Optimize file size
- Include keywords naturally

**Link Best Practices**
- Descriptive anchor text
- Avoid "click here"
- Internal linking structure
- Fix broken links

## Content Structure
- Write quality content first
- Use keywords naturally
- Short paragraphs
- Lists and subheadings
- Mobile-friendly

## Technical SEO
- Fast page speed
- Valid HTML
- Mobile responsive
- HTTPS secure`,
          codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Tutorial for Beginners - Learn Web Development</title>
    <meta name="description" content="Step-by-step HTML tutorial for beginners. Learn tags, attributes, elements, and build your first website.">
</head>
<body>
    <!-- SEO-optimized structure -->
    <header>
        <h1>HTML Tutorial for Beginners</h1>
        <nav aria-label="Main navigation">
            <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/tutorials">Tutorials</a></li>
                <li><a href="/about">About</a></li>
            </ul>
        </nav>
    </header>

    <main>
        <article>
            <h2>What is HTML?</h2>
            <img src="html-diagram.jpg" 
                 alt="HTML structure diagram showing head and body elements"
                 width="600"
                 height="400">
            <p>HTML (HyperText Markup Language) is the standard markup language for creating web pages...</p>

            <h2>Getting Started with HTML</h2>
            <p>Learn how to <a href="/html/setup">set up your development environment</a> for HTML coding.</p>

            <h3>Essential HTML Tags</h3>
            <ul>
                <li>Headings</li>
                <li>Paragraphs</li>
                <li>Links</li>
            </ul>
        </article>
    </main>

    <footer>
        <p>&copy; 2026 DevNest</p>
    </footer>
</body>
</html>`
        },
        {
          title: 'Accessibility Basics: ARIA and Alt Text',
          order: 6,
          duration: '35',
          content: `# Accessibility Basics

Make websites usable for everyone, including people with disabilities.

## Why Accessibility Matters
- Legal requirement (ADA, Section 508)
- Larger audience reach
- Better SEO
- Improved usability for all

## ARIA Basics
ARIA (Accessible Rich Internet Applications) adds semantic info for screen readers.

**ARIA Roles**
- role="navigation"
- role="main"
- role="banner"
- role="contentinfo"

**ARIA Labels**
- aria-label: Direct label
- aria-labelledby: Reference ID
- aria-describedby: Additional description

**ARIA States**
- aria-hidden: Hide from screen readers
- aria-expanded: Collapsed/expanded
- aria-current: Current page/step

## Alt Text Best Practices
- Describe image content
- Be concise but descriptive
- Don't start with "image of"
- Empty alt for decorative images

## Keyboard Navigation
- All functionality via keyboard
- Visible focus indicators
- Logical tab order
- Skip links for navigation`,
          codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Accessible Website Example</title>
</head>
<body>
    <!-- Skip link for keyboard users -->
    <a href="#main-content" class="skip-link">Skip to main content</a>

    <header role="banner">
        <img src="logo.png" 
             alt="DevNest - Learn Web Development">
        
        <nav role="navigation" aria-label="Main navigation">
            <ul>
                <li><a href="/" aria-current="page">Home</a></li>
                <li><a href="/courses">Courses</a></li>
                <li><a href="/about">About</a></li>
            </ul>
        </nav>
    </header>

    <main id="main-content" role="main">
        <article>
            <h1>HTML Accessibility Guide</h1>
            
            <button aria-label="Close dialog" 
                    aria-expanded="false">
                <span aria-hidden="true">×</span>
            </button>

            <img src="code-example.jpg" 
                 alt="Code snippet showing semantic HTML structure with header, main, and footer elements">

            <img src="decorative-pattern.png" 
                 alt="" 
                 role="presentation">

            <div role="alert" aria-live="polite">
                Form submitted successfully!
            </div>
        </article>
    </main>

    <footer role="contentinfo">
        <p>&copy; 2026 DevNest</p>
    </footer>
</body>
</html>`
        }
      ]
    },
    {
      title: 'Real-World Projects',
      description: 'Apply HTML skills to complete, realistic projects',
      order: 5,
      lessons: [
        {
          title: 'Project: Personal Portfolio Page',
          order: 1,
          duration: '60',
          content: `# Project: Personal Portfolio Page

Build a professional portfolio showcasing your skills and projects.

## Project Requirements
- Hero section with name and title
- About section with bio
- Skills list
- Projects showcase
- Contact information
- Semantic HTML structure

## Sections to Include
1. Header with navigation
2. Hero/introduction
3. About me
4. Skills and technologies
5. Projects/work samples
6. Contact links
7. Footer

## Best Practices
- Use semantic HTML5 elements
- Clear heading hierarchy
- Accessible navigation
- Responsive structure
- Valid HTML

## What You'll Learn
- Page layout planning
- Semantic structure
- Content organization
- Real-world HTML usage`,
          codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Jane Doe - Web Developer Portfolio</title>
    <meta name="description" content="Portfolio of Jane Doe, a frontend web developer specializing in HTML, CSS, and JavaScript.">
</head>
<body>
    <header>
        <nav>
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
        </nav>
    </header>

    <main>
        <section id="hero">
            <h1>Jane Doe</h1>
            <p>Frontend Web Developer</p>
        </section>

        <section id="about">
            <h2>About Me</h2>
            <p>I'm a passionate web developer with expertise in creating beautiful, user-friendly websites.</p>
        </section>

        <section id="skills">
            <h2>Skills</h2>
            <ul>
                <li>HTML5</li>
                <li>CSS3</li>
                <li>JavaScript</li>
                <li>Responsive Design</li>
                <li>Accessibility</li>
            </ul>
        </section>

        <section id="projects">
            <h2>Projects</h2>
            <article>
                <h3>Project 1: E-commerce Site</h3>
                <p>Built with semantic HTML and modern CSS.</p>
            </article>
            <article>
                <h3>Project 2: Blog Platform</h3>
                <p>Accessible, SEO-optimized blog layout.</p>
            </article>
        </section>

        <section id="contact">
            <h2>Contact</h2>
            <p>Email: <a href="mailto:jane@example.com">jane@example.com</a></p>
            <p>GitHub: <a href="https://github.com/janedoe">github.com/janedoe</a></p>
        </section>
    </main>

    <footer>
        <p>&copy; 2026 Jane Doe</p>
    </footer>
</body>
</html>`
        },
        {
          title: 'Project: Blog Layout',
          order: 2,
          duration: '60',
          content: `# Project: Blog Layout

Create a complete blog page with articles, sidebar, and navigation.

## Project Components
- Blog header with site title
- Navigation menu
- Main content area with articles
- Sidebar with categories/widgets
- Individual article structure
- Comments section
- Footer with links

## Article Structure
- Article title (h2)
- Publication date/author
- Article content with headings
- Tags or categories
- Read more link

## Sidebar Elements
- Recent posts
- Categories list
- Tags cloud
- About widget

## Semantic HTML
- Use article for blog posts
- aside for sidebar
- time element for dates
- nav for navigation`,
          codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TechBlog - Latest Web Development Articles</title>
    <meta name="description" content="Read the latest articles about web development, HTML, CSS, and JavaScript.">
</head>
<body>
    <header>
        <h1>TechBlog</h1>
        <nav>
            <a href="/">Home</a>
            <a href="/articles">Articles</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
        </nav>
    </header>

    <main>
        <section>
            <h2>Latest Articles</h2>

            <article>
                <header>
                    <h3><a href="/articles/html5-semantic-elements">HTML5 Semantic Elements Guide</a></h3>
                    <p>Published <time datetime="2026-02-10">February 10, 2026</time> by Jane Doe</p>
                </header>
                <p>Learn how to use semantic HTML5 elements to improve your website's structure and accessibility...</p>
                <footer>
                    <p>Tags: <a href="/tags/html">HTML</a>, <a href="/tags/semantic">Semantic</a></p>
                    <a href="/articles/html5-semantic-elements">Read more &rarr;</a>
                </footer>
            </article>

            <article>
                <header>
                    <h3><a href="/articles/css-grid-layout">CSS Grid Layout Tutorial</a></h3>
                    <p>Published <time datetime="2026-02-08">February 8, 2026</time> by John Smith</p>
                </header>
                <p>Master CSS Grid with this comprehensive tutorial covering all the essential properties...</p>
                <footer>
                    <p>Tags: <a href="/tags/css">CSS</a>, <a href="/tags/layout">Layout</a></p>
                    <a href="/articles/css-grid-layout">Read more &rarr;</a>
                </footer>
            </article>
        </section>

        <aside>
            <section>
                <h3>Categories</h3>
                <ul>
                    <li><a href="/category/html">HTML (12)</a></li>
                    <li><a href="/category/css">CSS (18)</a></li>
                    <li><a href="/category/javascript">JavaScript (25)</a></li>
                </ul>
            </section>

            <section>
                <h3>Recent Posts</h3>
                <ul>
                    <li><a href="/articles/html5-semantic-elements">HTML5 Semantic Elements</a></li>
                    <li><a href="/articles/css-grid-layout">CSS Grid Layout</a></li>
                </ul>
            </section>
        </aside>
    </main>

    <footer>
        <p>&copy; 2026 TechBlog. All rights reserved.</p>
        <nav>
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms of Service</a>
        </nav>
    </footer>
</body>
</html>`
        },
        {
          title: 'Project: Contact Form Page',
          order: 3,
          duration: '45',
          content: `# Project: Contact Form Page

Build a complete contact page with form validation.

## Form Requirements
- Name field (required)
- Email field (required, validated)
- Phone number (optional)
- Subject/topic selection
- Message textarea (required)
- Submit button

## Page Structure
- Page header
- Contact information
- Contact form
- Alternative contact methods
- Footer

## Form Features
- Proper labels for accessibility
- Required field indicators
- Input validation
- Clear instructions
- Grouped related fields
- Appropriate input types

## Validation
- Required fields
- Email format
- Phone format (if provided)
- Message minimum length

## Best Practices
- Clear error messages
- Accessible form structure
- Mobile-friendly layout
- Privacy notice`,
          codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us - DevNest</title>
    <meta name="description" content="Get in touch with DevNest. Send us a message and we'll respond within 24 hours.">
</head>
<body>
    <header>
        <h1>DevNest</h1>
        <nav>
            <a href="/">Home</a>
            <a href="/courses">Courses</a>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
        </nav>
    </header>

    <main>
        <h2>Contact Us</h2>
        <p>Have a question? We'd love to hear from you. Send us a message and we'll respond within 24 hours.</p>

        <section>
            <h3>Send Us a Message</h3>
            <form action="/submit-contact" method="post">
                <fieldset>
                    <legend>Your Information</legend>

                    <label for="name">Full Name <span aria-label="required">*</span></label>
                    <input type="text" 
                           id="name" 
                           name="name" 
                           required 
                           autocomplete="name">

                    <label for="email">Email <span aria-label="required">*</span></label>
                    <input type="email" 
                           id="email" 
                           name="email" 
                           required 
                           autocomplete="email">

                    <label for="phone">Phone (optional)</label>
                    <input type="tel" 
                           id="phone" 
                           name="phone" 
                           pattern="[0-9]{10}"
                           autocomplete="tel">
                </fieldset>

                <fieldset>
                    <legend>Your Message</legend>

                    <label for="topic">Topic</label>
                    <select id="topic" name="topic" required>
                        <option value="">-- Select a topic --</option>
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="partnership">Partnership</option>
                        <option value="feedback">Feedback</option>
                    </select>

                    <label for="message">Message <span aria-label="required">*</span></label>
                    <textarea id="message" 
                              name="message" 
                              rows="6" 
                              required 
                              minlength="10" 
                              placeholder="Tell us more about your inquiry..."></textarea>
                </fieldset>

                <label>
                    <input type="checkbox" name="newsletter" value="yes">
                    Subscribe to our newsletter
                </label>

                <button type="submit">Send Message</button>
            </form>
        </section>

        <section>
            <h3>Other Ways to Reach Us</h3>
            <p>Email: <a href="mailto:hello@devnest.io">hello@devnest.io</a></p>
            <p>Phone: <a href="tel:+15555551234">+1 (555) 555-1234</a></p>
            <p>Address: 123 Tech Street, San Francisco, CA 94105</p>
        </section>
    </main>

    <footer>
        <p>&copy; 2026 DevNest</p>
    </footer>
</body>
</html>`
        },
        {
          title: 'Project: Landing Page Structure',
          order: 4,
          duration: '60',
          content: `# Project: Landing Page Structure

Build a marketing landing page with clear call-to-action.

## Landing Page Sections
1. Hero section with headline and CTA
2. Feature highlights (3-4 key features)
3. How it works (step-by-step)
4. Social proof (testimonials/stats)
5. Pricing (if applicable)
6. Final CTA
7. Footer with links

## Key Elements
- Compelling headline
- Clear value proposition
- Strong call-to-action buttons
- Feature benefits
- Trust indicators
- Easy navigation
- Mobile-friendly structure

## Conversion Focus
- Single primary goal
- Prominent CTA buttons
- Minimal navigation
- Fast loading
- Clear hierarchy

## Content Strategy
- Benefit-focused copy
- Short paragraphs
- Bullet points
- Visual hierarchy
- Urgency/scarcity`,
          codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DevNest - Learn Web Development Online</title>
    <meta name="description" content="Master HTML, CSS, and JavaScript with DevNest's interactive courses. Start learning web development today with our beginner-friendly platform.">
</head>
<body>
    <header>
        <div>
            <strong>DevNest</strong>
            <nav>
                <a href="#features">Features</a>
                <a href="#pricing">Pricing</a>
                <a href="/login">Log In</a>
            </nav>
        </div>
    </header>

    <main>
        <section id="hero">
            <h1>Master Web Development From Scratch</h1>
            <p>Learn HTML, CSS, and JavaScript with interactive lessons and real-world projects. Build your first website in days, not months.</p>
            <a href="/signup">Start Learning Free</a>
            <p>No credit card required • 30-day money-back guarantee</p>
        </section>

        <section id="features">
            <h2>Why DevNest?</h2>
            
            <article>
                <h3>Interactive Lessons</h3>
                <p>Learn by doing with hands-on coding exercises and instant feedback.</p>
            </article>

            <article>
                <h3>Real Projects</h3>
                <p>Build portfolio-worthy projects that demonstrate your skills to employers.</p>
            </article>

            <article>
                <h3>Expert Support</h3>
                <p>Get help from experienced developers when you're stuck.</p>
            </article>

            <article>
                <h3>Lifetime Access</h3>
                <p>Learn at your own pace with unlimited access to all course materials.</p>
            </article>
        </section>

        <section id="how-it-works">
            <h2>How It Works</h2>
            
            <ol>
                <li>
                    <h3>Choose Your Path</h3>
                    <p>Select from HTML, CSS, JavaScript, or complete web development track.</p>
                </li>
                <li>
                    <h3>Learn by Doing</h3>
                    <p>Complete interactive lessons with instant feedback and hints.</p>
                </li>
                <li>
                    <h3>Build Projects</h3>
                    <p>Apply your skills to real-world projects for your portfolio.</p>
                </li>
            </ol>
        </section>

        <section id="testimonials">
            <h2>Success Stories</h2>
            
            <blockquote>
                <p>"DevNest helped me transition from marketing to web development. I built my portfolio and landed my first dev job in 3 months!"</p>
                <footer>— Sarah Johnson, Frontend Developer</footer>
            </blockquote>

            <blockquote>
                <p>"The projects are amazing. I learned so much by building real websites instead of just following tutorials."</p>
                <footer>— Mike Chen, Full Stack Developer</footer>
            </blockquote>
        </section>

        <section id="pricing">
            <h2>Simple Pricing</h2>
            
            <article>
                <h3>Free</h3>
                <p>$0/month</p>
                <ul>
                    <li>5 free courses</li>
                    <li>Basic projects</li>
                    <li>Community support</li>
                </ul>
                <a href="/signup">Get Started</a>
            </article>

            <article>
                <h3>Pro</h3>
                <p>$29/month</p>
                <ul>
                    <li>All courses</li>
                    <li>Advanced projects</li>
                    <li>Priority support</li>
                    <li>Certificates</li>
                </ul>
                <a href="/signup/pro">Start Free Trial</a>
            </article>
        </section>

        <section id="final-cta">
            <h2>Ready to Start Learning?</h2>
            <p>Join thousands of students building their web development skills</p>
            <a href="/signup">Create Free Account</a>
        </section>
    </main>

    <footer>
        <nav>
            <a href="/about">About</a>
            <a href="/courses">Courses</a>
            <a href="/pricing">Pricing</a>
            <a href="/contact">Contact</a>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
        </nav>
        <p>&copy; 2026 DevNest. All rights reserved.</p>
    </footer>
</body>
</html>`
        },
        {
          title: 'Project: Multi-Page Website',
          order: 5,
          duration: '90',
          content: `# Project: Multi-Page Website

Create a complete multi-page website with consistent navigation and structure.

## Required Pages
1. Home page (index.html)
2. About page
3. Services/Products page
4. Blog or Portfolio page
5. Contact page

## Common Elements
- Shared header/navigation
- Consistent footer
- Similar styling hooks
- Matching structure

## Navigation Structure
- Clear site hierarchy
- Breadcrumbs (optional)
- Active page indicator
- Mobile-friendly menu

## File Organization
- Separate HTML file per page
- images/ folder for images
- Consistent naming convention
- Relative links between pages

## Best Practices
- DRY (Don't Repeat Yourself)
- Consistent heading hierarchy
- Similar page templates
- Clear URL structure
- Proper internal linking`,
          codeExample: `<!-- index.html (Home Page) -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TechCo - Innovative Web Solutions</title>
    <meta name="description" content="TechCo provides cutting-edge web development services.">
</head>
<body>
    <header>
        <strong>TechCo</strong>
        <nav>
            <a href="index.html" aria-current="page">Home</a>
            <a href="about.html">About</a>
            <a href="services.html">Services</a>
            <a href="portfolio.html">Portfolio</a>
            <a href="contact.html">Contact</a>
        </nav>
    </header>

    <main>
        <section id="hero">
            <h1>Welcome to TechCo</h1>
            <p>We build amazing websites</p>
            <a href="services.html">Our Services</a>
        </section>

        <section id="features">
            <h2>What We Offer</h2>
            <article>
                <h3>Web Design</h3>
                <p>Beautiful, modern websites</p>
            </article>
            <article>
                <h3>Development</h3>
                <p>Fast, reliable web applications</p>
            </article>
        </section>
    </main>

    <footer>
        <nav>
            <a href="privacy.html">Privacy</a>
            <a href="terms.html">Terms</a>
        </nav>
        <p>&copy; 2026 TechCo</p>
    </footer>
</body>
</html>

<!-- about.html (About Page) -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>About Us - TechCo</title>
    <meta name="description" content="Learn about TechCo's mission, team, and values.">
</head>
<body>
    <header>
        <strong>TechCo</strong>
        <nav>
            <a href="index.html">Home</a>
            <a href="about.html" aria-current="page">About</a>
            <a href="services.html">Services</a>
            <a href="portfolio.html">Portfolio</a>
            <a href="contact.html">Contact</a>
        </nav>
    </header>

    <main>
        <h1>About TechCo</h1>
        
        <section>
            <h2>Our Mission</h2>
            <p>We help businesses succeed online with beautiful, functional websites.</p>
        </section>

        <section>
            <h2>Our Team</h2>
            <article>
                <h3>Jane Doe - CEO</h3>
                <p>10 years of web development experience</p>
            </article>
            <article>
                <h3>John Smith - Lead Developer</h3>
                <p>Expert in modern web technologies</p>
            </article>
        </section>

        <section>
            <h2>Our Values</h2>
            <ul>
                <li>Quality craftsmanship</li>
                <li>Client satisfaction</li>
                <li>Continuous learning</li>
                <li>Innovation</li>
            </ul>
        </section>
    </main>

    <footer>
        <nav>
            <a href="privacy.html">Privacy</a>
            <a href="terms.html">Terms</a>
        </nav>
        <p>&copy; 2026 TechCo</p>
    </footer>
</body>
</html>

<!-- contact.html (Contact Page) -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Us - TechCo</title>
    <meta name="description" content="Get in touch with TechCo for your web development needs.">
</head>
<body>
    <header>
        <strong>TechCo</strong>
        <nav>
            <a href="index.html">Home</a>
            <a href="about.html">About</a>
            <a href="services.html">Services</a>
            <a href="portfolio.html">Portfolio</a>
            <a href="contact.html" aria-current="page">Contact</a>
        </nav>
    </header>

    <main>
        <h1>Contact Us</h1>
        
        <section>
            <h2>Send Us a Message</h2>
            <form action="/contact" method="post">
                <label for="name">Name</label>
                <input type="text" id="name" name="name" required>

                <label for="email">Email</label>
                <input type="email" id="email" name="email" required>

                <label for="message">Message</label>
                <textarea id="message" name="message" rows="5" required></textarea>

                <button type="submit">Send</button>
            </form>
        </section>

        <section>
            <h2>Other Ways to Reach Us</h2>
            <p>Email: <a href="mailto:hello@techco.com">hello@techco.com</a></p>
            <p>Phone: <a href="tel:+15555551234">+1 (555) 555-1234</a></p>
        </section>
    </main>

    <footer>
        <nav>
            <a href="privacy.html">Privacy</a>
            <a href="terms.html">Terms</a>
        </nav>
        <p>&copy; 2026 TechCo</p>
    </footer>
</body>
</html>`
        },
        {
          title: 'Project: Final Review and Checklist',
          order: 6,
          duration: '45',
          content: `# Project: Final Review and Checklist

Review and validate your HTML projects for quality and best practices.

## Validation Checklist

**Structure**
- [ ] Valid DOCTYPE declaration
- [ ] Proper nesting of elements
- [ ] All tags properly closed
- [ ] Semantic HTML elements used
- [ ] One h1 per page
- [ ] Logical heading hierarchy

**SEO**
- [ ] Unique title per page
- [ ] Meta description on each page
- [ ] Alt text on all images
- [ ] Descriptive link text
- [ ] Proper heading structure

**Accessibility**
- [ ] All images have alt attributes
- [ ] Forms have labels
- [ ] Semantic HTML used
- [ ] ARIA labels where needed
- [ ] Keyboard navigable
- [ ] Color contrast sufficient

**Performance**
- [ ] Images optimized
- [ ] No broken links
- [ ] Minimal inline styles
- [ ] External resources linked properly

**Code Quality**
- [ ] Consistent indentation
- [ ] Descriptive class names
- [ ] Comments for complex sections
- [ ] No deprecated elements
- [ ] Valid HTML (use validator)

## Testing Tools

**HTML Validation**
- W3C Markup Validation Service
- Browser developer tools

**Accessibility**
- WAVE accessibility checker
- axe DevTools
- Screen reader testing

**SEO**
- Google Search Console
- Lighthouse audit
- Meta tag checker

## Final Steps
1. Run HTML through validator
2. Check all links work
3. Test on multiple browsers
4. Test on mobile devices
5. Review with checklist
6. Get feedback from others`,
          codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Validated structure -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Quality checklist for HTML projects. Ensure your code follows best practices.">
    <title>HTML Project Checklist - DevNest</title>
</head>
<body>
    <header>
        <h1>HTML Project Checklist</h1>
        <nav aria-label="Main navigation">
            <a href="/">Home</a>
            <a href="/checklist" aria-current="page">Checklist</a>
            <a href="/tools">Tools</a>
        </nav>
    </header>

    <main>
        <article>
            <h2>Validate Your HTML Project</h2>
            
            <section>
                <h3>Structure Validation</h3>
                <ul>
                    <li>Valid DOCTYPE</li>
                    <li>Proper element nesting</li>
                    <li>Semantic HTML elements</li>
                    <li>Heading hierarchy</li>
                </ul>
            </section>

            <section>
                <h3>Accessibility Check</h3>
                <ul>
                    <li>Alt text on images</li>
                    <li>Form labels</li>
                    <li>ARIA attributes</li>
                    <li>Keyboard navigation</li>
                </ul>
            </section>

            <section>
                <h3>SEO Optimization</h3>
                <ul>
                    <li>Unique page titles</li>
                    <li>Meta descriptions</li>
                    <li>Descriptive headings</li>
                    <li>Internal linking</li>
                </ul>
            </section>

            <section>
                <h3>Testing Tools</h3>
                <ol>
                    <li>Run W3C HTML Validator</li>
                    <li>Check with WAVE tool</li>
                    <li>Audit with Lighthouse</li>
                    <li>Test on real devices</li>
                </ol>
            </section>
        </article>

        <aside>
            <h3>Quick Tips</h3>
            <ul>
                <li>Always validate before deploying</li>
                <li>Test with real users when possible</li>
                <li>Keep learning and improving</li>
            </ul>
        </aside>
    </main>

    <footer>
        <p>&copy; 2026 DevNest - HTML Course Complete</p>
        <p>Congratulations on finishing the course!</p>
    </footer>
</body>
</html>`
        }
      ]
    }
  ]
};

module.exports = htmlCourseData;

