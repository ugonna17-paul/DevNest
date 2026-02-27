// ==========================================
// COMPLETE HTML COURSE SEED DATA
// Ready for MongoDB insertion
// ==========================================

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
    description: 'Core concepts and the building blocks of HTML documents.',
    order: 1,
    lessons: [
    {
      title: 'What is HTML',
      order: 1,
      content: \\`# What is HTML

## Introduction to the Foundation of the Web

HTML (HyperText Markup Language) is the standard markup language for creating web pages and web applications. It is the backbone of every website you visit, providing the fundamental structure that browsers use to display content.

### What Does HTML Stand For?

- **HyperText**: Refers to text that contains links to other text, allowing users to navigate between pages
- **Markup**: A system of annotating text to indicate structure and formatting
- **Language**: A set of rules and syntax for creating documents

### The Role of HTML in Web Development

HTML works alongside other web technologies:

1. **HTML** - Defines the structure and content (the skeleton)
2. **CSS** - Controls the visual presentation and layout (the skin)
3. **JavaScript** - Adds interactivity and dynamic behavior (the muscles)

Think of building a website like constructing a house:
- HTML is the foundation, walls, and rooms
- CSS is the paint, decorations, and furniture
- JavaScript is the electricity, plumbing, and smart home features

### Why HTML is Essential

**Universal Language**: Every web browser understands HTML, making it the universal language of the web.

**Easy to Learn**: HTML has a simple, intuitive syntax that beginners can grasp quickly. Unlike programming languages, HTML is declarative - you describe what you want, not how to create it.

**No Installation Required**: You only need a text editor and a web browser to start writing HTML. No complex software or development environment needed.

**Foundation for Everything**: Whether you want to become a frontend developer, backend developer, or full-stack engineer, HTML is where your journey begins.

**Career Opportunities**: HTML skills are required for countless jobs including web developer, UI/UX designer, content manager, email marketer, and more.

### How Browsers Process HTML

When you visit a website, here's what happens:

1. **Request**: Your browser sends a request to a web server
2. **Response**: The server sends back an HTML file
3. **Parsing**: The browser reads the HTML code line by line
4. **DOM Construction**: It builds a Document Object Model (tree structure)
5. **Rendering**: The browser displays the content on your screen
6. **Styling**: CSS is applied to make it look good
7. **Interaction**: JavaScript adds dynamic features

### HTML is NOT a Programming Language

This is an important distinction:

- **HTML is a markup language**: It describes structure and content
- **Programming languages** (like JavaScript, Python): Execute logic, calculations, and decisions

HTML cannot perform calculations, make decisions, or loop through data. It simply tells the browser "this is a heading," "this is a paragraph," "this is a link."

### The Evolution of HTML

HTML has evolved significantly since its creation:

- **1991**: HTML 1.0 - Basic tags for documents
- **1995**: HTML 2.0 - Standardized version
- **1997**: HTML 3.2 - Added tables, applets, text flow
- **1999**: HTML 4.01 - Stylesheets, scripting, frames
- **2014**: HTML5 - Modern semantic elements, multimedia, APIs

**HTML5** is the current standard and includes:
- Semantic elements (header, nav, article, footer)
- Native video and audio support
- Canvas for graphics
- Improved form controls
- Offline storage capabilities

### Your First HTML Document

Let's examine a complete HTML document:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Webpage</title>
</head>
<body>
    <h1>Welcome to DevNest</h1>
    <p>This is my first HTML page. I'm learning web development!</p>
    <p>HTML structures content, making it readable for both humans and machines.</p>
</body>
</html>
\`\`\`

**Breaking it down:**

- \`<!DOCTYPE html>\` - Declares HTML5 document type
- \`<html lang="en">\` - Root element, English language
- \`<head>\` - Contains metadata (info about the page)
- \`<meta charset="UTF-8">\` - Character encoding for international characters
- \`<meta name="viewport">\` - Makes page responsive on mobile devices
- \`<title>\` - Text shown in browser tab
- \`<body>\` - Contains all visible content
- \`<h1>\` - Main heading
- \`<p>\` - Paragraphs of text

### Common Beginner Questions

**Q: Do I need to memorize all HTML tags?**  
A: No! Start with the most common 20-30 tags. You'll naturally remember them through practice. Reference documentation when needed.

**Q: Can I use HTML offline?**  
A: Yes! HTML files work perfectly offline. Just open them in your browser.

**Q: How long does it take to learn HTML?**  
A: Basics can be learned in a few days. Mastery comes with building real projects over weeks.

**Q: What text editor should I use?**  
A: Any! Notepad works, but VS Code, Sublime Text, or Atom make it easier with syntax highlighting.

### Next Steps

Now that you understand what HTML is and why it matters, you're ready to:

1. Set up your development environment
2. Learn HTML document structure in depth
3. Master essential HTML elements
4. Build your first complete webpage

## Practice Challenge

**Goal**: Create your very first HTML page from scratch.

1. Open any text editor (Notepad, TextEdit, VS Code)
2. Create a new file named \`my-first-page.html\`
3. Type the HTML structure shown above
4. Replace "DevNest" with your own name
5. Add a third paragraph describing why you want to learn web development
6. Save the file
7. Double-click the file to open it in your browser
8. Verify that you see your heading and paragraphs displayed

**Success Criteria**: When you open the file in your browser, you should see:
- Your name as a large heading
- Two or three paragraphs of text
- The title in the browser tab

**Troubleshooting**:
- If the page shows HTML code instead of formatted text, make sure your file ends with \\`.html\\`
- If you see strange characters, check that you included \\`<meta charset="UTF-8">\\`
- If nothing appears, verify your content is between \\`<body>\\` and \\`</body>\\` tags\\`,
      codeExample: \\`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>DevNest Starter</title>
</head>
<body>
  <h1>Welcome to DevNest</h1>
  <p>This is my first HTML page.</p>
</body>
</html>\\`
    },
    {
      title: 'HTML Document Structure',
      order: 2,
      content: \\`# HTML Document Structure

## The Anatomy of Every HTML Page

Every valid HTML5 document follows a specific structure with required elements. Understanding this structure is crucial because it ensures your pages work consistently across all browsers and devices.

### The Document Type Declaration

\`\`\`html
<!DOCTYPE html>
\`\`\`

**What it does**: Tells the browser this document uses HTML5 standards.

**Why it matters**: Without it, browsers may enter "quirks mode" - rendering your page inconsistently and unpredictably. Always include this as the very first line.

**Historical context**: In older HTML versions (HTML 4), the DOCTYPE was long and complex. HTML5 simplified it to just \\`<!DOCTYPE html>\\`.

### The Root HTML Element

\`\`\`html
<html lang="en">
  <!-- All content goes inside html -->
</html>
\`\`\`

**The Root Container**: The \\`<html>\\` element wraps everything else in your document. Think of it as the box that contains your entire webpage.

**The lang Attribute**: Specifies the language of your content:
- \\`lang="en"\\` - English
- \\`lang="es"\\` - Spanish
- \\`lang="fr"\\` - French
- \\`lang="de"\\` - German

**Why lang matters**:
1. **Accessibility**: Screen readers use this to pronounce content correctly
2. **SEO**: Search engines use it to index your page appropriately
3. **Translation**: Browsers know what language to offer translation for
4. **Spell Check**: Text editors can use the right dictionary

### The Head Section - Document Metadata

The \\`<head>\\` section contains information **about** your page, not content **for** your page:

\`\`\`html
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Learn HTML structure fundamentals">
    <meta name="keywords" content="HTML, web development, tutorial">
    <meta name="author" content="Your Name">
    <title>My Webpage Title</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="icon" href="favicon.ico">
</head>
\`\`\`

#### Essential Meta Tags

**1. Character Encoding**
\`\`\`html
<meta charset="UTF-8">
\`\`\`
- Ensures proper display of international characters
- UTF-8 supports virtually all languages and symbols
- Always include this as the first element in \\`<head>\\`
- Without it: é, ñ, 中文  might display as gibberish

**2. Viewport Meta Tag**
\`\`\`html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
\`\`\`
- **Absolutely critical** for responsive design
- \\`width=device-width\\` - Page width matches screen width
- \\`initial-scale=1.0\\` - No zoom when page loads
- Without this, mobile browsers show desktop version zoomed out

**3. Description Meta Tag**
\`\`\`html
<meta name="description" content="A concise description of your page">
\`\`\`
- Shows up in Google search results under your page title
- Should be 150-160 characters
- Write compelling copy to encourage clicks
- Doesn't affect SEO ranking but improves click-through rate

**4. Page Title**
\`\`\`html
<title>Homepage - My Awesome Website</title>
\`\`\`
- Appears in browser tab
- Shows in search engine results
- Appears when page is bookmarked
- Should be 50-60 characters
- Format: "Page Name - Site Name"
- Most important for SEO after actual content

### The Body Section - Visible Content

The \\`<body>\\` element contains everything users see:

\`\`\`html
<body>
    <h1>Main Heading</h1>
    <p>This paragraph is visible to users.</p>
    <img src="photo.jpg" alt="Description">
    <a href="page2.html">Link to another page</a>
</body>
\`\`\`

**Key principle**: If you want users to see it, it goes in the \\`<body>\\`.

### Complete Document Structure

Here's a production-ready template you should use for every HTML page:

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Character encoding - ALWAYS first -->
    <meta charset="UTF-8">
    
    <!-- Viewport for responsive design -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- SEO meta tags -->
    <meta name="description" content="Your page description here">
    <meta name="keywords" content="relevant, keywords, here">
    <meta name="author" content="Your Name">
    
    <!-- Page title (required) -->
    <title>Page Title | Site Name</title>
    
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="favicon.png">
    
    <!-- Stylesheet -->
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- All visible content goes here -->
    <h1>Welcome to My Page</h1>
    <p>This is the main content area.</p>
</body>
</html>
\`\`\`

### Common Mistakes to Avoid

**❌ Forgetting DOCTYPE**
\`\`\`html
<html> <!-- Wrong! Missing DOCTYPE -->
\`\`\`

**✅ Always include DOCTYPE**
\`\`\`html
<!DOCTYPE html>
<html>
\`\`\`

**❌ Putting visible content in head**
\`\`\`html
<head>
    <title>My Page</title>
    <h1>Welcome</h1> <!-- Wrong! This won't display -->
</head>
\`\`\`

**✅ Visible content goes in body**
\`\`\`html
<head>
    <title>My Page</title>
</head>
<body>
    <h1>Welcome</h1> <!-- Correct! -->
</body>
\`\`\`

**❌ Missing closing tags**
\`\`\`html
<html>
<body>
    <h1>Title
<!-- Missing </body> and </html> -->
\`\`\`

**✅ Always close tags**
\`\`\`html
<html>
<body>
    <h1>Title</h1>
</body>
</html>
\`\`\`

### Best Practices

1. **Indentation**: Indent child elements for readability
2. **Comments**: Add comments to explain sections
3. **Lowercase**: Use lowercase for tags (not required but conventional)
4. **Quotes**: Always use quotes for attribute values
5. **Validation**: Run your HTML through a validator regularly

### Indentation Example

**Bad (no indentation):**
\`\`\`html
<html>
<head>
<title>Page</title>
</head>
<body>
<h1>Title</h1>
</body>
</html>
\`\`\`

**Good (proper indentation):**
\`\`\`html
<html>
  <head>
    <title>Page</title>
  </head>
  <body>
    <h1>Title</h1>
  </body>
</html>
\`\`\`

### Development Tools

**Text Editors**:
- VS Code (recommended for beginners)
- Sublime Text
- Atom
- Notepad++

**Browser DevTools**:
- Press F12 in any browser
- Inspect HTML structure
- See console errors
- Test responsive design

### Quick Reference

Every HTML page needs:
1. ✅ DOCTYPE declaration
2. ✅ html element with lang attribute
3. ✅ head element with charset and viewport
4. ✅ title element
5. ✅ body element

## Practice Challenge

**Create a Complete Personal Page**

1. Create a new file called \\`about-me.html\\`
2. Add the complete HTML5 structure with DOCTYPE
3. In the \\`<head>\\` section:
   - Set charset to UTF-8
   - Add viewport meta tag
   - Create a title: "About [Your Name]"
   - Add a description meta tag about yourself
4. In the \\`<body>\\` section:
   - Add an \\`<h1>\\` with your name
   - Add 3 paragraphs describing:
     - Who you are
     - What you're learning
     - Your goals
5. Validate your structure:
   - Check that all tags are properly opened and closed
   - Verify indentation is consistent
   - Ensure DOCTYPE is first
6. Open in browser and verify everything displays correctly

**Bonus Challenge**: 
- Add a \\`<meta name="author">\\` tag with your name
- Set the HTML lang attribute to your native language
- Add a favicon link (use any small .png image)\\`,
      codeExample: \\`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Structured Page</title>
</head>
<body>
  <h1>My Structured Page</h1>
  <p>This page has proper structure.</p>
  <p>It follows HTML5 best practices.</p>
</body>
</html>\\`
    },
    {
      title: 'Headings and Paragraphs',
      order: 3,
      content: \\`# Headings and Paragraphs

## Organizing Text Content

Headings create a hierarchy, while paragraphs hold readable blocks of text.

### Heading Levels

- \`<h1>\` is the main title.
- \`<h2>\` through \`<h6>\` are subheadings.
- Use heading order for accessibility and SEO.

### Paragraphs

1. Use \`<p>\` to wrap each paragraph.
2. Avoid line breaks for layout; use CSS later.

### Example: Article Intro

\`\`\`html
<h1>HTML Basics</h1>
<h2>Why Structure Matters</h2>
<p>Headings help readers scan a page quickly.</p>
<p>Paragraphs keep ideas grouped together.</p>
\`\`\`

The example shows a clear heading hierarchy and two paragraphs that explain the topic in readable chunks.

## Practice Challenge

1. Create a page with one \`<h1>\` and two \`<h2>\` headings.
2. Add at least three paragraphs under the headings.
3. Check that the heading order makes sense.\\`,
      codeExample: \\`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Headings and Paragraphs</title>
</head>
<body>
  <h1>Learning HTML</h1>
  <h2>Headings</h2>
  <p>Headings create a clear outline of your page.</p>
  <h2>Paragraphs</h2>
  <p>Paragraphs group sentences into readable blocks.</p>
  <p>Each paragraph should express one idea.</p>
</body>
</html>\\`
    },
    {
      title: 'Lists in HTML',
      order: 4,
      content: \\`# Lists in HTML

## Organizing Items Clearly

Lists group related items. Use ordered lists for steps and unordered lists for collections.

### Types of Lists

- **Unordered list** uses \`<ul>\` and \`<li>\`.
- **Ordered list** uses \`<ol>\` and \`<li>\`.
- **Description list** uses \`<dl>\`, \`<dt>\`, \`<dd>\`.

### Example: Learning Plan

\`\`\`html
<h2>HTML Study Plan</h2>
<ol>
  <li>Learn document structure</li>
  <li>Practice text elements</li>
  <li>Build a small project</li>
</ol>
\`\`\`

The ordered list shows steps in sequence, which is perfect for a learning plan.

## Practice Challenge

1. Create a page with one unordered list and one ordered list.
2. Use at least three items in each list.
3. Add headings above each list.\\`,
      codeExample: \\`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>HTML Lists</title>
</head>
<body>
  <h1>My Learning Resources</h1>
  <h2>Unordered List</h2>
  <ul>
    <li>MDN Web Docs</li>
    <li>Practice Projects</li>
    <li>DevNest Lessons</li>
  </ul>
  <h2>Ordered List</h2>
  <ol>
    <li>Read the lesson</li>
    <li>Code the example</li>
    <li>Complete the challenge</li>
  </ol>
</body>
</html>\\`
    },
    {
      title: 'Links and Navigation',
      order: 5,
      content: \\`# Links and Navigation

## Connecting Pages

Links use the \`<a>\` tag and the \`href\` attribute to point to another page or resource.

### Common Link Types

- External links (full URL)
- Internal links (relative paths)
- Email links (\`mailto:\`)

### Example: Simple Navigation

\`\`\`html
<nav>
  <a href="index.html">Home</a>
  <a href="about.html">About</a>
  <a href="contact.html">Contact</a>
</nav>
\`\`\`

The example uses a semantic \`<nav>\` container and relative paths for a multi-page site.

## Practice Challenge

1. Create a navigation bar with three links.
2. Point one link to a real website.
3. Add a \`mailto:\` link for your email.\\`,
      codeExample: \\`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>HTML Links</title>
</head>
<body>
  <nav>
    <a href="index.html">Home</a>
    <a href="https://developer.mozilla.org/">MDN Docs</a>
    <a href="mailto:hello@devnest.io">Email Us</a>
  </nav>
  <h1>Navigation Example</h1>
  <p>Use links to connect pages and resources.</p>
</body>
</html>\\`
    },
    {
      title: 'Images in HTML',
      order: 6,
      content: \\`# Images in HTML

## Adding Visual Content

Images use the \`<img>\` tag with \`src\` and \`alt\` attributes.

### Why Alt Text Matters

- Describes images for screen readers.
- Appears when the image fails to load.
- Improves SEO by describing content.

### Example: Profile Image

\`\`\`html
<img src="profile.jpg" alt="Portrait of the developer" width="240" height="240">
\`\`\`

The example includes a meaningful \`alt\` attribute and explicit dimensions to reduce layout shifting.

## Practice Challenge

1. Add an image to a page using a local file.
2. Write descriptive alt text.
3. Set width and height attributes.\\`,
      codeExample: \\`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>HTML Images</title>
</head>
<body>
  <h1>Profile</h1>
  <img src="images/profile.jpg" alt="Smiling developer wearing headphones" width="240" height="240">
  <p>This image includes descriptive alt text and sizing.</p>
</body>
</html>\\`
    }
    ]
  },
  {
    title: 'Structure & Semantic HTML',
    description: 'Use semantic elements to describe page meaning and layout.',
    order: 2,
    lessons: [
    {
      title: 'Div vs Span',
      order: 1,
      content: \\`# Div vs Span

## Block vs Inline

\`<div>\` is a block-level container, while \`<span>\` is inline. Use them when no semantic element fits.

### When to Use Each

- \`<div>\` wraps sections or groups of elements.
- \`<span>\` wraps a small piece of text inside a paragraph.

### Example: Highlighting Text

\`\`\`html
<p>Learn <span>semantic HTML</span> to improve accessibility.</p>
\`\`\`

The example highlights a phrase using \`<span>\`. Later, CSS can style that phrase without changing structure.

## Practice Challenge

1. Create a page with two \`<div>\` sections.
2. Use \`<span>\` to emphasize a word in a paragraph.
3. Keep the structure readable without CSS.\\`,
      codeExample: \\`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Div vs Span</title>
</head>
<body>
  <div>
    <h1>DevNest</h1>
    <p>Build your skills with <span>structured</span> learning.</p>
  </div>
  <div>
    <h2>Next Steps</h2>
    <p>Practice semantic elements after mastering div and span.</p>
  </div>
</body>
</html>\\`
    },
    {
      title: 'Semantic Elements Overview',
      order: 2,
      content: \\`# Semantic Elements Overview

## Meaningful Structure

Semantic tags describe the role of content, making pages easier to navigate and understand.

### Core Semantic Tags

- \`<header>\` for introductory content
- \`<nav>\` for navigation links
- \`<main>\` for primary content
- \`<section>\` for thematic grouping
- \`<article>\` for self-contained items
- \`<footer>\` for closing content

### Example: Page Skeleton

\`\`\`html
<header>
  <h1>DevNest Blog</h1>
</header>
<nav>
  <a href="/">Home</a>
  <a href="/articles">Articles</a>
</nav>
<main>
  <section>
    <h2>Latest Posts</h2>
  </section>
</main>
<footer>
  <p>Copyright 2026</p>
</footer>
\`\`\`

The example clarifies the purpose of each region, which helps accessibility tools and SEO.

## Practice Challenge

1. Build a page skeleton using all six semantic tags.
2. Add a heading in header and a paragraph in footer.
3. Keep content minimal and well structured.\\`,
      codeExample: \\`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Semantic Layout</title>
</head>
<body>
  <header>
    <h1>Semantic Layout</h1>
    <p>Use tags that describe meaning.</p>
  </header>
  <nav>
    <a href="/">Home</a>
    <a href="/courses">Courses</a>
  </nav>
  <main>
    <section>
      <h2>Featured Content</h2>
      <article>
        <h3>HTML Essentials</h3>
        <p>Learn the basics of semantic markup.</p>
      </article>
    </section>
  </main>
  <footer>
    <p>DevNest Learning Platform</p>
  </footer>
</body>
</html>\\`
    },
    {
      title: 'Header, Nav, Main, Section, Article, Footer',
      order: 3,
      content: \\`# Header, Nav, Main, Section, Article, Footer

## Building a Real Layout

These semantic elements work together to create clear page structure.

### Roles in a Layout

1. \`<header>\` introduces the page or section.
2. \`<nav>\` groups navigation links.
3. \`<main>\` wraps primary content only once per page.
4. \`<section>\` groups related content.
5. \`<article>\` contains standalone content.
6. \`<footer>\` closes a page or section.

### Example: Article Page

\`\`\`html
<main>
  <section>
    <article>
      <h2>HTML Semantics</h2>
      <p>Semantic tags help screen readers.</p>
    </article>
  </section>
</main>
\`\`\`

The example nests an \`article\` inside a \`section\`, showing a common content hierarchy.

## Practice Challenge

1. Create a layout using all six elements.
2. Put two articles inside one section.
3. Add a footer note with the current year.\\`,
      codeExample: \\`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Semantic Page</title>
</head>
<body>
  <header>
    <h1>DevNest Journal</h1>
  </header>
  <nav>
    <a href="/">Home</a>
    <a href="/journal">Journal</a>
    <a href="/about">About</a>
  </nav>
  <main>
    <section>
      <h2>Latest Articles</h2>
      <article>
        <h3>HTML Structure</h3>
        <p>Clear structure improves readability.</p>
      </article>
      <article>
        <h3>Semantic Tags</h3>
        <p>Tags communicate meaning to browsers.</p>
      </article>
    </section>
  </main>
  <footer>
    <p>Copyright 2026 DevNest</p>
  </footer>
</body>
</html>\\`
    },
    {
      title: 'HTML Tables',
      order: 4,
      content: \\`# HTML Tables

## Displaying Tabular Data

Tables are used for data, not layout. Use \`<table>\` with \`<thead>\`, \`<tbody>\`, and \`<tr>\` rows.

### Core Table Elements

- \`<table>\` wraps the table
- \`<tr>\` is a row
- \`<th>\` is a header cell
- \`<td>\` is a data cell

### Example: Course Schedule

\`\`\`html
<table>
  <thead>
    <tr>
      <th>Week</th>
      <th>Topic</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>HTML Basics</td>
    </tr>
  </tbody>
</table>
\`\`\`

The example separates headers from data, which improves accessibility and clarity.

## Practice Challenge

1. Build a table with three columns and two rows.
2. Use \`<thead>\` and \`<tbody>\`.
3. Label each column with \`<th>\`.\\`,
      codeExample: \\`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>HTML Tables</title>
</head>
<body>
  <h1>Course Modules</h1>
  <table>
    <thead>
      <tr>
        <th>Module</th>
        <th>Title</th>
        <th>Lessons</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1</td>
        <td>HTML Fundamentals</td>
        <td>6</td>
      </tr>
      <tr>
        <td>2</td>
        <td>Semantic HTML</td>
        <td>6</td>
      </tr>
    </tbody>
  </table>
</body>
</html>\\`
    },
    {
      title: 'Layout Best Practices',
      order: 5,
      content: \\`# Layout Best Practices

## Clear, Readable Structure

Layout in HTML focuses on meaningful structure before styling.

### Best Practices

- Use semantic elements before \`<div>\`.
- Keep headings in a logical order.
- Group related content in sections.
- Keep navigation consistent across pages.

### Example: Clean Layout Structure

\`\`\`html
<main>
  <section>
    <h2>Features</h2>
    <ul>
      <li>Structured content</li>
      <li>Accessible markup</li>
    </ul>
  </section>
</main>
\`\`\`

The example shows a single-purpose section with a heading and list. This pattern scales well in real projects.

## Practice Challenge

1. Create a page with header, main, and footer.
2. Add two sections inside main.
3. Use headings and lists to organize content.\\`,
      codeExample: \\`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Layout Best Practices</title>
</head>
<body>
  <header>
    <h1>DevNest Layout Guide</h1>
  </header>
  <main>
    <section>
      <h2>Core Principles</h2>
      <ul>
        <li>Use semantic elements</li>
        <li>Keep structure consistent</li>
      </ul>
    </section>
    <section>
      <h2>Common Patterns</h2>
      <ul>
        <li>Hero section</li>
        <li>Feature list</li>
      </ul>
    </section>
  </main>
  <footer>
    <p>Structured markup makes styling easier later.</p>
  </footer>
</body>
</html>\\`
    },
    {
      title: 'Div-Based Layouts vs Semantic Layouts',
      order: 6,
      content: \\`# Div-Based Layouts vs Semantic Layouts

## Choosing Meaningful Markup

You can build layouts with \`<div>\` tags, but semantic tags provide better meaning for tools and humans.

### Comparison

1. Div-based layouts are generic.
2. Semantic layouts describe purpose.
3. Assistive technologies prefer semantic layouts.

### Example: Same Layout, Better Meaning

\`\`\`html
<header>
  <h1>Product Updates</h1>
</header>
<main>
  <article>
    <h2>New Features</h2>
    <p>We shipped three improvements this week.</p>
  </article>
</main>
\`\`\`

This example is more descriptive than a set of generic divs and improves navigation for screen readers.

## Practice Challenge

1. Create a simple page using only divs.
2. Replace the divs with semantic elements.
3. Compare readability by scanning the HTML file.\\`,
      codeExample: \\`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Semantic vs Div</title>
</head>
<body>
  <header>
    <h1>Weekly Update</h1>
  </header>
  <main>
    <section>
      <article>
        <h2>Feature Highlights</h2>
        <p>Faster load times and better navigation.</p>
      </article>
    </section>
  </main>
  <footer>
    <p>Read more updates next week.</p>
  </footer>
</body>
</html>\\`
    }
    ]
  },
  {
    title: 'Forms & User Input',
    description: 'Collect and validate user input with HTML forms.',
    order: 3,
    lessons: [
    {
      title: 'Form Tag and Submission',
      order: 1,
      content: \\`# Form Tag and Submission

## The Form Container

The \`<form>\` tag groups input elements and sends data to a server.

### Key Attributes

- \`action\` sets the submission URL.
- \`method\` chooses GET or POST.
- \`name\` helps identify the form.

### GET vs POST

1. **GET** appends data to the URL (good for searches).
2. **POST** sends data in the request body (better for sensitive data).

### Example: Search Form

\`\`\`html
<form action="/search" method="get">
  <label for="q">Search</label>
  <input id="q" name="q" type="text">
  <button type="submit">Go</button>
</form>
\`\`\`

The example uses GET because search queries can be shared in the URL.

## Practice Challenge

1. Create a form that uses POST.
2. Add a text input and submit button.
3. Set a clear action URL like \`/signup\`.\\`,
      codeExample: \\`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Form Basics</title>
</head>
<body>
  <h1>Sign Up</h1>
  <form action="/signup" method="post">
    <label for="name">Full Name</label>
    <input id="name" name="name" type="text">
    <button type="submit">Create Account</button>
  </form>
</body>
</html>\\`
    },
    {
      title: 'Input Types: Text, Email, Password',
      order: 2,
      content: \\`# Input Types: Text, Email, Password

## Choosing the Right Input

Input types help browsers validate and display the right keyboard on mobile.

### Common Types

- \`text\` for general text
- \`email\` for email addresses
- \`password\` for hidden text

### Example: Login Form

\`\`\`html
<form>
  <label for="email">Email</label>
  <input id="email" name="email" type="email">
  <label for="password">Password</label>
  <input id="password" name="password" type="password">
</form>
\`\`\`

The email input triggers email validation and the password input hides typed characters.

## Practice Challenge

1. Create a login form with email and password fields.
2. Add labels for both inputs.
3. Add a submit button with clear text.\\`,
      codeExample: \\`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Login Form</title>
</head>
<body>
  <h1>Log In</h1>
  <form action="/login" method="post">
    <label for="email">Email</label>
    <input id="email" name="email" type="email" required>
    <label for="password">Password</label>
    <input id="password" name="password" type="password" required>
    <button type="submit">Log In</button>
  </form>
</body>
</html>\\`
    },
    {
      title: 'Input Types: Number, Date, Color',
      order: 3,
      content: \\`# Input Types: Number, Date, Color

## Specialized Inputs

Use specialized input types to help users provide correct data.

### When to Use Them

- \`number\` for numeric values
- \`date\` for calendar selection
- \`color\` for color pickers

### Example: Profile Settings

\`\`\`html
<label for="age">Age</label>
<input id="age" name="age" type="number" min="1" max="120">
\`\`\`

The number input adds browser controls and constraints for valid ages.

## Practice Challenge

1. Create a form with number, date, and color inputs.
2. Add labels for each input.
3. Set a min and max for the number input.\\`,
      codeExample: \\`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Special Inputs</title>
</head>
<body>
  <h1>Profile Preferences</h1>
  <form action="/profile" method="post">
    <label for="age">Age</label>
    <input id="age" name="age" type="number" min="1" max="120">
    <label for="birthday">Birthday</label>
    <input id="birthday" name="birthday" type="date">
    <label for="accent">Accent Color</label>
    <input id="accent" name="accent" type="color" value="#0a84ff">
    <button type="submit">Save</button>
  </form>
</body>
</html>\\`
    },
    {
      title: 'Textarea and Select',
      order: 4,
      content: \\`# Textarea and Select

## Multi-Line and Choice Inputs

Use \`<textarea>\` for longer text and \`<select>\` for dropdown choices.

### Key Notes

- \`textarea\` uses rows and cols for default size.
- \`select\` contains \`option\` elements.
- Provide clear labels for accessibility.

### Example: Feedback Form

\`\`\`html
<label for="topic">Topic</label>
<select id="topic" name="topic">
  <option value="html">HTML</option>
  <option value="css">CSS</option>
</select>
\`\`\`

The select input lists options so the user can pick a single topic.

## Practice Challenge

1. Create a form with a textarea and a select dropdown.
2. Add at least three options.
3. Add a placeholder text in the textarea.\\`,
      codeExample: \\`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Textarea and Select</title>
</head>
<body>
  <h1>Send Feedback</h1>
  <form action="/feedback" method="post">
    <label for="topic">Topic</label>
    <select id="topic" name="topic">
      <option value="html">HTML</option>
      <option value="css">CSS</option>
      <option value="javascript">JavaScript</option>
    </select>
    <label for="message">Message</label>
    <textarea id="message" name="message" rows="5" cols="30">Write your feedback here.</textarea>
    <button type="submit">Submit</button>
  </form>
</body>
</html>\\`
    },
    {
      title: 'Radio Buttons and Checkboxes',
      order: 5,
      content: \\`# Radio Buttons and Checkboxes

## Choosing One vs Many

Radio buttons allow a single selection, while checkboxes allow multiple selections.

### Guidelines

- Use \`name\` to group radio buttons.
- Use \`value\` to capture selections.
- Wrap each input with a clear label.

### Example: Subscription Options

\`\`\`html
<input type="radio" name="plan" value="basic" id="basic">
<label for="basic">Basic</label>
\`\`\`

All radio inputs with the same \`name\` belong to one group, so only one can be selected.

## Practice Challenge

1. Create a form with a radio group for plan selection.
2. Add two checkboxes for newsletter topics.
3. Add a submit button.\\`,
      codeExample: \\`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Radio and Checkbox</title>
</head>
<body>
  <h1>Subscription</h1>
  <form action="/subscribe" method="post">
    <fieldset>
      <legend>Plan</legend>
      <input type="radio" name="plan" value="basic" id="basic">
      <label for="basic">Basic</label>
      <input type="radio" name="plan" value="pro" id="pro">
      <label for="pro">Pro</label>
    </fieldset>
    <fieldset>
      <legend>Topics</legend>
      <input type="checkbox" name="topics" value="html" id="topic-html">
      <label for="topic-html">HTML</label>
      <input type="checkbox" name="topics" value="accessibility" id="topic-accessibility">
      <label for="topic-accessibility">Accessibility</label>
    </fieldset>
    <button type="submit">Continue</button>
  </form>
</body>
</html>\\`
    },
    {
      title: 'Form Validation: Required and Pattern',
      order: 6,
      content: \\`# Form Validation: Required and Pattern

## Built-In Validation

HTML can validate inputs before submission using attributes.

### Useful Attributes

- \`required\` prevents empty submissions.
- \`pattern\` enforces a regex format.
- \`minlength\` and \`maxlength\` control length.

### Example: Username Validation

\`\`\`html
<input type="text" name="username" required pattern="[a-zA-Z0-9]{3,12}">
\`\`\`

This input requires a username that is 3 to 12 characters with letters or numbers only.

## Practice Challenge

1. Add a required email field and a required username field.
2. Use a pattern to restrict the username format.
3. Test the validation by submitting empty fields.\\`,
      codeExample: \\`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Form Validation</title>
</head>
<body>
  <h1>Create Account</h1>
  <form action="/register" method="post">
    <label for="username">Username</label>
    <input id="username" name="username" type="text" required pattern="[a-zA-Z0-9]{3,12}">
    <label for="email">Email</label>
    <input id="email" name="email" type="email" required>
    <button type="submit">Register</button>
  </form>
</body>
</html>\\`
    }
    ]
  },
  {
    title: 'Media, SEO & Accessibility',
    description: 'Embed media and build pages that are discoverable and accessible.',
    order: 4,
    lessons: [
        {
          title: 'Video Element',
      order: 1,
      content: \\`# HTML Video

## Embedding Video Content

The \`<video>\` element displays video files with built-in controls.

### Best Practices

- Use \`controls\` for play and pause.
- Provide a fallback message.
- Set width and height for layout stability.

### Example: Video Player

\`\`\`html
<video controls width="640">
  <source src="intro.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>
\`\`\`

The example provides a source file and a fallback message for older browsers.

## Practice Challenge

1. Add a video element with controls.
2. Include a fallback message.
3. Set a reasonable width like 640.\\`,
      codeExample: \\`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>HTML Video</title>
</head>
<body>
  <h1>Product Demo</h1>
  <video controls width="640">
    <source src="media/demo.mp4" type="video/mp4">
    Your browser does not support the video tag.
  </video>
</body>
</html>\\`
    },
    {
      title: 'Audio in HTML',
      order: 2,
      content: \\`# HTML Audio

## Adding Sound

The \`<audio>\` element embeds sound files with play controls.

### Use Cases

- Podcasts
- Music previews
- Voice notes

### Example: Audio Player

\`\`\`html
<audio controls>
  <source src="theme.mp3" type="audio/mpeg">
  Your browser does not support the audio element.
</audio>
\`\`\`

The example includes controls and a fallback message for unsupported browsers.

## Practice Challenge

1. Add an audio player to a page.
2. Use an MP3 file source.
3. Include a fallback message.\\`,
      codeExample: \\`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>HTML Audio</title>
</head>
<body>
  <h1>Audio Preview</h1>
  <audio controls>
    <source src="media/preview.mp3" type="audio/mpeg">
    Your browser does not support the audio element.
  </audio>
</body>
</html>\\`
    },
    {
      title: 'Iframes and Embedded Content',
      order: 3,
      content: \\`# Iframes and Embedded Content

## Embedding External Pages

An \`<iframe>\` embeds another webpage or media inside your page.

### Considerations

- Use \`title\` for accessibility.
- Set width and height.
- Only embed trusted sources.

### Example: Map Embed

\`\`\`html
<iframe title="Office Map" src="https://example.com/map" width="600" height="400"></iframe>
\`\`\`

The title describes the embedded content for screen readers.

## Practice Challenge

1. Embed an external page using an iframe.
2. Add a descriptive title attribute.
3. Set width and height values.\\`,
      codeExample: \\`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Iframe Example</title>
</head>
<body>
  <h1>Office Location</h1>
  <iframe title="Office Map" src="https://example.com/map" width="600" height="400"></iframe>
</body>
</html>\\`
    },
    {
      title: 'Meta Tags for SEO',
      order: 4,
      content: \\`# Meta Tags for SEO

## Helping Search Engines

Meta tags provide metadata for browsers and search engines.

### Essential Meta Tags

- \`charset\` for encoding
- \`viewport\` for responsive design
- \`description\` for search snippets

### Example: Basic Meta Setup

\`\`\`html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="Learn HTML with DevNest">
\`\`\`

The description meta tag often appears under your page title in search results.

## Practice Challenge

1. Add charset, viewport, and description meta tags.
2. Write a concise description under 160 characters.
3. Confirm the title and description make sense together.\\`,
      codeExample: \\`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="DevNest teaches HTML from beginner to intermediate level.">
  <title>DevNest HTML Course</title>
</head>
<body>
  <h1>Meta Tags in Action</h1>
  <p>Check the page source to see the meta tags.</p>
</body>
</html>\\`
    },
    {
      title: 'SEO Basics for HTML',
      order: 5,
      content: \\`# SEO Basics for HTML

## Make Content Discoverable

Good HTML structure helps search engines understand your content.

### SEO-Friendly Practices

- Use a single \`<h1>\` per page.
- Use descriptive link text.
- Include meaningful alt text for images.
- Structure content with headings.

### Example: SEO-Friendly Article

\`\`\`html
<h1>HTML for Beginners</h1>
<p>Learn the basics of HTML for modern web development.</p>
<h2>Why Structure Matters</h2>
<p>Search engines rely on headings to understand sections.</p>
\`\`\`

The example uses a clear heading hierarchy to describe the topic to both readers and search engines.

## Practice Challenge

1. Create a page with one \`<h1>\` and two \`<h2>\` headings.
2. Add descriptive link text instead of "click here".
3. Add an image with alt text.\\`,
      codeExample: \\`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>SEO Basics</title>
</head>
<body>
  <h1>HTML for Beginners</h1>
  <p>Learn the basics of HTML for modern web development.</p>
  <h2>Why Structure Matters</h2>
  <p>Headings clarify topics for readers and search engines.</p>
  <a href="/courses/html">View the full HTML course</a>
  <img src="images/html-course.jpg" alt="Laptop showing HTML code" width="300" height="200">
</body>
</html>\\`
    },
    {
      title: 'Accessibility Basics: ARIA and Alt Text',
      order: 6,
      content: \\`# Accessibility Basics: ARIA and Alt Text

## Inclusive HTML

Accessible pages work for everyone, including users with assistive technologies.

### Key Accessibility Practices

- Use semantic elements whenever possible.
- Add meaningful \`alt\` text for images.
- Use ARIA attributes when native elements are not enough.

### Example: Accessible Button

\`\`\`html
<button aria-label="Open navigation menu">Menu</button>
\`\`\`

The ARIA label provides a clear name for screen readers when the button text is too short.

## Practice Challenge

1. Add alt text to two images on a page.
2. Use an ARIA label on a button or icon.
3. Check that labels describe the purpose clearly.\\`,
      codeExample: \\`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Accessibility Basics</title>
</head>
<body>
  <h1>Accessible Gallery</h1>
  <button aria-label="Open navigation menu">Menu</button>
  <figure>
    <img src="images/workspace.jpg" alt="Developer workspace with laptop and notes" width="320" height="200">
    <figcaption>Workspace setup for coding sessions.</figcaption>
  </figure>
  <figure>
    <img src="images/meeting.jpg" alt="Team meeting around a whiteboard" width="320" height="200">
    <figcaption>Collaborative planning session.</figcaption>
  </figure>
</body>
</html>\\`
    }
    ]
  },
  {
    title: 'Real-World Projects',
    description: 'Apply HTML skills to complete, realistic projects.',
    order: 5,
    lessons: [
    {
      title: 'Project: Personal Portfolio Page',
      order: 1,
      content: \\`# Project: Personal Portfolio Page

## Showcase Your Skills

Build a single-page portfolio with a hero, about section, and project list.

### Page Sections

- Hero with name and tagline
- About section with bio
- Projects list
- Contact links

### Example: Portfolio Structure

\`\`\`html
<main>
  <section>
    <h2>Projects</h2>
    <ul>
      <li>Responsive Landing Page</li>
      <li>HTML Blog Layout</li>
    </ul>
  </section>
</main>
\`\`\`

The example shows a semantic section with a heading and a list of projects.

## Practice Challenge

1. Create a portfolio page with four sections.
2. Add at least two projects in a list.
3. Include contact links in the footer.\\`,
      codeExample: \\`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Portfolio</title>
</head>
<body>
  <header>
    <h1>Alex Rivera</h1>
    <p>Frontend developer focused on clean HTML.</p>
  </header>
  <main>
    <section>
      <h2>About</h2>
      <p>I build semantic, accessible web pages.</p>
    </section>
    <section>
      <h2>Projects</h2>
      <ul>
        <li>Responsive Landing Page</li>
        <li>HTML Blog Layout</li>
      </ul>
    </section>
    <section>
      <h2>Skills</h2>
      <ul>
        <li>HTML5</li>
        <li>Accessibility</li>
        <li>SEO Basics</li>
      </ul>
    </section>
  </main>
  <footer>
    <p>Contact: alex@example.com</p>
  </footer>
</body>
</html>\\`
    },
    {
      title: 'Project: Blog Layout',
      order: 2,
      content: \\`# Project: Blog Layout

## Build a Readable Blog

Create a blog page with a header, article list, and sidebar.

### Layout Elements

- Header with blog title
- Main section with articles
- Aside for categories or about text
- Footer with copyright

### Example: Article List

\`\`\`html
<section>
  <article>
    <h2>Understanding HTML</h2>
    <p>Learn how structure improves readability.</p>
  </article>
</section>
\`\`\`

The article element represents a standalone post, which is perfect for blog entries.

## Practice Challenge

1. Create three article entries.
2. Add an aside with categories.
3. Include a footer with the current year.\\`,
      codeExample: \\`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Blog Layout</title>
</head>
<body>
  <header>
    <h1>DevNest Blog</h1>
    <p>Thoughts on HTML and web structure.</p>
  </header>
  <main>
    <section>
      <article>
        <h2>Understanding HTML</h2>
        <p>Structure makes content easier to read and index.</p>
      </article>
      <article>
        <h2>Semantic Tags</h2>
        <p>Use tags that describe meaning, not just layout.</p>
      </article>
      <article>
        <h2>Accessible Markup</h2>
        <p>Accessibility is a key part of modern web development.</p>
      </article>
    </section>
    <aside>
      <h2>Categories</h2>
      <ul>
        <li>HTML</li>
        <li>Accessibility</li>
        <li>SEO</li>
      </ul>
    </aside>
  </main>
  <footer>
    <p>Copyright 2026 DevNest</p>
  </footer>
</body>
</html>\\`
    },
    {
      title: 'Project: Contact Form Page',
      order: 3,
      content: \\`# Project: Contact Form Page

## Collect User Messages

Build a contact page with form fields, labels, and validation.

### Required Fields

- Name
- Email
- Message
- Topic selection

### Example: Form Section

\`\`\`html
<form action="/contact" method="post">
  <label for="name">Name</label>
  <input id="name" name="name" type="text" required>
</form>
\`\`\`

The example uses a required field and an explicit label for accessibility.

## Practice Challenge

1. Add required fields for name and email.
2. Add a textarea for the message.
3. Include a select dropdown for topics.\\`,
      codeExample: \\`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Contact Page</title>
</head>
<body>
  <header>
    <h1>Contact DevNest</h1>
  </header>
  <main>
    <form action="/contact" method="post">
      <label for="name">Name</label>
      <input id="name" name="name" type="text" required>
      <label for="email">Email</label>
      <input id="email" name="email" type="email" required>
      <label for="topic">Topic</label>
      <select id="topic" name="topic">
        <option value="support">Support</option>
        <option value="feedback">Feedback</option>
        <option value="partnership">Partnership</option>
      </select>
      <label for="message">Message</label>
      <textarea id="message" name="message" rows="5" cols="30"></textarea>
      <button type="submit">Send Message</button>
    </form>
  </main>
</body>
</html>\\`
    },
    {
      title: 'Project: Landing Page Structure',
      order: 4,
      content: \\`# Project: Landing Page Structure

## Convert Visitors to Users

Landing pages focus on a clear message, benefits, and a call to action.

### Typical Sections

- Hero section with headline
- Feature list
- Social proof
- Call to action

### Example: Feature Section

\`\`\`html
<section>
  <h2>Why DevNest</h2>
  <ul>
    <li>Clear HTML lessons</li>
    <li>Practical projects</li>
  </ul>
</section>
\`\`\`

The feature section highlights benefits in a scannable list.

## Practice Challenge

1. Build a landing page with hero and features sections.
2. Add a call-to-action button.
3. Include a footer with contact info.\\`,
      codeExample: \\`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>DevNest Landing</title>
</head>
<body>
  <header>
    <h1>Learn HTML the Right Way</h1>
    <p>Build strong foundations with DevNest.</p>
    <a href="/signup">Start Learning</a>
  </header>
  <main>
    <section>
      <h2>Why DevNest</h2>
      <ul>
        <li>Structured lessons</li>
        <li>Real projects</li>
        <li>Accessible content</li>
      </ul>
    </section>
    <section>
      <h2>Success Stories</h2>
      <p>Thousands of learners have built their first websites.</p>
    </section>
  </main>
  <footer>
    <p>Contact: hello@devnest.io</p>
  </footer>
</body>
</html>\\`
    },
    {
      title: 'Project: Multi-Page Website',
      order: 5,
      content: \\`# Project: Multi-Page Website

## Build a Small Site

Create a site with separate pages linked together using navigation.

### Site Requirements

- Home page
- About page
- Contact page
- Shared navigation

### Example: Navigation Links

\`\`\`html
<nav>
  <a href="index.html">Home</a>
  <a href="about.html">About</a>
  <a href="contact.html">Contact</a>
</nav>
\`\`\`

This navigation appears on every page to make the site easy to explore.

## Practice Challenge

1. Create three HTML files: index, about, contact.
2. Add the same navigation to each file.
3. Add unique content on each page.\\`,
      codeExample: \\`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Multi-Page Site - Home</title>
</head>
<body>
  <nav>
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
    <a href="contact.html">Contact</a>
  </nav>
  <main>
    <h1>Welcome to My Site</h1>
    <p>This is the home page of a multi-page website.</p>
  </main>
</body>
</html>\\`
    },
    {
      title: 'Project: Final Review and Checklist',
      order: 6,
      content: \\`# Project: Final Review and Checklist

## Validate Your Work

Use a checklist to make sure your HTML projects are complete and consistent.

### Final Checklist

- All pages include proper HTML structure.
- Navigation links work across pages.
- Headings are in correct order.
- Images include descriptive alt text.
- Forms include labels and validation.

### Example: Final Page Audit

\`\`\`html
<footer>
  <p>Validated with HTML best practices.</p>
</footer>
\`\`\`

The footer note is a simple reminder that you reviewed the structure and accessibility of the page.

## Practice Challenge

1. Review your projects and fix any missing alt text.
2. Validate navigation links for all pages.
3. Run through the checklist and note improvements.\\`,
      codeExample: \\`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Final Review</title>
</head>
<body>
  <header>
    <h1>Project Review</h1>
  </header>
  <main>
    <section>
      <h2>Checklist</h2>
      <ul>
        <li>Structure valid</li>
        <li>Navigation consistent</li>
        <li>Alt text complete</li>
        <li>Forms labeled</li>
      </ul>
    </section>
  </main>
  <footer>
    <p>Validated with HTML best practices.</p>
  </footer>
</body>
</html>\\`
    }
    ]
  }
  ]
};

module.exports = htmlCourseData;

