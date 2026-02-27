// Quick script to check if courses exist in database
const mongoose = require('mongoose');
require('dotenv').config();

const courseSchema = new mongoose.Schema({
    title: String,
    slug: String,
    description: String,
    level: String,
    isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function checkCourses() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to MongoDB');

        const courses = await Course.find().select('title slug isPublished');
        
        console.log(`\nFound ${courses.length} courses in database:\n`);
        
        if (courses.length === 0) {
            console.log('❌ No courses found! You need to run a seed script.');
            console.log('\nRun one of these:');
            console.log('  node seed.js');
            console.log('  node seedCompleteHTMLCourse.js');
            console.log('  node seedCompleteCSSCourse.js');
            console.log('  node seedCompleteJavaScriptCourse.js');
        } else {
            courses.forEach(course => {
                console.log(`  - ${course.title} (slug: ${course.slug}) ${course.isPublished ? '✅' : '❌ unpublished'}`);
            });
        }

        await mongoose.disconnect();
        process.exit(0);

    } catch (error) {
        console.error('❌ Error:', error.message);
        process.exit(1);
    }
}

checkCourses();
