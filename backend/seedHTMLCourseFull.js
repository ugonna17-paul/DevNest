const mongoose = require('mongoose');
const Course = require('./models/Course');
const Module = require('./models/Module');
const Lesson = require('./models/Lesson');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected for HTML course seeding...'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

const seedCompleteHTMLCourse = async () => {
    try {
        console.log('🚀 Starting Complete HTML Course Seed...\n');

        // Delete existing HTML course if it exists
        await Course.deleteOne({ slug: 'html-complete' });
        console.log('✓ Cleared existing HTML course data\n');

        // ==================== CREATE HTML COURSE ====================
        const htmlCourse = await Course.create({
            title: 'Complete HTML Mastery',
            description: 'Master HTML from fundamentals to advanced techniques. Build semantic, accessible, and SEO-optimized web pages with real-world projects.',
            level: 'Beginner',
            slug: 'html-complete',
            duration: '15 hours',
            prerequisites: [],
            icon: '📄',
            totalLessons: 32,
            isPublished: true,
            order: 1
        });

        console.log('✓ Course created: Complete HTML Mastery\n');

        // ==================== MODULE 1: HTML FUNDAMENTALS ====================
        const module1 = await Module.create({
            course: htmlCourse._id,
            title: 'HTML Fundamentals',
            description: 'Learn the essential building blocks of HTML including document structure, text formatting, and basic elements',
            order: 1,
            isPublished: true
        });

        const module1Lessons = await Lesson.create([
            {
                module: module1._id,
                course: htmlCourse._id,
                title: 'What is HTML?',
                content: `# What is HTML?

HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure and content of a webpage using a series of elements.

## Understanding HTML

**HyperText** refers to links that connect web pages to one another. **Markup Language** means HTML uses tags to mark up content and give it meaning.

### Why Learn HTML?

1. **Foundation of the Web** - Every website uses HTML
2. **Easy to Learn** - Simple syntax and forgiving nature
3. **Universal** - Works on all browsers and devices
4. **Essential Skill** - Required for web development
5. **Career Opportunities** - Opens doors to frontend development

## How HTML Works

When you visit a website:
1. Browser requests the HTML file from a server
2. Server sends the HTML code
3. Browser reads and renders the HTML
4. Content appears on your screen

### HTML is Not a Programming Language

HTML is a **markup language**, not a programming language. It describes content structure but doesn't perform logic or calculations.

## What You'll Build

By the end of this course, you'll create:
- Personal portfolio websites
- Blog layouts
- Contact forms
- Landing pages
- Multi-page websites

### Practice Challenge

Create your first HTML file:
1. Open a text editor
2. Type the basic HTML structure
3. Save as \`index.html\`
4. Open in a browser`,
                codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My First Webpage</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>Welcome to HTML!</p>
    <p>This is my first webpage.</p>
</body>
</html>`,
                duration: 15,
                order: 1,
                isPublished: true
            },
            {
                module: module1._id,
                course: htmlCourse._id,
                title: 'HTML Document Structure',
                content: `# HTML Document Structure

Every HTML document follows a specific structure. Understanding this structure is crucial for writing valid HTML.

## The Anatomy of an HTML Document

An HTML document consists of several required elements that work together.

### 1. DOCTYPE Declaration

The \`<!DOCTYPE html>\` declaration tells the browser this is an HTML5 document. It must be the very first line.

### 2. HTML Element

The \`<html>\` tag is the root element that wraps all content. The \`lang\` attribute specifies the language.

### 3. Head Section

The \`<head>\` contains metadata (data about data):
- **Character Set**: Ensures proper character encoding
- **Title**: Appears in browser tab
- **Meta Tags**: SEO, viewport settings
- **Links**: Stylesheets, fonts, icons

### 4. Body Section

The \`<body>\` contains all visible content.

## Essential Meta Tags

\`\`\`html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Page description">
\`\`\`

### Viewport Meta Tag

Essential for responsive design on mobile devices.

## HTML Elements

Elements consist of:
- **Opening tag**: \`<tagname>\`
- **Content**: Text or other elements
- **Closing tag**: \`</tagname>\`

Some elements are **self-closing**: \`<img />\`, \`<br />\`, \`<input />\`

### Practice Challenge

Create a complete HTML document with:
1. Proper DOCTYPE
2. HTML tag with English language
3. Head with charset, viewport, title
4. Body with a heading and paragraph`,
                codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Character encoding -->
    <meta charset="UTF-8">
    
    <!-- Responsive viewport -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- SEO description -->
    <meta name="description" content="Learn HTML document structure">
    
    <!-- Page title -->
    <title>HTML Document Structure</title>
</head>
<body>
    <h1>Understanding HTML Structure</h1>
    <p>This is a properly structured HTML5 document.</p>
</body>
</html>`,
                duration: 20,
                order: 2,
                isPublished: true
            },
            {
                module: module1._id,
                course: htmlCourse._id,
                title: 'Headings and Paragraphs',
                content: `# Headings and Paragraphs

Text content is the heart of most web pages. HTML provides semantic elements to structure and format text.

## Heading Elements

HTML offers six levels of headings, from \`<h1>\` to \`<h6>\`.

### Heading Hierarchy

- **\`<h1>\`** - Main page heading (use only once per page)
- **\`<h2>\`** - Major sections
- **\`<h3>\`** - Subsections
- **\`<h4>\`, \`<h5>\`, \`<h6>\`** - Further subdivisions

### Best Practices for Headings

1. **One H1 per page** - Represents the main topic
2. **Don't skip levels** - Go from h1 → h2 → h3
3. **Use for structure, not styling**
4. **Be descriptive** - Helps SEO and accessibility

## Paragraph Element

The \`<p>\` tag defines a paragraph.

### Text Formatting Elements

- **\`<strong>\`** - Important text (bold)
- **\`<em>\`** - Emphasized text (italic)
- **\`<mark>\`** - Highlighted text
- **\`<small>\`** - Smaller text
- **\`<del>\`** - Deleted text (strikethrough)
- **\`<ins>\`** - Inserted text (underline)
- **\`<sub>\`** - Subscript
- **\`<sup>\`** - Superscript

## Semantic vs Visual

Use semantic tags (\`<strong>\`, \`<em>\`) instead of visual tags (\`<b>\`, \`<i>\`).

### Practice Challenge

Create a blog post with:
1. One h1 for the title
2. Multiple h2 for sections
3. Paragraphs with formatted text`,
                codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Blog Post Example</title>
</head>
<body>
    <!-- Main heading -->
    <h1>The Complete Guide to HTML</h1>
    
    <p>
        HTML is the <strong>foundation</strong> of web development.
        <em>Master it</em> to build amazing websites.
    </p>
    
    <h2>Getting Started</h2>
    <p>
        To begin, you need a text editor and browser.
        It's <mark>completely free</mark> to start!
    </p>
    
    <h3>Tools You'll Need</h3>
    <p>
        Use <strong>VS Code</strong> or <strong>Sublime Text</strong>.
    </p>
    
    <hr>
    
    <h2>Basic Concepts</h2>
    <p>
        HTML uses <em>tags</em> to structure content.<br>
        Tags are enclosed in angle brackets.
    </p>
    
    <p>
        Water formula: H<sub>2</sub>O<br>
        Einstein's equation: E=mc<sup>2</sup>
    </p>
    
    <p><small>Last updated: February 2026</small></p>
</body>
</html>`,
                duration: 25,
                order: 3,
                isPublished: true
            },
            {
                module: module1._id,
                course: htmlCourse._id,
                title: 'Lists in HTML',
                content: `# Lists in HTML

Lists organize information clearly. HTML provides three types of lists.

## Unordered Lists

Use \`<ul>\` for lists where order doesn't matter.

### When to Use

- Shopping lists
- Features
- Navigation menus
- Bullet points

## Ordered Lists

Use \`<ol>\` for sequential lists.

### List Attributes

- **\`type\`** - Numbering style: 1, A, a, I, i
- **\`start\`** - Starting number
- **\`reversed\`** - Reverse numbering

## Description Lists

Use \`<dl>\` for term-definition pairs:
- **\`<dt>\`** - Term
- **\`<dd>\`** - Description

## Nested Lists

Lists can contain other lists.

### Practice Challenge

Create a recipe with:
1. Unordered list for ingredients
2. Ordered list for instructions
3. Nested list for sub-steps`,
                codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Lists Example</title>
</head>
<body>
    <h1>Chocolate Chip Cookies</h1>
    
    <h2>Ingredients</h2>
    <ul>
        <li>2 cups flour</li>
        <li>1 cup butter</li>
        <li>1 cup brown sugar</li>
        <li>2 eggs</li>
        <li>2 cups chocolate chips</li>
    </ul>
    
    <h2>Instructions</h2>
    <ol>
        <li>Preheat oven to 375°F</li>
        <li>Mix butter and sugar</li>
        <li>Beat in eggs</li>
        <li>
            Add flour
            <ol type="a">
                <li>Add half the flour</li>
                <li>Mix well</li>
                <li>Add remaining flour</li>
            </ol>
        </li>
        <li>Stir in chocolate chips</li>
        <li>Bake for 10-12 minutes</li>
    </ol>
    
    <h2>Nutrition Facts</h2>
    <dl>
        <dt>Serving Size</dt>
        <dd>2 cookies</dd>
        
        <dt>Calories</dt>
        <dd>280 per serving</dd>
        
        <dt>Sugar</dt>
        <dd>22g</dd>
    </dl>
</body>
</html>`,
                duration: 25,
                order: 4,
                isPublished: true
            },
            {
                module: module1._id,
                course: htmlCourse._id,
                title: 'Links and Navigation',
                content: `# Links and Navigation

Links connect web pages. The \`<a>\` tag creates hyperlinks.

## Basic Link Syntax

\`\`\`html
<a href="destination">Link Text</a>
\`\`\`

## Types of Links

### External Links
\`\`\`html
<a href="https://www.google.com">Google</a>
\`\`\`

### Internal Links
\`\`\`html
<a href="about.html">About</a>
\`\`\`

### Anchor Links
\`\`\`html
<a href="#section">Jump to Section</a>
\`\`\`

### Email Links
\`\`\`html
<a href="mailto:hello@example.com">Email</a>
\`\`\`

### Phone Links
\`\`\`html
<a href="tel:+1234567890">Call</a>
\`\`\`

## Link Attributes

### target
- \`_self\` - Same window (default)
- \`_blank\` - New tab

### rel
- \`noopener noreferrer\` - Security for \_blank

### download
Forces download

## Best Practices

1. Use descriptive link text
2. Add \`rel="noopener noreferrer"\` with \`target="_blank"\`
3. Make links keyboard-accessible

### Practice Challenge

Create a navigation menu with:
1. Internal links
2. External link (new tab)
3. Anchor link
4. Email and phone link`,
                codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Navigation Example</title>
</head>
<body>
    <nav>
        <h2>Menu</h2>
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="contact.html">Contact</a></li>
        </ul>
    </nav>
    
    <header>
        <h1>Welcome</h1>
        <p>
            <a href="#about-section">Learn more</a> or
            <a href="#contact-section">get in touch</a>
        </p>
    </header>
    
    <main>
        <section id="about-section">
            <h2>About Us</h2>
            <p>
                Visit our
                <a 
                    href="https://github.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                >GitHub</a>
            </p>
        </section>
        
        <section id="contact-section">
            <h2>Contact</h2>
            <ul>
                <li>
                    <a href="mailto:hello@example.com">Email Us</a>
                </li>
                <li>
                    <a href="tel:+1-555-123-4567">Call Us</a>
                </li>
            </ul>
        </section>
    </main>
    
    <footer>
        <a href="#top">Back to Top</a>
    </footer>
</body>
</html>`,
                duration: 30,
                order: 5,
                isPublished: true
            },
            {
                module: module1._id,
                course: htmlCourse._id,
                title: 'Images in HTML',
                content: `# Images in HTML

Images make web pages visually engaging. The \`<img>\` tag embeds images.

## Basic Image Syntax

\`\`\`html
<img src="image.jpg" alt="Description">
\`\`\`

## Required Attributes

### src (Source)
- Relative: \`images/photo.jpg\`
- Absolute: \`/images/photo.jpg\`
- External: \`https://example.com/image.jpg\`

### alt (Alternative Text)
Describes the image for accessibility and SEO.

## Optional Attributes

### Dimensions
\`\`\`html
<img src="photo.jpg" width="300" height="200">
\`\`\`

### loading
- \`lazy\` - Load when near viewport
- \`eager\` - Load immediately

## Image Formats

- **JPEG** - Photos
- **PNG** - Graphics with transparency
- **GIF** - Animations
- **SVG** - Icons and logos
- **WebP** - Modern format

## Figure Element

\`\`\`html
<figure>
    <img src="chart.png" alt="Sales chart">
    <figcaption>2025 Sales</figcaption>
</figure>
\`\`\`

## Responsive Images

### srcset
\`\`\`html
<img 
    src="small.jpg"
    srcset="small.jpg 480w, large.jpg 1200w"
    alt="Responsive image"
>
\`\`\`

## Best Practices

1. Always use alt text
2. Optimize file size
3. Specify dimensions
4. Use lazy loading

### Practice Challenge

Create an image gallery with:
1. Multiple images with alt text
2. Figure with caption
3. Lazy loading
4. Responsive images`,
                codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Image Gallery</title>
</head>
<body>
    <h1>Photo Gallery</h1>
    
    <img 
        src="featured.jpg"
        alt="Sunset over mountains"
        width="800"
        height="600"
        title="Mountain Sunset"
    >
    
    <figure>
        <img 
            src="waterfall.jpg"
            alt="Cascading waterfall"
            width="600"
            height="400"
            loading="lazy"
        >
        <figcaption>Yosemite Falls</figcaption>
    </figure>
    
    <img 
        src="wildlife-small.jpg"
        srcset="wildlife-small.jpg 480w,
                wildlife-large.jpg 1200w"
        sizes="(max-width: 600px) 480px, 1200px"
        alt="Eagle catching fish"
        loading="lazy"
    >
    
    <picture>
        <source 
            media="(min-width: 1024px)"
            srcset="city-wide.jpg"
        >
        <img 
            src="city-mobile.jpg"
            alt="NYC skyline"
            loading="lazy"
        >
    </picture>
    
    <div>
        <img src="gallery-1.jpg" alt="Beach" width="300" height="200" loading="lazy">
        <img src="gallery-2.jpg" alt="Mountain" width="300" height="200" loading="lazy">
        <img src="gallery-3.jpg" alt="Forest" width="300" height="200" loading="lazy">
    </div>
</body>
</html>`,
                duration: 30,
                order: 6,
                isPublished: true
            },
            {
                module: module1._id,
                course: htmlCourse._id,
                title: 'Comments and Best Practices',
                content: `# HTML Comments and Best Practices

Writing clean HTML is essential for maintainability.

## HTML Comments

\`\`\`html
<!-- This is a comment -->
\`\`\`

### When to Use

1. Explain complex code
2. Mark sections
3. Temporarily disable code
4. Add TODOs

## Best Practices

### 1. Use Semantic HTML
Choose elements based on meaning.

### 2. Maintain Indentation
Indent nested elements.

### 3. Use Lowercase
Use lowercase for tags and attributes.

### 4. Close Tags
Always close tags properly.

### 5. Quote Attributes
Use quotes around attribute values.

### 6. Alt Text for Images
Provide descriptive alt text.

### 7. Validate HTML
Use W3C Validator.

### 8. Accessibility
Use semantic elements and ARIA.

## Code Organization

### File Structure
\`\`\`
project/
├── index.html
├── about.html
├── css/
├── js/
└── images/
\`\`\`

### Practice Challenge

Review and improve code:
1. Add proper comments
2. Fix indentation
3. Use semantic elements
4. Add missing alt text`,
                codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Best Practices</title>
</head>
<body>
    <!-- ========== HEADER ========== -->
    <header>
        <div class="container">
            <img 
                src="logo.png"
                alt="Company Logo"
                width="150"
                height="50"
            >
            <nav aria-label="Main Navigation">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
        </div>
    </header>
    
    <!-- ========== MAIN CONTENT ========== -->
    <main>
        <section class="hero">
            <h1>Welcome</h1>
            <p>Build better websites with HTML</p>
            <a href="/signup" class="button">Get Started</a>
        </section>
        
        <section class="features">
            <h2>Features</h2>
            <article class="feature">
                <img 
                    src="icon-fast.svg"
                    alt="Lightning bolt icon"
                    width="64"
                    height="64"
                >
                <h3>Fast</h3>
                <p>Lightning-fast performance</p>
            </article>
        </section>
        
        <!-- TODO: Add testimonials -->
    </main>
    
    <!-- ========== FOOTER ========== -->
    <footer>
        <div class="container">
            <nav aria-label="Footer">
                <ul>
                    <li><a href="/privacy">Privacy</a></li>
                    <li><a href="/terms">Terms</a></li>
                </ul>
            </nav>
            <p><small>© 2026 Company</small></p>
        </div>
    </footer>
</body>
</html>`,
                duration: 25,
                order: 7,
                isPublished: true
            }
        ]);

        console.log(`✓ Module 1: ${module1.title} - ${module1Lessons.length} lessons created`);

        console.log('\n========================================');
        console.log('HTML COURSE SEED COMPLETE!');
        console.log('========================================');
        console.log(`Course: ${htmlCourse.title}`);
        console.log(`Modules: 1 (Module 1 complete)`);
        console.log(`Lessons: ${module1Lessons.length}`);
        console.log('========================================\n');
        console.log('NOTE: This seed contains Module 1 only.');
        console.log('Run full seed to add all 5 modules.\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ Seeding error:', error);
        process.exit(1);
    }
};

seedCompleteHTMLCourse();
