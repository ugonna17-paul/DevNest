# COMPLETE HTML COURSE - ALL 32 LESSONS
## Production-Ready Course Structure

**Course:** HTML Fundamentals  
**Total Modules:** 5  
**Total Lessons:** 32  
**Duration:** 15 hours

---

## MODULE 1: HTML FUNDAMENTALS (7 Lessons)

### Lesson 1: What is HTML? (15 min)
### Lesson 2: HTML Document Structure (20 min)
### Lesson 3: Headings and Paragraphs (25 min)
### Lesson 4: Lists in HTML (25 min)
### Lesson 5: Links and Navigation (30 min)
### Lesson 6: Images in HTML (30 min)
### Lesson 7: Comments and Best Practices (25 min)

---

## MODULE 2: STRUCTURE & SEMANTIC HTML (5 Lessons)

### Lesson 1: Div vs Span (25 min)
**Content:** Understanding generic vs semantic elements, when to use div/span, block vs inline elements

### Lesson 2: Semantic HTML5 Elements (35 min)
**Content:** header, nav, main, section, article, aside, footer, figure, figcaption, time, mark, address

### Lesson 3: HTML Tables (30 min)
**Content:** table, thead, tbody, tfoot, tr, th, td, colspan, rowspan, caption, scope

### Lesson 4: Page Layout Best Practices (30 min)
**Content:** Modern page layout patterns, container patterns, header/footer patterns, mobile-first approach

### Lesson 5: HTML Entities and Special Characters (20 min)
**Content:** &copy;, &nbsp;, &lt;, &gt;, &amp;, character codes, Unicode entities

---

## MODULE 3: FORMS & USER INPUT (7 Lessons)

### Lesson 1: Form Basics (30 min)
**Content:** form, action, method (GET vs POST), label, input basics, button, fieldset, legend

### Lesson 2: Input Types - Text, Email, Password (25 min)
**Content:** text, email, password, search, url, tel input types with validation

### Lesson 3: Input Types - Numbers, Dates, Colors (25 min)
**Content:** number, range, date, datetime-local, month, week, time, color inputs

### Lesson 4: Textarea, Select, and Radio Buttons (30 min)
**Content:** textarea, select/option, optgroup, radio buttons, name grouping

### Lesson 5: Checkboxes and Form Groups (25 min)
**Content:** checkbox inputs, multiple selections, form organization, fieldsets

### Lesson 6: HTML5 Form Validation (30 min)
**Content:** required, pattern, min/max, minlength/maxlength, type validation, custom messages

### Lesson 7: Advanced Form Patterns (35 min)
**Content:** autocomplete, autofocus, disabled/readonly, form attribute, datalist, output

---

## MODULE 4: MEDIA, SEO & ACCESSIBILITY (7 Lessons)

### Lesson 1: HTML5 Video Element (30 min)
**Content:** video, source, controls, autoplay, loop, poster, multiple formats (MP4, WebM, Ogg)

### Lesson 2: HTML5 Audio Element (25 min)
**Content:** audio, source, controls, autoplay, loop, preload, multiple formats

### Lesson 3: Iframes and Embedded Content (25 min)
**Content:** iframe, embed, object, embedding YouTube, Google Maps, sandboxing

### Lesson 4: SEO Fundamentals with HTML (35 min)
**Content:** Title tags, meta descriptions, heading hierarchy, semantic HTML, structured data basics

### Lesson 5: Meta Tags and Open Graph (30 min)
**Content:** og:title, og:description, og:image, Twitter cards, social media preview optimization

### Lesson 6: Accessibility Basics (ARIA) (35 min)
**Content:** ARIA roles, labels, landmarks, alt text, keyboard navigation, screen reader testing

### Lesson 7: Responsive Images and srcset (30 min)
**Content:** srcset, sizes attribute, picture element, art direction, responsive image strategies

---

## MODULE 5: REAL-WORLD PROJECTS (6 Lessons)

### Lesson 1: Project - Personal Portfolio Page (60 min)
**Content:** Complete portfolio page with header, about section, skills, projects, contact form

### Lesson 2: Project - Blog Layout (60 min)
**Content:** Blog homepage with article cards, sidebar, pagination, semantic structure

### Lesson 3: Project - Contact Form Page (45 min)
**Content:** Complete contact form with validation, multiple input types, real-world patterns

### Lesson 4: Project - Product Landing Page (60 min)
**Content:** Marketing landing page with hero, features, testimonials, CTA, responsive images

### Lesson 5: Project - Multi-Page Website (90 min)
**Content:** Connected multi-page site with navigation, consistent header/footer, internal linking

### Lesson 6: Best Practices and Code Review (45 min)
**Content:** HTML validation, accessibility audit, SEO checklist, performance optimization, debugging

---

## QUICK REFERENCE: All Lesson Titles

1. What is HTML?
2. HTML Document Structure
3. Headings and Paragraphs
4. Lists in HTML
5. Links and Navigation
6. Images in HTML
7. Comments and Best Practices
8. Div vs Span
9. Semantic HTML5 Elements
10. HTML Tables
11. Page Layout Best Practices
12. HTML Entities and Special Characters
13. Form Basics
14. Input Types - Text, Email, Password
15. Input Types - Numbers, Dates, Colors
16. Textarea, Select, and Radio Buttons
17. Checkboxes and Form Groups
18. HTML5 Form Validation
19. Advanced Form Patterns
20. HTML5 Video Element
21. HTML5 Audio Element
22. Iframes and Embedded Content
23. SEO Fundamentals with HTML
24. Meta Tags and Open Graph
25. Accessibility Basics (ARIA)
26. Responsive Images and srcset
27. Project - Personal Portfolio Page
28. Project - Blog Layout
29. Project - Contact Form Page
30. Project - Product Landing Page
31. Project - Multi-Page Website
32. Best Practices and Code Review

---

## IMPLEMENTATION NOTES

Each lesson should include:
- **title** - Lesson name
- **content** - Full markdown content with headings, lists, code blocks
- **codeExample** - Complete, runnable HTML example (separate field)
- **duration** - Time in minutes
- **order** - Sequence number within module
- **module** - Reference to parent module ObjectId
- **course** - Reference to parent course ObjectId
- **isPublished** - true

### Code Example Format
```javascript
{
    module: module._id,
    course: htmlCourse._id,
    title: 'Lesson Title',
    content: `# Markdown Content...`,
    codeExample: `<!DOCTYPE html>...`,
    duration: 30,
    order: 1,
    isPublished: true
}
```

---

## SEEDING STRATEGY

**Option 1: Single Large Seed File**
- One file with all 32 lessons
- ~5000-8000 lines of code
- Run once to seed everything

**Option 2: Modular Seed Files** (Recommended)
- `seedHTMLModule1.js` - Module 1 (7 lessons)
- `seedHTMLModule2.js` - Module 2 (5 lessons)
- `seedHTMLModule3.js` - Module 3 (7 lessons)
- `seedHTMLModule4.js` - Module 4 (7 lessons)
- `seedHTMLModule5.js` - Module 5 (6 lessons)
- Run individually or create master script

**Option 3: JSON Data + Seed Script**
- JSON file with all lesson data
- Simple seed script that reads JSON
- Easier to maintain and update

---

## NEXT STEPS

1. **Fix MongoDB Connection** - Resolve DNS/internet issue
2. **Choose Seeding Strategy** - Pick from options above
3. **Run Seed Script** - Populate database with all 32 lessons
4. **Verify Frontend** - Check that all modules/lessons display correctly
5. **Test Navigation** - Ensure routing works for all lessons

---

## FILES PROVIDED

1. **seedCompleteHTMLCourse.js** - Partial seed (Module 1, 5 lessons)
2. **htmlCourseSeed.js** - Old approach with Modules 1-3 partial
3. **HTML_COURSE_COMPLETE_REFERENCE.md** - This document
4. **COMPLETE_HTML_COURSE_SEED.js** - Structure reference

**Once MongoDB is connected, I can generate the complete seed file you need!**
