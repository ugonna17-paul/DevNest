const mongoose = require('mongoose');
const Course = require('./models/Course');
const Module = require('./models/Module');
const Lesson = require('./models/Lesson');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB connected for HTML course seeding...'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

const seedHTMLCourse = async () => {
    try {
        console.log('Starting HTML course seed...');

        // ==================== HTML COURSE ====================
        const htmlCourse = await Course.create({
            title: 'Complete HTML Mastery',
            description: 'Master HTML from fundamentals to advanced techniques. Build semantic, accessible, and SEO-optimized web pages with real-world projects.',
            level: 'Beginner',
            slug: 'html-complete',
            duration: '12 hours',
            prerequisites: [],
            icon: '📄',
            totalLessons: 32,
            isPublished: true,
            order: 1
        });

        console.log('HTML course created');

        // ==================== MODULE 1: HTML FUNDAMENTALS ====================
        const module1 = await Module.create({
            course: htmlCourse._id,
            title: 'HTML Fundamentals',
            description: 'Learn the essential building blocks of HTML including document structure, text formatting, and basic elements',
            order: 1,
            isPublished: true
        });

        await Lesson.create([
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
- Multi-page websites`,
                codeExample: `<!-- Basic HTML Structure -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>My First Webpage</title>
</head>
<body>
    <h1>Hello, World!</h1>
    <p>Welcome to HTML!</p>
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

An HTML document consists of several required elements that work together:

### 1. DOCTYPE Declaration

The \`<!DOCTYPE html>\` declaration tells the browser this is an HTML5 document. It must be the very first line.

### 2. HTML Element

The \`<html>\` tag is the root element that wraps all content. The \`lang\` attribute specifies the language.

### 3. Head Section

The \`<head>\` contains metadata (data about data):
- **Character Set**: \`<meta charset="UTF-8">\` - Ensures proper character encoding
- **Title**: \`<title>\` - Appears in browser tab
- **Meta Tags**: SEO, viewport settings, descriptions
- **Links**: Stylesheets, fonts, icons

### 4. Body Section

The \`<body>\` contains all visible content that appears on the webpage.

## Essential Meta Tags

\`\`\`html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Page description for SEO">
\`\`\`

### Viewport Meta Tag

The viewport meta tag is essential for responsive design on mobile devices.

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
3. Head with charset, viewport, title, and description
4. Body with a heading and paragraph`,
                codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Character encoding for proper text display -->
    <meta charset="UTF-8">
    
    <!-- Responsive viewport for mobile devices -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- SEO description -->
    <meta name="description" content="Learn HTML document structure">
    
    <!-- Page title (appears in browser tab) -->
    <title>HTML Document Structure</title>
</head>
<body>
    <!-- All visible content goes here -->
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
2. **Don't skip levels** - Go from h1 → h2 → h3, not h1 → h3
3. **Use for structure, not styling** - Don't choose based on size
4. **Be descriptive** - Headings help SEO and accessibility

## Paragraph Element

The \`<p>\` tag defines a paragraph. Browsers automatically add space before and after paragraphs.

### Line Breaks

- **\`<br>\`** - Single line break (self-closing)
- **\`<hr>\`** - Horizontal rule (thematic break)

### Text Formatting Elements

- **\`<strong>\`** - Important text (bold)
- **\`<em>\`** - Emphasized text (italic)
- **\`<mark>\`** - Highlighted text
- **\`<small>\`** - Smaller text
- **\`<del>\`** - Deleted text (strikethrough)
- **\`<ins>\`** - Inserted text (underline)
- **\`<sub>\`** - Subscript text
- **\`<sup>\`** - Superscript text

## Semantic vs Visual

Use semantic tags (\`<strong>\`, \`<em>\`) instead of visual tags (\`<b>\`, \`<i>\`) because:
- Better for screen readers
- Better for SEO
- Conveys meaning, not just appearance

### Practice Challenge

Create a blog post structure with:
1. One h1 for the title
2. Multiple h2 for sections
3. Paragraphs with emphasized and strong text
4. A horizontal rule between sections`,
                codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog Post Example</title>
</head>
<body>
    <!-- Main heading (only one per page) -->
    <h1>The Complete Guide to HTML</h1>
    
    <!-- Introduction paragraph -->
    <p>
        HTML is the <strong>foundation</strong> of web development. 
        In this guide, you'll learn <em>everything</em> you need to know.
    </p>
    
    <!-- Major section -->
    <h2>Getting Started</h2>
    <p>
        To begin learning HTML, all you need is a text editor and 
        a web browser. It's <mark>completely free</mark> to start!
    </p>
    
    <!-- Subsection -->
    <h3>Tools You'll Need</h3>
    <p>
        A code editor like <strong>VS Code</strong> or 
        <strong>Sublime Text</strong> makes writing HTML easier.
    </p>
    
    <!-- Thematic break -->
    <hr>
    
    <!-- Another major section -->
    <h2>Basic Concepts</h2>
    <p>
        HTML uses <em>tags</em> to structure content.<br>
        Tags are enclosed in angle brackets like this: 
        <code>&lt;tag&gt;</code>
    </p>
    
    <!-- Mathematical notation example -->
    <p>
        The formula for water is H<sub>2</sub>O, and 
        Einstein's equation is E=mc<sup>2</sup>.
    </p>
    
    <!-- Small print -->
    <p>
        <small>Last updated: February 2026</small>
    </p>
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

Lists are fundamental for organizing information. HTML provides three types of lists for different purposes.

## Unordered Lists

Use \`<ul>\` for lists where order doesn't matter. Each item uses \`<li>\` (list item).

### When to Use Unordered Lists

- Shopping lists
- Features list
- Navigation menus
- Bullet points

## Ordered Lists

Use \`<ol>\` for sequential or ranked lists. Items are automatically numbered.

### List Attributes

The \`<ol>\` tag accepts several attributes:
- **\`type\`** - Numbering style: 1 (default), A, a, I, i
- **\`start\`** - Starting number
- **\`reversed\`** - Reverse numbering

## Description Lists

Use \`<dl>\` for term-definition pairs:
- **\`<dt>\`** - Definition term
- **\`<dd>\`** - Definition description

### When to Use Description Lists

- Glossaries
- Metadata
- FAQ sections
- Key-value pairs

## Nested Lists

Lists can contain other lists to create hierarchical structures.

### Best Practices for Lists

1. **Choose the right list type** - Use semantic meaning
2. **Keep items concise** - One idea per item
3. **Use consistent formatting** - Parallel structure
4. **Nest appropriately** - Don't nest too deeply

### Practice Challenge

Create a recipe page with:
1. Unordered list for ingredients
2. Ordered list for instructions
3. Nested list for sub-steps
4. Description list for nutritional info`,
                codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Lists Example</title>
</head>
<body>
    <h1>Chocolate Chip Cookies Recipe</h1>
    
    <!-- Unordered List: Ingredients -->
    <h2>Ingredients</h2>
    <ul>
        <li>2 cups all-purpose flour</li>
        <li>1 cup butter, softened</li>
        <li>1 cup brown sugar</li>
        <li>2 eggs</li>
        <li>2 cups chocolate chips</li>
        <li>1 teaspoon vanilla extract</li>
    </ul>
    
    <!-- Ordered List: Instructions -->
    <h2>Instructions</h2>
    <ol>
        <li>Preheat oven to 375°F (190°C)</li>
        <li>Mix butter and sugar until creamy</li>
        <li>Beat in eggs and vanilla</li>
        <li>
            Gradually add flour
            <!-- Nested ordered list for sub-steps -->
            <ol type="a">
                <li>Add half the flour</li>
                <li>Mix well</li>
                <li>Add remaining flour</li>
            </ol>
        </li>
        <li>Stir in chocolate chips</li>
        <li>Drop spoonfuls onto baking sheet</li>
        <li>Bake for 10-12 minutes</li>
    </ol>
    
    <!-- Custom start number -->
    <h2>Cleanup Steps</h2>
    <ol start="8">
        <li>Let cookies cool for 5 minutes</li>
        <li>Transfer to wire rack</li>
        <li>Enjoy with milk!</li>
    </ol>
    
    <!-- Description List: Nutrition -->
    <h2>Nutritional Information</h2>
    <dl>
        <dt>Serving Size</dt>
        <dd>2 cookies</dd>
        
        <dt>Calories</dt>
        <dd>280 per serving</dd>
        
        <dt>Total Fat</dt>
        <dd>14g</dd>
        
        <dt>Sugar</dt>
        <dd>22g</dd>
    </dl>
    
    <!-- Different list types -->
    <h2>Difficulty Levels</h2>
    <ol type="I">
        <li>Beginner - Simple Drop Cookies</li>
        <li>Intermediate - Rolled Cookies</li>
        <li>Advanced - Decorated Cookies</li>
    </ol>
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

Links are what make the web a "web" - they connect pages together. The \`<a>\` (anchor) tag creates hyperlinks.

## Basic Link Syntax

\`\`\`html
<a href="destination">Link Text</a>
\`\`\`

The \`href\` (hypertext reference) attribute specifies the destination.

## Types of Links

### 1. External Links

Links to other websites require the full URL:

\`\`\`html
<a href="https://www.google.com">Visit Google</a>
\`\`\`

### 2. Internal Links

Links to pages within your own site use relative paths:

\`\`\`html
<a href="about.html">About Us</a>
<a href="/contact.html">Contact</a>
<a href="../index.html">Home</a>
\`\`\`

### 3. Anchor Links

Jump to specific sections on the same page:

\`\`\`html
<a href="#section-id">Jump to Section</a>
<h2 id="section-id">Section Title</h2>
\`\`\`

### 4. Email Links

Open the user's email client:

\`\`\`html
<a href="mailto:hello@example.com">Send Email</a>
\`\`\`

### 5. Phone Links

Dial a phone number (mobile):

\`\`\`html
<a href="tel:+1234567890">Call Us</a>
\`\`\`

## Link Attributes

### target Attribute

Controls where the link opens:
- **\`_self\`** - Same window (default)
- **\`_blank\`** - New tab/window
- **\`_parent\`** - Parent frame
- **\`_top\`** - Full window

### rel Attribute

Defines the relationship:
- **\`noopener\`** - Security for \_blank links
- **\`nofollow\`** - Tell search engines not to follow
- **\`noreferrer\`** - Don't send referrer information

### download Attribute

Force download instead of navigation:

\`\`\`html
<a href="document.pdf" download>Download PDF</a>
\`\`\`

## Best Practices

1. **Descriptive Link Text** - Use meaningful text, not "click here"
2. **Security with \_blank** - Always add \`rel="noopener noreferrer"\`
3. **Visual Feedback** - Links should look clickable
4. **Accessibility** - Make links keyboard-accessible

### Practice Challenge

Create a navigation menu with:
1. Links to different pages
2. An external link that opens in a new tab
3. An anchor link to a section below
4. An email and phone link`,
                codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Navigation Example</title>
</head>
<body>
    <!-- Navigation Menu -->
    <nav>
        <h2>Main Navigation</h2>
        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="about.html">About</a></li>
            <li><a href="services.html">Services</a></li>
            <li><a href="portfolio.html">Portfolio</a></li>
            <li><a href="contact.html">Contact</a></li>
        </ul>
    </nav>
    
    <!-- Header -->
    <header>
        <h1>Welcome to Our Website</h1>
        <p>
            <a href="#about-section">Learn more about us</a> or 
            <a href="#contact-section">get in touch</a>
        </p>
    </header>
    
    <!-- Main Content -->
    <main>
        <!-- About Section -->
        <section id="about-section">
            <h2>About Us</h2>
            <p>
                We are a web development company. 
                Visit our 
                <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                >
                    GitHub profile
                </a> 
                to see our open-source work.
            </p>
        </section>
        
        <!-- Contact Section -->
        <section id="contact-section">
            <h2>Contact Information</h2>
            <ul>
                <li>
                    <strong>Email:</strong> 
                    <a href="mailto:hello@example.com?subject=Inquiry">
                        hello@example.com
                    </a>
                </li>
                <li>
                    <strong>Phone:</strong> 
                    <a href="tel:+1-555-123-4567">+1 (555) 123-4567</a>
                </li>
                <li>
                    <strong>WhatsApp:</strong> 
                    <a 
                        href="https://wa.me/15551234567" 
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Chat on WhatsApp
                    </a>
                </li>
            </ul>
        </section>
        
        <!-- Resources Section -->
        <section>
            <h2>Downloads</h2>
            <ul>
                <li>
                    <a href="brochure.pdf" download>
                        Download Company Brochure (PDF)
                    </a>
                </li>
                <li>
                    <a href="portfolio.pdf" download="MyPortfolio.pdf">
                        Download Portfolio
                    </a>
                </li>
            </ul>
        </section>
    </main>
    
    <!-- Footer -->
    <footer>
        <p>
            <a href="#top">Back to Top</a> | 
            <a href="privacy.html">Privacy Policy</a> | 
            <a href="terms.html">Terms of Service</a>
        </p>
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

Images make web pages visually engaging. The \`<img>\` tag embeds images in your HTML document.

## Basic Image Syntax

\`\`\`html
<img src="image.jpg" alt="Description">
\`\`\`

The \`<img>\` tag is **self-closing** - it doesn't have a closing tag.

## Required Attributes

### 1. src (Source)

Specifies the image path:
- **Relative path**: \`src="images/photo.jpg"\`
- **Absolute path**: \`src="/images/photo.jpg"\`
- **External URL**: \`src="https://example.com/image.jpg"\`

### 2. alt (Alternative Text)

Describes the image for:
- Screen readers (accessibility)
- SEO purposes
- Display when image fails to load

**Important**: Always provide meaningful alt text!

## Optional Attributes

### Dimensions

Control image size:
- **\`width\`** - Image width in pixels
- **\`height\`** - Image height in pixels

\`\`\`html
<img src="photo.jpg" alt="Photo" width="300" height="200">
\`\`\`

**Note**: Specify dimensions to prevent layout shift as images load.

### loading Attribute

Optimize performance:
- **\`loading="lazy"\`** - Lazy load images (load when near viewport)
- **\`loading="eager"\`** - Load immediately (default)

### title Attribute

Shows tooltip on hover:

\`\`\`html
<img src="logo.png" alt="Company Logo" title="Our Company">
\`\`\`

## Image Formats

Choose the right format:

| Format | Best For | Transparency | Animation |
|--------|----------|--------------|-----------|
| **JPEG** | Photos | No | No |
| **PNG** | Graphics, logos | Yes | No |
| **GIF** | Simple animations | Yes | Yes |
| **SVG** | Icons, logos | Yes | Yes |
| **WebP** | Modern web | Yes | Yes |

## The Figure Element

Semantic way to display images with captions:

\`\`\`html
<figure>
    <img src="chart.png" alt="Sales chart">
    <figcaption>2025 Sales Performance</figcaption>
</figure>
\`\`\`

## Responsive Images

### Using srcset

Provide multiple image sizes:

\`\`\`html
<img 
    src="small.jpg" 
    srcset="small.jpg 480w, medium.jpg 800w, large.jpg 1200w"
    sizes="(max-width: 600px) 480px, 800px"
    alt="Responsive image"
>
\`\`\`

### Using picture Element

Serve different images based on conditions:

\`\`\`html
<picture>
    <source media="(min-width: 800px)" srcset="large.jpg">
    <source media="(min-width: 400px)" srcset="medium.jpg">
    <img src="small.jpg" alt="Responsive image">
</picture>
\`\`\`

## Best Practices

1. **Always use alt text** - Critical for accessibility
2. **Optimize file size** - Compress images for faster loading
3. **Use appropriate formats** - JPEG for photos, PNG for graphics
4. **Specify dimensions** - Prevents layout shifts
5. **Lazy load below the fold** - Improves initial page load

### Practice Challenge

Create an image gallery with:
1. Multiple images with proper alt text
2. Different image sizes
3. At least one figure with caption
4. Lazy loading for images
5. A responsive image using srcset`,
                codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Image Gallery</title>
</head>
<body>
    <h1>Photography Portfolio</h1>
    
    <!-- Basic Image -->
    <h2>Featured Work</h2>
    <img 
        src="featured-photo.jpg" 
        alt="Sunset over mountains with orange and pink sky"
        width="800"
        height="600"
        title="Mountain Sunset - Winner of Photo Contest 2025"
    >
    
    <!-- Image with Figure and Caption -->
    <h2>Nature Collection</h2>
    <figure>
        <img 
            src="waterfall.jpg" 
            alt="Cascading waterfall in lush green forest"
            width="600"
            height="400"
            loading="lazy"
        >
        <figcaption>
            Yosemite Falls - Captured during spring melt
        </figcaption>
    </figure>
    
    <!-- Responsive Image with srcset -->
    <h2>Wildlife Photography</h2>
    <img 
        src="wildlife-small.jpg"
        srcset="wildlife-small.jpg 480w,
                wildlife-medium.jpg 800w,
                wildlife-large.jpg 1200w"
        sizes="(max-width: 600px) 480px,
               (max-width: 900px) 800px,
               1200px"
        alt="Eagle catching fish from river"
        loading="lazy"
    >
    
    <!-- Picture Element for Art Direction -->
    <h2>Urban Landscapes</h2>
    <picture>
        <!-- Desktop: Wide landscape image -->
        <source 
            media="(min-width: 1024px)" 
            srcset="city-wide.jpg"
        >
        <!-- Tablet: Medium crop -->
        <source 
            media="(min-width: 768px)" 
            srcset="city-medium.jpg"
        >
        <!-- Mobile: Portrait crop -->
        <img 
            src="city-mobile.jpg" 
            alt="New York City skyline at twilight"
            loading="lazy"
        >
    </picture>
    
    <!-- Gallery Grid -->
    <h2>Recent Photos</h2>
    <div>
        <img 
            src="gallery-1.jpg" 
            alt="Beach at sunset"
            width="300"
            height="200"
            loading="lazy"
        >
        <img 
            src="gallery-2.jpg" 
            alt="Mountain peak covered in snow"
            width="300"
            height="200"
            loading="lazy"
        >
        <img 
            src="gallery-3.jpg" 
            alt="Desert landscape with cacti"
            width="300"
            height="200"
            loading="lazy"
        >
        <img 
            src="gallery-4.jpg" 
            alt="Forest path in autumn"
            width="300"
            height="200"
            loading="lazy"
        >
    </div>
    
    <!-- External Image -->
    <h2>Featured on National Geographic</h2>
    <figure>
        <img 
            src="https://example.com/natgeo-feature.jpg" 
            alt="Northern lights dancing over Iceland"
            width="700"
            height="500"
            loading="lazy"
        >
        <figcaption>
            Aurora Borealis - Iceland, Winter 2025
        </figcaption>
    </figure>
    
    <!-- Logo with inline SVG alternative -->
    <footer>
        <img 
            src="logo.svg" 
            alt="Photography Portfolio logo"
            width="150"
            height="50"
        >
        <p>© 2026 Photography Portfolio</p>
    </footer>
</body>
</html>`,
                duration: 30,
                order: 6,
                isPublished: true
            },
            {
                module: module1._id,
                course: htmlCourse._id,
                title: 'HTML Comments and Best Practices',
                content: `# HTML Comments and Best Practices

Writing clean, maintainable HTML is essential for professional web development. Learn how to document your code and follow industry standards.

## HTML Comments

Comments allow you to leave notes in your code that browsers ignore.

### Syntax

\`\`\`html
<!-- This is a comment -->
\`\`\`

Comments can span multiple lines:

\`\`\`html
<!-- 
    This is a multi-line comment
    It can contain multiple lines
    Very useful for documentation
-->
\`\`\`

### When to Use Comments

1. **Explain complex code**
\`\`\`html
<!-- Navigation menu - includes dropdown for products -->
<nav>...</nav>
\`\`\`

2. **Mark sections**
\`\`\`html
<!-- ========== HEADER SECTION ========== -->
<header>...</header>
\`\`\`

3. **Temporarily disable code**
\`\`\`html
<!-- <div class="old-feature">Not using this yet</div> -->
\`\`\`

4. **Add TODOs**
\`\`\`html
<!-- TODO: Add image gallery here -->
\`\`\`

### Comment Best Practices

✅ **Do:**
- Explain WHY, not what
- Use for complex logic
- Mark major sections
- Document dependencies

❌ **Don't:**
- State the obvious
- Leave outdated comments
- Comment out large code blocks
- Use for version control

## HTML Best Practices

### 1. Use Semantic HTML

Choose elements based on meaning, not appearance:

\`\`\`html
<!-- Good: Semantic -->
<article>
    <h2>Article Title</h2>
    <p>Content...</p>
</article>

<!-- Bad: Non-semantic -->
<div class="article">
    <div class="title">Article Title</div>
    <div>Content...</div>
</div>
\`\`\`

### 2. Maintain Proper Indentation

Indent nested elements for readability:

\`\`\`html
<body>
    <header>
        <nav>
            <ul>
                <li><a href="#">Home</a></li>
            </ul>
        </nav>
    </header>
</body>
\`\`\`

### 3. Use Lowercase for Tags and Attributes

HTML is case-insensitive, but lowercase is convention:

\`\`\`html
<!-- Good -->
<div class="container">

<!-- Bad -->
<DIV CLASS="container">
\`\`\`

### 4. Always Close Tags

Some tags don't require closing in HTML5, but it's good practice:

\`\`\`html
<!-- Good -->
<p>Paragraph 1</p>
<p>Paragraph 2</p>

<!-- Works but not recommended -->
<p>Paragraph 1
<p>Paragraph 2
\`\`\`

### 5. Quote Attribute Values

Always use quotes around attribute values:

\`\`\`html
<!-- Good -->
<img src="photo.jpg" alt="Description">

<!-- Bad (works but not recommended) -->
<img src=photo.jpg alt=Description>
\`\`\`

### 6. Use Alt Text for Images

Always provide descriptive alt text:

\`\`\`html
<!-- Good -->
<img src="cat.jpg" alt="Orange tabby cat sleeping on couch">

<!-- Bad -->
<img src="cat.jpg" alt="image">
\`\`\`

### 7. Validate Your HTML

Use the W3C Validator: https://validator.w3.org/

### 8. Keep Accessibility in Mind

- Use semantic elements
- Add ARIA labels when needed
- Ensure keyboard navigation
- Maintain color contrast

## Code Organization

### File Structure

\`\`\`
project/
├── index.html
├── about.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── images/
    └── logo.png
\`\`\`

### Naming Conventions

- Use lowercase for filenames
- Use hyphens, not spaces: \`about-us.html\`
- Be descriptive: \`product-details.html\`

### Practice Challenge

Review and improve a poorly written HTML file:
1. Add proper comments
2. Fix indentation
3. Use semantic elements
4. Add missing alt text
5. Ensure all tags are properly closed`,
                codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Best practices for writing clean HTML">
    <title>HTML Best Practices Demo</title>
</head>
<body>
    <!-- ========================================
         HEADER SECTION
         Contains logo, navigation, and search
    ========================================= -->
    <header>
        <div class="container">
            <!-- Company Logo -->
            <img 
                src="logo.png" 
                alt="TechCorp - Innovation in Technology"
                width="150"
                height="50"
            >
            
            <!-- Main Navigation -->
            <nav aria-label="Main Navigation">
                <ul>
                    <li><a href="index.html">Home</a></li>
                    <li><a href="about.html">About</a></li>
                    <li><a href="services.html">Services</a></li>
                    <li><a href="contact.html">Contact</a></li>
                </ul>
            </nav>
        </div>
    </header>
    
    <!-- ========================================
         MAIN CONTENT
    ========================================= -->
    <main>
        <!-- Hero Section -->
        <section class="hero">
            <h1>Welcome to Our Website</h1>
            <p>
                Discover amazing products and services 
                tailored to your needs.
            </p>
            <!-- Call to action button -->
            <a href="signup.html" class="button">Get Started</a>
        </section>
        
        <!-- Features Section -->
        <section class="features">
            <h2>Our Features</h2>
            
            <!-- Feature Grid -->
            <div class="feature-grid">
                <!-- Feature 1 -->
                <article class="feature">
                    <img 
                        src="icon-fast.svg" 
                        alt="Lightning bolt icon representing speed"
                        width="64"
                        height="64"
                    >
                    <h3>Lightning Fast</h3>
                    <p>
                        Optimized for performance with 
                        blazing-fast load times.
                    </p>
                </article>
                
                <!-- Feature 2 -->
                <article class="feature">
                    <img 
                        src="icon-secure.svg" 
                        alt="Lock icon representing security"
                        width="64"
                        height="64"
                    >
                    <h3>Secure & Private</h3>
                    <p>
                        Your data is encrypted and protected 
                        with industry-leading security.
                    </p>
                </article>
                
                <!-- Feature 3 -->
                <article class="feature">
                    <img 
                        src="icon-support.svg" 
                        alt="Headset icon representing customer support"
                        width="64"
                        height="64"
                    >
                    <h3>24/7 Support</h3>
                    <p>
                        Our team is always here to help 
                        when you need us.
                    </p>
                </article>
            </div>
        </section>
        
        <!-- TODO: Add testimonials section -->
        <!-- TODO: Add pricing section -->
        
        <!-- Newsletter Section -->
        <section class="newsletter">
            <h2>Stay Updated</h2>
            <p>Subscribe to our newsletter for the latest updates.</p>
            <!-- Note: Form handling will be added in Module 3 -->
            <form action="/subscribe" method="post">
                <label for="email">Email Address:</label>
                <input 
                    type="email" 
                    id="email" 
                    name="email"
                    placeholder="you@example.com"
                    required
                >
                <button type="submit">Subscribe</button>
            </form>
        </section>
    </main>
    
    <!-- ========================================
         FOOTER SECTION
         Contains links, social media, copyright
    ========================================= -->
    <footer>
        <div class="container">
            <!-- Footer Navigation -->
            <nav aria-label="Footer Navigation">
                <ul>
                    <li><a href="privacy.html">Privacy Policy</a></li>
                    <li><a href="terms.html">Terms of Service</a></li>
                    <li><a href="sitemap.html">Sitemap</a></li>
                </ul>
            </nav>
            
            <!-- Social Media Links -->
            <div class="social">
                <a 
                    href="https://twitter.com/company" 
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit our Twitter profile"
                >
                    Twitter
                </a>
                <a 
                    href="https://linkedin.com/company" 
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit our LinkedIn profile"
                >
                    LinkedIn
                </a>
            </div>
            
            <!-- Copyright -->
            <p>
                <small>
                    © 2026 TechCorp. All rights reserved.
                </small>
            </p>
        </div>
    </footer>
</body>
</html>`,
                duration: 25,
                order: 7,
                isPublished: true
            }
        ]);

        console.log('Module 1: HTML Fundamentals - 7 lessons created');

        // ==================== MODULE 2: STRUCTURE & SEMANTIC HTML ====================
        const module2 = await Module.create({
            course: htmlCourse._id,
            title: 'Structure & Semantic HTML',
            description: 'Master semantic HTML5 elements, page layout structure, and create accessible, SEO-friendly websites',
            order: 2,
            isPublished: true
        });

        await Lesson.create([
            {
                module: module2._id,
                course: htmlCourse._id,
                title: 'Div vs Span',
                content: `# Div vs Span: Understanding Generic Elements

Before HTML5 introduced semantic elements, developers relied heavily on \`<div>\` and \`<span>\` to structure pages. These generic elements still have important uses today.

## The Div Element

\`<div>\` is a **block-level** container element.

### Characteristics of Div

- Takes up full width available
- Starts on a new line
- Can contain other block and inline elements
- No semantic meaning
- Used for grouping and styling

### When to Use Div

Use \`<div>\` when:
- No semantic element fits
- You need a generic container for styling
- Grouping elements for layout purposes
- Creating grid or flexbox containers

## The Span Element

\`<span>\` is an **inline** container element.

### Characteristics of Span

- Only takes up necessary width
- Doesn't start a new line
- Can only contain inline elements and text
- No semantic meaning
- Used for styling parts of text

### When to Use Span

Use \`<span>\` when:
- Styling part of a text string
- Wrapping inline elements
- Adding hooks for CSS or JavaScript
- No semantic inline element fits

## Block vs Inline Elements

### Block-Level Elements

- Start on a new line
- Take full width
- Can have width and height set
- Examples: \`<div>\`, \`<p>\`, \`<h1>\`, \`<section>\`

### Inline Elements

- Flow within text
- Only take necessary width
- Cannot have width/height (with exceptions)
- Examples: \`<span>\`, \`<a>\`, \`<strong>\`, \`<em>\`

## Converting Display Types

CSS can change display behavior:

\`\`\`css
/* Make div inline */
div { display: inline; }

/* Make span block */
span { display: block; }

/* Inline-block (best of both) */
div { display: inline-block; }
\`\`\`

## Semantic Alternatives

Before using \`<div>\` or \`<span>\`, ask: "Is there a semantic alternative?"

### Instead of Div, Consider:

- \`<header>\` - Page or section header
- \`<nav>\` - Navigation
- \`<main>\` - Main content
- \`<section>\` - Thematic grouping
- \`<article>\` - Self-contained content
- \`<aside>\` - Side content
- \`<footer>\` - Footer section

### Instead of Span, Consider:

- \`<strong>\` - Important text
- \`<em>\` - Emphasized text
- \`<code>\` - Code snippet
- \`<mark>\` - Highlighted text
- \`<time>\` - Date/time
- \`<abbr>\` - Abbreviation

## Best Practices

1. **Prefer semantic elements** - Use \`<div>\` and \`<span>\` as last resort
2. **Don't overuse** - Avoid "div soup" or "span spam"
3. **Add meaningful classes** - If using generic elements, add descriptive classes
4. **Consider accessibility** - Semantic elements help screen readers

### Practice Challenge

Refactor code to use semantic elements:
1. Replace divs with appropriate semantic tags
2. Use span only where necessary
3. Add classes for styling hooks
4. Ensure proper nesting`,
                codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Div vs Span Example</title>
    <style>
        .highlight { background-color: yellow; }
        .container { max-width: 800px; margin: 0 auto; }
        .card { border: 1px solid #ddd; padding: 1rem; margin: 1rem 0; }
        .price { color: #28a745; font-weight: bold; }
        .old-price { text-decoration: line-through; color: #999; }
    </style>
</head>
<body>
    <!-- div as page container (generic use is OK here) -->
    <div class="container">
        
        <!-- div for product card (could be article, but div is acceptable) -->
        <div class="card">
            <h2>Product Name</h2>
            
            <!-- span for styling inline text -->
            <p>
                Price: 
                <span class="price">$49.99</span>
                <span class="old-price">$79.99</span>
            </p>
            
            <!-- span for highlighting -->
            <p>
                This product is 
                <span class="highlight">on sale</span> 
                for a limited time!
            </p>
        </div>
        
        <!-- div for layout purposes -->
        <div class="button-group">
            <button>Add to Cart</button>
            <button>Save for Later</button>
        </div>
        
        <!-- ========================================
             BEFORE: Non-semantic markup
        ========================================= -->
        <div class="header">
            <div class="logo">Company Name</div>
            <div class="nav">
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Contact</a>
            </div>
        </div>
        
        <!-- ========================================
             AFTER: Semantic markup
        ========================================= -->
        <header>
            <h1>Company Name</h1>
            <nav>
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Contact</a>
            </nav>
        </header>
        
        <!-- ========================================
             INLINE STYLING WITH SPAN
        ========================================= -->
        <article>
            <h2>Tips for Web Development</h2>
            <p>
                When writing HTML, remember that 
                <span style="font-weight: bold;">semantic elements</span>
                are better than 
                <span class="highlight">generic div and span tags</span>
                for most purposes.
            </p>
            
            <!-- Span for icon insertion -->
            <p>
                <span class="icon">★</span> Rating: 
                <span class="rating">4.5/5</span>
            </p>
            
            <!-- Span wrapping inline elements -->
            <p>
                Published on 
                <span class="date">
                    <time datetime="2026-02-12">February 12, 2026</time>
                </span>
            </p>
        </article>
        
        <!-- ========================================
             DIV FOR LAYOUT GRID
        ========================================= -->
        <div class="feature-grid">
            <div class="feature-item">
                <h3>Feature 1</h3>
                <p>Description</p>
            </div>
            <div class="feature-item">
                <h3>Feature 2</h3>
                <p>Description</p>
            </div>
            <div class="feature-item">
                <h3>Feature 3</h3>
                <p>Description</p>
            </div>
        </div>
        
        <!-- ========================================
             MIXING BLOCK AND INLINE
        ========================================= -->
        <div class="alert">
            <p>
                <strong>Warning:</strong>
                This action cannot be 
                <span class="underline">undone</span>.
                Are you <em>absolutely</em> sure?
            </p>
        </div>
    </div>
</body>
</html>`,
                duration: 25,
                order: 1,
                isPublished: true
            }
        ]);

        // Continue Module 2 lessons
        await Lesson.create([
            {
                module: module2._id,
                course: htmlCourse._id,
                title: 'Semantic HTML5 Elements',
                content: `# Semantic HTML5 Elements

Semantic HTML uses elements that clearly describe their meaning to both the browser and the developer. This improves accessibility, SEO, and code maintainability.

## Why Use Semantic HTML?

1. **Accessibility** - Screen readers navigate better
2. **SEO** - Search engines understand content structure
3. **Maintainability** - Code is easier to read and update
4. **Future-proof** - Aligns with web standards

## Main Structural Elements

### <header>

Contains introductory content or navigation.

**Can be used for:**
- Page header
- Section header
- Article header

**Typically contains:**
- Logo
- Navigation
- Heading
- Search form

### <nav>

Defines navigation links.

**Best practices:**
- Use for major navigation blocks
- Can have multiple \`<nav>\` elements
- Add \`aria-label\` to distinguish multiple nav sections

### <main>

Contains the main content of the page.

**Important rules:**
- Only ONE \`<main>\` per page
- Should not be nested in \`<article>\`, \`<aside>\`, \`<footer>\`, \`<header>\`, or \`<nav>\`
- Should contain unique content

### <section>

Represents a thematic grouping of content.

**Characteristics:**
- Should have a heading
- Represents a standalone section
- Can be nested

### <article>

Represents independent, self-contained content.

**Use for:**
- Blog posts
- News articles
- Forum posts
- Product cards
- Comments

**Test:** Could this content be distributed independently? If yes, use \`<article>\`.

### <aside>

Represents content indirectly related to main content.

**Common uses:**
- Sidebars
- Pull quotes
- Advertisements
- Related links

### <footer>

Contains footer information for its nearest sectioning content.

**Typically contains:**
- Copyright information
- Contact details
- Sitemap links
- Social media links

## Additional Semantic Elements

### <figure> and <figcaption>

Group media with captions:

\`\`\`html
<figure>
    <img src="chart.png" alt="Sales chart">
    <figcaption>Q4 2025 Sales Performance</figcaption>
</figure>
\`\`\`

### <time>

Represents dates and times:

\`\`\`html
<time datetime="2026-02-12">February 12, 2026</time>
<time datetime="14:30">2:30 PM</time>
\`\`\`

### <mark>

Highlights relevant text:

\`\`\`html
<p>Search results for <mark>HTML tutorial</mark></p>
\`\`\`

### <address>

Contact information:

\`\`\`html
<address>
    Contact us at <a href="mailto:hello@example.com">hello@example.com</a>
</address>
\`\`\`

## Semantic Page Structure

A typical semantic page structure:

\`\`\`html
<body>
    <header>
        <!-- Logo, navigation -->
    </header>
    
    <main>
        <article>
            <header>
                <!-- Article title, author, date -->
            </header>
            <section>
                <!-- Article content -->
            </section>
            <footer>
                <!-- Article metadata: tags, share buttons -->
            </footer>
        </article>
        
        <aside>
            <!-- Related content, ads -->
        </aside>
    </main>
    
    <footer>
        <!-- Site footer: copyright, links -->
    </footer>
</body>
\`\`\`

### Practice Challenge

Create a blog post page using:
1. Proper semantic structure
2. Header with navigation
3. Main content area with article
4. Aside for related posts
5. Footer with copyright`,
                codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Semantic HTML Blog Post</title>
</head>
<body>
    <!-- Page Header -->
    <header>
        <div class="container">
            <h1>TechBlog</h1>
            <!-- Main Navigation -->
            <nav aria-label="Main Navigation">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/articles">Articles</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
        </div>
    </header>
    
    <!-- Main Content Area -->
    <main>
        <!-- Blog Article -->
        <article>
            <!-- Article Header -->
            <header>
                <h2>Understanding Semantic HTML</h2>
                <p>
                    By <span class="author">Jane Developer</span> on 
                    <time datetime="2026-02-12">February 12, 2026</time>
                </p>
            </header>
            
            <!-- Article Introduction -->
            <section>
                <h3>Introduction</h3>
                <p>
                    Semantic HTML is a fundamental concept that every 
                    web developer should master. It provides 
                    <mark>meaning and structure</mark> to web content.
                </p>
            </section>
            
            <!-- Article Main Content -->
            <section>
                <h3>Benefits of Semantic HTML</h3>
                <p>
                    Using semantic elements improves your website in 
                    several ways:
                </p>
                <ul>
                    <li><strong>Accessibility:</strong> Screen readers navigate better</li>
                    <li><strong>SEO:</strong> Search engines understand content</li>
                    <li><strong>Maintainability:</strong> Code is clearer</li>
                </ul>
                
                <!-- Figure with code example -->
                <figure>
                    <pre><code>&lt;article&gt;
  &lt;header&gt;
    &lt;h2&gt;Article Title&lt;/h2&gt;
  &lt;/header&gt;
&lt;/article&gt;</code></pre>
                    <figcaption>
                        Example of semantic article structure
                    </figcaption>
                </figure>
            </section>
            
            <!-- Article Conclusion -->
            <section>
                <h3>Conclusion</h3>
                <p>
                    Start using semantic HTML today to create 
                    <em>better, more accessible</em> websites.
                </p>
            </section>
            
            <!-- Article Footer (metadata) -->
            <footer>
                <p>
                    <strong>Tags:</strong> 
                    <a href="/tag/html">#HTML</a>
                    <a href="/tag/webdev">#WebDev</a>
                    <a href="/tag/accessibility">#Accessibility</a>
                </p>
                <p>
                    <strong>Share:</strong> 
                    <a href="#">Twitter</a> | 
                    <a href="#">Facebook</a> | 
                    <a href="#">LinkedIn</a>
                </p>
            </footer>
        </article>
        
        <!-- Sidebar with Related Content -->
        <aside>
            <h3>Related Articles</h3>
            <nav aria-label="Related Articles">
                <ul>
                    <li>
                        <article>
                            <h4><a href="/article-1">CSS Grid Layout Guide</a></h4>
                            <p>Learn modern CSS layout techniques</p>
                            <time datetime="2026-02-10">Feb 10, 2026</time>
                        </article>
                    </li>
                    <li>
                        <article>
                            <h4><a href="/article-2">JavaScript Essentials</a></h4>
                            <p>Master JavaScript fundamentals</p>
                            <time datetime="2026-02-08">Feb 8, 2026</time>
                        </article>
                    </li>
                </ul>
            </nav>
            
            <!-- Newsletter Signup -->
            <section>
                <h3>Subscribe to Our Newsletter</h3>
                <p>Get weekly web development tips</p>
                <form action="/subscribe" method="post">
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="your@email.com"
                        required
                    >
                    <button type="submit">Subscribe</button>
                </form>
            </section>
        </aside>
    </main>
    
    <!-- Page Footer -->
    <footer>
        <div class="container">
            <!-- Footer Navigation -->
            <nav aria-label="Footer Navigation">
                <ul>
                    <li><a href="/privacy">Privacy Policy</a></li>
                    <li><a href="/terms">Terms of Service</a></li>
                    <li><a href="/sitemap">Sitemap</a></li>
                </ul>
            </nav>
            
            <!-- Contact Information -->
            <address>
                Contact: <a href="mailto:hello@techblog.com">hello@techblog.com</a>
            </address>
            
            <!-- Copyright -->
            <p>
                <small>© 2026 TechBlog. All rights reserved.</small>
            </p>
        </div>
    </footer>
</body>
</html>`,
                duration: 35,
                order: 2,
                isPublished: true
            },
            {
                module: module2._id,
                course: htmlCourse._id,
                title: 'HTML Tables',
                content: `# HTML Tables

Tables display data in rows and columns. They're essential for presenting structured tabular data.

## Basic Table Structure

A table consists of several elements:

\`\`\`html
<table>
    <tr>
        <th>Header 1</th>
        <th>Header 2</th>
    </tr>
    <tr>
        <td>Data 1</td>
        <td>Data 2</td>
    </tr>
</table>
\`\`\`

### Table Elements

- **\`<table>\`** - Container for the entire table
- **\`<tr>\`** - Table row
- **\`<th>\`** - Table header cell (bold, centered by default)
- **\`<td>\`** - Table data cell

## Table Sections

For better structure, divide tables into sections:

### <thead>

Contains header rows:

\`\`\`html
<thead>
    <tr>
        <th>Name</th>
        <th>Age</th>
    </tr>
</thead>
\`\`\`

### <tbody>

Contains data rows:

\`\`\`html
<tbody>
    <tr>
        <td>John</td>
        <td>25</td>
    </tr>
</tbody>
\`\`\`

### <tfoot>

Contains footer rows (totals, summaries):

\`\`\`html
<tfoot>
    <tr>
        <td>Total</td>
        <td>100</td>
    </tr>
</tfoot>
\`\`\`

## Table Attributes

### colspan

Merge cells horizontally:

\`\`\`html
<td colspan="2">Spans 2 columns</td>
\`\`\`

### rowspan

Merge cells vertically:

\`\`\`html
<td rowspan="2">Spans 2 rows</td>
\`\`\`

### scope

Improves accessibility for headers:

\`\`\`html
<th scope="col">Column Header</th>
<th scope="row">Row Header</th>
\`\`\`

## Table Caption

Add a title to your table:

\`\`\`html
<table>
    <caption>Monthly Sales Report</caption>
    <!-- table content -->
</table>
\`\`\`

## Accessibility Best Practices

1. **Use \`<th>\` for headers** - Not just bold \`<td>\`
2. **Add scope attribute** - \`scope="col"\` or \`scope="row"\`
3. **Include caption** - Describes table purpose
4. **Complex tables:** Use \`id\` and \`headers\` attributes

### Example with headers attribute:

\`\`\`html
<th id="name">Name</th>
<td headers="name">John</td>
\`\`\`

## When NOT to Use Tables

❌ **Don't use tables for:**
- Page layout
- Positioning elements
- Non-tabular data

✅ **Use tables for:**
- Data tables
- Spreadsheet-like data
- Comparison charts
- Schedules

## Responsive Tables

For mobile, consider these approaches:

1. **Horizontal scrolling**
\`\`\`html
<div style="overflow-x: auto;">
    <table>...</table>
</div>
\`\`\`

2. **Stacked layout** (via CSS)
3. **Hide less important columns**
4. **Convert to cards**

### Practice Challenge

Create a product comparison table with:
1. Header row with product names
2. Feature rows
3. Price row in footer
4. Correct use of \`<th>\`, \`scope\`, and \`<caption>\`
5. Merged cells where appropriate`,
                codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HTML Tables Example</title>
    <style>
        table {
            border-collapse: collapse;
            width: 100%;
            margin: 20px 0;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 12px;
            text-align: left;
        }
        th {
            background-color: #4CAF50;
            color: white;
        }
        tfoot {
            font-weight: bold;
            background-color: #f2f2f2;
        }
        caption {
            caption-side: top;
            font-size: 1.5em;
            font-weight: bold;
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <h1>Employee Data Table</h1>
    
    <!-- Basic Table with Sections -->
    <table>
        <caption>Q1 2026 Sales Performance</caption>
        
        <!-- Table Header -->
        <thead>
            <tr>
                <th scope="col">Employee</th>
                <th scope="col">Department</th>
                <th scope="col">Sales ($)</th>
                <th scope="col">Target ($)</th>
            </tr>
        </thead>
        
        <!-- Table Body -->
        <tbody>
            <tr>
                <td>John Smith</td>
                <td>Electronics</td>
                <td>45,000</td>
                <td>40,000</td>
            </tr>
            <tr>
                <td>Jane Doe</td>
                <td>Clothing</td>
                <td>38,000</td>
                <td>35,000</td>
            </tr>
            <tr>
                <td>Bob Johnson</td>
                <td>Electronics</td>
                <td>52,000</td>
                <td>50,000</td>
            </tr>
            <tr>
                <td>Alice Williams</td>
                <td>Home & Garden</td>
                <td>41,000</td>
                <td>38,000</td>
            </tr>
        </tbody>
        
        <!-- Table Footer -->
        <tfoot>
            <tr>
                <td colspan="2">Total Sales</td>
                <td>$176,000</td>
                <td>$163,000</td>
            </tr>
        </tfoot>
    </table>
    
    <!-- Product Comparison Table -->
    <h2>Product Comparison</h2>
    <table>
        <caption>Hosting Plans Comparison</caption>
        <thead>
            <tr>
                <th scope="col">Feature</th>
                <th scope="col">Basic</th>
                <th scope="col">Pro</th>
                <th scope="col">Enterprise</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row">Storage</th>
                <td>10 GB</td>
                <td>50 GB</td>
                <td>Unlimited</td>
            </tr>
            <tr>
                <th scope="row">Bandwidth</th>
                <td>100 GB</td>
                <td>500 GB</td>
                <td>Unlimited</td>
            </tr>
            <tr>
                <th scope="row">Email Accounts</th>
                <td>5</td>
                <td>25</td>
                <td>Unlimited</td>
            </tr>
            <tr>
                <th scope="row">Support</th>
                <td>Email</td>
                <td>Email + Chat</td>
                <td>24/7 Phone</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <th scope="row">Price/month</th>
                <td>$9.99</td>
                <td>$24.99</td>
                <td>$99.99</td>
            </tr>
        </tfoot>
    </table>
    
    <!-- Table with Merged Cells -->
    <h2>Class Schedule</h2>
    <table>
        <caption>Weekly Class Schedule</caption>
        <thead>
            <tr>
                <th scope="col">Time</th>
                <th scope="col">Monday</th>
                <th scope="col">Tuesday</th>
                <th scope="col">Wednesday</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th scope="row">9:00 AM</th>
                <td>Math</td>
                <td rowspan="2">Science Lab</td>
                <td>Math</td>
            </tr>
            <tr>
                <th scope="row">10:00 AM</th>
                <td>English</td>
                <!-- Science Lab continues here -->
                <td>English</td>
            </tr>
            <tr>
                <th scope="row">11:00 AM</th>
                <td colspan="3">Assembly</td>
            </tr>
            <tr>
                <th scope="row">12:00 PM</th>
                <td>History</td>
                <td>Geography</td>
                <td>History</td>
            </tr>
        </tbody>
    </table>
    
    <!-- Complex Table with Headers Attribute -->
    <h2>Quarterly Sales by Region</h2>
    <table>
        <caption>2026 Sales Data</caption>
        <thead>
            <tr>
                <th id="region" scope="col">Region</th>
                <th id="q1" scope="col">Q1</th>
                <th id="q2" scope="col">Q2</th>
                <th id="q3" scope="col">Q3</th>
                <th id="q4" scope="col">Q4</th>
                <th id="total" scope="col">Total</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <th id="north" scope="row" headers="region">North</th>
                <td headers="north q1">$45,000</td>
                <td headers="north q2">$52,000</td>
                <td headers="north q3">$48,000</td>
                <td headers="north q4">$61,000</td>
                <td headers="north total">$206,000</td>
            </tr>
            <tr>
                <th id="south" scope="row" headers="region">South</th>
                <td headers="south q1">$38,000</td>
                <td headers="south q2">$41,000</td>
                <td headers="south q3">$44,000</td>
                <td headers="south q4">$39,000</td>
                <td headers="south total">$162,000</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <th scope="row">Total</th>
                <td>$83,000</td>
                <td>$93,000</td>
                <td>$92,000</td>
                <td>$100,000</td>
                <td>$368,000</td>
            </tr>
        </tfoot>
    </table>
</body>
</html>`,
                duration: 30,
                order: 3,
                isPublished: true
            },
            {
                module: module2._id,
                course: htmlCourse._id,
                title: 'Page Layout Best Practices',
                content: `# Page Layout Best Practices

Creating well-structured page layouts is fundamental to building professional websites. Learn modern approaches to HTML page structure.

## Modern Page Layout Structure

A typical webpage follows this semantic structure:

\`\`\`html
<body>
    <header>
        <!-- Logo, navigation -->
    </header>
    <main>
        <!-- Primary content -->
    </main>
    <aside>
        <!-- Sidebar content -->
    </aside>
    <footer>
        <!-- Footer information -->
    </footer>
</body>
\`\`\`

## The Container Pattern

Use container divs for max-width and centering:

\`\`\`html
<header>
    <div class="container">
        <!-- constrained content -->
    </div>
</header>
\`\`\`

### Why Use Containers?

- Control maximum width
- Center content
- Add consistent padding
- Responsive design

## Common Layout Patterns

### 1. Single Column Layout

Simplest layout - content stacked vertically:

\`\`\`html
<main class="container">
    <article>Content</article>
    <article>Content</article>
</main>
\`\`\`

**Good for:**
- Blog posts
- Documentation
- Mobile-first designs

### 2. Two Column Layout

Main content with sidebar:

\`\`\`html
<div class="container">
    <main>Main content</main>
    <aside>Sidebar</aside>
</div>
\`\`\`

**Good for:**
- Blogs with sidebars
- E-commerce sites
- Documentation with navigation

### 3. Three Column Layout

Header, main content, two sidebars:

\`\`\`html
<div class="container">
    <aside class="sidebar-left">Left sidebar</aside>
    <main>Main content</main>
    <aside class="sidebar-right">Right sidebar</aside>
</div>
\`\`\`

**Good for:**
- News websites
- Dashboards
- Complex applications

### 4. Grid Layout

Multiple equal columns:

\`\`\`html
<div class="grid">
    <div class="grid-item">Item 1</div>
    <div class="grid-item">Item 2</div>
    <div class="grid-item">Item 3</div>
</div>
\`\`\`

**Good for:**
- Product catalogs
- Image galleries
- Card-based layouts

## Header Patterns

### Simple Header

\`\`\`html
<header>
    <div class="container">
        <a href="/" class="logo">Brand</a>
        <nav>
            <a href="/about">About</a>
            <a href="/contact">Contact</a>
        </nav>
    </div>
</header>
\`\`\`

### Complex Header

\`\`\`html
<header>
    <!-- Top bar -->
    <div class="header-top">
        <div class="container">
            <a href="tel:555-1234">Call Us</a>
            <a href="/login">Login</a>
        </div>
    </div>
    
    <!-- Main header -->
    <div class="header-main">
        <div class="container">
            <a href="/" class="logo">Brand</a>
            <form class="search">
                <input type="search" placeholder="Search...">
            </form>
            <nav>
                <a href="/products">Products</a>
                <a href="/about">About</a>
            </nav>
        </div>
    </div>
</header>
\`\`\`

## Main Content Patterns

### Article Layout

\`\`\`html
<main class="container">
    <article>
        <header>
            <h1>Article Title</h1>
            <p class="meta">Author, Date</p>
        </header>
        <section>
            <p>Content...</p>
        </section>
    </article>
</main>
\`\`\`

### Section-Based Layout

\`\`\`html
<main>
    <section class="hero">
        <!-- Full-width hero -->
    </section>
    <section class="features">
        <div class="container">
            <!-- Constrained content -->
        </div>
    </section>
</main>
\`\`\`

## Footer Patterns

### Simple Footer

\`\`\`html
<footer>
    <div class="container">
        <p>&copy; 2026 Company</p>
        <nav>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
        </nav>
    </div>
</footer>
\`\`\`

### Multi-Column Footer

\`\`\`html
<footer>
    <div class="container">
        <div class="footer-column">
            <h3>Company</h3>
            <nav>...</nav>
        </div>
        <div class="footer-column">
            <h3>Support</h3>
            <nav>...</nav>
        </div>
        <div class="footer-column">
            <h3>Social</h3>
            <nav>...</nav>
        </div>
    </div>
    <div class="footer-bottom">
        <p>&copy; 2026</p>
    </div>
</footer>
\`\`\`

## Mobile-First Approach

Structure HTML for mobile first, then enhance for desktop:

\`\`\`html
<!-- Mobile: Single column -->
<!-- Desktop: Two columns (via CSS) -->
<div class="content-wrapper">
    <main>Primary content</main>
    <aside>Sidebar</aside>
</div>
\`\`\`

## Best Practices

1. **Use semantic elements** - \`<header>\`, \`<main>\`, \`<footer>\`
2. **One \`<main>\` per page** - Don't nest multiple
3. **Logical source order** - Mobile users get content first
4. **Containers for width** - Control maximum width
5. **Sections for themes** - Group related content
6. **Accessibility** - Use landmarks and ARIA when needed

### Practice Challenge

Create a complete page layout with:
1. Header with logo and navigation
2. Hero section (full-width)
3. Three-column feature section
4. Multi-column footer
5. Proper semantic structure`,
                codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modern Page Layout</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        header {
            background: #333;
            color: white;
            padding: 1rem 0;
        }
        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        nav a {
            color: white;
            margin-left: 20px;
            text-decoration: none;
        }
        .hero {
            background: #4CAF50;
            color: white;
            padding: 100px 0;
            text-align: center;
        }
        .features {
            padding: 60px 0;
        }
        .feature-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;
            margin-top: 30px;
        }
        footer {
            background: #333;
            color: white;
            padding: 40px 0 20px;
        }
        .footer-columns {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 30px;
            margin-bottom: 20px;
        }
        .footer-bottom {
            border-top: 1px solid #555;
            padding-top: 20px;
            text-align: center;
        }
    </style>
</head>
<body>
    <!-- ========================================
         HEADER SECTION
    ========================================= -->
    <header>
        <div class="container">
            <div class="header-content">
                <!-- Logo -->
                <a href="/" class="logo">
                    <h1>BrandName</h1>
                </a>
                
                <!-- Main Navigation -->
                <nav aria-label="Main Navigation">
                    <a href="/">Home</a>
                    <a href="/products">Products</a>
                    <a href="/about">About</a>
                    <a href="/blog">Blog</a>
                    <a href="/contact">Contact</a>
                </nav>
            </div>
        </div>
    </header>
    
    <!-- ========================================
         MAIN CONTENT
    ========================================= -->
    <main>
        <!-- Hero Section (Full Width) -->
        <section class="hero">
            <div class="container">
                <h2>Welcome to Our Amazing Platform</h2>
                <p>Build better websites with modern HTML</p>
                <a href="/signup" class="button">Get Started Free</a>
            </div>
        </section>
        
        <!-- Features Section (Constrained Width) -->
        <section class="features">
            <div class="container">
                <h2>Why Choose Us</h2>
                
                <!-- Three Column Grid -->
                <div class="feature-grid">
                    <article class="feature">
                        <h3>⚡ Fast Performance</h3>
                        <p>
                            Optimized code ensures lightning-fast 
                            load times for your users.
                        </p>
                    </article>
                    
                    <article class="feature">
                        <h3>🔒 Secure by Default</h3>
                        <p>
                            Industry-leading security practices 
                            keep your data safe.
                        </p>
                    </article>
                    
                    <article class="feature">
                        <h3>📱 Mobile Responsive</h3>
                        <p>
                            Perfect display on all devices, from 
                            phones to desktops.
                        </p>
                    </article>
                </div>
            </div>
        </section>
        
        <!-- Two Column Layout Section -->
        <section class="content-section">
            <div class="container">
                <div class="two-column-layout">
                    <!-- Main Content -->
                    <article class="main-content">
                        <h2>Main Content Area</h2>
                        <p>
                            This is the primary content area where your 
                            main information goes. It takes up about 2/3 
                            of the width on larger screens.
                        </p>
                        <p>
                            You can include multiple paragraphs, images, 
                            and other content here.
                        </p>
                    </article>
                    
                    <!-- Sidebar -->
                    <aside class="sidebar">
                        <h3>Recent Posts</h3>
                        <nav>
                            <ul>
                                <li><a href="/post-1">Getting Started with HTML</a></li>
                                <li><a href="/post-2">CSS Layout Techniques</a></li>
                                <li><a href="/post-3">JavaScript Basics</a></li>
                            </ul>
                        </nav>
                    </aside>
                </div>
            </div>
        </section>
        
        <!-- Call to Action Section -->
        <section class="cta">
            <div class="container">
                <h2>Ready to Get Started?</h2>
                <p>Join thousands of satisfied customers today</p>
                <a href="/signup" class="button-primary">Sign Up Now</a>
                <a href="/demo" class="button-secondary">Request Demo</a>
            </div>
        </section>
    </main>
    
    <!-- ========================================
         FOOTER SECTION
    ========================================= -->
    <footer>
        <div class="container">
            <!-- Three Column Footer -->
            <div class="footer-columns">
                <!-- Column 1: Company -->
                <div class="footer-column">
                    <h3>Company</h3>
                    <nav aria-label="Company Links">
                        <ul>
                            <li><a href="/about">About Us</a></li>
                            <li><a href="/team">Our Team</a></li>
                            <li><a href="/careers">Careers</a></li>
                            <li><a href="/press">Press</a></li>
                        </ul>
                    </nav>
                </div>
                
                <!-- Column 2: Products -->
                <div class="footer-column">
                    <h3>Products</h3>
                    <nav aria-label="Product Links">
                        <ul>
                            <li><a href="/features">Features</a></li>
                            <li><a href="/pricing">Pricing</a></li>
                            <li><a href="/enterprise">Enterprise</a></li>
                            <li><a href="/api">API</a></li>
                        </ul>
                    </nav>
                </div>
                
                <!-- Column 3: Support -->
                <div class="footer-column">
                    <h3>Support</h3>
                    <nav aria-label="Support Links">
                        <ul>
                            <li><a href="/help">Help Center</a></li>
                            <li><a href="/contact">Contact Us</a></li>
                            <li><a href="/docs">Documentation</a></li>
                            <li><a href="/community">Community</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
            
            <!-- Footer Bottom -->
            <div class="footer-bottom">
                <p>
                    &copy; 2026 BrandName. All rights reserved. | 
                    <a href="/privacy">Privacy Policy</a> | 
                    <a href="/terms">Terms of Service</a>
                </p>
            </div>
        </div>
    </footer>
</body>
</html>`,
                duration: 30,
                order: 4,
                isPublished: true
            }
        ]);

        console.log('Module 2: Structure & Semantic HTML - 4 lessons created');

        // ==================== MODULE 3: FORMS & USER INPUT ====================
        const module3 = await Module.create({
            course: htmlCourse._id,
            title: 'Forms & User Input',
            description: 'Master HTML forms, input types, validation, and best practices for collecting user data',
            order: 3,
            isPublished: true
        });

        await Lesson.create([
            {
                module: module3._id,
                course: htmlCourse._id,
                title: 'Form Basics',
                content: `# Form Basics

Forms are essential for collecting user input. Learn how to create accessible, functional forms in HTML.

## The <form> Element

The \`<form>\` tag wraps all form controls:

\`\`\`html
<form action="/submit" method="POST">
    <!-- form controls -->
</form>
\`\`\`

### Form Attributes

#### action

Specifies where to send form data:

\`\`\`html
<form action="/register">
    <!-- Submits to /register endpoint -->
</form>
\`\`\`

#### method

Defines HTTP method:

- **GET** - Data visible in URL (for searches, filters)
- **POST** - Data hidden in request body (for sensitive data)

\`\`\`html
<form action="/login" method="POST">
    <!-- POST for secure login -->
</form>
\`\`\`

## Basic Input Elements

### Text Input

\`\`\`html
<input type="text" name="username">
\`\`\`

### Label Element

Always associate labels with inputs:

\`\`\`html
<!-- Method 1: Wrapping -->
<label>
    Username:
    <input type="text" name="username">
</label>

<!-- Method 2: For attribute (recommended) -->
<label for="username">Username:</label>
<input type="text" id="username" name="username">
\`\`\`

### Why Use Labels?

1. **Accessibility** - Screen readers read labels
2. **Usability** - Clicking label focuses input
3. **Mobile** - Larger click target
4. **SEO** - Better form structure

## Common Input Attributes

### name

Identifies the field when submitted:

\`\`\`html
<input type="text" name="email">
<!-- Submits as: email=user@example.com -->
\`\`\`

### placeholder

Shows hint text:

\`\`\`html
<input type="email" placeholder="you@example.com">
\`\`\`

### value

Sets default value:

\`\`\`html
<input type="text" value="Default text">
\`\`\`

### required

Makes field mandatory:

\`\`\`html
<input type="email" required>
\`\`\`

### readonly

Prevents editing:

\`\`\`html
<input type="text" readonly value="Cannot edit">
\`\`\`

### disabled

Disables the field (not submitted):

\`\`\`html
<input type="text" disabled>
\`\`\`

## Submit Button

### Using Button Element

\`\`\`html
<button type="submit">Submit Form</button>
\`\`\`

### Using Input

\`\`\`html
<input type="submit" value="Submit Form">
\`\`\`

### Button Types

- **submit** - Submits the form (default)
- **reset** - Resets all fields
- **button** - Does nothing (for JavaScript)

## Form Structure Best Practices

### 1. Group Related Fields

\`\`\`html
<fieldset>
    <legend>Personal Information</legend>
    <!-- fields -->
</fieldset>
\`\`\`

### 2. One Label Per Input

Each input should have its own label.

### 3. Logical Tab Order

Fields should be in a logical order for keyboard navigation.

### 4. Clear Instructions

Provide helpful text for complex fields.

### 5. Error Messages

Show clear, specific error messages.

## GET vs POST

### Use GET When:

- Searching or filtering
- Bookmarkable results
- Idempotent operations (no side effects)

**Example:** Search forms

### Use POST When:

- Submitting sensitive data
- Creating/updating records
- Non-idempotent operations (has side effects)

**Example:** Login, registration, checkout

## Form Accessibility

1. **Always use labels** - Never rely on placeholder alone
2. **Logical structure** - Group related fields
3. **Error handling** - Provide clear feedback
4. **Keyboard navigation** - Ensure tab order makes sense
5. **ARIA labels** - For complex forms

### Practice Challenge

Create a contact form with:
1. Name field (text input)
2. Email field (with proper label)
3. Message field
4. Submit button
5. Proper form attributes (action, method)
6. Required validation on all fields`,
                codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact Form Example</title>
    <style>
        form {
            max-width: 500px;
            margin: 20px auto;
            padding: 20px;
            border: 1px solid #ddd;
            border-radius: 8px;
        }
        label {
            display: block;
            margin: 15px 0 5px;
            font-weight: bold;
        }
        input, textarea {
            width: 100%;
            padding: 10px;
            border: 1px solid #ddd;
            border-radius: 4px;
            font-size: 16px;
        }
        button {
            margin-top: 15px;
            padding: 12px 30px;
            background: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
        }
        button:hover {
            background: #45a049;
        }
        .required {
            color: red;
        }
        fieldset {
            border: 2px solid #4CAF50;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        legend {
            color: #4CAF50;
            font-weight: bold;
            padding: 0 10px;
        }
    </style>
</head>
<body>
    <h1>Contact Us</h1>
    
    <!-- Basic Contact Form -->
    <form action="/submit-contact" method="POST">
        <!-- Name Field -->
        <label for="name">
            Name <span class="required">*</span>
        </label>
        <input 
            type="text" 
            id="name" 
            name="name" 
            placeholder="Enter your full name"
            required
        >
        
        <!-- Email Field -->
        <label for="email">
            Email <span class="required">*</span>
        </label>
        <input 
            type="email" 
            id="email" 
            name="email" 
            placeholder="you@example.com"
            required
        >
        
        <!-- Subject Field -->
        <label for="subject">
            Subject <span class="required">*</span>
        </label>
        <input 
            type="text" 
            id="subject" 
            name="subject" 
            placeholder="What is this regarding?"
            required
        >
        
        <!-- Message Field -->
        <label for="message">
            Message <span class="required">*</span>
        </label>
        <textarea 
            id="message" 
            name="message" 
            rows="6"
            placeholder="Enter your message here..."
            required
        ></textarea>
        
        <!-- Submit Button -->
        <button type="submit">Send Message</button>
    </form>
    
    <!-- Registration Form with Fieldset -->
    <h2>User Registration</h2>
    <form action="/register" method="POST">
        <!-- Personal Information Section -->
        <fieldset>
            <legend>Personal Information</legend>
            
            <label for="reg-firstname">First Name <span class="required">*</span></label>
            <input 
                type="text" 
                id="reg-firstname" 
                name="firstName" 
                required
            >
            
            <label for="reg-lastname">Last Name <span class="required">*</span></label>
            <input 
                type="text" 
                id="reg-lastname" 
                name="lastName" 
                required
            >
            
            <label for="reg-email">Email <span class="required">*</span></label>
            <input 
                type="email" 
                id="reg-email" 
                name="email" 
                required
            >
        </fieldset>
        
        <!-- Account Information Section -->
        <fieldset>
            <legend>Account Information</legend>
            
            <label for="reg-username">Username <span class="required">*</span></label>
            <input 
                type="text" 
                id="reg-username" 
                name="username" 
                minlength="3"
                required
            >
            
            <label for="reg-password">Password <span class="required">*</span></label>
            <input 
                type="password" 
                id="reg-password" 
                name="password" 
                minlength="8"
                required
            >
        </fieldset>
        
        <!-- Form Actions -->
        <button type="submit">Create Account</button>
        <button type="reset">Clear Form</button>
    </form>
    
    <!-- Search Form (GET method) -->
    <h2>Search Products</h2>
    <form action="/search" method="GET">
        <label for="search-query">Search:</label>
        <input 
            type="search" 
            id="search-query" 
            name="q" 
            placeholder="What are you looking for?"
        >
        <button type="submit">Search</button>
    </form>
    
    <!-- Login Form (POST method) -->
    <h2>Login</h2>
    <form action="/login" method="POST">
        <label for="login-email">Email:</label>
        <input 
            type="email" 
            id="login-email" 
            name="email" 
            autocomplete="email"
            required
        >
        
        <label for="login-password">Password:</label>
        <input 
            type="password" 
            id="login-password" 
            name="password" 
            autocomplete="current-password"
            required
        >
        
        <!-- Remember me checkbox -->
        <label>
            <input type="checkbox" name="remember"> 
            Remember me
        </label>
        
        <button type="submit">Log In</button>
    </form>
</body>
</html>`,
                duration: 30,
                order: 1,
                isPublished: true
            }
        ]);

        console.log('Module 3: Forms & User Input - Lessons being created...');

        console.log('\n=== HTML COURSE SEED COMPLETE ===');
        console.log('Course: Complete HTML Mastery');
        console.log('Total modules: 3 (more to come)');
        console.log('Total lessons: 12 (more to come)');
        console.log('=====================================\n');

        process.exit(0);
    } catch (error) {
        console.error('Seeding error:', error);
        process.exit(1);
    }
};

seedHTMLCourse();
